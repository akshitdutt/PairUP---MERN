import { useResolvedPath } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({user}) =>{
  const {firstName, lastName, age, gender, about, skills} = user;
  const dispatch = useDispatch();

  const reviewFeed = async (status, userId) => {
    try {
        await axios.post(
            `http://localhost:3000/request/send/${status}/${userId}`,
            {},
            { withCredentials: true }
        );

        dispatch(removeUserFromFeed(userId));
    } catch (err) {
        console.log(err);
    }
};

    return(
        <div className="card bg-base-200 w-96 shadow-sm">
  <figure>
    <img
      src={user.photoURL}
      alt="phpto" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName+ " "+ lastName}</h2>
    {age && gender && <p className="-mt-2.5">{age + ", " +gender}</p>}
    {about && <p>{about}</p>}
    <div className="card-actions justify-center my-3">
      <button className="btn bg-red-500 hover:bg-red-600 btn-primary " onClick={()=>reviewFeed("ignored", user._id)}>Ignore</button>
      <button className="btn btn-primary" onClick={()=>reviewFeed("interested", user._id)}>Connect</button>
    </div>
  </div>
</div>
    )
}

export default UserCard;