import React from 'react';
interface IProps {
  text: string;
  children: React.ReactNode;
  clasName?: string;
}
const Heading = ({ text, children, clasName }: IProps) => {
  return (
    <div className={clasName ? clasName : 'mt-[5rem]'}>
      <div className="text-2xl text-white dark:text-black uppercase font-bold relative mb-8">
        {text}
        <div className="absolute left-0 w-[100px] h-[5px] -bottom-1 bg-primary"></div>
      </div>
      {children}
    </div>
  );
};

export default Heading;
