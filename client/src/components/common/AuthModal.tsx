import { ReactNode } from 'react';
import { setOpenModal } from '../../redux/features/authModalSlice';
import { useAppDispatch } from '../../redux/hooks';

interface IProps {
  children: ReactNode;
}
const AuthModal = ({ children }: IProps) => {
  const dispatch = useAppDispatch();
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-[9991]">
      <div
        className="absolute w-full h-full bg-black-100 z-[9992]"
        onClick={() => dispatch(setOpenModal(false))}
      ></div>
      {children}
    </div>
  );
};

export default AuthModal;
