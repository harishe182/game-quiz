import React, { useState } from "react";
import "./App.css";
import sound from "./sound/mario.mp3";
import buzzer from "./sound/buzzer.mp3";
import backgroundMusic from "./sound/background.mp3";

function App() {
 
  function play(){
    new Audio(sound).play()
  }

  function play2(){
    new Audio(buzzer).play()
  }

  function play3(){
    new Audio(backgroundMusic).play()
  }

  // Properties
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizStarted, setIsQuizStarted] = useState(false);



  const questions = [
    {
      text: "What is the best-selling video game of all time?",
      options: [
        { id: 0, text: "Tetris", isCorrect: false },
        { id: 1, text: "Minecraft", isCorrect: true },
        { id: 2, text: "Grand Theft Auto V", isCorrect: false },
        { id: 3, text: "Super Mario Bros", isCorrect: false },
      ],
    },
    {
      text: "Which famous video game character is known as 'The Blue Blur'?",
      options: [
        { id: 0, text: "Mega Man", isCorrect: false },
        { id: 1, text: "Sonic the Hedgehog", isCorrect: true },
        { id: 2, text: "Kirby", isCorrect: false },
        { id: 3, text: "Pac-Man", isCorrect: false },
      ],
    },
    {
      text: "Which game is credited with popularizing the Battle Royale genre?",
      options: [
        { id: 0, text: "Fortnite", isCorrect: false },
        { id: 1, text: "PlayerUnknown's Battlegrounds (PUBG)", isCorrect: true },
        { id: 2, text: "Apex Legends", isCorrect: false },
        { id: 3, text: "Call of Duty: Warzone", isCorrect: false },
      ],
    },
    {
      text: "In which game do players compete to build powerful decks in the world of Azeroth?",
      options: [
        { id: 0, text: "Magic: The Gathering", isCorrect: false },
        { id: 1, text: "Hearthstone", isCorrect: true },
        { id: 2, text: "Gwent", isCorrect: false },
        { id: 3, text: "Yu-Gi-Oh! Duel Links", isCorrect: false },
      ],
    },
    {
      text: "Which console was the first to use optical discs as its primary storage medium?",
      options: [
        { id: 0, text: "Sega Genesis", isCorrect: false },
        { id: 1, text: "Sony PlayStation", isCorrect: true },
        { id: 2, text: "Nintendo 64", isCorrect: false },
        { id: 3, text: "Xbox", isCorrect: false },
      ],
    },
  ];
  
  // Helper Functions

  const optionClicked = (isCorrect) => {
    // Increment the score
    if (isCorrect) {
      play()
      setScore(score + 1);
    }
    else{
      play2()
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const restartGame = () => {
    play()
    setScore(0);
    setCurrentQuestion(0);
    setShowResults(false);
    setIsQuizStarted(false); 
    window.location.reload();
  };

  const startQuiz = () => {
    play()
    setIsQuizStarted(true); 
    play3()
  };

  if (!isQuizStarted) {
    return (
      <div className="App">
        <div className="start-screen">
          <h1 className="wavy-title">Welcome to the QUIZ!</h1>
          <button onClick={startQuiz}>Start Quiz</button>
        </div>
      </div>
    );
  }



  return (
    <div className="App">
      <div className="title">
      <h1 className="wavy-title">QUIZ</h1>
      </div>
      {/* 1. Header  */}
      {/* 2. Current Score  */}
      <div className="score">
      <h2>Score: {score}</h2>
      </div>

      {/* 3. Show results or show the question game  */}
      {showResults ? (
        /* 4. Final Results */
        <div className="final-results">
          <h1>Game Over</h1>
          <h2>
            {score} out of {questions.length} correct - (
            {(score / questions.length) * 100}%)
          </h2>
          <button onClick={() => restartGame()}>Restart</button>
        </div>
      ) : (
        /* 5. Question Card  */
        <div className="question-card">
          {/* Current Question  */}
          <h2>
            Question: {currentQuestion + 1} out of {questions.length}
          </h2>
          <h3 className="question-text">{questions[currentQuestion].text}</h3>

          {/* List of possible answers  */}
          <ul>
            {questions[currentQuestion].options.map((option) => {
              return (
                <li
                  key={option.id}
                  onClick={() => optionClicked(option.isCorrect)}
                >
                  {option.text}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;