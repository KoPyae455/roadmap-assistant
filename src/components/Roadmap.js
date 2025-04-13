import React, { useState, useEffect } from 'react';
import explanations from '../data/explanations.json';

function Roadmap({ roadmap, t }) {
  const [completed, setCompleted] = useState([]);
  const [showExplanation, setShowExplanation] = useState({});

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("completedTasks")) || [];
    setCompleted(saved);
  }, [roadmap]);

  const toggleComplete = (item) => {
    let updated;
    if (completed.includes(item)) {
      updated = completed.filter(i => i !== item);
    } else {
      updated = [...completed, item];
    }
    setCompleted(updated);
    localStorage.setItem("completedTasks", JSON.stringify(updated));
  };

  const resetProgress = () => {
    setCompleted([]);
    localStorage.removeItem("completedTasks");
  };

  const toggleExplanation = (item) => {
    setShowExplanation((prev) => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const completedPercent = Math.round((completed.length / roadmap.length) * 100);

  // Motivational message based on % complete
  const getMotivation = () => {
    if (completedPercent === 0) return "🚀 Start your journey today!";
    if (completedPercent < 30) return "💪 You're warming up!";
    if (completedPercent < 60) return "🔥 Keep going! You're doing great!";
    if (completedPercent < 100) return "🌟 Almost there! Stay strong!";
    return "🏁 You've completed your roadmap! You're awesome!";
  };

  // Badge name
  const getBadge = () => {
    if (completedPercent === 0) return "🔰 New Explorer";
    if (completedPercent < 30) return "🧱 Beginner Coder";
    if (completedPercent < 60) return "🚀 Rising Dev";
    if (completedPercent < 100) return "💼 Serious Learner";
    return "🏆 AI Hero";
  };

  return (
    <div>
      <h2>{t("your_roadmap")}</h2>

      {/* ✅ Progress Bar + Badge + Motivation */}
      <div style={{ marginBottom: '20px' }}>
        <p><strong>Progress:</strong> {completedPercent}% Complete</p>
        <div style={{ background: '#ddd', borderRadius: '10px', overflow: 'hidden', height: '20px' }}>
          <div
            style={{
              width: `${completedPercent}%`,
              background: '#4caf50',
              height: '100%',
              transition: 'width 0.3s ease'
            }}
          />
        </div>
        <p style={{ marginTop: '10px', fontWeight: 'bold' }}>{getMotivation()}</p>
        <p style={{ color: 'gray' }}>{getBadge()}</p>
        <button onClick={resetProgress} style={{ marginTop: '10px' }}>
          🔄 Reset Progress
        </button>
      </div>

      {/* ✅ Roadmap Items */}
      <ul>
        {roadmap.map((item, index) => (
          <li key={index} style={{ marginTop: '10px' }}>
            <input
              type="checkbox"
              checked={completed.includes(item)}
              onChange={() => toggleComplete(item)}
            />{' '}
            {item}
            <button onClick={() => toggleExplanation(item)} style={{ marginLeft: '10px' }}>
              🔍 {t("explain")}
            </button>
            {showExplanation[item] && (
              <p style={{ marginTop: '5px', color: 'gray' }}>
                {explanations[item] || "Explanation not available."}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Roadmap;
