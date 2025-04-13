// src/components/Quiz.js
import React, { useState } from 'react';

function Quiz({ onFinish, t }) {
  const [interest, setInterest] = useState('');

  const handleStart = () => {
    if (interest) {
      onFinish(interest);
    }
  };

  return (
    <div>
      <h2>{t("question")}</h2>
      <select onChange={(e) => setInterest(e.target.value)} defaultValue="">
        <option value="" disabled>{t("select_path")}</option>
        <option value="beginner">Beginner Programming</option>
        <option value="web_dev">Web Development</option>
        <option value="ai_path">AI / Machine Learning</option>
      </select>
      <br /><br />
      <button onClick={handleStart}>{t("get_roadmap")}</button>
    </div>
  );
}

export default Quiz;
