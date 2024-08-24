import React from 'react';
import { useQuiz } from '../contexts/QuizContext';

interface OptionsProps {
  children: React.ReactNode;
  index: string;
}

const Options: React.FC<OptionsProps> = ({ children, index }) => {
  const { dispatch, answer } = useQuiz();

  return (
    <button
      className={`w-full rounded-lg p-6 font-sans text-black shadow-md transition-colors duration-300 hover:bg-blue-100 ${index === answer ? 'bg-red-400' : 'bg-white'}`}
      onClick={() => dispatch({ type: 'newAnswer', payload: index })}
    >
      {children}
    </button>
  );
};

export default Options;
