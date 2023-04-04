import Mentor from '../components/Mentor';
import Navbar from '../components/Navbar';
import { MENTORS } from '../shared/utils';

function Mentors() {
  const mentors = MENTORS.map(mentor => <Mentor mentor={mentor} key={mentor.name} />);

  return (
    <div className='md:w-5/6 max-w-5xl m-auto flex flex-col justify-start items-center h-full'>
      <Navbar showHomeLink={false} />
      <div className="overflow-y-auto pb-2">
        {mentors}
      </div>
    </div>
  );
}

export default Mentors;
