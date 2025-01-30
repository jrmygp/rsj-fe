import SuratTugas from '@/app/dashboard/surat-tugas/page';
import { Route, Routes } from 'react-router-dom';

const DocumentRoutes = () => {
  return (
    <Routes>
      <Route path='/surat-tugas' element={<SuratTugas />} />
      <Route path='/surat-tugas/create-new' element={<SuratTugas />} />
    </Routes>
  );
};

export default DocumentRoutes;
