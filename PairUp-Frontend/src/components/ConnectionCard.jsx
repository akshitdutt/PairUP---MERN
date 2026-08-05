import { useSelector } from "react-redux";
import dummyAvatar from "../assets/dummy-avatar.png"


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
</div>
                
                
            </div>
        </div>
    );
};

export default ConnectionCard;