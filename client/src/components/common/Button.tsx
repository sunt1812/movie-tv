import React from 'react';

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'submit';
  clasName?: string;
}

const Button = ({ children, onClick, clasName, type }: Props) => {
  return (
    <button
      type={type}
      className={`btn-primary bg-primary hover:bg-primary-500 ${clasName}`}
      onClick={onClick ? () => onClick() : undefined}
    >
      {children}
    </button>
  );
};

export default Button;

export const ButtonLoadMore = ({ children, onClick, clasName }: Props) => {
  return (
    <button
      className={`w-full mx-auto my-8 py-[6px] text-primary hover:bg-primary-200 font-bold text-sm duration-200 uppercase ${clasName}`}
      onClick={onClick ? () => onClick() : undefined}
    >
      {children}
    </button>
  );
};
