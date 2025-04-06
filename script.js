// Data sets
const songs = [
    "Bohemian Rhapsody - Queen",
    "Hotel California - Eagles",
    "Imagine - John Lennon",
    "Sweet Child O'Mine - Guns N' Roses",
    "Billie Jean - Michael Jackson"
];

const foods = [
    "Pizza",
    "Sushi",
    "Tacos",
    "Pasta",
    "Burger",
    "Salad",
    "Curry",
    "Steak"
];

// DOM Elements
const currentSongElement = document.getElementById('current-song');
const songCountElement = document.getElementById('song-count');
const currentNumberElement = document.getElementById('current-number');
const numberHistoryElement = document.getElementById('number-history');
const favoriteFoodElement = document.getElementById('favorite-food');
const foodListElement = document.getElementById('food-list');

// State variables
let currentNumber = 0;
let numberHistory = [];
let foodList = [];

// Initialize
updateNumberDisplay();
updateFoodList();

// Song functions
document.getElementById('change-song-btn').addEventListener('click', () => {
    const randomSong = songs[Math.floor(Math.random() * songs.length)];
    currentSongElement.textContent = randomSong;
    songCountElement.textContent = parseInt(songCountElement.textContent) + 1;
});

document.getElementById('add-song-btn').addEventListener('click', () => {
    const newSong = prompt("Enter a new song:");
    if (newSong) {
        songs.push(newSong);
        currentSongElement.textContent = newSong;
        songCountElement.textContent = parseInt(songCountElement.textContent) + 1;
    }
});

// Number functions
document.getElementById('increment-btn').addEventListener('click', () => {
    currentNumber++;
    updateNumberDisplay();
});

document.getElementById('decrement-btn').addEventListener('click', () => {
    currentNumber--;
    updateNumberDisplay();
});

function updateNumberDisplay() {
    currentNumberElement.textContent = currentNumber;
    numberHistory.push(currentNumber);
    
    // Keep only last 5 numbers
    if (numberHistory.length > 5) {
        numberHistory = numberHistory.slice(-5);
    }
    
    numberHistoryElement.textContent = numberHistory.join(', ');
}

// Food functions
document.getElementById('change-food-btn').addEventListener('click', () => {
    const randomFood = foods[Math.floor(Math.random() * foods.length)];
    favoriteFoodElement.textContent = randomFood;
});

document.getElementById('add-food-btn').addEventListener('click', () => {
    const randomFood = foods[Math.floor(Math.random() * foods.length)];
    foodList.push(randomFood);
    updateFoodList();
});

function updateFoodList() {
    foodListElement.innerHTML = '';
    foodList.forEach(food => {
        const li = document.createElement('li');
        li.textContent = food;
        foodListElement.appendChild(li);
    });
}