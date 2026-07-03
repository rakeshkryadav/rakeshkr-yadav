// ======================================
// Mobile Navigation
// ======================================

const menuBtn = document.querySelector(".menu-btn");
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".nav-links a");

menuBtn.addEventListener("click", () => {
    navbar.classList.toggle("active");

    const icon = menuBtn.querySelector("i");

    if (navbar.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
    } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
    }
});

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("active");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");

    });

});

// ======================================
// Sticky Header
// ======================================

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});

// ======================================
// Active Navigation
// ======================================

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});

// ======================================
// Typing Effect
// ======================================

const typingElement = document.querySelector(".typing");

const words = [
    "Unity Game Developer",
    "Gameplay Programmer",
    "Multiplayer Developer",
    "C# Developer",
    "WebGL Developer"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    const currentWord = words[wordIndex];

    if (!deleting) {

        typingElement.textContent =
            currentWord.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentWord.length) {

            deleting = true;

            setTimeout(typeEffect, 1500);

            return;

        }

    }
    else {

        typingElement.textContent =
            currentWord.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex >= words.length)
                wordIndex = 0;

        }

    }

    setTimeout(typeEffect, deleting ? 60 : 120);

}

typeEffect();

// ======================================
// Scroll Reveal
// ======================================

const revealElements = document.querySelectorAll(

    ".about-content, .skill-card, .project-card, .timeline-item, .contact-form"

);

const observer = new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("active");

}

});

},

{

threshold:0.15

}

);

revealElements.forEach(element=>{

element.classList.add("reveal");

observer.observe(element);

});

// ======================================
// Back To Top
// ======================================

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll",()=>{

if(window.scrollY>500){

backToTop.classList.add("show");

}
else{

backToTop.classList.remove("show");

}

});

backToTop.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

// ======================================
// Smooth Scroll
// ======================================

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

const target=document.querySelector(this.getAttribute("href"));

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

});

});

// ======================================
// Contact Form
// ======================================

const form=document.querySelector(".contact-form");

form.addEventListener("submit",function(e){

e.preventDefault();

const inputs=form.querySelectorAll("input, textarea");

let valid=true;

inputs.forEach(input=>{

if(input.value.trim()===""){

valid=false;

input.style.borderColor="red";

}
else{

input.style.borderColor="";

}

});

if(valid){

alert("Thank you! Your message has been received.");

form.reset();

}

});

// ======================================
// Hero Fade In
// ======================================

window.addEventListener("load",()=>{

document.body.style.opacity="1";

});

// ======================================
// Console Greeting
// ======================================

console.log("%cWelcome to my Portfolio!",
"color:#00d9ff;font-size:18px;font-weight:bold;");

console.log("Developed with HTML, CSS and JavaScript.");

// ======================================
// Current Year
// ======================================

const yearElement=document.querySelector("#year");

if(yearElement){

yearElement.textContent=new Date().getFullYear();

}