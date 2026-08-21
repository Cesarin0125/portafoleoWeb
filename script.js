//MENÚ MÓVIL
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        menuBtn.classList.remove("active");
        navLinks.classList.remove("active");
    });
});

//NAVBAR AL HACER SCROLL
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

//LINK ACTIVO SEGÚN SECCIÓN
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navItems.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

// EFECTO TYPING 
const typingText = document.getElementById("typing-text");
const roles = [
    "Desarrollador de Software Junior Inicial",
    "Amante del código",
    "Siempre aprendiendo",
    "Dispuesto a aprender"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 90;

function typeEffect() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 45;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 1800; 
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400;
    }

    setTimeout(typeEffect, typingSpeed);
}

setTimeout(typeEffect, 800);

//REVEAL AL HACER SCROLL
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }
    });
}, {
    threshold: 0.15,
    rootMargin: "0px 0px -40px 0px"
});

revealElements.forEach(el => revealObserver.observe(el));

//BARRAS DE HABILIDADES
const progressBars = document.querySelectorAll(".progress");

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const level = bar.getAttribute("data-level");
            bar.style.width = level + "%";
            skillsObserver.unobserve(bar);
        }
    });
}, {
    threshold: 0.4
});

progressBars.forEach(bar => skillsObserver.observe(bar));

//EFECTO 3D EN EL BLOQUE DE CÓDIGO
const codeWindow = document.getElementById("code-window");

if (codeWindow) {
    document.addEventListener("mousemove", (e) => {
        if (window.innerWidth < 980) return;

        const rect = codeWindow.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const rotateX = (e.clientY - centerY) / 35;
        const rotateY = (centerX - e.clientX) / 35;

        codeWindow.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    codeWindow.addEventListener("mouseleave", () => {
        codeWindow.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
    });
}