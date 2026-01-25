// BURGER MENU
const burger = document.getElementById("burger");
const menu = document.getElementById("menu");

burger.addEventListener("click", () => {
  menu.classList.toggle("active");
});

// SLIDER
const slides = document.querySelectorAll(".slides img");
let index = 0;

function showSlide(n) {
  slides.forEach(slide => slide.classList.remove("active"));
  slides[n].classList.add("active");
}

document.getElementById("next").onclick = () => {
  index = (index + 1) % slides.length;
  showSlide(index);
};

document.getElementById("prev").onclick = () => {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
};

// MODAL

const modal = document.getElementById("modal");
const openModal = document.getElementById("openModal");

const closeButtons = document.querySelectorAll(
  ".close, .modal-btn-close"
);

// 2️⃣ Открытие модалки
openModal.addEventListener("click", () => {
  modal.classList.add("active");
});

// 3️⃣ Закрытие по кнопкам
closeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    modal.classList.remove("active");
  });
});

// 4️⃣ Закрытие по клику на фон
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});

// 5️⃣ Закрытие по ESC (ПОСЛЕДНИМ)
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    modal.classList.remove("active");
  }
});


