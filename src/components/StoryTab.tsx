import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ReactConfetti from 'react-confetti';
import storiesData from '../data/stories.json';

const StoryContainer = styled.div`
  background-color: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 1rem;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  user-select: none;
  
  @media (max-width: 768px) {
    padding: 1rem;
    margin: 0.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.8rem;
    margin: 0.3rem;
  }
`;

const StoryTitle = styled.h2`
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 0.8rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.3rem;
    margin-bottom: 0.6rem;
  }
`;

const CharacterName = styled.span`
  display: block;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  @media (max-width: 768px) {
    margin-bottom: 0.4rem;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 0.3rem;
  }
`;

const StoryText = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  color: #34495e;
  margin-bottom: 1.5rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  white-space: pre-line;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    line-height: 1.5;
    margin-bottom: 1.2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
    line-height: 1.4;
    margin-bottom: 1rem;
  }
`;

const QuestionContainer = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 10px;
  -webkit-tap-highlight-color: transparent;
  
  @media (max-width: 768px) {
    margin-top: 1.2rem;
    padding: 0.8rem;
  }
  
  @media (max-width: 480px) {
    margin-top: 1rem;
    padding: 0.6rem;
  }
`;

const QuestionText = styled.h3`
  font-size: 1.3rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 0.8rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 0.6rem;
  }
`;

const OptionButton = styled.button<{ isSelected?: boolean }>`
  display: block;
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 0.8rem;
  background-color: ${props => props.isSelected ? '#3498db' : '#ecf0f1'};
  color: ${props => props.isSelected ? 'white' : '#2c3e50'};
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  user-select: none;
  
  &:hover {
    background-color: ${props => props.isSelected ? '#2980b9' : '#d6dbdf'};
  }
  
  &:active {
    transform: scale(0.98);
  }
  
  @media (max-width: 768px) {
    padding: 0.7rem;
    font-size: 1rem;
    margin-bottom: 0.6rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.6rem;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }
`;

const Feedback = styled.div<{ isCorrect?: boolean }>`
  margin-top: 1rem;
  padding: 0.8rem;
  background-color: ${props => props.isCorrect ? '#d4edda' : '#f8d7da'};
  color: ${props => props.isCorrect ? '#155724' : '#721c24'};
  border-radius: 8px;
  font-size: 1.1rem;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  @media (max-width: 768px) {
    margin-top: 0.8rem;
    padding: 0.7rem;
    font-size: 1rem;
  }
  
  @media (max-width: 480px) {
    margin-top: 0.6rem;
    padding: 0.6rem;
    font-size: 0.9rem;
  }
`;

const NextButton = styled.button`
  display: block;
  width: 100%;
  padding: 0.8rem;
  margin-top: 1rem;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  user-select: none;
  
  &:hover {
    background-color: #27ae60;
  }
  
  &:active {
    transform: scale(0.98);
  }
  
  @media (max-width: 768px) {
    padding: 0.7rem;
    font-size: 1rem;
    margin-top: 0.8rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.6rem;
    font-size: 0.9rem;
    margin-top: 0.6rem;
  }
`;

const ScoreContainer = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
  position: relative;
  z-index: 1000;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ScoreTitle = styled.h2`
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const ScoreText = styled.p`
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ScorePercentage = styled.p`
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const RestartButton = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    padding: 0.7rem 1.2rem;
    font-size: 0.9rem;
  }

  &:hover {
    background-color: #1a252f;
    transform: translateY(-2px);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ModalTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const ModalText = styled.p`
  color: #34495e;
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

const ModalButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #2980b9;
  }
`;

const CelebrationContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 999;
  overflow: hidden;
`;

interface Story {
  title: string;
  textFile: string;
  questions: {
    question: string;
    options: string[];
    correctAnswer: string;
  }[];
}

