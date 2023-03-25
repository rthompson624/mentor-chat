import { Link } from 'react-router-dom';

function Mentors() {
  return (
    <div>
      <Link to={`/chat/${encodeURIComponent('Arnold Schwarzenegger')}`}>
        <div>Arnold Schwarzenegger</div>
      </Link>
      <div>Jordan Peterson</div>
      <div>Jerry Seinfeld</div>
      <div>Alan Alda</div>
      <div>Buddha</div>
    </div >
  );
}

export default Mentors
