import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import { UNDERLYING_ASSETS_TYPES } from '../../../util/constants';
import Loading from '../../../util/Loading';
import DropdownField from '../Fields/DropdownField/DropdownField';
import InputField from '../Fields/InputField/InputField';
import { isDecimal, required } from '../validators';

function SendRedeemUnderlying(props) {
	const { handleSubmit, isLoading, isAccountReady, valid } = props;

	const assets = UNDERLYING_ASSETS_TYPES.map((currency) => ({
		key: currency,
		text: currency,
		value: currency,
	}));

	return (
		<form onSubmit={handleSubmit}>
			<h4>Redeem Underlying</h4>
			<div>
				<Field
					name='underlyingAmount'
					component={InputField}
					placeholder='Enter the amount'
					validate={[required, isDecimal]}
				/>
				<Field
					name='underlyingAssetId'
					component={DropdownField}
					options={assets}
					placeholder='Asset'
					validate={required}
				/>
				{isLoading ? (
					<Loading />
				) : (
					<Button
						role='submit'
						color={isAccountReady ? 'green' : 'red'}
						disabled={!valid || !isAccountReady}
					>
						Redeem Underlying
					</Button>
				)}
			</div>
		</form>
	);
}

export default reduxForm({
	form: 'redeemUnderlying',
})(SendRedeemUnderlying);
