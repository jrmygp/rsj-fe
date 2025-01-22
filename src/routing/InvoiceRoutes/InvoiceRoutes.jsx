import { Route, Routes } from 'react-router-dom';
import DoorToDoor from '@/app/dashboard/invoice/door-to-door/page';
import DoorToDoorAction from '@/app/dashboard/invoice/door-to-door/action/page';
import InvoiceExport from '@/app/dashboard/invoice/export/page';
import InvoiceExportAction from '@/app/dashboard/invoice/export/action/page';
import InvoiceImport from '@/app/dashboard/invoice/import/page';
import InvoiceImportAction from '@/app/dashboard/invoice/import/action/page';

const InvoiceRoutes = () => {
  return (
    <Routes>
      <Route path='/import' element={<InvoiceImport />} />
      <Route path='/import/create-new' element={<InvoiceImportAction />} />
      <Route path='/import/edit/:id' element={<InvoiceImportAction />} />

      <Route path='/export' element={<InvoiceExport />} />
      <Route path='/export/create-new' element={<InvoiceExportAction />} />
      <Route path='/export/edit/:id' element={<InvoiceExportAction />} />

      <Route path='/door-to-door' element={<DoorToDoor />} />
      <Route path='/door-to-door/create-new' element={<DoorToDoorAction />} />
      <Route path='/door-to-door/edit/:id' element={<DoorToDoorAction />} />
    </Routes>
  );
};

export default InvoiceRoutes;
