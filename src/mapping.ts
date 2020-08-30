import { BigInt } from "@graphprotocol/graph-ts"
import {
  Contract,
  UpdateBeneficiary,
  UpdateFormula,
  UpdateFees,
  NewMetaBatch,
  NewBatch,
  CancelBatch,
  AddCollateralToken,
  RemoveCollateralToken,
  UpdateCollateralToken,
  Open,
  OpenBuyOrder,
  OpenSellOrder,
  ClaimBuyOrder,
  ClaimSellOrder,
  ClaimCancelledBuyOrder,
  ClaimCancelledSellOrder,
  UpdatePricing,
  ScriptResult,
  RecoverToVault
} from "../generated/Contract/Contract"
import { Order, Batch } from "../generated/schema"

export function handleUpdateBeneficiary(event: UpdateBeneficiary): void {
}

export function handleUpdateFormula(event: UpdateFormula): void { }

export function handleUpdateFees(event: UpdateFees): void { }

export function handleNewMetaBatch(event: NewMetaBatch): void { }

export function handleNewBatch(event: NewBatch): void {

  let entity = Batch.load(event.params.id.toString())

  if (entity == null) {
    entity = new Batch(event.params.id.toString())

    entity.collateral = event.params.collateral
    entity.supply = event.params.supply
    entity.balance = event.params.balance
    entity.reserveRatio = event.params.reserveRatio
    entity.slippage = event.params.slippage

    entity.save()

  }

}

export function handleCancelBatch(event: CancelBatch): void {

  let entity = Batch.load(event.params.id.toString())

  //Load all of the orders from this batch and cancel them  


}


export function handleAddCollateralToken(event: AddCollateralToken): void { }

export function handleRemoveCollateralToken(
  event: RemoveCollateralToken
): void { }

export function handleUpdateCollateralToken(
  event: UpdateCollateralToken
): void { }

export function handleOpen(event: Open): void { }

export function handleOpenBuyOrder(event: OpenBuyOrder): void {

  let entity = Order.load(event.params.batchId.toString() + "_" + event.params.buyer.toHexString())

  //Determine price of batch
  let contract = Contract.bind(event.address)
  let batch = contract.getBatch(event.params.batchId, event.params.collateral)
  /*
    batch.initialized,
    batch.cancelled,
    batch.supply,
    batch.balance,
    batch.reserveRatio,
    batch.slippage,
    batch.totalBuySpend,
    batch.totalBuyReturn,
    batch.totalSellSpend,
    batch.totalSellReturn
    */

  let batchSupply = batch.value2
  let batchBalance = batch.value3
  let batchRR = batch.value4


  let staticPricePPM = contract.getStaticPricePPM(batchSupply, batchBalance, batchRR)



  if (entity == null) {
    entity = new Order(event.params.batchId.toString() + "_" + event.params.buyer.toHexString())
    entity.batchId = event.params.batchId.toString()
    entity.txnId = event.transaction.hash
    entity.collateral = event.params.collateral
    entity.type = "buy"
    entity.value = BigInt.fromI32(0)
    entity.createdBy = event.params.buyer
    entity.status = "unclaimed"
    entity.reserveRatio = batchRR
    entity.price = staticPricePPM
    entity.time = event.block.timestamp


  }

  //Need to add value if this entity already exists
  //For value we need to divide the value by price and multiply by 1000000
  entity.dai = event.params.value
  entity.value = entity.value.plus((event.params.value.div(staticPricePPM)).times(BigInt.fromI32(1000000)))
  entity.save()

}

export function handleClaimBuyOrder(event: ClaimBuyOrder): void {

  let entity = Order.load(event.params.batchId.toString() + "_" + event.params.buyer.toHexString())
  entity.status = "claimed"
  entity.value = event.params.amount
  entity.claimId = event.transaction.hash
  entity.ghst = event.params.amount
  entity.save()

}


export function handleOpenSellOrder(event: OpenSellOrder): void {

  let entity = Order.load(event.params.batchId.toString() + "_" + event.params.seller.toHexString())

  //Determine price of batch
  let contract = Contract.bind(event.address)
  let batch = contract.getBatch(event.params.batchId, event.params.collateral)

  /*
    batch.initialized,
    batch.cancelled,
    batch.supply,
    batch.balance,
    batch.reserveRatio,
    batch.slippage,
    batch.totalBuySpend,
    batch.totalBuyReturn,
    batch.totalSellSpend,
    batch.totalSellReturn
    */

  let batchSupply = batch.value2
  let batchBalance = batch.value3
  let batchRR = batch.value4

  let staticPricePPM = contract.getStaticPricePPM(batchSupply, batchBalance, batchRR)


  if (entity == null) {
    entity = new Order(event.params.batchId.toString() + "_" + event.params.seller.toHexString())
    entity.batchId = event.params.batchId.toString()
    entity.txnId = event.transaction.hash
    entity.collateral = event.params.collateral
    entity.value = BigInt.fromI32(0)
    entity.type = "sell"

    entity.createdBy = event.params.seller
    entity.status = "unclaimed"
    entity.reserveRatio = batchRR
    entity.price = staticPricePPM
    entity.time = event.block.timestamp

    entity.ghst = event.params.amount
  }

  entity.value = entity.value.plus(event.params.amount)
  entity.save()
}


export function handleClaimSellOrder(event: ClaimSellOrder): void {

  let entity = Order.load(event.params.batchId.toString() + "_" + event.params.seller.toHexString())
  entity.status = "claimed"
  //entity.value = event.params.value
  entity.claimId = event.transaction.hash
  entity.dai = event.params.value
  entity.save()
}

export function handleClaimCancelledBuyOrder(
  event: ClaimCancelledBuyOrder
): void { }

export function handleClaimCancelledSellOrder(
  event: ClaimCancelledSellOrder
): void { }

export function handleUpdatePricing(event: UpdatePricing): void { }