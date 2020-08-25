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

  if (entity == null) {
    entity = new Order(event.params.batchId.toString() + "_" + event.params.buyer.toHexString())
    entity.batchId = event.params.batchId.toString()
    entity.collateral = event.params.collateral
    entity.type = "buy"
    entity.value = BigInt.fromI32(0)
    entity.createdBy = event.params.buyer
    entity.status = "unclaimed"
  }

  //Need to add value if this entity already exists
  entity.value = entity.value.plus(event.params.value)
  entity.save()

}

export function handleOpenSellOrder(event: OpenSellOrder): void {

  let entity = Order.load(event.params.batchId.toString() + "_" + event.params.seller.toHexString())

  if (entity == null) {
    entity = new Order(event.params.batchId.toString() + "_" + event.params.seller.toHexString())
    entity.batchId = event.params.batchId.toString()
    entity.collateral = event.params.collateral
    entity.value = BigInt.fromI32(0)
    entity.type = "sell"

    entity.createdBy = event.params.seller
    entity.status = "pending"
  }

  entity.value = entity.value.plus(event.params.amount)
  entity.save()
}

export function handleClaimBuyOrder(event: ClaimBuyOrder): void {

  let entity = Order.load(event.params.batchId.toString() + "_" + event.params.buyer.toHexString())
  entity.status = "claimed"
  entity.save()


}

export function handleClaimSellOrder(event: ClaimSellOrder): void {

  let entity = Order.load(event.params.batchId.toString() + "_" + event.params.seller.toHexString())
  entity.status = "claimed"
  entity.save()
}

export function handleClaimCancelledBuyOrder(
  event: ClaimCancelledBuyOrder
): void { }

export function handleClaimCancelledSellOrder(
  event: ClaimCancelledSellOrder
): void { }

export function handleUpdatePricing(event: UpdatePricing): void { }