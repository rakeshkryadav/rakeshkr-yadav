/*==========================================================
APPLE PORTFOLIO
PART 1
Theme + Navigation
==========================================================*/

"use strict";

/*==========================================================
ELEMENTS
==========================================================*/

const header = document.getElementById("header");

const nav = document.querySelector("nav");

const menuBtn = document.querySelector(".menu-btn");

const navLinks = document.querySelectorAll(".nav-links a");

const themeToggle = document.querySelector(".theme-toggle");

const root = document.documentElement;


/*==========================================================
THEME
==========================================================*/

const savedTheme = localStorage.getItem("theme");

if (savedTheme) {

    root.setAttribute("data-theme", savedTheme);

} else {

    const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;

    root.setAttribute(
        "data-theme",
        prefersDark ? "dark" : "light"
    );

}

/*==========================================================
THEME BUTTON
==========================================================*/

function updateThemeIcon() {

    if (!themeToggle) return;

    const dark =
        root.getAttribute("data-theme") === "dark";

    themeToggle.innerHTML = dark

        ? '<i class="fa-solid fa-sun"></i>'

        : '<i class="fa-solid fa-moon"></i>';

}

updateThemeIcon();

themeToggle?.addEventListener("click", () => {

    document.documentElement.classList.add(
        "theme-transition"
    );

    const current =
        root.getAttribute("data-theme");

    const next =
        current === "dark"

        ? "light"

        : "dark";

    root.setAttribute("data-theme", next);

    localStorage.setItem("theme", next);

    updateThemeIcon();

    setTimeout(() => {

        document.documentElement.classList.remove(
            "theme-transition"
        );

    }, 400);

});


/*==========================================================
SYSTEM THEME CHANGE
==========================================================*/

window.matchMedia("(prefers-color-scheme: dark)")
.addEventListener("change", e => {

    if (localStorage.getItem("theme")) return;

    root.setAttribute(

        "data-theme",

        e.matches ? "dark" : "light"

    );

    updateThemeIcon();

});


/*==========================================================
MOBILE MENU
==========================================================*/

menuBtn?.addEventListener("click", () => {

    nav.classList.toggle("active");

    menuBtn.classList.toggle("active");

    menuBtn.innerHTML = menuBtn.classList.contains("active")

        ? '<i class="fa-solid fa-xmark"></i>'

        : '<i class="fa-solid fa-bars"></i>';

});


/*==========================================================
CLOSE MENU WHEN LINK CLICKED
==========================================================*/

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("active");

        menuBtn.classList.remove("active");

        menuBtn.innerHTML =
            '<i class="fa-solid fa-bars"></i>';

    });

});


/*==========================================================
SMOOTH SCROLL
==========================================================*/

navLinks.forEach(link => {

    link.addEventListener("click", e => {

        e.preventDefault();

        const target =
            document.querySelector(

                link.getAttribute("href")

            );

        if (!target) return;

        target.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    });

});


/*==========================================================
HEADER SCROLL EFFECT
==========================================================*/

function updateHeader() {

    if (window.scrollY > 40) {

        header.classList.add("scrolled");

    }

    else {

        header.classList.remove("scrolled");

    }

}

updateHeader();

window.addEventListener(

    "scroll",

    updateHeader,

    { passive: true }

);


/*==========================================================
ESC CLOSES MOBILE MENU
==========================================================*/

window.addEventListener("keydown", e => {

    if (e.key !== "Escape") return;

    nav.classList.remove("active");

    menuBtn.classList.remove("active");

    menuBtn.innerHTML =
        '<i class="fa-solid fa-bars"></i>';

});


/*==========================================================
CLICK OUTSIDE MENU
==========================================================*/

document.addEventListener("click", e => {

    if (window.innerWidth > 900) return;

    if (

        nav.contains(e.target) ||

        menuBtn.contains(e.target)

    ) return;

    nav.classList.remove("active");

    menuBtn.classList.remove("active");

    menuBtn.innerHTML =
        '<i class="fa-solid fa-bars"></i>';

});

/*==========================================================
APPLE PORTFOLIO
PART 2
Scroll Effects
==========================================================*/

"use strict";

/*==========================================================
ELEMENTS
==========================================================*/

const sections = document.querySelectorAll("section[id]");

const revealElements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right, .reveal-scale"
);

const backToTop = document.getElementById("backToTop");

const progressBars = document.querySelectorAll(".skill-progress");


/*==========================================================
ACTIVE NAVIGATION
==========================================================*/

