import { Link } from "react-router-dom";
function Nav() {
  return (
    <nav className="nav nav-pills mb-2">
      <Link to="/Labs/a3" className="nav-link">
        A3
      </Link>

      <Link to="/Labs/a4" className="nav-link">
        A4
      </Link>

      <Link to="/Labs/a5" className="nav-link">
        A5
      </Link>

      <Link to="/Kanbas" className="nav-link">
        Kanbas
      </Link>

      <Link to="/hello" className="nav-link">
        Hello
      </Link>
    </nav>
  );
}

export default Nav;
