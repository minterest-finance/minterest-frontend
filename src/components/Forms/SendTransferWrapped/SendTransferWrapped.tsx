import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import { WRAP_TOKEN_TYPES } from '../../../util/constants';
import Loading from '../../../util/Loading';
import DropdownField from '../Fields/DropdownField/DropdownField';
import InputField from '../Fields/InputField/InputField';
import { isDecimal, required } from '../validators';

function SendTransferWrapped(props) {
	const { handleSubmit, isLoading, isAccountReady, valid } = props;

	const assets = WRAP_TOKEN_TYPES.map((currency) => ({
		key: currency,
		text: currency,
		value: currency,
	}));

	return (
		<form onSubmit={handleSubmit}>
			<h4>Transfer</h4>
			<div>
				<Field
					type='text'
					name='receiver'
					component={InputField}
					placeholder='Enter the publick key'
					validate={required}
				/>
				<Field
					name='wrappedId'
					component={DropdownField}
					options={assets}
					placeholder='Asset'
					validate={required}
				/>
				<Field
					name='convertedAmount'
					component={InputField}
					placeholder='Enter the amount'
					validate={[required, isDecimal]}
				/>
				{isLoading ? (
					<Loading />
				) : (
					<Button
						role='submit'
						color={isAccountReady ? 'green' : 'red'}
						disabled={!valid || !isAccountReady}
					>
						Transfer
					</Button>
				)}
			</div>
		</form>
	);
}

export default reduxForm({
	form: 'transferWrapped',
})(SendTransferWrapped);
