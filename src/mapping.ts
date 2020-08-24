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
import { ExampleEntity } from "../generated/schema"

export function handleUpdateBeneficiary(event: UpdateBeneficiary): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.beneficiary = event.params.beneficiary

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.hasInitialized(...)
  // - contract.PPM(...)
  // - contract.UPDATE_FORMULA_ROLE(...)
  // - contract.metaBatches(...)
  // - contract.getEVMScriptExecutor(...)
  // - contract.tokenManager(...)
  // - contract.OPEN_BUY_ORDER_ROLE(...)
  // - contract.UPDATE_COLLATERAL_TOKEN_ROLE(...)
  // - contract.getRecoveryVault(...)
  // - contract.beneficiary(...)
  // - contract.UPDATE_BENEFICIARY_ROLE(...)
  // - contract.isOpen(...)
  // - contract.collateralsToBeClaimed(...)
  // - contract.formula(...)
  // - contract.ADD_COLLATERAL_TOKEN_ROLE(...)
  // - contract.UPDATE_FEES_ROLE(...)
  // - contract.OPEN_ROLE(...)
  // - contract.sellFeePct(...)
  // - contract.allowRecoverability(...)
  // - contract.appId(...)
  // - contract.getInitializationBlock(...)
  // - contract.tokensToBeMinted(...)
  // - contract.canPerform(...)
  // - contract.getEVMScriptRegistry(...)
  // - contract.REMOVE_COLLATERAL_TOKEN_ROLE(...)
  // - contract.batchBlocks(...)
  // - contract.reserve(...)
  // - contract.OPEN_SELL_ORDER_ROLE(...)
  // - contract.kernel(...)
  // - contract.isPetrified(...)
  // - contract.collaterals(...)
  // - contract.controller(...)
  // - contract.buyFeePct(...)
  // - contract.token(...)
  // - contract.PCT_BASE(...)
  // - contract.getCurrentBatchId(...)
  // - contract.getCollateralToken(...)
  // - contract.getBatch(...)
  // - contract.getStaticPricePPM(...)
}

export function handleUpdateFormula(event: UpdateFormula): void {}

export function handleUpdateFees(event: UpdateFees): void {}

export function handleNewMetaBatch(event: NewMetaBatch): void {}

export function handleNewBatch(event: NewBatch): void {}

export function handleCancelBatch(event: CancelBatch): void {}

export function handleAddCollateralToken(event: AddCollateralToken): void {}

export function handleRemoveCollateralToken(
  event: RemoveCollateralToken
): void {}

export function handleUpdateCollateralToken(
  event: UpdateCollateralToken
): void {}

export function handleOpen(event: Open): void {}

export function handleOpenBuyOrder(event: OpenBuyOrder): void {}

export function handleOpenSellOrder(event: OpenSellOrder): void {}

export function handleClaimBuyOrder(event: ClaimBuyOrder): void {}

export function handleClaimSellOrder(event: ClaimSellOrder): void {}

export function handleClaimCancelledBuyOrder(
  event: ClaimCancelledBuyOrder
): void {}

export function handleClaimCancelledSellOrder(
  event: ClaimCancelledSellOrder
): void {}

export function handleUpdatePricing(event: UpdatePricing): void {}

export function handleScriptResult(event: ScriptResult): void {}

export function handleRecoverToVault(event: RecoverToVault): void {}
