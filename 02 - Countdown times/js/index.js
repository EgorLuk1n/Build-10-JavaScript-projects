const items = document.querySelectorAll(".countdown-item > h4");
const countdownElement = document.querySelector(".countdown");

//Начало отчета с даты
let countdownDate = new Date(2024, 9, 31, 18, 0).getTime();

function getCountdownTime() {
  //Текущее время в миллисекундах
  const now = new Date().getTime();
  //Разница во времени
  const distance = countdownDate - now;
  //1с = 1000мс
  //1м = 60с
  //1ч = 60м
  //1д = 24ч

  //Переменные в миллисекундах
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;

  //Перевод для дней, часов, минут, секунд
  let days = Math.floor(distance / oneDay);
  let hours = Math.floor((distance % oneDay) / oneHour);
  let minutes = Math.floor((distance % oneHour) / oneMinute);
  let seconds = Math.floor((distance % oneMinute) / 1000);

  //Массив с переменными
  const values = [days, hours, minutes, seconds];

  //Добавление переменных
  items.forEach(function (item, index) {
    item.textContent = values[index];

    //По окончанию таймара
    if (distance < 0) {
      clearInterval(countdown);
      countdownElement.innerHTML = `<h4 class="countdown-finish">It seems Hachiko waited &#128021</h4>`;
    }
  });
}

let countdown = setInterval(getCountdownTime, 1000);
getCountdownTime();
