import { Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Games from './pages/Sections/Games';

// Layout Components
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

function App() {
  return (
    <div>
      {/* Header Component */}
      <Header />
      
      {/* Main Application Routes */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}

export default App;
