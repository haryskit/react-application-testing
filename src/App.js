import { Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home'; // Ensure correct paths
import Contact from './pages/Contact';
import Movies from './pages/Movies';
import MoviePage from './pages/MoviePage';
import About from './pages/About';
import Games from './pages/Games';

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
          <Route path="/contact" element={<Contact />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movie/:movieId" element={<MoviePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/games" element={<Games />} />
        </Routes>
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}

export default App;
