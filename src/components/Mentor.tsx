import { Link } from "react-router-dom";
import { IMentor } from "../shared/interfaces";

interface IMentorProps {
  mentor: IMentor
}

function Mentor(props: IMentorProps) {
  const { mentor } = props;
  return (
    <Link to={`/chat/${encodeURIComponent(mentor.name)}`}>
      <div className="flex flex-row justify-left items-center w-80 border border-gray-200 rounded-lg shadow m-2">
        <img className="w-auto h-24 m-3 rounded-full shadow-lg" src={`/images/${mentor.imageUrl}`} alt={mentor.name} />
        <div>{mentor.name}</div>
      </div>
    </Link>
  );
}

export default Mentor;
