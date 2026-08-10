import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Body from "./components/Body";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import EditProfile from "./components/EditProfile";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import SignUp from "./components/SignUp";
import Chat from "./components/Chat";

function App() {
  return (
    <>
    <Routes>
  <Route path="/" element={<Body />}>
    <Route index element={<Feed />} />
    <Route path="login" element={<Login />} />
    <Route path="profile" element={<Profile />} />
    <Route path="profile/edit" element={<EditProfile/>} />
    <Route path="connections" element={<Connections/>} />
    <Route path="requests" element={<Requests/>} />
    <Route path="signup" element={<SignUp/>} />
    <Route path="chat/:targetID" element={<Chat/>}/>
  </Route>
</Routes>
    </>
  )
}

export default App
