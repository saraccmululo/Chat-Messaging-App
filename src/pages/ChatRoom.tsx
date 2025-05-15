import ChatMessage from "../components/ChatMessage";
import ChatMessageForm from "../components/ChatMessageForm";
import { useChatStore } from "../store/chatStore"

const ChatRoom = () => {
  const {user, currentRoom} = useChatStore(); 

  if(!currentRoom) {
    return <p> Please join or create a room first.</p>
  }

  return (
    <div className="conv">
      <div className="conv-title">{currentRoom.name} - {user?.email}</div>
      <div className="conv-timeline">
        <ChatMessage/>
      </div>
      <div className="conv-send-message">
        <ChatMessageForm />
      </div>
    </div>
  )
}

export default ChatRoom