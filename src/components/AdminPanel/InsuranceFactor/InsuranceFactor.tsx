import React from 'react';

// @ts-ignore
import classes from './InsuranceFactor.module.css';
import SetInsuranceFactor from '../../Forms/SetInsuranceFactor/SetInsuranceFactor';

export default function InsuranceFactor(props) {
	const {
		account,
		keyring,

		setInsuranceFactor,
		isSetInsuranceFactorResponseRunning,
	} = props;

	const handleSetInsuranceFactor = (form) => {
		const { poolId, newAmountN, newAmountD } = form;
		setInsuranceFactor(account, keyring, poolId, newAmountN, newAmountD);
	};

	return (
		<div className={classes.wrapper}>
			<SetInsuranceFactor
				onSubmit={handleSetInsuranceFactor}
				// @ts-ignore
				isLoading={isSetInsuranceFactorResponseRunning}
				isAccountReady={!!account}
			/>
		</div>
	);
}
