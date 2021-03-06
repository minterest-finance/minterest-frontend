import { web3FromAddress } from '@polkadot/extension-dapp';
import { Dispatch } from '../util/types';
import {
	SET_INSURANCE_FACTOR_START,
	SET_INSURANCE_FACTOR_SUCCESS,
	SET_INSURANCE_FACTOR_ERROR,
	SET_COLLATERAL_FACTOR_REQUEST_ERROR,
	SET_COLLATERAL_FACTOR_REQUEST_START,
	SET_COLLATERAL_FACTOR_REQUEST_SUCCESS,
	SET_COLLATERAL_THRESHOLD_REQUEST_ERROR,
	SET_COLLATERAL_THRESHOLD_REQUEST_SUCCESS,
	SET_COLLATERAL_THRESHOLD_REQUEST_START,
	RESET_ADMIN_REQUESTS,
	SET_LIQUIDATIONS_MAX_ATTEMPTS_ERROR,
	SET_LIQUIDATIONS_MAX_ATTEMPTS_START,
	SET_LIQUIDATIONS_MAX_ATTEMPTS_SUCCESS,
	GET_ADMIN_CONTROLLER_DATA_START,
	GET_ADMIN_CONTROLLER_DATA_ERROR,
	GET_ADMIN_CONTROLLER_DATA_SUCCESS,
	GET_RISK_MANAGER_DATA_START,
	GET_RISK_MANAGER_DATA_SUCCESS,
	GET_RISK_MANAGER_DATA_ERROR,
	SET_LOAN_SIZE_LIQUIDATIONS_THRESHOLD_START,
	SET_LOAN_SIZE_LIQUIDATIONS_THRESHOLD_SUCCESS,
	SET_LOAN_SIZE_LIQUIDATIONS_THRESHOLD_ERROR,
	GET_WHITELIST_MODE_START,
	GET_WHITELIST_MODE_ERROR,
	GET_WHITELIST_MODE_SUCCESS,
	SWITCH_MODE_START,
	SWITCH_MODE_ERROR,
	SWITCH_MODE_SUCCESS,
} from './types';
import API from '../services';
import { UNDERLYING_ASSETS_TYPES } from '../util/constants';
import { txCallback } from '../util';

export function setInsuranceFactor(
	account,
	keyring,
	poolId,
	newAmountN,
	newAmountD
) {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[SET_INSURANCE_FACTOR_SUCCESS, SET_INSURANCE_FACTOR_ERROR],
			dispatch
		);

		try {
			dispatch({ type: SET_INSURANCE_FACTOR_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(
						API.tx.controller.setInsuranceFactor(poolId, newAmountN, newAmountD)
					)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(
						API.tx.controller.setInsuranceFactor(poolId, newAmountN, newAmountD)
					)
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: SET_INSURANCE_FACTOR_ERROR,
				payload: err.toString(),
			});
		}
	};
}

export function setLiquidationMaxAttempts(
	account,
	keyring,
	poolId,
	newMaxValue
) {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[
				SET_LIQUIDATIONS_MAX_ATTEMPTS_SUCCESS,
				SET_LIQUIDATIONS_MAX_ATTEMPTS_ERROR,
			],
			dispatch
		);

		try {
			dispatch({ type: SET_LIQUIDATIONS_MAX_ATTEMPTS_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(API.tx.riskManager.setMaxAttempts(poolId, newMaxValue))
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(API.tx.riskManager.setMaxAttempts(poolId, newMaxValue))
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: SET_LIQUIDATIONS_MAX_ATTEMPTS_ERROR,
				payload: err.toString(),
			});
		}
	};
}

export const resetAdminRequests = () => {
	return {
		type: RESET_ADMIN_REQUESTS,
	};
};

export const setCollateralThreshold = (
	account,
	keyring,
	poolId,
	newAmountN,
	newAmountD
) => {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[
				SET_COLLATERAL_THRESHOLD_REQUEST_SUCCESS,
				SET_COLLATERAL_THRESHOLD_REQUEST_ERROR,
			],
			dispatch
		);

		try {
			dispatch({ type: SET_COLLATERAL_THRESHOLD_REQUEST_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(API.tx.riskManager.setThreshold(poolId, newAmountN, newAmountD))
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(API.tx.riskManager.setThreshold(poolId, newAmountN, newAmountD))
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: SET_COLLATERAL_THRESHOLD_REQUEST_ERROR,
				payload: err.toString(),
			});
		}
	};
};

