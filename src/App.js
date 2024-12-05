import React, { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from './Url/Url';

// CSS Imports
import './App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

// Lazy Load Components
const PremiumHeader = lazy(() => import('./Components/Header/PremiumHeader'));
const LoginForm = lazy(() => import('./Components/Auth/NewLogin'));
const Signup = lazy(() => import('./Components/Auth/Signup'));
const View = lazy(() => import('./Components/View/View'));
const Send = lazy(() => import('./Components/Send/Send'));
const Mobile = lazy(() => import('./Components/Send/Mobile'));
const Transation = lazy(() => import('./Components/View/Transation'));
const Atm = lazy(() => import('./Components/Premium/Atm'));
const Settings = lazy(() => import('./Components/Settings/Settings'));
const Goals = lazy(() => import('./Components/Goals/Goals'));
const Reward = lazy(() => import('./Components/Reward/Reward'));
const AddCheck = lazy(() => import('./Components/Reward/AddCheck'));

// Loading Component
const LoadingScreen = () => (
  <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/check`, { 
          withCredentials: true,
          timeout: 5000 
        });
        
        if (response.data.user) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error('Session check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserSession();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="App">
      <Router>
        <Suspense fallback={<LoadingScreen />}>
          {user && <PremiumHeader user={user} setUser={setUser} />}
          
          <Routes>
            <Route path="/" element={user ? <View user={user} setUser={setUser} /> : <LoginForm setUser={setUser} />} />
            <Route path="/signup" element={<Signup setUser={setUser} />} />
            <Route path="/login" element={<LoginForm setUser={setUser} />} />
            <Route path='/send' element={user ? <Send user={user} setUser={setUser} /> : <LoginForm setUser={setUser} />} />
            <Route path='/mobile' element={user ? <Mobile user={user} setUser={setUser} /> : <LoginForm setUser={setUser} />} />
            <Route path='/transation' element={user ? <Transation user={user} setUser={setUser} /> : <LoginForm setUser={setUser} />} />
            <Route
              path='/atm'
              element={
                user ? (
                  user.Premium ? (
                    <Atm user={user} setUser={setUser} />
                  ) : (
                    <Settings user={user} setUser={setUser} />
                  )
                ) : (
                  <LoginForm setUser={setUser} />
                )
              }
            />
            <Route path='/settings' element={user ? <Settings user={user} setUser={setUser} /> : <LoginForm setUser={setUser} />} />
            <Route path='/goals' element={user ? <Goals user={user} setUser={setUser} /> : <LoginForm setUser={setUser} />} />
            <Route path='/reward' element={user ? <Reward user={user} setUser={setUser} /> : <LoginForm setUser={setUser} />} />
            <Route 
              path='/addCheck' 
              element={
                user ? (
                  user.Premium ? (
                    <AddCheck user={user} setUser={setUser} />
                  ) : (
                    <Settings user={user} setUser={setUser} />
                  )
                ) : (
                  <LoginForm setUser={setUser} />
                )
              } 
            />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
