import logo from './logo.svg';
import './App.css';
import { Routes,Route,useSearchParams} from 'react-router-dom';
import { Oauth } from './LoginPage/Oauth';
import Dashboard from './LoginPage/Dashboard';
import ProtectedRoute from './ProtectedRoute';

import SkillIndiaLogin from './LoginPage/SkillIndiaLogin';
import OtpVerification from './LoginPage/OtpVerification';
import ProfilePage from './LoginPage/ProfilePage';
function App() {

  return (
    <Routes>
<Route path='/' element={<SkillIndiaLogin/>}/>
<Route path='/otpVerify' element={<OtpVerification/>}/>
{/* <Route path='/login:' element={<Oauth/>}/> */}
<Route path='/dashboard' element={ <Dashboard/> }/>
<Route path='/profile' element={ <ProfilePage/> }/>
    </Routes>

  );
}


export default App;
