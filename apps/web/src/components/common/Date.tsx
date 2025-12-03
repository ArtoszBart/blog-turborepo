'use client';

import { useEffect, useState } from 'react';

interface IProps {
  date: Date;
  className?: string;
}

export default function Date({ date, className }: IProps) {
  const [displayDate, setdisplayDate] = useState<string>('');

  useEffect(() => {
    setdisplayDate(date.toLocaleDateString());
  }, [date]);

  return <span className={className}>{displayDate}</span>;
}
