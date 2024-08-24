import Header from './Header';
import QuizHeader from './QuizHeader';
import Question from './Question';
import StartScreen from './StartScreen';
import { useQuiz } from '../contexts/QuizContext';
import Footer from './Footer';
import FinishScreen from './FinishScreen';

function App() {
  const { status } = useQuiz();

  return (
    <div className="min-h-screen overflow-x-hidden bg-custom-gradient">
      <Header />
      {status === 'ready' && <StartScreen />}
      {status === 'active' && (
        <>
          <QuizHeader />
          <Question />
          <Footer />
        </>
      )}
      {status === 'finished' && <FinishScreen />}
    </div>
  );
}

export default App;
