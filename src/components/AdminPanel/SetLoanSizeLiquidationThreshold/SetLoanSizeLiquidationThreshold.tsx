import React from 'react';

// @ts-ignore
import classes from './SetLoanSizeLiquidationThreshold.module.css';
import SetLoanSizeLiquidationThresholdForm from '../../Forms/SetLoanSizeLiquidationThreshold/SetLoanSizeLiquidationThreshold';

export default function SetLoanSizeLiquidationThreshold(props) {
	const {
		account,
		keyring,
		setLoanSizeLiquidationThreshold,

		isSetLoanSizeLiquidationThresholdResponseRunning,
	} = props;

	const handleSetLoanSizeLiquidationThreshold = (form) => {
		const { poolId, newMinSum } = form;

		setLoanSizeLiquidationThreshold(account, keyring, poolId, newMinSum);
	};

	return (
		<div className={classes.wrapper}>
			<SetLoanSizeLiquidationThresholdForm
				onSubmit={handleSetLoanSizeLiquidationThreshold}
				// @ts-ignore
				isLoading={isSetLoanSizeLiquidationThresholdResponseRunning}
				isAccountReady={!!account}
			/>
		</div>
	);
}
