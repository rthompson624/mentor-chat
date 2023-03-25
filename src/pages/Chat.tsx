import { useParams } from "react-router-dom"

function Chat() {
  const { mentor } = useParams();

  return (
    <div>Chat with {mentor}</div>
  );
}

export default Chat
