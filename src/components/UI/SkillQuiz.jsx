// src/components/UI/SkillQuiz.jsx
import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Clock, CheckCircle, XCircle, RotateCcw, Award, BookOpen } from 'lucide-react';
import { skillQuizzes, calculateSkillLevel } from '../../data/quizData.js';

const SkillQuiz = ({ isOpen, onClose, quizType = 'programming' }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const quiz = skillQuizzes[quizType];
  const questions = quiz?.questions || [];

  // Load saved progress
  useEffect(() => {
    if (isOpen && quizType) {
      const savedProgress = localStorage.getItem(`quiz_${quizType}_progress`);
      if (savedProgress) {
        try {
          const progress = JSON.parse(savedProgress);
          setCurrentQuestion(progress.currentQuestion || 0);
          setSelectedAnswers(progress.selectedAnswers || {});
          setTimeLeft(progress.timeLeft || 300);
          setQuizStarted(progress.quizStarted || false);
          setQuizCompleted(progress.quizCompleted || false);
          setShowResults(progress.showResults || false);
        } catch (error) {
          console.error('Error loading quiz progress:', error);
        }
      }
    }
  }, [isOpen, quizType]);

  // Save progress
  useEffect(() => {
    if (isOpen && quizStarted && !showResults) {
      const progress = {
        currentQuestion,
        selectedAnswers,
        timeLeft,
        quizStarted,
        quizCompleted,
        showResults,
        timestamp: Date.now()
      };
      localStorage.setItem(`quiz_${quizType}_progress`, JSON.stringify(progress));
    }
  }, [currentQuestion, selectedAnswers, timeLeft, quizStarted, quizCompleted, showResults, isOpen, quizType]);

  // Timer
  useEffect(() => {
    if (quizStarted && !quizCompleted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [quizStarted, quizCompleted, timeLeft]);

  const handleTimeUp = () => {
    setQuizCompleted(true);
    setShowResults(true);
    saveQuizResults();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setTimeLeft(300);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setQuizCompleted(false);
    setShowResults(false);
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const goToNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const finishQuiz = () => {
    setQuizCompleted(true);
    setShowResults(true);
    saveQuizResults();
  };

  const saveQuizResults = () => {
    const results = calculateResults();
    const resultData = {
      quizType,
      score: results.score,
      percentage: results.percentage,
      skillLevel: results.skillLevel,
      correctAnswers: results.correctAnswers,
      totalQuestions: questions.length,
      timeSpent: 300 - timeLeft,
      completedAt: new Date().toISOString(),
      answers: selectedAnswers
    };

    // Save to user's quiz history
    const quizHistory = JSON.parse(localStorage.getItem('quizHistory') || '[]');
    quizHistory.push(resultData);
    localStorage.setItem('quizHistory', JSON.stringify(quizHistory));

    // Save latest result for this quiz type
    localStorage.setItem(`quiz_${quizType}_result`, JSON.stringify(resultData));
  };

  const calculateResults = () => {
    let correctAnswers = 0;
    
    questions.forEach(question => {
      const userAnswer = selectedAnswers[question.id];
      if (userAnswer === question.correct) {
        correctAnswers++;
      }
    });

    const percentage = Math.round((correctAnswers / questions.length) * 100);
    const skillLevel = calculateSkillLevel(percentage);

    return {
      score: correctAnswers,
      percentage,
      skillLevel,
      correctAnswers
    };
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setTimeLeft(300);
    setQuizCompleted(false);
    setShowResults(false);
    localStorage.removeItem(`quiz_${quizType}_progress`);
  };

  const handleClose = () => {
    if (showResults) {
      resetQuiz();
    }
    onClose();
  };

  if (!isOpen || !quiz) return null;

  const currentQ = questions[currentQuestion];
  const results = showResults ? calculateResults() : null;
  const isAnswered = currentQ && selectedAnswers.hasOwnProperty(currentQ.id);
  const allQuestionsAnswered = questions.every(q => selectedAnswers.hasOwnProperty(q.id));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div>
            <h2 className="text-2xl font-bold text-white">{quiz.title}</h2>
            <p className="text-slate-300 text-sm">{quiz.description}</p>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {!quizStarted ? (
          /* Start Screen */
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Ready to Test Your Skills?</h3>
            <div className="bg-slate-700 p-6 rounded-lg mb-6 text-left">
              <h4 className="font-semibold text-white mb-3">Quiz Information:</h4>
              <ul className="space-y-2 text-slate-300">
                <li>• {questions.length} multiple choice questions</li>
                <li>• 5 minutes time limit</li>
                <li>• Your progress will be saved automatically</li>
                <li>• You can review and change answers before submitting</li>
              </ul>
            </div>
            <button
              onClick={startQuiz}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Start Quiz
            </button>
          </div>
        ) : showResults ? (
          /* Results Screen */
          <div className="p-8">
            <div className="text-center mb-6">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                results.percentage >= 70 ? 'bg-green-600' : results.percentage >= 50 ? 'bg-yellow-600' : 'bg-red-600'
              }`}>
                <Award size={40} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Quiz Complete!</h3>
              <p className={`text-lg font-semibold ${results.skillLevel.color}`}>
                {results.skillLevel.title} Level
              </p>
            </div>

            <div className="bg-slate-700 p-6 rounded-lg mb-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{results.percentage}%</div>
                  <div className="text-slate-300 text-sm">Overall Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{results.correctAnswers}/{questions.length}</div>
                  <div className="text-slate-300 text-sm">Correct Answers</div>
                </div>
              </div>
              
              <div className="w-full bg-slate-600 rounded-full h-3 mb-4">
                <div 
                  className={`h-3 rounded-full transition-all duration-1000 ${
                    results.percentage >= 70 ? 'bg-green-500' : results.percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${results.percentage}%` }}
                />
              </div>

              <div className="text-center text-slate-300 text-sm">
                Time spent: {formatTime(300 - timeLeft)}
              </div>
            </div>

            {/* Detailed Results */}
            <div className="bg-slate-700 p-6 rounded-lg mb-6">
              <h4 className="font-semibold text-white mb-4">Question Review</h4>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {questions.map((question, index) => {
                  const userAnswer = selectedAnswers[question.id];
                  const isCorrect = userAnswer === question.correct;
                  return (
                    <div key={question.id} className="flex items-start space-x-3">
                      <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                        isCorrect ? 'bg-green-600' : 'bg-red-600'
                      }`}>
                        {isCorrect ? <CheckCircle size={16} /> : <XCircle size={16} />}
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium">
                          Q{index + 1}: {question.question}
                        </p>
                        {!isCorrect && (
                          <p className="text-slate-300 text-xs mt-1">
                            Correct answer: {question.options[question.correct]}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-slate-700 p-6 rounded-lg mb-6">
              <h4 className="font-semibold text-white mb-3">Recommendations</h4>
              <div className="text-slate-300 text-sm space-y-2">
                {results.percentage >= 85 && (
                  <p>🎉 Excellent work! You're ready for advanced courses and challenging projects.</p>
                )}
                {results.percentage >= 70 && results.percentage < 85 && (
                  <p>👍 Great job! Consider taking intermediate courses to further enhance your skills.</p>
                )}
                {results.percentage >= 50 && results.percentage < 70 && (
                  <p>📚 Good foundation! Focus on beginner to intermediate courses to strengthen your knowledge.</p>
                )}
                {results.percentage < 50 && (
                  <p>🌱 Keep learning! Start with our beginner courses to build a solid foundation.</p>
                )}
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={resetQuiz}
                className="flex-1 bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center"
              >
                <RotateCcw size={20} className="mr-2" />
                Retake Quiz
              </button>
              <button
                onClick={handleClose}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                View Courses
              </button>
            </div>
          </div>
        ) : (
          /* Quiz Interface */
          <>
            {/* Quiz Header */}
            <div className="flex items-center justify-between p-4 bg-slate-900 border-b border-slate-700">
              <div className="flex items-center space-x-4">
                <span className="text-slate-300">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <div className="w-48 bg-slate-700 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <Clock size={20} />
                <span className={`font-mono ${timeLeft < 60 ? 'text-red-400' : ''}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>

            {/* Question Content */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-6">
                {currentQ.question}
              </h3>

              <div className="space-y-3 mb-8">
                {currentQ.options.map((option, index) => (
                  <label
                    key={index}
                    className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedAnswers[currentQ.id] === index
                        ? 'border-purple-500 bg-purple-900/20'
                        : 'border-slate-600 hover:border-slate-500 hover:bg-slate-700/50'
                    }`}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name={`question-${currentQ.id}`}
                        value={index}
                        checked={selectedAnswers[currentQ.id] === index}
                        onChange={() => handleAnswerSelect(currentQ.id, index)}
                        className="mr-3"
                      />
                      <span className="text-white">{option}</span>
                    </div>
                  </label>
                ))}
              </div>

              {/* Show explanation if answered */}
              {isAnswered && currentQ.explanation && (
                <div className="bg-slate-700 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold text-white mb-2">Explanation:</h4>
                  <p className="text-slate-300 text-sm">{currentQ.explanation}</p>
                </div>
              )}
            </div>

            {/* Quiz Footer */}
            <div className="flex items-center justify-between p-6 bg-slate-900 border-t border-slate-700">
              <button
                onClick={goToPreviousQuestion}
                disabled={currentQuestion === 0}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  currentQuestion === 0
                    ? 'text-slate-500 cursor-not-allowed'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                <ChevronLeft size={20} className="mr-1" />
                Previous
              </button>

              <div className="text-center">
                <p className="text-slate-400 text-sm">
                  {Object.keys(selectedAnswers).length} of {questions.length} answered
                </p>
                {allQuestionsAnswered && !quizCompleted && (
                  <button
                    onClick={finishQuiz}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg mt-2 transition-colors"
                  >
                    Finish Quiz
                  </button>
                )}
              </div>

              {currentQuestion < questions.length - 1 ? (
                <button
                  onClick={goToNextQuestion}
                  className="flex items-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Next
                  <ChevronRight size={20} className="ml-1" />
                </button>
              ) : (
                <button
                  onClick={finishQuiz}
                  disabled={!allQuestionsAnswered}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    allQuestionsAnswered
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-slate-600 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Submit Quiz
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SkillQuiz;