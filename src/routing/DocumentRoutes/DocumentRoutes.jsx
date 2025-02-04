import SuratTugasAction from '@/app/dashboard/surat-tugas/action/page';
import SuratTugas from '@/app/dashboard/surat-tugas/page';
import { Route, Routes } from 'react-router-dom';

const DocumentRoutes = () => {
  return (
    <Routes>
      <Route path='/surat-tugas' element={<SuratTugas />} />
      <Route path='/surat-tugas/create-new' element={<SuratTugasAction />} />
      <Route path='/surat-tugas/edit/:id' element={<SuratTugasAction />} />
    </Routes>
  );
};

export default DocumentRoutes;
