import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addUser } from "../utils/userSlice";

const EditProfile = () => {
  const user = useSelector((store) => store.user);
    const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    age: user.age,
    gender: user.gender,
    about: user.about,
    photoURL: user.photoURL,
    skills: Array.isArray(user.skills)
      ? user.skills.join(", ")
      : user.skills,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...formData,
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim()),
      };

      const res = await axios.patch(
        "http://localhost:3000/profile/edit",
        payload,
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(res.data));
      setShowToast(true);
      setTimeout(()=>{
        setShowToast(false);
        navigate("/profile");
      }, 2000);

    } catch (err) {
      console.log(err);
      alert("Unable to update profile.");
    }
  };

  return (
    <><div className="flex justify-center py-10 px-4 bg-base-200 min-h-full">
      <div className="card bg-base-100 shadow-2xl w-full max-w-3xl border border-base-300">
        <div className="card-body p-8">

          <h2 className="text-3xl font-bold text-center">
            Edit Profile
          </h2>

          <div className="flex justify-center my-6">
            <div className="avatar">
              <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
                <img
                  src={formData.photoURL}
                  alt="Profile"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">

            <div>
              <label className="label">
                <span className="label-text font-semibold">
                  First Name
                </span>
              </label>

              <input
                type="text"
                name="firstName"
                className="input input-bordered w-full"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-semibold">
                  Last Name
                </span>
              </label>

              <input
                type="text"
                name="lastName"
                className="input input-bordered w-full"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-semibold">
                  Age
                </span>
              </label>

              <input
                type="number"
                name="age"
                className="input input-bordered w-full"
                value={formData.age}
                onChange={handleChange}
              />
            </div>

                        <div>
            <label className="label">
                <span className="label-text font-semibold">
                Gender
                </span>
            </label>

            <select
                name="gender"
                className="select select-bordered w-full"
                value={formData.gender}
                onChange={handleChange}
            >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Others</option>
            </select>
            </div>
            
          </div>

          <div className="mt-5">
            <label className="label">
              <span className="label-text font-semibold">
                About
              </span>
            </label>

            <textarea
              name="about"
              className="textarea textarea-bordered w-full h-28 resize-none"
              value={formData.about}
              onChange={handleChange}
            />
          </div>

          <div className="mt-5">
            <label className="label">
              <span className="label-text font-semibold">
                Skills
              </span>
            </label>

            <input
              type="text"
              name="skills"
              className="input input-bordered w-full"
              value={formData.skills}
              onChange={handleChange}
            />
          </div>

          <div className="mt-5">
            <label className="label">
              <span className="label-text font-semibold">
                Photo URL
              </span>
            </label>

            <input
              type="text"
              name="photoURL"
              className="input input-bordered w-full"
              value={formData.photoURL}
              onChange={handleChange}
            />
          </div>

          <div className="card-actions justify-center mt-8">
            <button
              className="btn btn-primary w-48"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>

        </div>
      </div>
    </div>

   {showToast && <div className="toast toast-top toast-center">
  <div className="alert alert-success">
    <span>Profile Edited Successfully.</span>
  </div>
</div>}
    </>
  );
};

export default EditProfile;