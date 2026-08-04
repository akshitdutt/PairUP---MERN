import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar"
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Body = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchUser = async () =>{
        try{
            const res = await axios.get(`${BASE_URL}/view`,
                {withCredentials: true} );
                dispatch(addUser(res.data));
        }catch(err){
           navigate("/login");
           console.error(err);
        };
    };

//use useEffect() here, allows a function to load first thing after reloading a page. 
useEffect(()=>{
    fetchUser();
}, []);

    return(
        <>
        <NavBar />
        <Outlet />
        </>
    )
}

export default Body;