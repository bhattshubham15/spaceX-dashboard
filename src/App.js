import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Grid from './Components/Grid';
import Navbar from './Components/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Grid />
      </BrowserRouter>
    </div>
  );
}

export default App;
