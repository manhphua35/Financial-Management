import React, { Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Home = React.lazy(() => import('./views/pages/home/Home'))
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const ProfileEdit = React.lazy(() => import('./views/pages/user/ProfileEdit'))
const ChangePassword = React.lazy(() => import('./views/pages/user/changePassword'))

const ProtectedRoute = ({ children }) => {
  const isSignedIn = localStorage.getItem('isSigned') === 'true'
  return isSignedIn ? children : <Navigate to="/login" />
}

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (!isColorModeSet()) {
      setColorMode(storedTheme)
    }
  }, [isColorModeSet, setColorMode, storedTheme])

  return (
    <Router>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/404" element={<Page404 />} />
          <Route path="/500" element={<Page500 />} />
          <Route path="/profile" element={<ProtectedRoute><ProfileEdit /></ProtectedRoute>} />
          <Route path="/changePassword" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
          <Route path="*" element={<ProtectedRoute><DefaultLayout /></ProtectedRoute>} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
