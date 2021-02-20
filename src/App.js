import { BrowserRouter } from 'react-router-dom';
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
        <Grid />
        <PaginationRounded />
      </BrowserRouter>
    </div>
  );
}

export default App;
