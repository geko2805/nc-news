import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <header>
        <Link to="/">
          <img style={{ width: 100 }} src="../../src/assets/logo.jpeg" />
        </Link>
        <div>
          <h1>NC News</h1>
          <p>Home to your latest news</p>
        </div>

        <nav>
          <Link to="/">Home</Link>

          <Link to="/articles">Articles</Link>
        </nav>
      </header>
    </>
  );
}

export default Header;
