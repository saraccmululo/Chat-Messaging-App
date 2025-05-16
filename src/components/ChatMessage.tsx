import { useQuery } from "@tanstack/react-query";
import { useChatStore } from "../store/chatStore";

interface Message {
  id: number;
  content: string;
  user_id: string;
  email: string;
  created_at: string;
  room_id: number;
}

const fetchMessages = async (roomId: number): Promise <Message[]> => {
  return []
}

const ChatMessage = () => {
  const {currentRoom} = useChatStore();
  
  const {} = useQuery<Message[], Error>({
    queryKey: ["messages", currentRoom?.id ],
    queryFn: ()=> {
      if (!currentRoom || currentRoom.id===null) { 
        return Promise.resolve([]);
      }
      return fetchMessages(currentRoom.id)
    }
  })

  return (
    <div>
      Chat Message
    </div>
  )
}

export default ChatMessage