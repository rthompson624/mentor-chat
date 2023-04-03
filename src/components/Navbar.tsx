import { FaBackward } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface INavbarProps {
  showHomeLink: boolean;
}

function Navbar(props: INavbarProps) {
  return (
    <div className='w-full flex flex-row justify-between border-b-2 sticky top-0 bg-sky-500 text-white text-center py-2'>
      <div className='w-10 pl-3'>
        {props.showHomeLink &&
          <Link to='/'>
            <FaBackward className='text-3xl cursor-pointer' />
          </Link>
        }
      </div>
      <div className='text-2xl font-bold font-mono'><Link to='/'>Guru Chat</Link></div>
      <div className='w-10'>
      </div>
    </div>
  );
}

export default Navbar;
