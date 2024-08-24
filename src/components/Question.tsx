import { useQuiz } from '../contexts/QuizContext';
import Options from './Options';

export default function Question() {
  const { questions, index } = useQuiz();
  const question = questions[index];

  return (
    <div className="mt-4 flex min-h-[60vh] flex-col items-center justify-center px-8">
      <div className="w-full max-w-3xl text-center">
        <h2 className="mb-8 text-6xl font-bold">{question.question}</h2>

        <div className="mt-12 flex flex-wrap justify-between gap-8">
          {question.options.map((option, i) => (
            <div key={i} className="w-full space-y-4 md:w-[46%]">
              <Options children={option} key={i} index={String(i)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
