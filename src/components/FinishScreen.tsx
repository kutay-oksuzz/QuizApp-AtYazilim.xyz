import { useQuiz } from '../contexts/QuizContext';

function FinishScreen() {
  const { points, maxPossiblePoints, dispatch } = useQuiz();
  const percentage = Math.round((points / maxPossiblePoints) * 100);

  return (
    <div className="-mt-40 flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-center text-4xl font-bold text-[#5D5C61]">
        Congratulations! You finished the Quiz 🎉
      </h1>
      <p className="mt-8 text-center text-2xl">
        Your Score: <span className="font-bold">{points}</span> out of{' '}
        <span className="font-bold">{maxPossiblePoints}</span> ({percentage}%)
      </p>
      <p className="mt-6 text-center text-lg text-gray-500">
        {percentage >= 80
          ? "Amazing job! You're a quiz master! 🏆"
          : percentage >= 50
            ? 'Well done! Keep practicing to improve even more! 👍'
            : "Don't worry, practice makes perfect! Try again! 💪"}
      </p>
      <div className="mt-10">
        <button
          className="transform rounded-lg bg-gray-300 px-6 py-3 text-gray-800 shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-gray-400"
          onClick={() => dispatch({ type: 'restart' })}
        >
          Play Again
        </button>
      </div>
    </div>
  );
}

export default FinishScreen;
