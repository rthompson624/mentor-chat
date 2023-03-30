import Mentor from '../components/Mentor';
import Navbar from '../components/Navbar';
import { MENTORS } from '../shared/utils';

function Mentors() {
  const mentors = MENTORS.map(mentor => <Mentor mentor={mentor} key={mentor.name} />);

  return (
    <div className='md:w-5/6 max-w-2xl m-auto flex flex-col justify-start items-center h-screen pb-2 overflow-y-auto'>
      <Navbar showHomeLink={false} />
      {mentors}
    </div>
  );
}

export default Mentors;
