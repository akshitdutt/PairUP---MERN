import { useSelector } from "react-redux";
import dummyAvatar from "../assets/dummy-avatar.png"
import { Link } from "react-router-dom";


const ConnectionCard = ({ user }) => {
  console.log(user);
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

                <p>{user.age}, {user.gender}</p>

                <p className="line-clamp-3">
                    {user.about}
                </p>

                <div className="mt-2">
    <h3 className="font-semibold mb-2">Skills</h3>

    <div className="flex flex-wrap gap-2">
        {user.skills?.map((skill, index) => (
            <span
                key={index}
                className="badge badge-primary badge-outline"
            >
                {skill}
            </span>
        ))}
    </div>
    <div className="my-5 mx-60">
        <Link to={`/chat/${user._id}`}>
        <button className="btn bg-white text-black border-[#e5e5e5]">
  <svg aria-label="Email icon" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="black"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></g></svg>
  Message
</button>
        </Link>
    </div>
</div>
                
                
            </div>
        </div>
    );
};

export default ConnectionCard;