import { Route, Routes } from "react-router"
import CreateRoom from "../pages/CreateRoom"
import ChatRoom from "../pages/ChatRoom"
import RoomList from "../pages/RoomList"
import NavBar from "./NavBar"

const Dashboard = () => {
  return (
    <section className='chat-app' style={{color: "white"}}>
      <NavBar/>
      <Routes>
      <Route path="/" element ={<ChatRoom/>}/> 
      <Route path="/rooms" element ={<RoomList/>}/> 
      <Route path="/create-room" element ={<CreateRoom/>}/> 
      </Routes>
    </section>
  )
}

export default Dashboard