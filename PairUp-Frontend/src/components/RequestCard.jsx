import { useDispatch, useSelector } from "react-redux";
import { removeRequest } from "../utils/requestSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import dummyAvatar from "../assets/dummy-avatar.png"

const RequestCard = ({request}) =>{
console.log(request);
const user = request.fromUserID;
const dispatch = useDispatch();

    //API call through axios to accept and reject the Connection Request
    const reviewRequest = async (status, requestID) =>{
        try{
            const res = await axios.post(`${BASE_URL}/request/review/${status}/${requestID}`, {}, 
            {withCredentials: true});
            dispatch(removeRequest(requestID));
    }catch(err){
        console.log(err);
    }
}


    return (
        <div className="card bg-base-200 shadow-xl">
            <figure className="h-60">
                <img
                    src={user.photoURL || dummyAvatar}
                    alt={user.firstName}
                    className="w-full h-full object-cover object-[50%_20%]"
                />
            </figure>

            <div className="card-body">
                <h2 className="card-title">
                    {user.firstName} {user.lastName}
                </h2>
                <div className="card-actions justify-end mt-4 ">

                    <p className="-my-5">{user.age}, {user.gender}</p>
        

        <button className="btn btn-error hover:scale-105" onClick={()=>reviewRequest("rejected", request._id)}>
            Reject
        </button>
        <button className="btn btn-success hover:scale-105" onClick={()=>reviewRequest("accepted", request._id)}>
            Accept
        </button>
    </div>
                </div>
            </div>
    );
}

export default RequestCard;