function updateActiveNav() {

    const scrollY = window.pageYOffset + 150;

    sections.forEach(section => {

        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute("id");

        if (scrollY >= top && scrollY < top + height) {

            navLinks.forEach(link => {

                link.classList.remove("active");

                if (link.getAttribute("href") === "#" + id) {

                    link.classList.add("active");

                }

            });

        }

    });

}


/*==========================================================
BACK TO TOP
==========================================================*/

function updateBackToTop() {

    if (!backToTop) return;

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    }

    else {

        backToTop.classList.remove("show");

    }

}

backToTop?.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/*==========================================================
SCROLL REVEAL
==========================================================*/

const revealObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add("active");

            revealObserver.unobserve(entry.target);

        });

    },

    {

        threshold: 0.15

    }

);

revealElements.forEach(el => {

    revealObserver.observe(el);

});


/*==========================================================
SKILL PROGRESS ANIMATION
==========================================================*/

const skillObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const bars = entry.target.querySelectorAll(".skill-progress");

            bars.forEach(bar => {

                const width = bar.style.width;

                bar.style.width = "0";

                requestAnimationFrame(() => {

                    setTimeout(() => {

                        bar.style.width = width;

                    }, 150);

                });

            });

            skillObserver.unobserve(entry.target);

        });

    },

    {

        threshold: 0.35

    }

);

document.querySelectorAll(".skill-card").forEach(card => {

    skillObserver.observe(card);

});


/*==========================================================
SCROLL EVENTS
==========================================================*/

function onScroll() {

    updateHeader();

    updateActiveNav();

    updateBackToTop();

}

window.addEventListener(

    "scroll",

    onScroll,

    { passive: true }

);

onScroll();

/*==========================================================
APPLE PORTFOLIO
PART 3
Final Polish
==========================================================*/

"use strict";

/*==========================================================
CURSOR GLOW
==========================================================*/

const cursorGlow = document.querySelector(".cursor-glow");

if (cursorGlow && window.innerWidth > 900) {

    let mouseX = 0;
    let mouseY = 0;

    let glowX = 0;
    let glowY = 0;

    document.addEventListener("mousemove", e => {

        mouseX = e.clientX;
        mouseY = e.clientY;

    });

    function animateGlow() {

        glowX += (mouseX - glowX) * 0.15;
        glowY += (mouseY - glowY) * 0.15;

        cursorGlow.style.left = glowX + "px";
        cursorGlow.style.top = glowY + "px";

        requestAnimationFrame(animateGlow);

    }

    animateGlow();

}

/*==========================================================
PAGE LOADED
==========================================================*/

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});

/*==========================================================
PARALLAX HERO
==========================================================*/

const heroImage = document.querySelector(".image-card");

window.addEventListener("mousemove", e => {

    if (!heroImage) return;

    if (window.innerWidth < 992) return;

    const x = (e.clientX / window.innerWidth - 0.5) * 12;
    const y = (e.clientY / window.innerHeight - 0.5) * 12;

    heroImage.style.transform =
        `rotateY(${x}deg) rotateX(${-y}deg)`;

});

/*==========================================================
RESET HERO
==========================================================*/

heroImage?.addEventListener("mouseleave", () => {

    heroImage.style.transform =
        "rotateY(0deg) rotateX(0deg)";

});

/*==========================================================
BUTTON RIPPLE
==========================================================*/

document.querySelectorAll(".btn").forEach(button => {

    button.addEventListener("click", function(e) {

        const circle = document.createElement("span");

        const size = Math.max(

            this.clientWidth,

            this.clientHeight

        );

        const rect = this.getBoundingClientRect();

        circle.style.width = size + "px";
        circle.style.height = size + "px";

        circle.style.left =
            (e.clientX - rect.left - size / 2) + "px";

        circle.style.top =
            (e.clientY - rect.top - size / 2) + "px";

        circle.className = "ripple";

        this.appendChild(circle);

        setTimeout(() => {

            circle.remove();

        }, 600);

    });

});

/*==========================================================
IMAGE LAZY LOADING
==========================================================*/

document.querySelectorAll("img").forEach(img => {

    img.loading = "lazy";

});

/*==========================================================
CONSOLE MESSAGE
==========================================================*/

console.log(
"%cPortfolio developed by Rakesh",
"font-size:16px;color:#0A84FF;font-weight:bold;"
);

console.log(
"%cUnity Developer | WebGL | AR | VR",
"font-size:13px;color:#666;"
);