import { BrowserRouter as Router,Route, Switch } from "react-router-dom";
import './App.css';
import Home from './pages/home/Home.js';
function App() {
  return (
    <Router
    > 
    <Switch> <Route exact path="/" component={Home} /> </Switch>
     </Router>
  );
}

export default App;
