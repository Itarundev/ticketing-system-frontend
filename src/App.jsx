import './App.css';
import { ThemeProvider } from './Components/Navbar/StorageContext';
import Router from './Router/Router';


function App() {
 
  return (
<ThemeProvider>
    <div className="App">
      <Router/>
    </div>
    </ThemeProvider>
  );
}

export default App;
