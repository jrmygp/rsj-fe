import { Route, Routes } from 'react-router-dom';
import Shipment from '@/app/dashboard/shipment/page';

const ShipmentRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Shipment />} />
      {/* <Route path='/create-new' element={<InvoiceImportAction />} />
      <Route path='/edit/:id' element={<InvoiceImportAction />} /> */}
    </Routes>
  );
};

export default ShipmentRoutes;
