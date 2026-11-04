import { Route, Routes } from 'react-router-dom';
import SiteLayout from './components/layout/SiteLayout';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ComingSoonPage from './pages/ComingSoonPage';

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalogo" element={<CatalogPage />} />
        <Route path="/colecciones" element={<ComingSoonPage />} />
        <Route path="/nosotros" element={<ComingSoonPage />} />
        <Route path="/venta-corporativa" element={<ComingSoonPage />} />
        <Route path="/cuenta" element={<ComingSoonPage />} />
        <Route path="/ayuda" element={<ComingSoonPage />} />
        <Route path="*" element={<ComingSoonPage />} />
      </Route>
    </Routes>
  );
}
