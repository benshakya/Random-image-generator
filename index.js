const btnEl = document.getElementById("button");
const imageContainerEl = document.getElementById("image-container");
const errorMessageEl = document.getElementById("error-message");

async function fetchImage() {
  const inputValue = document.getElementById("input").value;
  if (inputValue > 10 || inputValue < 1) {
    errorMessageEl.style.display = "block";
    errorMessageEl.innerText = "Please enter value between 0 and 11";
    return;
  }
  let imgs = "";

  try {
    btnEl.style.display = "none";
    const loadingEl = `<img src = "spinner.svg" width="20px"/>`;
    imageContainerEl.innerHTML = loadingEl;
    await fetch(
      `https://api.unsplash.com/photos?per_page=${inputValue}&page=${Math.round(
        Math.random() * 1000
      )}&client_id=xdZGM2elellnYvOsv3Nf4-cIBe855fXUxxvtC5mEhxE`
    ).then((res) =>
      res.json().then((data) => {
        if (data) {
          data.forEach((pic) => {
            imgs += `<img src= "${pic.urls.small}" alt="image"/>`;
          });
          imageContainerEl.style.display = "block";
          imageContainerEl.innerHTML = imgs;
          errorMessageEl.style.display = "none";
          btnEl.style.display = "block";
        }
      })
    );
  } catch (error) {
    errorMessageEl.style.display = "block";
    errorMessageEl.innerText = "An error occured, please try again later";
    btnEl.style.display = "block";
    imageContainerEl.style.display = none;
  }
}

btnEl.addEventListener("click", fetchImage);

// dark mode
const bodyEl = document.querySelector("body");
const darkEl = document.querySelector(".dark");
const lightEl = document.querySelector(".light");

darkEl.addEventListener("click", () => {
  bodyEl.style.background = "black";
  bodyEl.style.color = "white";
  btnEl.style.background = "white";
  btnEl.style.color = "black";
});

lightEl.addEventListener("click", () => {
  bodyEl.style.background = "white";
  bodyEl.style.color = "black";
  btnEl.style.background = "black";
  btnEl.style.color = "white";
});
