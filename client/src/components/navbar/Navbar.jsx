import { Link, useNavigate} from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import "./navbar.css";
const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      // const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGOUT" });
      navigate("/");
    } catch (err) {
      console.log(err.message)
    }
  };
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">GoingMerry</span>
        </Link>
        {user ? (
          <div className="profile">
            <span className="username">{user.username}</span>
            <button className="logoutbtn" onClick={handleClick}>
              Logout
            </button>
          </div>
        ) : (
          <div className="navItems">
              <button className="navButton">
                <Link className="navLogin" to="/register">Register</Link>
            </button>
              <button className="navButton">
                <Link className="navLogin" to ="/login">Login</Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
