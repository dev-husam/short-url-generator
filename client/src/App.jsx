
import './App.css'

import Auth from './pages/auth.page'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home.page'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<Auth />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

      </Routes>

    </>

  )
}

export default App
