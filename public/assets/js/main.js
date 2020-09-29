"use strict";

const register_input = document.querySelector('#register');
const addPlayerBtn = document.querySelector('#addPlayer');
const registerBtn = document.querySelector('#registerButton');
const generateBtn = document.querySelector('#generateButton');
const playerList = document.getElementById('player-list');

registerBtn.addEventListener('click', () => {
	registerPlayer(register_input.value);
});

let player_array = [];

const registerPlayer = () => {
	console.log(register_input.value);
};