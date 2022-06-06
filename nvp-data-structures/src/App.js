import './App.css';
import { HashRouter } from 'react-router-dom';
import routes from './routes'
import Auth from './Components/Auth/Auth'
import Header from './Components/Header/Header';

function App() {
  return (
    <HashRouter>
    <div className="App">
      <Header/>
      {routes}
    </div>
    </HashRouter>
  );
}

export default App;
