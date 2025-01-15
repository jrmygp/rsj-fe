import { Route, Routes } from 'react-router-dom';
import Port from '@/app/dashboard/port/page';
import Customer from '@/app/dashboard/customer/page';
import CostCharges from '@/app/dashboard/cost-charges/page';
import Shipper from '@/app/dashboard/shipper';

const MasterDataRoutes = () => {
  return (
    <Routes>
      <Route path='/port' element={<Port />} />
      <Route path='/customer' element={<Customer />} />
      <Route path='/cost-charge' element={<CostCharges />} />
      <Route path='/shipper' element={<Shipper />} />
    </Routes>
  );
};

export default MasterDataRoutes;
