
import './App.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Landing from './components/layout/Landing'
import {Route,Switch,BrowserRouter as Router} from "react-router-dom"
import Navbar from './components/layout/Navbar';
function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route path='/' exact component={Landing}/>
        <Route path='/register' component={Register}/>
        <Route path='/login' component={Login}/>
      </Switch>
    </Router>
  );
}

export default App;
