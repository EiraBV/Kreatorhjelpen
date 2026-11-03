import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Oversikt from './pages/Oversikt.jsx'
import Skapere from './pages/Skapere.jsx'
import SkaperProfil from './pages/SkaperProfil.jsx'
import Idebank from './pages/Idebank.jsx'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Oversikt />} />
        <Route path="skapere" element={<Skapere />} />
        <Route path="skapere/:id" element={<SkaperProfil />} />
        <Route path="idebank" element={<Idebank />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
