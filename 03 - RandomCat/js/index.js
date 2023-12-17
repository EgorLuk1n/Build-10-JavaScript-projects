const button = document.querySelector(".btn");
const image = document.querySelector(".image");
const API = "https://api.thecatapi.com/v1/images/search";

async function fetchHandler() {
  try {
    const response = await fetch(API);
    const data = await response.json();
    image.src = data[0].url;
  } catch (error) {
    console.error(error);
  }
}

button.addEventListener("click", () => {
  const isLoading = image.complete;
  if (isLoading) {
    fetchHandler();
  }
});
