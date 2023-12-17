const inputPassword = document.querySelector(".input-password");
const inputRange = document.querySelector(".input-range");
const sliderNumber = document.querySelector(".slider-number");
const generateButton = document.querySelector(".generate-button");
const copyIcon = document.querySelector(".copy-icon");

let allCharacters =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789^!$%&|[](){}:;.,*+-#@<>~";

const generatePassword = () => {
  let newPassword = "";
  for (let i = 0; i < inputRange.value; i++) {
    let randomNumber = Math.floor(Math.random() * allCharacters.length);
    newPassword += allCharacters[randomNumber];
  }
  inputPassword.value = newPassword;
    copyIcon.classList.replace("uil-file-check-alt", "uil-copy");
};

inputRange.addEventListener("input", () => {
  sliderNumber.innerText = inputRange.value;
});

copyIcon.addEventListener("click", () => {
  navigator.clipboard.writeText(inputPassword.value);
  copyIcon.classList.replace("uil-copy", "uil-file-check-alt");
});

generateButton.addEventListener("click", () => {
  generatePassword();
});
