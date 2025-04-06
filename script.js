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
const numberStatusElement = document.getElementById('number-status');
const songMessageElement = document.getElementById('song-message');
const foodMessageElement = document.getElementById('food-message');
const themeToggleBtn = document.getElementById('theme-toggle');
const bodyElement = document.body;
const songBoxElement = document.getElementById('song-box');
const toggleSongBoxBtn = document.getElementById('toggle-song-box');

// State variables
let currentNumber = 0;
let numberHistory = [];
let foodList = [];
let isSongBoxVisible = true;

// Initialize
updateNumberDisplay();
updateFoodList();

// Theme toggle
themeToggleBtn.addEventListener('click', () => {
    bodyElement.classList.toggle('dark-mode');
    themeToggleBtn.textContent = bodyElement.classList.contains('dark-mode') 
        ? 'Toggle Light Mode' 
        : 'Toggle Dark Mode';
});

// Song functions
document.getElementById('change-song-btn').addEventListener('click', () => {
    const randomSong = songs[Math.floor(Math.random() * songs.length)];
    currentSongElement.textContent = randomSong;
    songCountElement.textContent = parseInt(songCountElement.textContent) + 1;
    
    // Add highlight effect
    currentSongElement.classList.add('highlight');
    setTimeout(() => {
        currentSongElement.classList.remove('highlight');
    }, 1000);
    
    // Dynamic message
    songMessageElement.textContent = `Now playing: ${randomSong.split(' - ')[0]}`;
});

document.getElementById('add-song-btn').addEventListener('click', () => {
    const newSong = prompt("Enter a new song:");
    if (newSong) {
        songs.push(newSong);
        currentSongElement.textContent = newSong;
        songCountElement.textContent = parseInt(songCountElement.textContent) + 1;
        songMessageElement.textContent = `Added new song: ${newSong}`;
    }
});

// Toggle song box visibility
toggleSongBoxBtn.addEventListener('click', () => {
    isSongBoxVisible = !isSongBoxVisible;
    songBoxElement.style.display = isSongBoxVisible ? 'block' : 'none';
    toggleSongBoxBtn.textContent = isSongBoxVisible ? 'Hide Song Box' : 'Show Song Box';
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

document.getElementById('reset-number-btn').addEventListener('click', () => {
    currentNumber = 0;
    numberHistory = [];
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
    
    // Update number status with dynamic styling
    if (currentNumber > 0) {
        numberStatusElement.textContent = 'Status: Positive';
        numberStatusElement.className = 'positive';
    } else if (currentNumber < 0) {
        numberStatusElement.textContent = 'Status: Negative';
        numberStatusElement.className = 'negative';
    } else {
        numberStatusElement.textContent = 'Status: Neutral';
        numberStatusElement.className = '';
    }
    
    // Add animation to current number
    currentNumberElement.classList.add('highlight');
    setTimeout(() => {
        currentNumberElement.classList.remove('highlight');
    }, 1000);
}

// Food functions
document.getElementById('change-food-btn').addEventListener('click', () => {
    const randomFood = foods[Math.floor(Math.random() * foods.length)];
    favoriteFoodElement.textContent = randomFood;
    foodMessageElement.textContent = `You're now craving ${randomFood}!`;
    
    // Add animation
    favoriteFoodElement.classList.add('highlight');
    setTimeout(() => {
        favoriteFoodElement.classList.remove('highlight');
    }, 1000);
});

document.getElementById('add-food-btn').addEventListener('click', () => {
    const randomFood = foods[Math.floor(Math.random() * foods.length)];
    foodList.push(randomFood);
    updateFoodList();
    foodMessageElement.textContent = `Added ${randomFood} to your list!`;
});

document.getElementById('clear-food-btn').addEventListener('click', () => {
    foodList = [];
    updateFoodList();
    foodMessageElement.textContent = 'Food list cleared!';
});

function updateFoodList() {
    foodListElement.innerHTML = '';
    foodList.forEach(food => {
        const li = document.createElement('li');
        li.textContent = food;
        
        // Add click event to remove items
        li.addEventListener('click', () => {
            foodList = foodList.filter(item => item !== food);
            updateFoodList();
            foodMessageElement.textContent = `Removed ${food} from your list!`;
        });
        
        foodListElement.appendChild(li);
    });
}