import { useDispatch } from "react-redux";
import SignupPoster from "../assets/signup-poster.png";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";

const SignUp = () =>{

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signUp = async () =>{
        try{
        const res = await axios.post(`${BASE_URL}/signup`, {
            firstName, lastName, email, password
        }, {withCredentials:true});
        dispatch(addUser(res.data));
        navigate("/");
    }catch(err){
        setError(err?.response?.data || "Something Went Wrong");
        console.log(err);
    }}

    return (
        <div className="flex justify-center items-center min-h-screen bg-base-200">
    <div className="card card-side bg-base-100 w-[850px] shadow-2xl">
        <figure className="w-2/5">
            <img
                src={SignupPoster}
                alt="Signup"
                className="h-full w-full object-cover"
            />
        </figure>

        <div className="card-body w-3/5 flex justify-center items-center ">
            <h2 className="card-title text-3xl font-bold my-5">
                Create Account
            </h2>
                <input type="text" placeholder="First Name" value = {firstName} className="input input-ghost" 
                onChange={(e)=> setFirstName(e.target.value)}/>
                <input type="text" placeholder="Last Name" value={lastName} className="input input-ghost"
                onChange={(e)=>setLastName(e.target.value)} />
                <input type="text" placeholder="Email" value={email} className="input input-ghost" 
                onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} className="input input-ghost" 
                onChange={(e)=>setPassword(e.target.value)}/>

                <div className="card-actions justify-center">
      <button className="btn btn-primary my-10 " onClick={signUp} >Sign Up</button>
    </div>
            {/* Your form goes here */}
        </div>
    </div>
</div>
    )
}

export default SignUp;