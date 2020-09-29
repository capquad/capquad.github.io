"use strict";

const register_input = document.getElementById('register');
const addPlayerBtn = document.getElementById('addPlayer');
const registerBtn = document.getElementById('registerButton');
const generateBtn = document.getElementById('generateButton');
const playerList = document.getElementById('player-list');
const result = document.getElementById('result');


let player_array = [];

const registerPlayer = () => {
	const value = register_input.value;
	if (!player_array.includes(value)) {
		player_array.push(value);
		refreshPlayList(player_array);
	} else {
		alert('Player name already exists');
	}
};

const refreshPlayList = (array) => {
	let lists = "";
	if (array.length < 1) {
		lists += `<li class="player">No player added. Add 4 or more to play.</li>`;
	}
	array.forEach((item, index) => {
		lists += `<li class="player">${index + 1}. ${item}</li>`;
	});
	playerList.innerHTML = lists;
};

const savePlayers = () => {
	localStorage.setItem('latest-list', JSON.stringify(player_array));
};

const clearPlayers = () => {
	localStorage.removeItem('latest-list');
	player_array = [];
	refreshPlayList(player_array);
};

const getSavedList = () => {
	let list = localStorage.getItem('latest-list');
	if (list !== null) {
		player_array = JSON.parse(list);
		return refreshPlayList(JSON.parse(list));
	}
	return undefined;
};

const getRandomInt = (max) => {
	return Math.floor(Math.random() * Math.floor(max));
}

const getRandomPlayer = (array) => {
	if (array.length < 4){
		alert("Too few Players. Add More");
		return undefined;
	}
	
	result.innerHTML = `loading`;
	setTimeout(() => {
		let  max = array.length, first = getRandomInt(max), second = getRandomInt(max);
		while (first === second) {
			second = getRandomInt(max);
		}
		let firstplayer = array[first], secondplayer = array[second];
		result.innerHTML = `${firstplayer} & ${secondplayer}`;
	}, 3000);
}

addPlayerBtn.addEventListener('click', registerPlayer);

registerBtn.addEventListener('click', savePlayers);

generateBtn.addEventListener('click', () => {
	getRandomPlayer(player_array);
});

window.onload = () => {
	getSavedList();
};