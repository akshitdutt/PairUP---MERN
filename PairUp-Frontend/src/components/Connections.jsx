import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { useEffect } from "react";
import ConnectionCard from "./ConnectionCard";
import { BASE_URL } from "../utils/constants";

const Connections = () =>{
    const dispatch = useDispatch(); 
    const connections = useSelector((store)=>store.connection);
    const getConnections = async () =>{
        const res = await axios.get(`${BASE_URL}/user/connections`, 
            {withCredentials: true});
            dispatch(addConnection(res.data.data));
    }

    useEffect(()=>{
        getConnections();
    }, []);

    if(!connections || connections.length===0){
        return (
            <h1 className="text-center opacity-50 text-xl font-bold mt-50">
            No Connections! Make New Friends.
        </h1>
        )
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
    <h1 className="text-3xl font-bold text-center mb-8">
        Connections
    </h1>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {connections.map((connection) => (
            <ConnectionCard
                key={connection._id}
                user={connection}
            />
        ))}
    </div>
</div>
    )
}

export default Connections;