export const setCollateralFactor = (
	account,
	keyring,
	poolId,
	newAmountN,
	newAmountD
) => {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[
				SET_COLLATERAL_FACTOR_REQUEST_SUCCESS,
				SET_COLLATERAL_FACTOR_REQUEST_ERROR,
			],
			dispatch
		);

		try {
			dispatch({ type: SET_COLLATERAL_FACTOR_REQUEST_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(
						API.tx.controller.setCollateralFactor(
							poolId,
							newAmountN,
							newAmountD
						)
					)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(
						API.tx.controller.setCollateralFactor(
							poolId,
							newAmountN,
							newAmountD
						)
					)
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: SET_COLLATERAL_FACTOR_REQUEST_ERROR,
				payload: err.toString(),
			});
		}
	};
};

export const getControllerData = () => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: GET_ADMIN_CONTROLLER_DATA_START });

			const dataArray = await Promise.all(
				UNDERLYING_ASSETS_TYPES.map((asset) =>
					API.query.controller.controllerDates(asset)
				)
			);

			const initRates = UNDERLYING_ASSETS_TYPES.reduce((old, item, index) => {
				old[item] = dataArray[index];
				return old;
			}, {});

			dispatch({
				type: GET_ADMIN_CONTROLLER_DATA_SUCCESS,
				payload: initRates,
			});
		} catch (err) {
			console.log(err);
			dispatch({
				type: GET_ADMIN_CONTROLLER_DATA_ERROR,
			});
		}
	};
};

export const getRiskManagerData = () => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: GET_RISK_MANAGER_DATA_START });

			const dataArray = await Promise.all(
				UNDERLYING_ASSETS_TYPES.map((asset) =>
					API.query.riskManager.riskManagerDates(asset)
				)
			);

			const data = UNDERLYING_ASSETS_TYPES.reduce((old, item, index) => {
				old[item] = dataArray[index];
				return old;
			}, {});

			dispatch({
				type: GET_RISK_MANAGER_DATA_SUCCESS,
				payload: data,
			});
		} catch (err) {
			console.log(err);
			dispatch({
				type: GET_RISK_MANAGER_DATA_ERROR,
			});
		}
	};
};

export const setLoanSizeLiquidationThreshold = (
	account,
	keyring,
	poolId,
	newMaxValue
) => {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[
				SET_LOAN_SIZE_LIQUIDATIONS_THRESHOLD_SUCCESS,
				SET_LOAN_SIZE_LIQUIDATIONS_THRESHOLD_ERROR,
			],
			dispatch
		);

		try {
			dispatch({ type: SET_LOAN_SIZE_LIQUIDATIONS_THRESHOLD_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(API.tx.riskManager.setMinSum(poolId, newMaxValue))
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(API.tx.riskManager.setMinSum(poolId, newMaxValue))
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: SET_LOAN_SIZE_LIQUIDATIONS_THRESHOLD_ERROR,
				payload: err.toString(),
			});
		}
	};
};

export const getWhitelistMode = () => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: GET_WHITELIST_MODE_START });

			const mode = await API.query.controller.whitelistMode();

			dispatch({
				type: GET_WHITELIST_MODE_SUCCESS,
				payload: mode.toString(),
			});
		} catch (err) {
			console.log(err);
			dispatch({
				type: GET_WHITELIST_MODE_ERROR,
			});
		}
	};
};

export function switchMode(account, keyring) {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[SWITCH_MODE_SUCCESS, SWITCH_MODE_ERROR],
			dispatch
		);

		try {
			dispatch({ type: SWITCH_MODE_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(API.tx.controller.switchMode())
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(API.tx.controller.switchMode())
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: SWITCH_MODE_ERROR,
				payload: err.toString(),
			});
		}
	};
}
