import logo from './logo.svg';
import './App.css';
import { Routes,Route,useSearchParams} from 'react-router-dom';
import { Oauth } from './LoginPage/Oauth';
import Dashboard from './LoginPage/Dashboard';
import ProtectedRoute from './ProtectedRoute';

import SkillIndiaLogin from './LoginPage/SkillIndiaLogin';
function App() {

  return (
    <Routes>
<Route path='/' element={<SkillIndiaLogin/>}/>
<Route path='/login' element={<Oauth/>}/>
{/* <Route path='/login:' element={<Oauth/>}/> */}
<Route path='/dashboard' element={<ProtectedRoute> <Dashboard/></ProtectedRoute>  }/>
    </Routes>

  );
}


export default App;
