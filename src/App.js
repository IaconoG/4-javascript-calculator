import './App.css';

import { useState, useEffect } from 'react';

function App() {
  const [currentNumber, setCurrentNumber] = useState(null);
  const [previousNumber, setPreviousNumber] = useState(null);
  const [currentSimbol, setCurrentSimbol] = useState('');
  const [previousSimbol, setPreviousSimbol] = useState('');
  const [reset, setReset] = useState(true);

  const [displayResult, setDisplayResult] = useState('0');
  const [displayOperacion, setDisplayOperacion] = useState('');

  const handleBtnNumber = (numero) => {
    if (reset || displayResult === '0') {
      setDisplayResult(numero);
      setReset(false);
    }
    else setDisplayResult(displayResult + numero);
  }
  const handleBtnAccion = (op) => {
    if (op === '') {
      setCurrentNumber(0);
      setPreviousNumber(0);
      setCurrentSimbol('');
      setPreviousSimbol('');
      setDisplayResult('0');
      setDisplayOperacion('');
      return;
    }
    switch (op) {
      case '/':
      case 'x':
      case '-':
      case '+':
      case '=':
        if (previousSimbol === '') {
          setPreviousSimbol(op);
          setPreviousNumber(parseFloat(displayResult));
          console.log(op, '|' ,previousSimbol, '|' ,currentSimbol)
        } else {
          setCurrentSimbol(op);
          setCurrentNumber(parseFloat(displayResult));
        }
        break;
    case '+/-':
      setDisplayResult(parseFloat(displayResult) * -1);
      break;
    case ',':
      if (displayResult.includes('.')) return;
      setDisplayResult(displayResult + '.');
      break;
    default:
      break;
    }
  }
  useEffect(() => {
    if (currentNumber === null) return;
    
    switch (previousSimbol) {
      case '/':
        setDisplayResult(currentNumber / previousNumber);
        break;
      case 'x':
        setDisplayResult(currentNumber * previousNumber);
        break;
      case '-':
        setDisplayResult(currentNumber - previousNumber);
        break;
      case '+':
        setDisplayResult(currentNumber + previousNumber);
        break;
        default:
          break;
        }
    setDisplayOperacion(displayOperacion + currentNumber + '=');
  }, [currentNumber]);

  useEffect(() => {
    if (previousNumber === null) return;
    setReset(true);
    setDisplayOperacion(previousNumber + previousSimbol);
    if (displayResult[displayResult.length - 1] === '.') setDisplayResult(displayResult.slice(0, -1));

    // if (displayResult.includes('.')) {
    //   setDisplayResult(parseFloat(displayResult).toFixed(2));
    // }
  }, [previousNumber]);



  

  return (
    <div className="app">
      <div className="main-container">
        <div className="display">
          <div className="operation">{displayOperacion}</div>
          <div className="result">{displayResult}</div>
        </div>
        <div className="btns-container">
          <button className="btn accions" onClick={() => handleBtnAccion('/')}>/</button>
          <button className="btn accions" onClick={() => handleBtnAccion('x')}>x</button>
          <button className="btn accions" onClick={() => handleBtnAccion('-')}>-</button>
          <button className="btn accions" onClick={() => handleBtnAccion('+')}>+</button>
          <button className="btn numbers" onClick={() => handleBtnNumber('7')}>7</button>
          <button className="btn numbers" onClick={() => handleBtnNumber('8')}>8</button>
          <button className="btn numbers" onClick={() => handleBtnNumber('9')}>9</button>
          <button className="btn accions" onClick={() => handleBtnAccion('')}>Delete</button>
          <button className="btn numbers" onClick={() => handleBtnNumber('4')}>4</button>
          <button className="btn numbers" onClick={() => handleBtnNumber('5')}>5</button>
          <button className="btn numbers" onClick={() => handleBtnNumber('6')}>6</button>
          <button className="btn accions equals" onClick={() => handleBtnAccion('=')}>=</button>
          <button className="btn numbers" onClick={() => handleBtnNumber('1')}>1</button>
          <button className="btn numbers" onClick={() => handleBtnNumber('2')}>2</button>
          <button className="btn numbers" onClick={() => handleBtnNumber('3')}>3</button>
          <button className="btn accions" onClick={() => handleBtnAccion('+/-')}>+/-</button>
          <button className="btn numbers" onClick={() => handleBtnNumber('0')}>0</button>
          <button className="btn accions" onClick={() => handleBtnAccion(',')}>,</button>
        </div>
      </div>
    </div>
  );
}

export default App;
