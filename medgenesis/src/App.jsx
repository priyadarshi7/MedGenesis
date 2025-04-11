import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import {useAuthStore} from './store/authStore';
import { Toaster } from 'react-hot-toast';
import SignUpPage from './pages/auth/signup';
import LoginPage from './pages/auth/login';
import EmailVerificationPage from './pages/auth/EmailVerificationPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import LoadingSpinner from './components/auth/LoadingSpinner';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import Navbar from './components/navbar/Navbar';

// protect routes that require authentication
const ProtectedRoute = ({children}) => {
  const {isAuthenticated, user} = useAuthStore();
  if(!isAuthenticated){
    return <Navigate to="/login" replace />
  }

  if(!user.isVerified){
    return <Navigate to="/verify-email" replace />
  }

}

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (isAuthenticated && user.isVerified) {
		return <Navigate to='/' replace />;
	}

	return children;
};

function App() {

  const {isCheckingAuth, checkAuth} = useAuthStore();
  React.useEffect(()=>{
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <div>
     <Navbar/>
      <Routes>
        <Route path="/" element={
            <Home/>
        } />
        <Route
					path='/signup'
					element={
						<RedirectAuthenticatedUser>
							<SignUpPage />
						</RedirectAuthenticatedUser>
					}
				/>
				<Route
					path='/login'
					element={
						<RedirectAuthenticatedUser>
							<LoginPage />
						</RedirectAuthenticatedUser>
					}
				/>
        <Route path='/verify-email' element={<EmailVerificationPage />} />
				<Route
					path='/forgot-password'
					element={
						<RedirectAuthenticatedUser>
							<ForgotPasswordPage />
						</RedirectAuthenticatedUser>
					}
				/>

				<Route
					path='/reset-password/:token'
					element={
						<RedirectAuthenticatedUser>
							<ResetPasswordPage />
						</RedirectAuthenticatedUser>
					}
				/>
				{/* catch all routes */}
				<Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App;