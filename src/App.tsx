import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Nav } from './nav/Nav';
import { Home } from './pages/Home';
import LoginForm from './pages/login/Login';
import RegisterForm from './pages/register/Register';
import { Settings } from './pages/settings/Settings';
import { Networks } from './pages/admin/network/Networks';
import Users from './pages/admin/user/Users';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/protected-route/ProtectedRoute';
import { Admin } from './pages/admin/Admin';
import UserForm from './pages/settings/UserForm';
import EditUser from './pages/admin/user/EditUser';
import { Dashboard } from './pages/dash/Dashboard';

function Forms() {
  return <h1>Forms</h1>;
}

function About() {
  return <h1>About</h1>;
}

function UnauthenticatedRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

function App() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) return null;

  if (!loading && !isAuthenticated) {
    return (
      <BrowserRouter>
        <Nav />
        <main style={{ paddingTop: '4em' }}>
          <UnauthenticatedRoutes />
        </main>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Nav />

      <main style={{ paddingTop: '4em' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashes/:id" element={<Dashboard />} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<Admin />}>
            <Route path="networks" element={<Networks />} />
            <Route path="users" element={<Users />} />
            <Route path="users/:id" element={<EditUser />} />
          </Route>
          <Route path="/settings" element={<Settings />}>
            <Route path="network" element={<Networks />} />
            <Route path="user" element={<UserForm />} />
            <Route index element={<UserForm />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
