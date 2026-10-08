const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");

function closeMenu() {
  if (!menuToggle || !navMenu) return;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Hap menunë");
  navMenu.classList.remove("is-open");
}

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Hap menunë" : "Mbyll menunë");
    navMenu.classList.toggle("is-open", !isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        event.preventDefault();
        target.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
        });
      }
      closeMenu();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  document.addEventListener("click", (event) => {
    if (
      menuToggle.getAttribute("aria-expanded") === "true" &&
      !navMenu.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });
}

const moodMessages = {
  "shume-mire": "Sa bukur! Lejoji vetes ta shijosh këtë moment të mirë.",
  mire: "Është mirë të ndihesh mirë. Vazhdo të kujdesesh për veten.",
  neutral: "Edhe ditët neutrale janë pjesë e jetës. Merri gjërat me ritmin tënd.",
  trishtuar: "Më vjen keq që po ndihesh kështu. Ji i/e butë me veten dhe fol me dikë që beson.",
  stresuar: "Merr një pauzë të vogël dhe merr frymë ngadalë. Nuk ke pse t’i zgjidhësh të gjitha menjëherë.",
};

const moodOptions = document.querySelectorAll(".mood-option");
const moodMessage = document.querySelector("#mood-message");

moodOptions.forEach((option) => {
  option.addEventListener("click", () => {
    moodOptions.forEach((button) => button.setAttribute("aria-pressed", "false"));
    option.setAttribute("aria-pressed", "true");
    if (moodMessage) {
      moodMessage.textContent = moodMessages[option.dataset.mood] ?? "Faleminderit që ndalove për të reflektuar.";
    }
  });
});

const year = document.querySelector("#year");
if (year) year.textContent = String(new Date().getFullYear());

const revealElements = document.querySelectorAll(".reveal");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !reduceMotion) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}
