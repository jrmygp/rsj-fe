import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './app/login/page';
import DashboardSideBar from './app/dashboard/_components/DashboardSideBar';
import ProtectedRoute from './config/ProtectedRoute';
import UserPage from './app/dashboard/user/page';
import QuotationRoutes from './routing/QuotationRoutes/QuotationRoutes';
import MasterDataRoutes from './routing/MasterDataRoutes/MasterDataRoutes';
import InvoiceRoutes from './routing/InvoiceRoutes/InvoiceRoutes';
import DocumentRoutes from './routing/DocumentRoutes/DocumentRoutes';
import ShipmentRoutes from './routing/ShipmentRoutes/ShipmentRoutes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/*'
          element={
            <Routes>
              <Route path='/' element={<LoginPage />} />
              <Route
                path='/radix-logistics/*'
                element={
                  <ProtectedRoute>
                    <DashboardSideBar>
                      <Routes>
                        <Route path='/dashboard' />
                        <Route
                          path='/quotation/*'
                          element={<QuotationRoutes />}
                        />
                        <Route path='/invoice/*' element={<InvoiceRoutes />} />
                        <Route
                          path='/shipment/*'
                          element={<ShipmentRoutes />}
                        />
                        <Route
                          path='/master-data/*'
                          element={<MasterDataRoutes />}
                        />
                        <Route
                          path='/document/*'
                          element={<DocumentRoutes />}
                        />
                        <Route path='/user' element={<UserPage />} />
                      </Routes>
                    </DashboardSideBar>
                  </ProtectedRoute>
                }
              />
            </Routes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
