import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PeopleComponent from './components/People';
import PlanetsComponent from './components/PlantesComponent';
import FilmsComponent from './components/FilmsComponent';
import StarshipsComponent from './components/StarshipsComponent';
import VehiclesComponent from './components/VehiclesComponent';


const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
         
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
              <button 
                className="navbar-toggler ml-1"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-2">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">People</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/planets">Planets</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/films">Films</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/vehicles">Vehicles</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/starships">Starships</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
        <main className="container my-4">
          <Routes>
            <Route path="/" element={<PeopleComponent />} />
            <Route path="/planets" element={<PlanetsComponent />} />
            <Route path="/films" element={<FilmsComponent />} />
            <Route path="/vehicles" element={<VehiclesComponent />} />
            <Route path="/starships" element={<StarshipsComponent />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};
 

export default App;
