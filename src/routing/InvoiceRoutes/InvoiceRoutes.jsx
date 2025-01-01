import { Route, Routes } from 'react-router-dom';
import Invoice from '@/app/dashboard/invoice/page';
import InvoiceAction from '@/app/dashboard/invoice/action/page';

const InvoiceRoutes = () => {
  return (
    <Routes>
      <Route path='/import' element={<Invoice />} />
      <Route path='/import/create-new' element={<InvoiceAction />} />
      <Route path='/import/edit/:id' element={<InvoiceAction />} />

      <Route path='/export' element={<Invoice />} />
      <Route path='/export/create-new' element={<InvoiceAction />} />
      <Route path='/export/edit/:id' element={<InvoiceAction />} />

      <Route path='/door-to-door' element={<Invoice />} />
      <Route path='/door-to-door/create-new' element={<InvoiceAction />} />
      <Route path='/door-to-door/edit/:id' element={<InvoiceAction />} />
    </Routes>
  );
};

export default InvoiceRoutes;
