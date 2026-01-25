console.log("JS loaded");

/* =========================
   BURGER MENU
========================= */
const burger = document.getElementById("burger");
const menu = document.getElementById("menu");

burger.addEventListener("click", () => {
  menu.classList.toggle("active");
});

/* =========================
   SMOOTH SCROLL (JS)
========================= */
const navLinks = document.querySelectorAll('a[href^="#"]');

navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

    // закрываем меню на мобиле
    menu.classList.remove("active");
  });
});

/* =========================
   ACTIVE NAV LINK
========================= */
const sections = document.querySelectorAll("section");
const menuLinks = document.querySelectorAll(".nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  menuLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

/* =========================
   SECTION FADE-IN
========================= */
const animatedSections = document.querySelectorAll(".section");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

animatedSections.forEach(section => observer.observe(section));

/* =========================
   SCROLL TO TOP
========================= */
const toTop = document.getElementById("toTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    toTop.classList.add("show");
  } else {
    toTop.classList.remove("show");
  }
});

toTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
