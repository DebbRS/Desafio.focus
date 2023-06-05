const buttonPlay = document.querySelector("#button_play");
const buttonStop = document.querySelector("#button_stop");
const buttonPlus = document.querySelector("#button_plus");
const buttonMinus = document.querySelector("#button_minus");
const buttonForestSound = document.querySelector(".sounds_forest");
const buttonRainSound = document.querySelector(".sounds_rain");
const buttonShopSound = document.querySelector(".sounds_shop");
const buttonFireplaceSound = document.querySelector(".sounds_fireplace");
const minutesDisplay = document.querySelector(".minutes");
const secondsDisplay = document.querySelector(".seconds");
const buttonToogleDarkMode = document.querySelector("#dark_mode");
const buttonToogleLightMode = document.querySelector("#light_mode");
const container = document.querySelector(".container");
let timerTimeOut;
let minutes = Number(minutesDisplay.textContent);

const soundForest = new Audio("./sounds/Forest.wav");
const soundRain = new Audio("./sounds/rain.wav");
const soundShop = new Audio("./sounds/shop.wav");
const soundFirePlace = new Audio("./sounds/fire.wav");

CreateEvents();

function updateDisplay(minutes, seconds) {
  minutesDisplay.textContent = String(minutes).padStart(2, "0");
  secondsDisplay.textContent = String(seconds).padStart(2, "0");
}

function CreateEvents() {
  buttonPlay.addEventListener("click", function () {
    countdown();
  });
  buttonStop.addEventListener("click", function () {
    reset();
  });
  buttonPlus.addEventListener("click", function () {
    updateMinutes(5);
  });
  buttonMinus.addEventListener("click", function () {
    updateMinutes(-5);
  });
  buttonForestSound.addEventListener("click", function () {
    soundClick(buttonForestSound, soundForest);
  });
  buttonRainSound.addEventListener("click", function () {
    soundClick(buttonRainSound, soundRain);
  });
  buttonShopSound.addEventListener("click", function () {
    soundClick(buttonShopSound, soundShop);
  });
  buttonFireplaceSound.addEventListener("click", function () {
    soundClick(buttonFireplaceSound, soundFirePlace);
  });

  buttonToogleDarkMode.addEventListener("click", function() {
    container.classList.add("dark_mode");
    buttonToogleDarkMode.classList.add("hide");
    buttonToogleLightMode.classList.remove("hide");
    buttonRainSound.classList.add("card_dark_mode");
    buttonFireplaceSound.classList.add("card_dark_mode");
    buttonForestSound.classList.add("card_dark_mode");
    buttonShopSound.classList.add("card_dark_mode");
    buttonForestSound.classList.add("card_dark_mode_background");
    buttonFireplaceSound.classList.add("card_dark_mode_background");
    buttonRainSound.classList.add("card_dark_mode_background");
    buttonShopSound.classList.add("card_dark_mode_background");
  })

  buttonToogleLightMode.addEventListener("click", function() {
    container.classList.remove("dark_mode");
    buttonToogleDarkMode.classList.remove("hide");
    buttonToogleLightMode.classList.add("hide");
    buttonRainSound.classList.remove("card_dark_mode");
    buttonFireplaceSound.classList.remove("card_dark_mode");
    buttonForestSound.classList.remove("card_dark_mode");
    buttonShopSound.classList.remove("card_dark_mode");
    buttonForestSound.classList.remove("card_dark_mode_background");
    buttonFireplaceSound.classList.remove("card_dark_mode_background");
    buttonRainSound.classList.remove("card_dark_mode_background");
    buttonShopSound.classList.remove("card_dark_mode_background");

  })
}

function countdown() {
  timerTimeOut = setTimeout(function () {
    let seconds = Number(secondsDisplay.textContent);
    let minutes = Number(minutesDisplay.textContent);

    if (seconds <= 0) {
      seconds = 60;
      --minutes;
    }

    updateDisplay(minutes, String(seconds - 1));
    countdown();
  }, 1000);
}

function reset() {
  updateDisplay(minutes, 0);
  clearTimeout(timerTimeOut);
}

function updateMinutes(newMinutes) {
  newMinutes = Number(minutesDisplay.textContent) + Number(newMinutes);
  let seconds = Number(secondsDisplay.textContent);
  if (newMinutes <= 0) {
    reset();
    clearAllSound();
    return;
  }
  updateDisplay(newMinutes, seconds);
  clearTimeout(timerTimeOut);
  countdown();
}

function soundClick(button, sound) {
  var is_darkMode = container.classList.contains("dark_mode");
  console.log(is_darkMode)
  if (button.classList.contains("sounds_icon_checked") || button.classList.contains("sounds_icon_checked_dark")) {
    button.classList.remove("sounds_icon_checked", "sounds_card_checked", "sounds_icons_checked_dark", "sounds_card_checked_dark");
    sound.pause();
    return;
  }
  clearAllSound();
  if (is_darkMode) {
    button.classList.add("sounds_icon_checked_dark", "sounds_card_checked_dark");
  }
  else {
    button.classList.add("sounds_icon_checked", "sounds_card_checked");
  }
  
  sound.play();
}

function clearAllSound() {
  const sounds = document.querySelectorAll(".sounds_icon_checked");
  sounds.forEach((sound) => {
    sound.classList.remove("sounds_icon_checked", "sounds_card_checked");
  });
  [soundFirePlace, soundForest, soundRain, soundShop].forEach((sound) => {
    sound.pause();
  });
}
