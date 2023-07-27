import React from "react";
import "./Form.css"

const ScoreBar = ({ score, totalQuestions }) => {
  const progress = ((score) / totalQuestions) * 100;

  return (
    <div className="score-bar">
      <div className="score" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ScoreBar;
