import { useQuiz } from '../contexts/QuizContext';

export default function QuizHeader() {
  const { dispatch, index, numQuestions } = useQuiz();

  const isFirstQuestion = index === 0;
  console.log(isFirstQuestion);

  return (
    <div className="mt-8 flex items-center justify-around">
      <button
        className={`rounded-lg px-6 py-2 transition-colors duration-300 ${
          isFirstQuestion
            ? 'cursor-not-allowed bg-gray-300 opacity-50'
            : 'bg-blue-300 hover:bg-blue-400'
        }`}
        onClick={() => dispatch({ type: 'backQuestion' })}
        disabled={isFirstQuestion}
      >
        Back
      </button>
      <button
        className={`rounded-lg px-6 py-2 transition-colors duration-300 ${
          index === numQuestions - 1
            ? 'cursor-not-allowed bg-gray-300 opacity-50'
            : 'bg-blue-300 hover:bg-blue-400'
        }`}
        onClick={() => dispatch({ type: 'nextQuestion' })}
        disabled={index === numQuestions - 1}
      >
        Next
      </button>
    </div>
  );
}
