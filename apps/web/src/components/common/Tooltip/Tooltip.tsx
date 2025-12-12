import { PropsWithChildren } from 'react';
import './tooltip.scss';

interface IProps extends PropsWithChildren {
  text: string;
}

export default function Tooltip({ children, text }: IProps) {
  return (
    <div className='tooltip'>
      {children}
      <div className='tooltip_popover'>{text}</div>
    </div>
  );
}
