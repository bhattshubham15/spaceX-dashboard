import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Filters from './Components/Filters';
import Grid from './Components/Grid';
import Navbar from './Components/Navbar';
import PaginationRounded from './Components/Pagination';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Filters />
        <Switch>
          <Route exact path="/" component={Grid} />
        </Switch>
        <PaginationRounded />
      </BrowserRouter>
    </div>
  );
}

export default App;
