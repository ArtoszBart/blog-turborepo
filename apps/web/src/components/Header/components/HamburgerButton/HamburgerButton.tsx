import { memo } from 'react';
import './hamburger.scss';

interface IProps {
  isOpened: boolean;
  onClick: () => void;
}

function HamburgerButton({ isOpened, onClick }: IProps) {
  return (
    <div className='menu-btn' onClick={onClick}>
      <span className={'menu-btn-icon' + (isOpened ? ' opened' : '')}></span>
    </div>
  );
}

export default memo(HamburgerButton);
