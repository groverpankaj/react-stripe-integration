import Home from './Home';
import Subscription from './Subscription';
import CustomerInfo from './CustomerInfo';
import ExistingCustomers from './ExistingCustomers';
import Success from './SubComponents/Success';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/subscription',
    component: Subscription,
  },
  {
    path: '/customerinfo/:id',
    component: CustomerInfo,
    fetchInitialData: (path) => path.split('/').pop(),
  },
  {
    path: '/existingcustomers',
    component: ExistingCustomers,
  },
  {
    path: '/success',
    component: Success,
    data: (data) => data,
  },
];

export default routes;
