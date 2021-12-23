import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import AdminLogin from '../src/admin/adminlogin';
import Dashboard from './Dasboard/Dashboard';
import LoginRoute from '../src/admin/loginRouters'
import ProtectedRoute from './admin/protectedRoute';


function App() {
  return (


    <Router>
      <Switch>
        <LoginRoute path="/login" component={AdminLogin} />
        <ProtectedRoute path="/" component={Dashboard} />


      </Switch>
    </Router>

  );
}






export default App;
