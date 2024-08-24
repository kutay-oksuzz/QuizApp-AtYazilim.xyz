import { useEffect, useState } from 'react';
import { useQuiz } from '../contexts/QuizContext';

export default function Footer() {
  const { secondsRemaining, dispatch, status, index, numQuestions } = useQuiz();
  const [timeLeft, setTimeLeft] = useState(secondsRemaining || 0);

  useEffect(() => {
    if (status !== 'active') return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if ((prevTime ?? 0) <= 1) {
          clearInterval(timer);
          dispatch({ type: 'finish' });
          return 0;
        }
        return (prevTime ?? 0) - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [status, dispatch]);

  return (
    <div className="flex items-center justify-around">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(255,255,255,0.2)] text-xl font-semibold text-[#1E1E1E] shadow-[inset_0_0_5px_rgba(0,0,0,0.1),_0_2px_5px_rgba(0,0,0,0.2)] shadow-inner backdrop-blur-lg">
        {`${Math.floor((timeLeft ?? 0) / 60)}:${String((timeLeft ?? 0) % 60).padStart(2, '0')}`}
      </div>

      {index === numQuestions - 1 && (
        <button
          className="rounded-full bg-blue-500 px-6 py-2 text-white shadow-md transition-all duration-300 hover:bg-blue-600"
          onClick={() => dispatch({ type: 'finish' })}
        >
          Finish
        </button>
      )}
    </div>
  );
}