const StoryTab: React.FC = () => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [storyText, setStoryText] = useState<string>('');
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const questionContainerRef = useRef<HTMLDivElement>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const currentStory = storiesData.stories[currentStoryIndex];
  const currentQuestion = currentStory.questions[currentQuestionIndex];

  useEffect(() => {
    const loadStoryText = async () => {
      try {
        const response = await fetch(process.env.PUBLIC_URL + '/data/story.txt');
        const text = await response.text();
        setStoryText(text);
      } catch (error) {
        console.error('Error loading story text:', error);
      }
    };

    loadStoryText();
  }, [currentStoryIndex]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToQuestion = () => {
    if (questionContainerRef.current) {
      questionContainerRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleAnswerSelect = (answer: string) => {
    if (!showAnswer) {
      setSelectedAnswer(answer);
      setShowAnswer(true);
      if (answer === currentQuestion.correctAnswer) {
        setScore(prevScore => prevScore + 1);
      }
      setTimeout(scrollToQuestion, 300);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowAnswer(false);
    if (currentQuestionIndex === currentStory.questions.length - 1) {
      setIsQuizComplete(true);
      const percentage = Math.round((score / currentStory.questions.length) * 100);
      if (percentage >= 90) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      } else {
        setShowSuggestion(true);
      }
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimeout(scrollToQuestion, 100);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setScore(0);
    setIsQuizComplete(false);
    setShowConfetti(false);
    setShowSuggestion(false);
  };

  const handleCloseSuggestion = () => {
    setShowSuggestion(false);
  };

  const formatStoryText = (text: string) => {
    return text.split('\n').map((line, index) => {
      if (line.startsWith('Ori:')) {
        return (
          <React.Fragment key={index}>
            <CharacterName>Ori:</CharacterName>
            <span>{line.substring(4).trim()}</span>
          </React.Fragment>
        );
      } else if (line.startsWith('Ariel:')) {
        return (
          <React.Fragment key={index}>
            <CharacterName>Ariel:</CharacterName>
            <span>{line.substring(6).trim()}</span>
          </React.Fragment>
        );
      }
      return <span key={index}>{line}</span>;
    });
  };

  if (isQuizComplete) {
    const percentage = Math.round((score / currentStory.questions.length) * 100);
    const isHighScore = percentage >= 90;

    return (
      <StoryContainer>
        {showConfetti && (
          <CelebrationContainer>
            <ReactConfetti
              width={windowSize.width}
              height={windowSize.height}
              recycle={false}
              numberOfPieces={500}
              gravity={0.3}
              colors={['#FFD700', '#FFA500', '#FF69B4', '#00CED1', '#9370DB']}
              confettiSource={{
                x: windowSize.width / 2,
                y: windowSize.height / 2,
                w: 0,
                h: 0
              }}
            />
          </CelebrationContainer>
        )}
        <ScoreContainer>
          <ScoreTitle>Quiz Complete!</ScoreTitle>
          <ScoreText>
            You got {score} out of {currentStory.questions.length} questions correct
          </ScoreText>
          <ScorePercentage>
            {percentage}%
          </ScorePercentage>
          {isHighScore && (
            <ScoreText style={{ color: '#27ae60', fontWeight: 'bold' }}>
              Excellent! 🎉
            </ScoreText>
          )}
          <RestartButton onClick={handleRestartQuiz}>
            Take Quiz Again
          </RestartButton>
        </ScoreContainer>

        {showSuggestion && (
          <ModalOverlay>
            <ModalContent>
              <ModalTitle>Keep Practicing!</ModalTitle>
              <ModalText>
                Your score is below 90%. Consider reviewing the words in the Words tab before trying the quiz again.
              </ModalText>
              <ModalButton onClick={handleCloseSuggestion}>
                Close
              </ModalButton>
            </ModalContent>
          </ModalOverlay>
        )}
      </StoryContainer>
    );
  }

  return (
    <StoryContainer>
      <StoryTitle>{currentStory.title}</StoryTitle>
      <StoryText>
        {storyText && formatStoryText(storyText)}
      </StoryText>
      <QuestionContainer ref={questionContainerRef}>
        <QuestionText>{currentQuestion.question}</QuestionText>
        {currentQuestion.options.map((option, index) => (
          <OptionButton
            key={index}
            isSelected={selectedAnswer === option}
            onClick={() => handleAnswerSelect(option)}
          >
            {option}
          </OptionButton>
        ))}
        {showAnswer && (
          <Feedback isCorrect={selectedAnswer === currentQuestion.correctAnswer}>
            {selectedAnswer === currentQuestion.correctAnswer
              ? "Correct! Well done!"
              : `Incorrect. The correct answer is: ${currentQuestion.correctAnswer}`}
          </Feedback>
        )}
      </QuestionContainer>
      {showAnswer && (
        <NextButton onClick={handleNextQuestion}>
          {currentQuestionIndex === currentStory.questions.length - 1 ? "Finish Quiz" : "Next Question"}
        </NextButton>
      )}
    </StoryContainer>
  );
};

export default StoryTab; 