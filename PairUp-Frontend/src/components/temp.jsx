import { useDispatch } from "react-redux";
import axios from "axios";
import {addfeed} from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";

const Feed = () =>{

const dispatch = useDispatch();
const feed = useSelector((store) => store.feed);


    const getFeed = async () =>{
        try{
            const res = await axios.get(`${BASE_URL}/feed`, 
                {withCredentials: true});
                dispatch(addfeed(res.data));
                console.log(res.data);
            }catch(err){
                 console.log(err);
    };}

    useEffect(()=>{
        getFeed();
    }, []);
    
    console.log("Feed:", feed);
    
    if (!feed || feed.length === 0) {
    return (
        <h1 className="text-center text-xl font-bold mt-50 opacity-50">
            No more users to show.
        </h1>
    );
}

return (
    <div className="flex items-center justify-center my-15">
        <UserCard user={feed[0]} />
    </div>
);
}

export default Feed;