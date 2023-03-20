'use strict';

// RESETTING INHERENT HTML VALUES
const diceEl = document.getElementsByClassName('dice')[0];
document.getElementById('score--0').textContent = 0;
document.getElementById('score--1').textContent = 0;
diceEl.style.display = 'none';

// console.log(document.querySelector('.dice'));
// console.log(document.getElementsByClassName('dice')[0]);

// SELECTING ELEMENTS
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const playerAllEl = document.querySelectorAll('.player');
const totalAllEl = document.querySelectorAll('.player .score');
const currentAllEl = document.querySelectorAll('.player .current-score');

btnRoll.addEventListener('click', btnRollHandler);
btnNew.addEventListener('click', btnNewHandler);
btnHold.addEventListener('click', btnHoldHandler);

// INITIAL DATA
class PLAYER {
  constructor(current, total, active, htmlEl) {
    this.current = current;
    this.total = total;
    this.active = active;
    this.htmlEl = htmlEl;
  }
}

class GAME {
  constructor(activePlayer, changeSide) {
    this.activePlayer = activePlayer;
    this.changeSide = changeSide;
  }
}

// CURRENT DATA
let player1 = new PLAYER(0, 0, true, document.querySelector('.player--0'));
let player2 = new PLAYER(0, 0, false, document.querySelector('.player--1'));
let game = new GAME(player1, false);

// BUTTON HANDLERS
function btnRollHandler() {
  const rndm = randomGen();
  renderDice(rndm);
  incrementCurrent(rndm);
  renderCurrent(game.activePlayer.current);
  if (rndm === 1) {
    resetCurrent();
    changeSide();
    return;
  }
}

function btnHoldHandler() {
  incrementTotal(game.activePlayer.current);
  renderTotal(game.activePlayer.total);
  resetCurrent(game.activePlayer.current);
  const winObj = win();
  winObj.status ? endGame(winObj.winner) : changeSide();
}

function btnNewHandler() {
  resetData();
  renderNewGame();
}
//////////////////////////////
// FUNCTION DEFINITIONS
///////////////////////////////
// -> rndm
function randomGen() {
  const rndm = Math.floor(Math.random() * 6) + 1;
  return rndm;
}

// rndm -> currentValue
function incrementCurrent(rndm) {
  game.activePlayer.current += rndm;
}

// current -> total
function incrementTotal(current) {
  game.activePlayer.total += current;
}

function resetCurrent() {
  game.activePlayer.current = 0;
  renderCurrent(game.activePlayer.current);
}

// -> visual,data
function changeSide() {
  game.activePlayer.htmlEl.classList.remove('player--active');
  if (game.activePlayer === player1) {
    game.activePlayer = player2;
  } else {
    game.activePlayer = player1;
  }
  game.activePlayer.htmlEl.classList.add('player--active');
  game.changeSide = false;
}

////////////////
// RENDERING
function renderDice(rndm) {
  document.getElementsByClassName('dice')[0].style.display = 'block';
  document
    .getElementsByClassName('dice')[0]
    .setAttribute('src', `assets/pics/dice-${rndm}.png`);
}

function renderCurrent(current) {
  document.querySelector('.player--active .current-score').textContent =
    current;
}

function renderTotal(total) {
  document.querySelector('.player--active .score').textContent = total;
}
//////////////////////
// RESETTING GAME

// -> data
function resetData() {
  // give new values to data
  player1 = new PLAYER(0, 0, true, document.querySelector('.player--0'));
  player2 = new PLAYER(0, 0, false, document.querySelector('.player--1'));
  game = new GAME(player1, false);
}

function renderNewGame() {
  totalAllEl.forEach(el => {
    el.textContent = 0;
  });
  currentAllEl.forEach(el => {
    el.textContent = 0;
  });
  playerAllEl.forEach(el => {
    el.classList.remove('player--winner');
    el.classList.remove('player--active');
  });
  console.log(player1.classList);
  game.activePlayer.htmlEl.classList.add('player--active');

  btnRoll.disabled = false;
  btnHold.disabled = false;
}
///////////////////
// GAME END
function endGame(winner) {
  btnRoll.disabled = true;
  btnHold.disabled = true;
  diceEl.style.display = 'none';
  game.activePlayer.htmlEl.classList.remove('player--active');
  winner.htmlEl.classList.add('player--winner');
}

function win() {
  const winValue = 100;
  return {
    status: player1.total >= winValue || player2.total >= winValue,
    winner: player1.total >= winValue ? player1 : player2,
  };
}
