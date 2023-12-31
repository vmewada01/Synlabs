import React, { useState } from "react";
import json_data from "./data.json";
import { FaStar } from "react-icons/fa";
import "../Components/Form.css";
import ProgressBar from "./ProgressBar";
import ScoreBar from "./ScoreBar";

const Form = () => {
  let jsonData = json_data;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  
  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    setShowNextButton(true);
  };
  //   console.log(selectedAnswer)
  const handleNextQuestion = () => {
    if (selectedAnswer === jsonData[currentQuestionIndex].correct_answer) {
      setScore(score + 1);
    }
    setShowNextButton(false);
    setSelectedAnswer(null);

    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const renderStars = (difficulty) => {
    const maxStars = 5;
    const filledStars= Math.min(difficulty,maxStars)
    const emptyStars = maxStars - difficulty;
    const stars = [];

    for (let i = 0; i < filledStars; i++) {
      stars.push(<FaStar key={i} style={{color:"black"}} />);
    }

    for(let i=0; i<emptyStars; i++){
        stars.push(<FaStar key={filledStars + i} style={{color:"gray"}} />)
    }

    return stars;
  };

  const currentQuestion = jsonData[currentQuestionIndex];
  const totalQuestions = jsonData.length;
// console.log(currentQuestion)


  return (
    <>
   {(!currentQuestion)? (
        <div className="FormComplete">Form submitted Successfully ..!!</div>
      ) : null}


    {currentQuestion &&(<div>
{/* progress bar start */}

<ProgressBar
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={totalQuestions}
      />

    

      {/* progress bar end */}
      <div className="mainContainer">
        {/* Heading Part Start */}
        <div>
          <div className="Question">
            {" "}
            Question {currentQuestionIndex + 1} of {totalQuestions}{" "}
          </div>
          <div className="Enterainment">Entertainment Board Games</div>
          <div>
            {currentQuestionIndex + 1 <= totalQuestions &&
              renderStars(
                currentQuestion.difficulty === "hard"
                  ? 3
                  : currentQuestion.difficulty === "medium"
                  ? 2
                  : 1
              )}
          
          </div>
        </div>
        {/* Heading Part End */}

        {/* Question Start */}
        <h3>{decodeURIComponent(currentQuestion.question)}</h3>
        {/* Question End */}

        {/* Option Part Start */}
        <div className="gridBox">
          {currentQuestion.incorrect_answers.map((choice, index) => (
            <div
              key={index}
              onClick={() => handleAnswerClick(choice)}
              className="Incorrect_ans"
            >
              {decodeURIComponent(choice)}
            </div>
          ))}
          <div
            onClick={() => handleAnswerClick(currentQuestion.correct_answer)}
            className="Correct_ans"
          >
            {decodeURIComponent(currentQuestion.correct_answer)}
          </div>
        </div>

        {/* Option Part Complete */}

        {/* answer giving part Start */}

        <div className="NextQuestionDiv">
          {showNextButton && (
            <p className="Ans">
              {selectedAnswer === currentQuestion.correct_answer
                ? "Correct"
                : "Sorry, Please try again"}
            </p>
          )}

          {showNextButton && (
            <button className="NextQuestionButton" onClick={handleNextQuestion}>
              Next Question
            </button>
          )}
        </div>

        {/* answer giving part done  */}

        {/* Score Bar Start  */}

        <div className="score-bar-div">
          <div>Score {score * 5}%</div>
          <div>Max Score 100%</div>
        </div>
        <ScoreBar score={score} totalQuestions={totalQuestions} />

        {/* Score Bar End */}
      </div>



    </div>)}
      
    </>
  );
};

export default Form;
