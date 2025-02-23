import SuratJalanAction from '@/app/dashboard/surat-jalan/action/page';
import SuratJalan from '@/app/dashboard/surat-jalan/page';
import SuratTugasAction from '@/app/dashboard/surat-tugas/action/page';
import SuratTugas from '@/app/dashboard/surat-tugas/page';
import { Route, Routes } from 'react-router-dom';

const DocumentRoutes = () => {
  return (
    <Routes>
      <Route path='/surat-tugas' element={<SuratTugas />} />
      <Route path='/surat-tugas/create-new' element={<SuratTugasAction />} />
      <Route path='/surat-tugas/edit/:id' element={<SuratTugasAction />} />

      <Route path='/surat-jalan' element={<SuratJalan />} />
      <Route path='/surat-jalan/create-new' element={<SuratJalanAction />} />
      <Route path='/surat-jalan/edit/:id' element={<SuratJalanAction />} />
    </Routes>
  );
};

export default DocumentRoutes;
