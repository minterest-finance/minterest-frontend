import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import { WRAP_TOKEN_TYPES } from '../../../util/constants';
import Loading from '../../../util/Loading';
import DropdownField from '../Fields/DropdownField/DropdownField';
import InputAmountField from '../Fields/InputAmountField/InputAmountField';
import { required } from '../validators';

function SendRedeemWrapped(props) {
	const { handleSubmit, isLoading, isAccountReady, valid } = props;

	const assets = WRAP_TOKEN_TYPES.map((currency) => ({
		key: currency,
		text: currency,
		value: currency,
	}));

	return (
		<form onSubmit={handleSubmit}>
			<h4>Redeem Wrapped</h4>
			{isLoading ? (
				<Loading />
			) : (
				<div>
					<Field
						name='wrappedAmount'
						component={InputAmountField}
						placeholder='Enter the amount'
						validate={required}
					/>
					<Field
						name='wrappedId'
						component={DropdownField}
						options={assets}
						placeholder='Asset'
						validate={required}
					/>
					<Button
						role='submit'
						color={isAccountReady ? 'green' : 'red'}
						disabled={!valid || !isAccountReady}
					>
						Redeem Wrapped
					</Button>
				</div>
			)}
		</form>
	);
}

export default reduxForm({
	form: 'redeemWrapped',
})(SendRedeemWrapped);
