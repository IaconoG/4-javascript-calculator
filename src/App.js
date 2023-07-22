import './App.css';

import { useState, useEffect, useRef } from 'react';

function App() {
  const inputRef = useRef(null);
  const [display, setDisplay] = useState('0');
  const [contador, setContador] = useState(0);
  const [dot, setDot] = useState(false);
  const regexSimbolsLast = /[+\-*/]+$/;
    // [+\-*/]: Corresponde a cualquier carácter que sea uno de los cuatro operadores matemáticos (+, -, *, /).
    // $ -> final de la cadena
  const regexDecimal = /\./;


  const handleBtnNumber = (number) => {
    if (display === '0') setDisplay(number); 
    else setDisplay(display + number);
  }
  
  useEffect(() => {
    const inputElement = inputRef.current;;
    const letters = display.length;
    
    if (letters < 19) inputElement.style.fontSize = '3rem';
    else if (letters >= 19 && letters < 24) inputElement.style.fontSize = '2.5rem';
    else if (letters >= 24 && letters < 29) inputElement.style.fontSize = '2rem';
    else if (letters >= 29) inputElement.style.fontSize = '1.5rem';
  }, [display]);

  const handleBtnAccion = (accion) => {
    switch (accion) {
      case 'delete':
        setDisplay('0');
        setDot(false);
        break;
      case '+/-':
        setDisplay("(" +display.replace(regexSimbolsLast, '')+ ")*-1");
        break;
      case '.':
          if (!dot && !regexSimbolsLast.test(display)) {
            setDisplay(prevDisplay => prevDisplay + '.');
            setDot(true);
          }
        break;
      case '-':
          if (!(/[-]$/.test(display))) setDisplay(display + accion);
          break;
      case '+':
      case '*':
      case '/':
        if (!regexSimbolsLast.test(display)) setDisplay(display + accion);
        else setDisplay(display.replace(regexSimbolsLast, accion));
        setDot(false);
        break;
      case '=':
        const resultado = (regexSimbolsLast.test(display)) ? eval(display.replace(regexSimbolsLast, '')) : eval(display);
        setDot(regexDecimal.test(resultado))
        setDisplay(resultado.toString());
        break;
      default:
        break;
    }
  }

  return (
    <div className="app">
      <div className="main-container">
        <div className="display">
          <input id="display" ref={inputRef} type="text" className='result' value={display} readOnly />
        </div>
        <div className="btns-container">
          <button id="divide" className="btn accions" onClick={() => handleBtnAccion('/')}>/</button>
          <button id="multiply" className="btn accions" onClick={() => handleBtnAccion('*')}>x</button>
          <button id="subtract" className="btn accions" onClick={() => handleBtnAccion('-')}>-</button>
          <button id="add" className="btn accions" onClick={() => handleBtnAccion('+')}>+</button>
          <button id="seven" className="btn numbers" onClick={() => handleBtnNumber('7')}>7</button>
          <button id="eight" className="btn numbers" onClick={() => handleBtnNumber('8')}>8</button>
          <button id="nine" className="btn numbers" onClick={() => handleBtnNumber('9')}>9</button>
          <button id="clear" className="btn accions" onClick={() => handleBtnAccion('delete')}>Delete</button>
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

