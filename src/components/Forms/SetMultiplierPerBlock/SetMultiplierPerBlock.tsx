import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import DropdownField from '../Fields/DropdownField/DropdownField';
import InputField from '../Fields/InputField/InputField';
import { UNDERLYING_ASSETS_TYPES } from '../../../util/constants';
import Loading from '../../../util/Loading';
import { required } from '../validators';

function SetMultiplierPerBlock(props) {
	const { handleSubmit, isLoading, isAccountReady, valid } = props;

	const assets = UNDERLYING_ASSETS_TYPES.map((currency) => ({
		key: currency,
		text: currency,
		value: currency,
	}));

	return (
		<form onSubmit={handleSubmit}>
			<h4>Set Multiplier Per Block</h4>
			<Field
				name='poolId'
				component={DropdownField}
				options={assets}
				placeholder='Asset'
				validate={required}
			/>
			<Field
				name='multiplierRatePerYearN'
				component={InputField}
				placeholder='Enter the amount'
				validate={required}
			/>
			<Field
				name='multiplierRatePerYearD'
				component={InputField}
				placeholder='Enter the amount'
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
					Set
				</Button>
			)}
		</form>
	);
}

export default reduxForm({
	form: 'setMultiplierPerBlock',
})(SetMultiplierPerBlock);
