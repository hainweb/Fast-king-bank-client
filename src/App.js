import './App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

import PremiumHeader from './Components/Header/PremiumHeader';
import View from './Components/View/View';
import Signup from './Components/Auth/Signup';

import Send from './Components/Send/Send';
import Transation from './Components/View/Transation';
import Settings from './Components/Settings/Settings';
import Atm from './Components/Premium/Atm';
import Mobile from './Components/Send/Mobile';
import Goals from './Components/Goals/Goals';
import LoginForm from './Components/Auth/NewLogin';
import AddCheck from './Components/Reward/AddCheck';
import Reward from './Components/Reward/Reward';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from './Url/Url';



function App() {
  const [user, setUser] = useState('')

  useEffect(() => {
    axios.get(`${BASE_URL}/check`, { withCredentials: true })
      .then((response) => {
        console.log('check res', response);
        if (response.data.user) {
          setUser(response.data.user);
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);


  return (
    <div className="App">
      <Router>
       
          <PremiumHeader user={user} setUser={setUser} />
       
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
          <Route path='/addCheck' element={user ? (user.Premium ? (<AddCheck user={user} setUser={setUser} />) : <Settings user={user} setUser={setUser} />) : <LoginForm setUser={setUser} />} />
        </Routes>
      </Router>
    </div>
  );
}


export default App;
