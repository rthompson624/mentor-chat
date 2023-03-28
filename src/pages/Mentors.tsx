import Mentor from '../components/Mentor';
import { MENTORS } from '../shared/utils';

function Mentors() {
  const mentors = MENTORS.map(mentor => <Mentor mentor={mentor} key={mentor.name} />);

  return (
    <div className='flex flex-col justify-center items-center pb-2'>
      <div className='text-lg pt-2 font-bold'>Choose your guru</div>
      {mentors}
    </div >
  );
}

export default Mentors
