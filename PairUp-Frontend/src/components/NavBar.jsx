import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { removeUser } from "../utils/userSlice";

const NavBar = () =>{
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Logout Functionality

  const LogoutUser = async () => {
    try{
    const res = await axios.post("http://localhost:3000/logout", {}, 
      {withCredentials: true});
      dispatch(removeUser());
      navigate("/login");
    }catch(err){
      console.log(err);
    }
  };


  const user = useSelector(store=>store.user);
  console.log(user);
    return (
        <div className="navbar bg-base-300 shadow-sm">
  <div className="navbar-start">
    {(user && <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/connections">Connections</Link></li>
        <li><a onClick={LogoutUser}>Log Out</a></li>
      </ul>
    </div>)}
  </div>
  <div className="navbar-center">
    <Link to="/" className="btn btn-ghost text-3xl font-bold">PairUP</Link>
  </div>
  {(user && <div className="navbar-end">
    <Link to="/requests" className="btn btn-ghost btn-circle">
      <div className="indicator">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /> </svg>
        <span className="badge badge-xs badge-primary indicator-item"></span>
      </div>
    </Link>
  </div>)}
</div>
    )
};

export default NavBar;