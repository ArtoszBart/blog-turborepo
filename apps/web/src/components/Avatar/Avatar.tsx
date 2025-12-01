import Image from 'next/image';
import { FaUser } from 'react-icons/fa6';
import './avatar.scss';

interface IProps {
  avatarUrl: string | null;
  onClick?: () => void;
}

export default function Avatar({ avatarUrl, onClick }: IProps) {
  return (
    <div className='avatar' onClick={onClick}>
      {avatarUrl ? (
        <Image src={avatarUrl} alt='User Avatar' fill />
      ) : (
        <FaUser />
      )}
    </div>
  );
}
