import { Link, useLocation } from 'react-router-dom';
import { 
  FiHome, 
  FiPlus, 
  FiGrid, 
  FiLayers, 
  FiClock,
  FiFolder,
  FiEdit3,
  FiSearch
} from 'react-icons/fi';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="navbar-brand">
          <FiLayers size={28} />
          SmartSaver
        </Link>
        <ul className="navbar-links">
          <li>
            <Link to="/" className={isActive('/')}>
              <FiHome /> Home
            </Link>
          </li>
          <li>
            <Link to="/add" className={isActive('/add')}>
              <FiPlus /> Add
            </Link>
          </li>
          <li>
            <Link to="/search" className={isActive('/search')}>
              <FiSearch /> Search
            </Link>
          </li>
          <li>
            <Link to="/collections" className={isActive('/collections')}>
              <FiFolder /> Collections
            </Link>
          </li>
          <li>
            <Link to="/highlights" className={isActive('/highlights')}>
              <FiEdit3 /> Highlights
            </Link>
          </li>
          <li>
            <Link to="/knowledge-graph" className={isActive('/knowledge-graph')}>
              <FiGrid /> Graph
            </Link>
          </li>
          <li>
            <Link to="/clusters" className={isActive('/clusters')}>
              <FiLayers /> Clusters
            </Link>
          </li>
          <li>
            <Link to="/resurfaced" className={isActive('/resurfaced')}>
              <FiClock /> Resurfaced
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
