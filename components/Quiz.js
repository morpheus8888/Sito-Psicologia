import { useEffect, useState } from 'react';
import { domande, areaMeta } from '../lib/quizData';

function precomputeAreaData() {
  let c = 0;
  areaMeta.forEach(a => { a.startIndex = c; c += a.count; a.endIndex = c - 1; });
}

function getScoreColor(score) {
  if (score >= 90) return '#2ecc71';
  if (score >= 70) return '#f1c40f';
  if (score >= 50) return '#e67e22';
  return '#e74c3c';
}

export default function Quiz() {
  const [page, setPage] = useState('start');
  const [email, setEmail] = useState('');
  const [debugMode, setDebugMode] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(() => Array(domande.length).fill(null));
  const [adminEmail, setAdminEmail] = useState(null);

  useEffect(() => {
    precomputeAreaData();
  }, []);

  const answeredCount = answers.filter(a => a !== null).length;
  const totalProgress = answeredCount / domande.length * 100;
  const currentArea = areaMeta.find(a => current >= a.startIndex && current <= a.endIndex);
  const areaAnswered = currentArea ? answers.slice(currentArea.startIndex, currentArea.endIndex+1).filter(a => a !== null).length : 0;
  const areaProgress = currentArea ? areaAnswered / currentArea.count * 100 : 0;

  const handleAnswer = (i) => {
    const copy = [...answers];
    copy[current] = i;
    setAnswers(copy);
  };

  const saveProgress = (exit=false) => {
    if (email) {
      localStorage.setItem(`quiz_progress_${email}`, JSON.stringify({answers, index: current}));
      if (exit) setPage('start');
    }
  };

  const loadProgress = (em) => {
    const data = localStorage.getItem(`quiz_progress_${em}`);
    if (data) {
      const state = JSON.parse(data);
      setAnswers(state.answers);
      setCurrent(state.index);
      return true;
    }
    return false;
  };

  const startQuizFlow = (inDebug) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      alert('Formato email non valido. Per favore, inserisci un indirizzo email corretto (es. nome@dominio.it).');
      return;
    }
    setDebugMode(inDebug);
    if (loadProgress(email.trim().toLowerCase())) {
      if (confirm('È stato trovato un progresso salvato per questa email. Vuoi riprendere da dove hai lasciato?')) {
        setPage('quiz');
      } else {
        setAnswers(Array(domande.length).fill(null));
        setCurrent(0);
        saveProgress();
        setPage('quiz');
      }
    } else {
      setAnswers(Array(domande.length).fill(null));
      setCurrent(0);
      setPage('quiz');
    }
  };

  const nextQuestion = () => {
    if (answers[current] === null) return;
    saveProgress();
    if (current < domande.length - 1) {
      setCurrent(current + 1);
    } else {
      setPage('results');
    }
  };

  const previousQuestion = () => {
    setCurrent(c => Math.max(0, c - 1));
  };

  const terminateAndShowResults = () => {
    if (answers[current] !== null) {
      saveProgress();
      setCurrent(c => c + 1);
    }
    setPage('results');
  };

  const resumeQuiz = () => {
    setPage('quiz');
  };

  const resultsData = (ans) => {
    let correct = 0;
    let answered = ans.filter(a => a !== null).length;
    let areaAns = new Array(areaMeta.length).fill(0);
    ans.forEach((a,i) => {
      if (a !== null) {
        const areaIdx = domande[i][3];
        areaAns[areaIdx]++;
        if (a === domande[i][2]) correct++;
      }
    });
    let areaScores = areaMeta.map((a,i) => {
      if (areaAns[i] === 0) return -1;
      let correctInArea = 0;
      for(let q=a.startIndex; q<=a.endIndex; q++) {
        if (ans[q] === domande[q][2]) correctInArea++;
      }
      return Math.round((correctInArea / a.count) * 100);
    });
    const totalScore = answered > 0 ? Math.round(correct/answered*100) : 0;
    return {answered, correct, areaAns, areaScores, totalScore};
  };

  const renderResults = () => {
    const {answered, correct, areaAns, areaScores, totalScore} = resultsData(answers);
    const uncompletedAreas = areaMeta.filter((a,i) => areaAns[i] < a.count).map(a => a.name);
    return (
      <div id="result-container">
        <h2>Risultati del Tuo Quiz</h2>
        <p>Hai risposto a {answered} su {domande.length} domande, con {correct} risposte corrette.</p>
        <p><strong>Punteggio complessivo (sulle risposte date): <span style={{color:getScoreColor(totalScore)}}>{totalScore} / 100</span></strong></p>
        {areaMeta.filter((a,i)=>areaAns[i]===a.count).length>0 && (
          <div>
            <h3>Punteggi per area (solo aree completate)</h3>
            <ul>
              {areaMeta.map((a,i)=> areaAns[i]===a.count && (
                <li key={a.name}>{a.name}: <strong style={{color:getScoreColor(areaScores[i])}}>{areaScores[i]} / 100</strong></li>
              ))}
            </ul>
          </div>
        )}
        <h3>Aree di miglioramento</h3>
        {areaMeta.map((a,i)=> areaAns[i]===a.count && areaScores[i]<80 && (
          <div key={i} className="explanation"><strong>{a.name}:</strong> {a.explanation}</div>
        ))}
        {uncompletedAreas.length>0 && (
          <div className="uncompleted-areas">
            <h3>Aree non completate</h3>
            <p>Per un risultato più accurato, completa anche queste sezioni:</p>
            <ul>{uncompletedAreas.map(n=> <li key={n}>{n}</li>)}</ul>
          </div>
        )}
        {uncompletedAreas.length===0 && areaMeta.every((a,i)=>areaAns[i]===a.count && areaScores[i]>=80) && (
          <p><strong>Ottimo! Hai completato tutte le aree con un punteggio più che sufficiente.</strong></p>
        )}
        {current < domande.length && (
          <button id="resume-q-btn" className="nav-button" onClick={resumeQuiz}>Riprendi il quiz per completarlo</button>
        )}
        <button id="save-exit-btn" className="nav-button" onClick={()=>saveProgress(true)}>Salva e Torna all'inizio</button>
      </div>
    );
  };

  const renderAdmin = () => {
    const emails = [];
    for (let i=0;i<localStorage.length;i++) {
      const key = localStorage.key(i);
      if (key.startsWith('quiz_progress_')) emails.push(key.replace('quiz_progress_',''));
    }
    const selected = adminEmail ? JSON.parse(localStorage.getItem(`quiz_progress_${adminEmail}`)) : null;
    return (
      <div id="admin-panel-container">
        <button className="nav-button" style={{backgroundColor:'#7f8c8d', marginBottom:'1rem'}} onClick={()=>setPage('start')}>Torna alla Home</button>
        <div id="admin-panel" className="admin-panel">
          <div id="admin-user-list-container">
            <h3>Utenti Registrati (in questo browser)</h3>
            <ul id="admin-user-list">
              {emails.length===0 && <li>Nessun utente ha ancora salvato i progressi su questo browser.</li>}
              {emails.map(e => (
                <li key={e} onClick={()=>setAdminEmail(e)} className={adminEmail===e?'active':''}>{e}</li>
              ))}
            </ul>
          </div>
          <div id="admin-result-details">
            {selected ? generateResultsFromState(selected) : <p>Seleziona un utente per vedere i suoi risultati.</p>}
          </div>
        </div>
      </div>
    );
  };

  const generateResultsFromState = (state) => {
    const {answered, correct, areaAns, areaScores, totalScore} = resultsData(state.answers);
    const uncompletedAreas = areaMeta.filter((a,i)=>areaAns[i] < a.count).map(a=>a.name);
    return (
      <div>
        <h3>Risultati per: {adminEmail}</h3>
        <p>Domande risposte: {answered} / {domande.length}</p>
        <p>Punteggio complessivo: <strong style={{color:getScoreColor(totalScore)}}>{totalScore} / 100</strong></p>
      </div>
    );
  };

  const renderStart = () => (
    <div id="start-screen" style={{textAlign:'center'}}>
      <h2>Benvenuto nel quiz interattivo!</h2>
      <p>Inserisci la tua email per iniziare un nuovo quiz o riprendere uno precedente. I tuoi progressi verranno salvati nel tuo browser.</p>
      <div className="form-group" style={{maxWidth:'400px', margin:'1rem auto'}}>
        <label htmlFor="user-email-input">La tua Email</label>
        <input type="email" id="user-email-input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="mario.rossi@esempio.com" />
      </div>
      <div className="nav-column" style={{margin:'auto'}}><div className="nav-buttons">
        <button className="nav-button" style={{backgroundColor:'#3498db', color:'white'}} onClick={()=>startQuizFlow(false)}>Inizia o Riprendi Quiz</button>
      </div></div>
      <div className="nav-column" style={{margin:'auto', marginTop:'1rem'}}><div className="nav-buttons">
        <button className="nav-button" style={{backgroundColor:'#c0392b', color:'white'}} onClick={()=>startQuizFlow(true)}>Avvia in modalità Debug</button>
      </div></div>
      <hr style={{margin:'2rem 0'}} />
      <div className="nav-column" style={{margin:'auto'}}><div className="nav-buttons">
        <button className="nav-button" style={{backgroundColor:'#34495e', color:'white'}} onClick={()=>setPage('admin')}>Pannello Amministratore</button>
      </div></div>
    </div>
  );

  return (
    <div id="quiz-wrapper">
      <h1>Quiz sulla Terapia Psicologica</h1>
      {page === 'start' && renderStart()}
      {page === 'quiz' && (
        <>
          <div id="progress-container" className="progress-container">
            <div className="progress-label" id="area-progress-label">{currentArea ? `Progresso area: ${currentArea.name}` : ''}</div>
            <div className="progress-bar"><div className="progress-bar-inner" id="area-progress-bar" style={{width:`${Math.round(areaProgress)}%`}}>{Math.round(areaProgress)}%</div></div>
            <div className="progress-label" id="total-progress-label" style={{marginTop:'0.5rem'}}>{`Progresso totale del quiz (${answeredCount} / ${domande.length})`}</div>
            <div className="progress-bar"><div className="progress-bar-inner total" id="total-progress-bar" style={{width:`${Math.round(totalProgress)}%`}}>{Math.round(totalProgress)}%</div></div>
          </div>
          <div id="quiz-container">
            <div className="question">
              <p>{current + 1}. {domande[current][0]}</p>
              {domande[current][1].map((opt,i)=> (
                <label key={i} style={debugMode && i === domande[current][2] ? {backgroundColor:'#a7f3d0'} : {}}>
                  <input type="radio" name={`q${current}`} value={i} checked={answers[current]===i} onChange={()=>handleAnswer(i)} /> <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
          <div id="navigation-container" className="nav-container">
            <div className="nav-column">
              <div className="nav-buttons">
                {debugMode && current > 0 && <button id="prev-q-btn" className="nav-button" style={{backgroundColor:'#f39c12', marginRight:'10px'}} onClick={previousQuestion}>Indietro</button>}
                <button id="next-q-btn" className="nav-button" onClick={nextQuestion} disabled={answers[current]===null}>Prossima Domanda</button>
              </div>
              <div className="button-note">(Navigazione)</div>
            </div>
            <div className="nav-column">
              {current > 0 && (
                <>
                  <div className="nav-buttons"><button id="end-q-btn" className="nav-button" onClick={terminateAndShowResults}>Termina qui il test</button></div>
                  <div className="button-note">(Meno accurato)</div>
                </>
              )}
            </div>
          </div>
        </>
      )}
      {page === 'results' && renderResults()}
      {page === 'admin' && renderAdmin()}
    </div>
  );
}

