import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <header>
        <Link to="/">
          <h1>LOGO</h1>
        </Link>
        <nav>
          <Link to="/">Home</Link>

          <Link to="/articles">Articles</Link>
        </nav>
      </header>
    </>
  );
}

export default Header;
