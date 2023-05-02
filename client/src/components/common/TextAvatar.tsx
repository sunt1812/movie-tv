import React, { ReactNode } from 'react';
interface IProps {
  text: string;
}
const TextAvatar = ({ text }: IProps) => {
  const stringToColor = (str: string) => {
    if (!str) return;
    let hash = 0;
    let i;
    const length = str.length as number;
    for (i = 0; i < length; i += 1) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  };
  return (
    <div
      className="w-10 h-10 rounded-full flex justify-center items-center capitalize"
      style={{ backgroundColor: stringToColor(text) }}
    >
      {text?.split(' ')[0][0]}
    </div>
  );
};

export default TextAvatar;
