const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav_link');

if (navToggle) {
    navToggle.addEventListener('click', () => navMenu.classList.add('show-menu'));
}

if (navClose) {
    navClose.addEventListener('click', () => navMenu.classList.remove('show-menu'));
}

navLinks.forEach(link => link.addEventListener('click', () => navMenu.classList.remove('show-menu')));

const skillsHeaders = document.querySelectorAll('.skills_header');
skillsHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const parent = header.parentNode;
        const isOpen = parent.classList.contains('skills_open');

        document.querySelectorAll('.skills_content').forEach(content => {
            content.classList.remove('skills_open');
            content.classList.add('skills_close');
        });

        if (!isOpen) {
            parent.classList.remove('skills_close');
            parent.classList.add('skills_open');
        }
    });
});

const tabs = document.querySelectorAll('[data-target]');
const tabContents = document.querySelectorAll('[data-content]');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target);

        tabContents.forEach(content => content.classList.remove('education_active'));
        target.classList.add('education_active');

        tabs.forEach(t => t.classList.remove('education_active'));
        tab.classList.add('education_active');
    });
});

const modalViews = document.querySelectorAll('.services_modal');
const modalBtns = document.querySelectorAll('.services_button');
const modalCloses = document.querySelectorAll('.services_modal-close');

modalBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => modalViews[i].classList.add('active-modal'));
});

modalCloses.forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        modalViews.forEach(view => view.classList.remove('active-modal'));
    });
});

const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        const navLink = document.querySelector(`.nav_menu a[href*='${sectionId}']`);
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink.classList.add('active-link');
        } else {
            navLink.classList.remove('active-link');
        }
    });
});

const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY >= 80) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
});

const scrollUp = document.getElementById('scroll-up');
window.addEventListener('scroll', () => {
    if (window.scrollY >= 560) {
        scrollUp.classList.add('show-scroll');
    } else {
        scrollUp.classList.remove('show-scroll');
    }
});

const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'uil-sun';

const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

if (selectedTheme) {
    document.body.classList.toggle(darkTheme, selectedTheme === 'dark');
    themeButton.classList.toggle(iconTheme, selectedIcon === 'uil-sun');
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    localStorage.setItem('selected-theme', document.body.classList.contains(darkTheme) ? 'dark' : 'light');
    localStorage.setItem('selected-icon', themeButton.classList.contains(iconTheme) ? 'uil-sun' : 'uil-moon');
});

window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("my-form");
    const status = document.getElementById("status");

    form.addEventListener("submit", async(ev) => {
        ev.preventDefault();
        const data = new FormData(form);
        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                form.reset();
                status.classList.add('success');
                status.innerHTML = "Thanks!";
            } else {
                status.classList.add('error');
                status.innerHTML = "Oops! There was a problem.";
            }
        } catch (error) {
            status.classList.add('error');
            status.innerHTML = "Oops! There was a problem.";
        }
    });
});

let swiper = new Swiper('.portfolio_container', {
    cssMode: true,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: 'swiper-pagination',
        clickable: true,
    },
    mousewheel: true,
    keyboard: true,
});