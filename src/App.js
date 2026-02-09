import './App.css';

import { Header, Footer } from './components';
import { AllRoutes } from './routes/AllRoutes';
function App() {
  return (
    <div className="App bg-gray-100 dark:bg-gray-800 min-h-screen">
      <Header />
      <AllRoutes />
      <Footer />
    </div >
  );
}

export default App;
