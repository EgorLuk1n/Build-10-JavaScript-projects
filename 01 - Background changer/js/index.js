const button = document.getElementById("btn");
const color = document.querySelector(".color");
const hex = "0123456789ABCDEF";

button.addEventListener("click", () => {
  let hexColor = generationHex();
  document.body.style.backgroundColor = hexColor;
  color.textContent = hexColor;
});

function generationHex() {
  let hexColor = "#";
  for (let i = 0; i < 6; i++) {
    hexColor += hex[Math.floor(Math.random() * hex.length)];
  }
  return hexColor;
}
