import { useDispatch, useSelector } from "react-redux";
import RequestCard from "./RequestCard";
import { addRequest } from "../utils/requestSlice";
import { useEffect } from "react";
import axios from "axios";

const Requests = () =>{
     
    const dispatch = useDispatch();
    const requests = useSelector((Store)=>Store.request);

    const getRequests = async () => {
    try {
        const res = await axios.get(
            "http://localhost:3000/user/requests/received",
            { withCredentials: true }
        );

        console.log("API Response:", res.data);
        dispatch(addRequest(res.data.data));
    } catch (err) {
        console.log(err);
    }
};

    useEffect(() =>{
        getRequests();
    }, []);

    console.log(requests);


    if(!requests || requests.length === 0){
        return (
            <h1 className="text-center opacity-50 text-xl font-bold mt-50">
            No Pending Requests.
        </h1>
        )
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
    <h1 className="text-2xl font-bold text-center mb-8">
        Requests
    </h1>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((request) => (
            <RequestCard
                key={request._id}
                request={request}
            />
        ))}
    </div>
</div>
    )
}

export default Requests;