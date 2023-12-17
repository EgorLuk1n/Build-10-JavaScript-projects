// Выбираем элементы DOM
const showModalBtn = document.querySelector(".show-modal");
const bottomSheet = document.querySelector(".bottom-sheet");
const sheetOverlay = bottomSheet.querySelector(".sheet-overlay");
const sheetContent = bottomSheet.querySelector(".content");
const dragIcon = bottomSheet.querySelector(".drag-icon");
// Глобальные переменные для отслеживания событий перетаскивания
let isDragging = false,
  startY,
  startHeight;
// Показываем нижний лист, скрываем вертикальную полосу прокрутки тела и вызываем updateSheetHeight
const showBottomSheet = () => {
  bottomSheet.classList.add("show");
  document.body.style.overflowY = "hidden";
  updateSheetHeight(50);
};
const updateSheetHeight = (height) => {
  sheetContent.style.height = `${height}vh`; //обновляет высоту содержимого листа
// Переключает полноэкранный класс на нижний лист, если высота равна 100
  bottomSheet.classList.toggle("fullscreen", height === 100);
};
// Скрываем нижний лист и отображаем вертикальную полосу прокрутки тела
const hideBottomSheet = () => {
  bottomSheet.classList.remove("show");
  document.body.style.overflowY = "auto";
};
// Устанавливаем начальную позицию перетаскивания, высоту содержимого листа и добавляем класс перетаскивания на нижний лист
const dragStart = (e) => {
  isDragging = true;
  startY = e.pageY || e.touches?.[0].pageY;
  startHeight = parseInt(sheetContent.style.height);
  bottomSheet.classList.add("dragging");
};
// Вычисляет новую высоту содержимого листа и вызывает функцию updateSheetHeight
const dragging = (e) => {
  if (!isDragging) return;
  const delta = startY - (e.pageY || e.touches?.[0].pageY);
  const newHeight = startHeight + (delta / window.innerHeight) * 100;
  updateSheetHeight(newHeight);
};
// Определяет, следует ли скрыть, установить полноэкранный режим или установить значение по умолчанию
// высота на основе текущей высоты содержимого листа
const dragStop = () => {
  isDragging = false;
  bottomSheet.classList.remove("dragging");
  const sheetHeight = parseInt(sheetContent.style.height);
  sheetHeight < 25
    ? hideBottomSheet()
    : sheetHeight > 75
    ? updateSheetHeight(100)
    : updateSheetHeight(50);
};
dragIcon.addEventListener("mousedown", dragStart);
document.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
dragIcon.addEventListener("touchstart", dragStart);
document.addEventListener("touchmove", dragging);
document.addEventListener("touchend", dragStop);
sheetOverlay.addEventListener("click", hideBottomSheet);
showModalBtn.addEventListener("click", showBottomSheet);
