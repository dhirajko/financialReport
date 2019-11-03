import loadable from 'react-loadable';
import LoadingComponent from '../../components/Loading';

export const AsyncHome = loadable({
    loader: () => import('../../containers/Home/HomeContainer'),
    loading: LoadingComponent,
});

export const AsyncLoginForm = loadable({
    loader: () => import('../../containers/Auth/LoginPageContainer'),
    loading: LoadingComponent,
});

export const AsyncDashboard = loadable({
    loader: () => import('../../containers/Dashboard/DashboardContainer'),
    loading: LoadingComponent,
});

export const AsyncRegisterPage = loadable({
    loader: () => import('../../containers/Auth/RegisterPageContainer'),
    loading: LoadingComponent,
});

export const AsyncAccounts = loadable({
    loader: () => import('../../containers/Accounts/AccountsContainer'),
    loading: LoadingComponent,
});

export const AsyncAccount = loadable({
    loader: () => import('../../containers/Account/AccountContainer'),
    loading: LoadingComponent,
});

export const AsyncTransactions = loadable({
    loader: () => import('../Transactions/TransactionsContiner'),
    loading: LoadingComponent,
});


export const AsyncTransaction = loadable({
    loader: () => import('../Transaction/transactionContainer'),
    loading: LoadingComponent,
});

export const AsyncStatement = loadable({
    loader: () => import('../../containers/Statement/statementContainer'),
    loading: LoadingComponent,
});

export const AsyncQuickWizard = loadable({
    loader: () => import('../../containers/EasyStart/easyStartContainer'),
    loading: LoadingComponent,
});
