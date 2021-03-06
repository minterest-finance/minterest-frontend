import React from 'react';

import SendRepayAll from '../../Forms/SendRepayAll/SendRepayAll';
// @ts-ignore
import classes from './RepayAll.module.css';

export default function RepayAll(props) {
	const { keyring, account, repayAll, isRepayAllResponseRunning } = props;

	const handleSendRepayAll = (form) => {
		const { underlyingAssetId } = form;
		repayAll(keyring, account, underlyingAssetId);
	};
	return (
		<div className={classes.repay}>
			<SendRepayAll
				onSubmit={handleSendRepayAll}
				// @ts-ignore
				isLoading={isRepayAllResponseRunning}
				isAccountReady={!!account}
			/>
		</div>
	);
}
