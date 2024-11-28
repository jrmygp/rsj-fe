import { Route, Routes } from 'react-router-dom';
import QuotationAction from '@/app/dashboard/quotation/action/page';
import Quotation from '@/app/dashboard/quotation/page';

const QuotationRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Quotation />} />
      <Route path='/create-new' element={<QuotationAction />} />
      <Route path='/edit/:id' element={<QuotationAction />} />
    </Routes>
  );
};

export default QuotationRoutes;
