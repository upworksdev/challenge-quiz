import React, {useState, useEffect} from 'react'
import './App.css'
import questions from './questions.json'
import StarRatings from 'react-star-ratings'

function App () {
  const [curQuiz, setCurQuiz] = useState(0);
  const [totalQuiz, setTotalQuiz] = useState(20);
  const [selectedAnswer, setSelectedAnswer] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [questionResult, setQuestionResult] = useState('');
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(100);
  const [minScore, setMinScore] = useState(0);
  const [rightAnswersCnt, setRightAnswersCnt] = useState(0);


  const getRating = (level) => {
    switch(level) {
      case 'easy':
        return 1;
      case 'medium':
        return 2;
      case 'hard':
          return 3;
      default:
          return 1;
    }
  }

  const setQuestionData = (curQuestion) => {
    const questionData = questions[curQuestion];
    let temp_answers = questionData.incorrect_answers;
    temp_answers.push(questionData.correct_answer);
    temp_answers.sort((a,b) => 0.5 - Math.random());
    setAnswers(temp_answers);
  }

  const onClickAnswer = (index) => {
   setSelectedAnswer(index);
  }

  const onNext = () => {
    const questionData = questions[curQuiz];
    let updatedRightAnswersCnt = rightAnswersCnt;
    if(questionData.correct_answer == answers[selectedAnswer]) {
      setQuestionResult('Correct!');
      updatedRightAnswersCnt++;
      setRightAnswersCnt(updatedRightAnswersCnt);
    } else setQuestionResult('Sorry!');
    const testedQuiz = curQuiz + 1;
    setScore((updatedRightAnswersCnt / testedQuiz * 100).toFixed(2));
    setMaxScore(( (updatedRightAnswersCnt + totalQuiz - testedQuiz) / totalQuiz * 100).toFixed(2));
    setMinScore((updatedRightAnswersCnt / totalQuiz * 100).toFixed(2));

    setCurQuiz(curQuiz + 1);
    setQuestionData(curQuiz + 1);
  }

  useEffect(() => {
    setTotalQuiz(questions.length);
    setQuestionData(0);
  }, [])

  const questionData = questions[curQuiz];
  return (
    <div className='App'>
      <div style={{backgroundColor: 'rgb(169, 170, 169)', width: `${curQuiz / totalQuiz * 100}%`, height: '20px'}}/>
      <div className="container">
        <h1 className="question_status">Question {curQuiz + 1} of {totalQuiz}</h1>
        <h4 className="category">{decodeURIComponent(questionData.category)}</h4>
        <StarRatings rating={getRating(questionData.difficulty)} numberOfStars={5}
          starRatedColor="black" starDimension="15px" starSpacing="3px" />
        <div className="question">{decodeURIComponent(questionData.question)}</div>
        <div className="answers">{
          answers.map((answer, index) => <div key={index} className={selectedAnswer === index ? "answer selected" : "answer"} onClick={onClickAnswer.bind(this, index)}>{decodeURIComponent(answer)}</div>)
        }</div>
        <div className="question_result">{questionResult}</div>
        <div style={{textAlign: 'center'}}>
          <button className="but" onClick={onNext.bind(this)}>Next Question</button>
        </div>
      </div>
      <div className="test_result">
        <div style={{width: '80%', margin: '0 auto 40px auto'}}>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <span>Score: {score}%</span>
            <span>Max Score: {maxScore}%</span>
          </div>
          <div style={{border: '1px solid black', borderRadius: '3px', height: '20px'}}>
            <div style={{width: `${minScore}%`, backgroundColor: 'black', height:'100%', display: 'inline-block'}}></div>
            <div style={{width: `${score- minScore}%`, backgroundColor: 'grey', height:'100%', display: 'inline-block'}}></div>
            <div style={{width: `${maxScore - score}%`, backgroundColor: 'darkgrey', height:'100%', display: 'inline-block'}}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
