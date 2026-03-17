// ==========================
// TYPING EFFECT
// ==========================
const words = [
  "Aspiring Software Developer",
  "Full Stack Developer",
  "Creative Coder"
];

let i = 0, j = 0, deleting = false;

function typeEffect() {
  const typingEl = document.getElementById("typing");
  if (!typingEl) return;

  let current = words[i];
  typingEl.textContent = current.substring(0, j);

  if (!deleting && j < current.length) {
    j++;
  } else if (deleting && j > 0) {
    j--;
  } else {
    deleting = !deleting;
    if (!deleting) i = (i + 1) % words.length;
  }

  setTimeout(typeEffect, deleting ? 50 : 100);
}
typeEffect();


// ==========================
// PROJECT FILTER
// ==========================
function filter(type) {
  document.querySelectorAll(".project").forEach(p => {
    p.style.display =
      (type === "all" || p.classList.contains(type)) ? "block" : "none";
  });
}


// ==========================
// ANIMATED BACKGROUND (PRO LEVEL)
// ==========================
const canvas = document.getElementById("bg");

if (canvas) {
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];

  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: Math.random() * 1 - 0.5,
      vy: Math.random() * 1 - 0.5,
      size: Math.random() * 2 + 1
    });
  }

  let mouse = { x: null, y: null };

  document.addEventListener("mousemove", e => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  function drawLines() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a; b < particles.length; b++) {
        let dx = particles[a].x - particles[b].x;
        let dy = particles[a].y - particles[b].y;
        let dist = dx * dx + dy * dy;

        if (dist < 10000) {
          ctx.strokeStyle = "rgba(0,255,255,0.1)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      // Bounce edges
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = "cyan";
      ctx.fill();

      // Mouse interaction
      if (mouse.x !== null && mouse.y !== null) {
        let dx = p.x - mouse.x;
        let dy = p.y - mouse.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          p.x += dx / 10;
          p.y += dy / 10;
        }
      }
    });

    drawLines();
    requestAnimationFrame(animate);
  }

  animate();

  // Resize fix
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}
// ==========================
// CONTACT FORM SUBMIT
// ==========================
const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    document.getElementById("form-msg").textContent = "Thank you! Message sent.";
    form.reset();
  });
}

// ==========================
// SKILL BAR ANIMATION
// ==========================
const skillBars = document.querySelectorAll(".skill .bar div");
skillBars.forEach(bar => {
  const width = bar.style.width;
  bar.style.width = "0";
  setTimeout(() => {
    bar.style.width = width;
  }, 500);
});