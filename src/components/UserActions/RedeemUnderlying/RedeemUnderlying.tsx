import React from 'react';

import SendRedeemUnderlying from '../../Forms/SendRedeemUnderlying/SendRedeemUnderlying';
// @ts-ignore
import classes from './RedeemUnderlying.module.css';

export default function RedeemUnderlying(props) {
	const {
		keyring,
		account,
		redeemUnderlying,
		isRedeemUnderlyingResponseRunning,
	} = props;

	const handleSendRedeemUnderlying = (form) => {
		const { underlyingAssetId, underlyingAmount } = form;
		redeemUnderlying(keyring, account, underlyingAssetId, underlyingAmount);
	};
	return (
		<div className={classes.redeem}>
			<SendRedeemUnderlying
				onSubmit={handleSendRedeemUnderlying}
				// @ts-ignore
				isLoading={isRedeemUnderlyingResponseRunning}
				isAccountReady={!!account}
			/>
		</div>
	);
}
