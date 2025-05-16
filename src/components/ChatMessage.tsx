import { useQuery } from "@tanstack/react-query";
import { useChatStore } from "../store/chatStore";
import { supabase } from "../supabaseClient";

interface Message {
  id: number;
  content: string;
  user_id: string;
  email: string;
  created_at: string;
  room_id: number;
}

const fetchMessages = async (roomId: number): Promise <Message[]> => {
  const {data, error} = await supabase.from("messages").select("*").eq("room_id", roomId).order("created_at", {ascending:true});

  if(error) throw Error(error.message);
  
  return data as Message[];
}

const ChatMessage = () => {
  const {currentRoom, user} = useChatStore();

  const {data:messages, error, isLoading} = useQuery<Message[], Error>({
    queryKey: ["messages", currentRoom?.id ],
    queryFn: ()=> {
      if (!currentRoom || currentRoom.id===null) { 
        return Promise.resolve([]);
      }
      return fetchMessages(currentRoom.id);
    },
    enabled: currentRoom?.id!==null,
  })

  if(isLoading) return <p className="loader-text">Loading messages...</p>
  if(error) return <p className="loader-text">Error loading messages: {error.message}</p>

  console.log(messages)

  return (
   <div>
    {messages?.map((msg: Message, key)=> {
      const isOwnMessage = msg.user_id === user?.id;
      const itemClass = isOwnMessage? "right":"left";
      
      const date=new Date(msg.created_at)
      const hour= date.getHours().toString().padStart(2, "0");
      const minute=date.getMinutes().toString().padStart(2, "0");
      const formattedTime = `${hour}:${minute}`;
      
      return(
        <div key={key} className={`conv-message-item conv-message-item--${itemClass}`}>
          <div className="conv-message-value">{msg.content}</div>
          <div className="conv-message-details">{formattedTime}</div>
          <div className="conv-message-details">{msg.email}</div>
        </div>
      )
    })}
   
   </div>
  )
}

export default ChatMessage