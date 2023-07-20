import './App.css';

import { useState, useEffect } from 'react';

function App() {
  const [currentNumber, setCurrentNumber] = useState(null);
  const [previousNumber, setPreviousNumber] = useState(null);
  const [resolver, setResolver] = useState(false);
  const [resetNum, setResetNum] = useState(false); 
  const [negativo, setNegativo] = useState(false); 
  const [currentSimbol, setCurrentSimbol] = useState('');
  const [displayResult, setDisplayResult] = useState('0');
  const [displayOperacion, setDisplayOperacion] = useState('');

  const ecuaciones = (op) => {
    let resultado = 0;
    switch (op) {
      case '/':
        resultado = previousNumber / currentNumber;
        break;
      case 'x':
        resultado = previousNumber * currentNumber;
        break;
      case '-':
        resultado = previousNumber - currentNumber;
        break;
      case '+':
        resultado = previousNumber + currentNumber;
        break;
      default:
        break;
    }
  return resultado;
  }
        

  const handleBtnNumber = (numero) => {
    if (resolver || currentSimbol === '=') {
      setResolver(false);
      setDisplayOperacion('');
      setPreviousNumber(null)
      setCurrentNumber(null);
      setCurrentSimbol('');
      setDisplayResult(numero);
    } 
    if (displayResult === '0' || resetNum) {
      if (negativo) {
        numero *= -1;
        setNegativo(false);
      }
      setDisplayResult(numero);
      setResetNum(false)
    }
    else setDisplayResult(displayResult + numero);
  }
  const handleBtnAccion = (op) => {
    if (op === '') {
      setDisplayResult('0');
      setDisplayOperacion('');
      setResolver(false);
      setCurrentSimbol('');
      setCurrentNumber(null);
      setPreviousNumber(null);
      return;
    }
    if (resolver) return
    switch (op) {
      case '-':
        if (currentSimbol !== '') {
          setNegativo(true);
          setDisplayResult(parseFloat(displayResult) * -1);
          break;
        }
      case '/':
      case 'x':
      case '+':
      case '=':
        if (currentSimbol === '') {
          setCurrentSimbol(op);
          setPreviousNumber(parseFloat(displayResult))
          setResetNum(true);
        } else {
          if (op !== '=' && op !== currentSimbol) setCurrentSimbol(op); // cambio de simbolo
          else if (op === '=') {
            setResetNum(true);
            setResolver(true);
            setCurrentNumber(parseFloat(displayResult));
          }
        }
        break;
    case '+/-':
      setDisplayResult(parseFloat(displayResult) * -1);
      break;
    case '.':
      if (displayResult.includes('.')) return;
      setDisplayResult(displayResult + '.');
      break;
    default:
      break;
    }
  }
  useEffect(() => {
    if (currentSimbol === '') return;
    setDisplayOperacion(previousNumber + currentSimbol);
    if (displayResult[displayResult.length - 1] === '.') setDisplayResult(displayResult.slice(0, -1)); // Fix numero con punto al final sin numeros decimales
  }, [currentSimbol]);

  useEffect(() => {
    if (!resolver) return;
    setDisplayResult(ecuaciones(currentSimbol));
    setDisplayOperacion(previousNumber + currentSimbol + currentNumber + '=');
  }, [resolver]);


  
// todo: se debe acumular las operaciones :DDDDDDDDDDDDDDD

  

  return (
    <div className="app">
      <div className="main-container">
        <div className="display">
          <input type="text" className='operation' value={displayOperacion} readOnly />
          <input id="display"  type="text" className='result' value={displayResult} readOnly />
          {/* <div className="operation">{displayOperacion}</div> */}
          {/* <div className="result">{displayResult}</div> */}
        </div>
        <div className="btns-container">
          <button id="divide" className="btn accions" onClick={() => handleBtnAccion('/')}>/</button>
          <button id="multiply" className="btn accions" onClick={() => handleBtnAccion('x')}>x</button>
          <button id="subtract" className="btn accions" onClick={() => handleBtnAccion('-')}>-</button>
          <button id="add" className="btn accions" onClick={() => handleBtnAccion('+')}>+</button>
          <button id="seven" className="btn numbers" onClick={() => handleBtnNumber('7')}>7</button>
          <button id="eight" className="btn numbers" onClick={() => handleBtnNumber('8')}>8</button>
          <button id="nine" className="btn numbers" onClick={() => handleBtnNumber('9')}>9</button>
          <button id="clear" className="btn accions" onClick={() => handleBtnAccion('')}>Delete</button>
          <button id="four" className="btn numbers" onClick={() => handleBtnNumber('4')}>4</button>
          <button id="five" className="btn numbers" onClick={() => handleBtnNumber('5')}>5</button>
          <button id="six" className="btn numbers" onClick={() => handleBtnNumber('6')}>6</button>
          <button id='equals' className="btn accions equals" onClick={() => handleBtnAccion('=')}>=</button>
          <button id="one" className="btn numbers" onClick={() => handleBtnNumber('1')}>1</button>
          <button id="two" className="btn numbers" onClick={() => handleBtnNumber('2')}>2</button>
          <button id="three" className="btn numbers" onClick={() => handleBtnNumber('3')}>3</button>
          <button className="btn accions" onClick={() => handleBtnAccion('+/-')}>+/-</button>
          <button id="zero" className="btn numbers" onClick={() => handleBtnNumber('0')}>0</button>
          <button id="decimal" className="btn accions" onClick={() => handleBtnAccion('.')}>.</button>
        </div>
      </div>
    </div>
  );
}

export default App;

