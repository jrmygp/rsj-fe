import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';
import DashboardPage from './app/dashboard/page';
import LoginPage from './app/login/page';
import DashboardSideBar from './app/dashboard/_components/DashboardSideBar';
import Quotation from './app/dashboard/quotation/page';
import ProtectedRoute from './config/ProtectedRoute';
import Customer from './app/dashboard/customer/page';
import Port from './app/dashboard/port/page';
import CostCharges from './app/dashboard/cost-charges/page';
import UserPage from './app/dashboard/user/page';
import Test from './app/test/page';
import QuotationAction from './app/dashboard/quotation/action/page';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={<ProtectedRoute redirectIfAuthenticated={true} />}
        >
          <Route path='' element={<LoginPage />} />
        </Route>
        <Route
          element={
            <ProtectedRoute allowedRoles={['admin', 'staff', 'Admin']} />
          }
        >
          <Route path='/dashboard' element={<DashboardSideBar />}>
            <Route index element={<DashboardPage />} />
            <Route path='quotation'>
              <Route index element={<Quotation />} />
              <Route path='action' element={<QuotationAction />} />
              <Route path='action/:id' element={<QuotationAction />} />
            </Route>
            <Route path='customer' element={<Customer />} />
            <Route path='port' element={<Port />} />
            <Route path='cost-charges' element={<CostCharges />} />
            <Route path='user' element={<UserPage />} />
            <Route path='test' element={<Test />} />
            <Route path='test' element={<Test />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
