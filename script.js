const hamburger = document.getElementById("hamburger");
const navmenu = document.getElementById("navmenu");

hamburger.addEventListener("click", () => {
  navmenu.classList.toggle("show");
});

window.addEventListener("scroll", function () {
  const statsSection = document.querySelector(".stats-section");
  const stickyCta = document.getElementById("stickyCta");

  if (!statsSection || !stickyCta) {
    console.log("❌ Missing element");
    return;
  }

  const rect = statsSection.getBoundingClientRect();

  // rect.bottom = distance from section's bottom to viewport top
  if (rect.bottom < window.innerHeight - 50) {
    stickyCta.style.display = "block"; // show
  } else {
    stickyCta.style.display = "none"; // hide
  }
});


const modal = document.getElementById("contactModal");
const closeBtn = document.querySelector(".close-btn");

// Even though it's an id, use querySelectorAll
const openButtons = document.querySelectorAll("#contactBtn");

// Loop through all
openButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    modal.style.display = "block";
  });
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});



const rates = {
  chennai: { basic: 1850, classic: 2270, premium: 2540, royale: 2910 },
  bengaluru: { basic: 1700, classic: 2220, premium: 2590, royale: 2970 },
  hyderabad: { basic: 1800, classic: 2200, premium: 2580, royale: 2950 },
  mysuru: { basic: 1800, classic: 2220, premium: 2500, royale: 2980 },
  delhi: { basic: 1600, classic: 2220, premium: 2590, royale: 2950 },
  gurgaon: { basic: 1980, classic: 2200, premium: 2570, royale: 2940 },
  noida: { basic: 1870, classic: 2290, premium: 2560, royale: 2930 },
  ghaziabad: { basic: 1760, classic: 2280, premium: 2550, royale: 2920 },
  faridabad: { basic: 1750, classic: 2270, premium: 2540, royale: 2910 },
  pune: { basic: 1880, classic: 2200, premium: 2580, royale: 2950 }
};

const citySelect = document.getElementById("citySelect");
const basicRate = document.getElementById("basicRate");
const classicRate = document.getElementById("classicRate");
const premiumRate = document.getElementById("premiumRate");
const royaleRate = document.getElementById("royaleRate");

function updateRates(city) {
  const cityRates = rates[city];
  basicRate.textContent = `₹${cityRates.basic} /sqft (Incl. GST)`;
  classicRate.textContent = `₹${cityRates.classic} /sqft (Incl. GST)`;
  premiumRate.textContent = `₹${cityRates.premium} /sqft (Incl. GST)`;
  royaleRate.textContent = `₹${cityRates.royale} /sqft (Incl. GST)`;
}

// Event listener
citySelect.addEventListener("change", function () {
  updateRates(this.value);
});

// Default
updateRates("chennai");


document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");

  const runCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    const duration = 2000;
    const stepTime = 20;
    const steps = Math.ceil(duration / stepTime);
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.innerText = target.toLocaleString();
        clearInterval(timer);
      } else {
        counter.innerText = Math.floor(current).toLocaleString();
      }
    }, stepTime);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          runCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((counter) => observer.observe(counter));
});




let currentStep = 1;
const totalSteps = 6;

function showStep(step) {
  document.querySelectorAll('.step-content').forEach(el => el.classList.remove('active'));
  document.querySelector(`#step-${step}`).classList.add('active');

  document.querySelectorAll('.steps-nav .step').forEach(el => el.classList.remove('active'));
  document.querySelector(`.steps-nav .step[data-step="${step}"]`).classList.add('active');

  currentStep = step;
}

// Manual click event
document.querySelectorAll('.steps-nav .step').forEach(el => {
  el.addEventListener('click', () => {
    const step = parseInt(el.getAttribute('data-step'));
    showStep(step);
  });
});

// Auto-play (every 4 seconds)
setInterval(() => {
  let nextStep = currentStep + 1;
  if (nextStep > totalSteps) nextStep = 1;
  showStep(nextStep);
}, 3000);

// Start at Step 1
showStep(1);


const steps = document.querySelectorAll(".timeline-step");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
}, { threshold: 0.3 });

steps.forEach(step => observer.observe(step));

// Extra reset: when you scroll back to the very top, remove 'show' from all
window.addEventListener("scroll", () => {
  if (window.scrollY === 0) {
    steps.forEach(step => step.classList.remove("show"));
  }
});

// FAQ Toggle
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.parentElement;
    item.classList.toggle('active');
  });
});


(function () {
  try {
    const headings = [].slice.call(document.querySelectorAll('h2'));
    if (!headings.length) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');  // animate in
          } else {
            entry.target.classList.remove('visible'); // reset when out of view
          }
        });
      }, {
        root: null,
        rootMargin: '0px 0px -5% 0px',
        threshold: 0.1
      });

      headings.forEach(h => observer.observe(h));
      return;
    }

    // ---- Fallback for old browsers ----
    const checkInView = () => {
      const winH = window.innerHeight || document.documentElement.clientHeight;
      headings.forEach(h => {
        const rect = h.getBoundingClientRect();
        if (rect.top <= winH * 0.95 && rect.bottom >= 0) {
          h.classList.add('visible');
        } else {
          h.classList.remove('visible');
        }
      });
    };

    checkInView();
    window.addEventListener('scroll', checkInView, { passive: true });

  } catch (err) {
    console.error('Heading animation failed:', err);
    document.querySelectorAll('h2').forEach(h => h.classList.add('visible'));
  }
})();


function calculateEstimate() {
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const location = document.getElementById('location').value.trim();
  const areaValue = document.getElementById('area').value;

  const resultBox = document.getElementById('result');
  const area = Number(areaValue);

  if (!name || !phone || !location || !areaValue || isNaN(area) || area <= 0) {
    resultBox.style.display = "block";
    resultBox.innerHTML = `<p style="color:red;">⚠️ Please fill all fields correctly.</p>`;
    return;
  }

  const baseRate = 1950; // per sqft
  const estimate = area * baseRate;

  resultBox.style.display = "block";
resultBox.innerHTML = `
  <strong>Hi ${name},</strong>
  <p>Estimated Construction Cost for your project in <strong>${location}</strong> is:</p>
  ₹ ${estimate.toLocaleString("en-IN")}
`;
// reset form AFTER showing result
  document.getElementById('estimatorForm').reset();  
}
