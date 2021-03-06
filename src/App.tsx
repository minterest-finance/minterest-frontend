import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import { State } from './util/types';
import { loadAccounts, setAccount, checkIsAdmin } from './actions/accounts';
import { initializeAPI } from './actions/api';
import { getBalanceAnnotation } from './actions/dashboardData';
import { API_STATE_READY, KEYRING_STATE_READY } from './util/constants';
import { Tab } from 'semantic-ui-react';

import MainPage from './containers/Main/Main';
import AdminPage from './containers/Admin/Admin';
import Header from './components/Header/Header';
import MessageWrap from './components/Common/MessageWrap/MessageWrap';
import LoaderWrap from './components/Common/LoaderWrap/LoaderWrap';
// TODO refactoring types
function App(props: any) {
	const {
		loadAccounts,
		initializeAPI,
		apiState,
		keyringState,
		currentAccount,
		keyring,
		setAccount,
		checkIsAdmin,
		isAdmin,
		isAdminRequestRunning,

		getBalanceAnnotation,
		balanceAnnotation,
	} = props;
	const [isInitialized, setIsInitialized] = useState(false);

	useEffect(() => {
		initializeAPI();
	}, []);

	// checkIsAdmin
	useEffect(() => {
		if (currentAccount) {
			checkIsAdmin(currentAccount);
		}
	}, [currentAccount]);

	useEffect(() => {
		if (currentAccount) {
			getBalanceAnnotation(currentAccount);
		}
	}, [currentAccount]);

	useEffect(() => {
		if (apiState === API_STATE_READY && !isInitialized) {
			loadAccounts();
			setIsInitialized(true);
		}
	}, [apiState]);

	if (apiState === 'ERROR') return <MessageWrap />;
	else if (apiState !== API_STATE_READY)
		return <LoaderWrap text={'Connecting to Substrate'} />;

	if (keyringState !== KEYRING_STATE_READY) {
		return (
			<LoaderWrap
				text={"Loading accounts (please review any extension's authorization)"}
			/>
		);
	}

	const panes = [
		{
			menuItem: 'Dashboard',
			render: () => (
				<Tab.Pane>
					<MainPage account={currentAccount} keyring={keyring} />
				</Tab.Pane>
			),
		},
	];

	if (isAdmin) {
		panes.push({
			menuItem: 'Admin',
			render: () => (
				<Tab.Pane>
					<AdminPage />
				</Tab.Pane>
			),
		});
	}

	return (
		<div>
			<div>
				<Header
					account={currentAccount}
					onChange={setAccount}
					isCheckingAdmin={isAdminRequestRunning}
					balanceAnnotation={balanceAnnotation}
				/>
			</div>
			<Tab panes={panes} />
		</div>
	);
}

const mapStateToProps = (state: State) => ({
	apiState: state.substrate.apiState,
	keyringState: state.account.keyringState,
	currentAccount: state.account.currentAccount,
	keyring: state.account.keyring,
	isAdmin: state.account.isAdmin,
	isAdminRequestRunning: state.account.isAdminRequestRunning,
	balanceAnnotation: state.dashboardData.balanceAnnotation,
});
const mapDispatchToProps = {
	loadAccounts,
	initializeAPI,
	setAccount,
	checkIsAdmin,
	getBalanceAnnotation,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
