import { useQuiz } from '../contexts/QuizContext';

export default function StartScreen() {
  const { dispatch } = useQuiz();

  return (
    <main className="mt-32 flex min-h-[100vdh] items-center justify-between gap-32 px-64">
      <div className="w-3/5">
        <h1 className="mb-4 text-8xl font-medium">
          Elit sed exercitation tepcom
        </h1>
        <p className="mb-6 mt-[45px] text-lg text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat...
        </p>
        <div className="mt-10 flex space-x-4">
          <button
            className="transform rounded-full bg-[#60A5FA] px-6 py-2 text-white shadow-md transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_0_15px_5px_rgba(96,165,250,0.6)]"
            onClick={() => dispatch({ type: 'start' })}
            style={{ transformOrigin: 'center', willChange: 'transform' }}
          >
            Get started ➜
          </button>
        </div>
      </div>
      <div className="flex w-3/5 justify-center space-x-4">
        <div className="h-40 w-40 translate-y-28 transform rounded-full bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200"></div>
        <div className="h-40 w-40 -translate-y-4 transform rounded-full bg-gradient-to-r from-green-200 via-teal-200 to-blue-200"></div>
        <div className="h-40 w-40 translate-y-14 transform rounded-full bg-gradient-to-r from-yellow-200 via-orange-200 to-pink-200"></div>
        <div className="h-40 w-40 -translate-y-16 transform rounded-full bg-gradient-to-r from-red-200 via-pink-200 to-purple-200"></div>
      </div>
    </main>
  );
}
