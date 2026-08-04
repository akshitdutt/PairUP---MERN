import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const ProfileView = () => {
  const user = useSelector((store) => store.user);
  
    const navigate = useNavigate();

    const handleEdit = () =>{
        navigate("/profile/edit");
    };

  return (
    <div className="flex justify-center py-10 px-4 bg-base-200 min-h-full">
      <div className="card bg-base-100 shadow-2xl w-full max-w-3xl border border-base-300">
        <div className="card-body p-8">

          <h2 className="text-3xl font-bold text-center">
            My Profile
          </h2>

          <div className="flex justify-center my-6">
            <div className="avatar">
              <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
                <img
                  src={user.photoURL}
                  alt="profile"
                />
              </div>
            </div>
          </div>

          {/* Two columns */}
          <div className="grid grid-cols-2 gap-5">

            <div>
              <label className="label">
                <span className="label-text font-semibold">
                  First Name
                </span>
              </label>

              <input
                className="input input-bordered w-full text-black"
                value={user.firstName}
                disabled
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-semibold">
                  Last Name
                </span>
              </label>

              <input
                className="input input-bordered w-full text-black"
                value={user.lastName}
                disabled
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-semibold">
                  Age
                </span>
              </label>

              <input
                className="input input-bordered w-full text-black"
                value={user.age}
                disabled
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-semibold">
                  Gender
                </span>
              </label>

              <input
                className="input input-bordered w-full text-black"
                value={user.gender}
                disabled
              />
            </div>

          </div>

          {/* About */}

          <div className="mt-5">
            <label className="label">
              <span className="label-text font-semibold">
                About
              </span>
            </label>

            <textarea
              className="textarea textarea-bordered w-full h-28 resize-none text-black"
              value={user.about}
              disabled
            />
          </div>

          {/* Skills */}

          <div className="mt-5">
            <label className="label">
              <span className="label-text font-semibold">
                Skills
              </span>
            </label>

            <input
              className="input input-bordered w-full text-black"
              value={Array.isArray(user.skills)
                ? user.skills.join(", ")
                : user.skills}
              disabled
            />
          </div>

          <div className="card-actions justify-center mt-8">
            <button className="btn btn-primary w-48" onClick={handleEdit}>
              Edit Profile
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfileView;