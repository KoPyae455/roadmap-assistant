import React, { useState } from 'react';
import Quiz from './components/Quiz';
import Roadmap from './components/Roadmap';
import data from './data/learning_paths.json';
import translations from './data/translations.json';

function App() {
  const [selectedPath, setSelectedPath] = useState('');
  const [language, setLanguage] = useState('en');

  const t = (key) => translations[language][key] || key;

  const handleFinishQuiz = (interest) => {
    setSelectedPath(interest);
  };

  return (
    <div className="App">
      <div style={{ textAlign: 'right', marginBottom: '10px' }}>
        <button onClick={() => setLanguage('en')}>🇬🇧 EN</button>{' '}
        <button onClick={() => setLanguage('mm')}>🇲🇲 MM</button>
      </div>
      <h1>{t("title")}</h1>
      {!selectedPath ? (
        <Quiz onFinish={handleFinishQuiz} t={t} />
      ) : (
        <Roadmap roadmap={data[selectedPath]} t={t} />
      )}
    </div>
  );
}

export default App;
