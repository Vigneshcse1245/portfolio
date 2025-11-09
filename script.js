document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(link.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});


const cursorParticle = document.createElement("div");
cursorParticle.style.position = "fixed";
cursorParticle.style.width = "12px";
cursorParticle.style.height = "12px";
cursorParticle.style.borderRadius = "50%";
cursorParticle.style.background = "cyan";
cursorParticle.style.boxShadow = "0 0 15px cyan";
cursorParticle.style.pointerEvents = "none";
cursorParticle.style.zIndex = "999";
cursorParticle.style.opacity = "0.6";
cursorParticle.style.transition = "transform 0.07s linear";
document.body.appendChild(cursorParticle);

document.addEventListener("mousemove", e => {
  cursorParticle.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

const tiltElements = document.querySelectorAll(".tilt");

tiltElements.forEach(el => {
  el.addEventListener("mousemove", e => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    el.style.transform = `
      perspective(600px)
      rotateX(${(-y / 25)}deg)
      rotateY(${(x / 25)}deg)
      scale3d(1.03, 1.03, 1.03)
    `;
  });

  el.addEventListener("mouseleave", () => {
    el.style.transform = "rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
  });
});

const enableIntro = true;

if (enableIntro) {
  const terminal = document.createElement("div");
  terminal.id = "terminal-intro";
  terminal.style.position = "fixed";
  terminal.style.top = "0";
  terminal.style.left = "0";
  terminal.style.width = "100%";
  terminal.style.height = "100%";
  terminal.style.background = "black";
  terminal.style.color = "cyan";
  terminal.style.fontFamily = "monospace";
  terminal.style.padding = "40px";
  terminal.style.zIndex = "9999";
  terminal.style.fontSize = "18px";
  terminal.style.whiteSpace = "pre-line";
  terminal.style.animation = "fadeOut 1s ease forwards";
  terminal.style.animationDelay = "5s";

  document.body.appendChild(terminal);

  const lines = [
    "Compiling assets…",
    "Optimizing modules…",
    "Generating interface…",
    "Launching application…"
  ];

  let index = 0;
  function typeLine() {
    if (index < lines.length) {
      terminal.innerText += lines[index] + "\n";
      index++;
      setTimeout(typeLine, 700);
    }
  }
  typeLine();

  setTimeout(() => terminal.remove(), 6500);
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("fade-in");
  });
});

document.querySelectorAll(".fade-section").forEach(sec => {
  observer.observe(sec);
});
