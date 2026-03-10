import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from './components/Footer/Footer'
import { Navbar } from './components/Navbar/Navbar'
import { Sidebar } from './components/Sidebar/Sidebar'
import { About } from './pages/About/About'
import { Games } from './pages/Games/Games'
import { Home } from './pages/Home/Home'
import { Play } from './pages/Play/Play'
import { Settings } from './pages/Settings/Settings'

function AppFrame() {
  const location = useLocation()
  const isPlayRoute = location.pathname.startsWith('/play/')

  return (
    <div className="min-h-screen">
      {isPlayRoute ? (
        <Routes>
          <Route path="/play/:gameId" element={<Play />} />
          <Route path="*" element={<Navigate to="/games" replace />} />
        </Routes>
      ) : (
        <>
          <Navbar title="Futhero Launcher" />
          <div className="mx-auto flex max-w-7xl gap-0">
            <Sidebar />
            <main className="min-w-0 flex-1 px-4 py-6">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/games" element={<Games />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
          <Footer />
        </>
      )}
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <AppFrame />
    </HashRouter>
  )
}
