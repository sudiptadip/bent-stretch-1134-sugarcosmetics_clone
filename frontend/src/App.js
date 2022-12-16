import './App.css';
import NavigationMain from './components/Navbar/NavigationMain';

import MainRoute from './Routes/MainRoute';

function App() {
  return (
    <div className="App">
      <NavigationMain />
      <MainRoute/>
      
    </div>
  );
}

export default App;
