import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const Login = () =>{

    const[email, setEmailId] = useState("");
    const[password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleLogin = async () =>{
        try{
        const res = await axios.post("http://localhost:3000/login", {
            email, password
        }, {withCredentials: true});
        dispatch(addUser(res.data));
        navigate("/");
    }catch(err){
        setError(err?.response?.data || "Something Went Wrong");
        console.log(err);
    }
    }

    return(
<div className="flex justify-center items-center min-h-screen">
<div className="card bg-base-300 w-96 shadow-sm">
  <div className="card-body">
    <h2 className="card-title flex justify-center">Login</h2>
    <fieldset className="fieldset">
  <label className="label" htmlFor="emailId">Email</label>
  <input type="email" id="emailID" className="input" value={email}
   placeholder="Enter Your Email." 
   onChange={(e) => setEmailId(e.target.value)}/>
</fieldset>
<fieldset className="fieldset">
  <label className="label" htmlFor="password">Password</label>
  <input type="password" id="password" className="input" value={password} placeholder="Enter Your Password." 
  onChange={(e) => setPassword(e.target.value)} />
</fieldset>
<p className="text-red-500">{error}</p>
    <div className="card-actions justify-center">
      <button className="btn btn-primary " onClick={handleLogin}>Login</button>
    </div>
    <div className="flex justify-center text-xs text-blue-500 hover:text-blue-700"><span><Link to="/signup">Don't have an account? Sign Up</Link></span></div>
  </div>
</div>
</div>
    )
};

export default Login;
