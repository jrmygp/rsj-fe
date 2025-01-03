import { Route, Routes } from 'react-router-dom';
import Invoice from '@/app/dashboard/invoice/export-import/page';
import InvoiceAction from '@/app/dashboard/invoice/export-import/action/page';
import DoorToDoor from '@/app/dashboard/invoice/door-to-door/page';
import DoorToDoorAction from '@/app/dashboard/invoice/door-to-door/action/page';

const InvoiceRoutes = () => {
  return (
    <Routes>
      <Route path='/import' element={<Invoice />} />
      <Route path='/import/create-new' element={<InvoiceAction />} />
      <Route path='/import/edit/:id' element={<InvoiceAction />} />

      <Route path='/export' element={<Invoice />} />
      <Route path='/export/create-new' element={<InvoiceAction />} />
      <Route path='/export/edit/:id' element={<InvoiceAction />} />

      <Route path='/door-to-door' element={<DoorToDoor />} />
      <Route path='/door-to-door/create-new' element={<DoorToDoorAction />} />
      <Route path='/door-to-door/edit/:id' element={<DoorToDoorAction />} />
    </Routes>
  );
};

export default InvoiceRoutes;
