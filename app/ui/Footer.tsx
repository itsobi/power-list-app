import { FaLinkedinIn } from 'react-icons/fa6';
import { FaGlobe } from 'react-icons/fa6';
import { FaPaperPlane } from 'react-icons/fa';

export default function Footer() {
  return (
    <div className="flex flex-col justify-center items-center absolute bottom-0 left-0 w-full bg-blue-600 text-slate-200 space-y-4 p-4">
      <div className="flex space-x-6">
        <a
          href="https://www.justobii.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGlobe style={{ fontSize: '1.5em', cursor: 'pointer' }} />
        </a>
        <a
          href="https://www.linkedin.com/in/obialo/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedinIn style={{ fontSize: '1.5em', cursor: 'pointer' }} />
        </a>
        <a href="mailto:mail@obi.j.obialo@gmail.com">
          <FaPaperPlane style={{ fontSize: '1.5em', cursor: 'pointer' }} />
        </a>
      </div>
    </div>
  );
}
