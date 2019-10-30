/**
 * Coast Site - Main
 *
 * This is our main file for the homepage that sets up and controls various functionality on this page.
 * This is also where we are calling all of our uncalled functions and importing files to be included in
 * our main production script.
 */

import "../css/vendor/swiper.min.css";
import "../css/scss/app.scss";
import "./vendor/swiper.min";
import "./vendor/picturefill.min";
import "./vendor/branch.min";

import sendPhoneNumberToBranch from "./coast_branch";
import initCarousels from "./coast_carousels";
import signUpButtonFunctionality from "./site_helpers";

// Hamburger menu functionality for mobile view--top right
const mobileNav = () => {
  const nav = document.querySelector(".top-navbar");
  const navMenu = nav.querySelector(".menu-items");
  const navButton = nav.querySelector(".button");
  const cta = nav.querySelector(".cta");

  navButton.addEventListener("click", () => {
    if (navMenu.style.display === "grid") {
      navMenu.style.display = "none";
    } else {
      navMenu.style.display = "grid";
    }

    if (cta.style.display === "block") {
      cta.style.display = "none";
    } else {
      cta.style.display = "block";
    }

    navButton.classList.toggle("drop");
    nav.classList.toggle("open");
  }, false);
};

// Adding and removing a class/styling for mobile/desktop nav menu
const stickyHeader = () => {
  const header = document.querySelector("header");
  const scrollPosition = Math.round(window.scrollY);

  if (scrollPosition > 0) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
};

// Sign Up button - last menu item, top right within header
const topSignUpButtonConfig = () => {
  const topSignUpButton = document.querySelector(".top-navbar .cta button");
  topSignUpButton.value = "Sign Up";
  topSignUpButton.innerHTML = "Sign Up";
};

// Sign up buttons - top navbar, under headline, and at the bottom within the sign up section
const signUpButtonConfig = () => {
  const signUpButton = document.querySelectorAll(".cta .button:not(.branch)");

  signUpButton.forEach(elem => {
    // See site_helpers.js for more information about this
    signUpButtonFunctionality(elem);
  });
};

// The h4 elements overflow out of our list item when on small screens and at 768.
// We need to shorten these for mobile and tablet views. And then lengthen them for desktop
const shortenTestimonialTitles = () => {
  const testimonialListItems = document.querySelectorAll(".testimonial-nav li");

  testimonialListItems.forEach(elem => {
    const title = elem.querySelector("h4");
    const clone = title.cloneNode(true).innerHTML;

    if (window.innerWidth <= 1024) {
      const first = title.innerHTML.split(" ")[0];
      title.innerHTML = first;
    } else if (window.innerWidth > 1024) {
      title.innerHTML = clone;
    }
  });
};

const setFooterAppLinkstarget = () => {
  const appLinks = document.querySelectorAll(".app-links a");

  appLinks.forEach(elem => {
    if (window.innerWidth <= 768) {
      elem.target = "_self";
    } else if (window.innerWidth > 768) {
      elem.target = "_blank";
    }
  });
};

const siteListeners = () => {
  window.addEventListener("scroll", stickyHeader, false);
  window.addEventListener("resize", signUpButtonConfig, false);
  window.addEventListener("resize", shortenTestimonialTitles, false);
  window.addEventListener("resize", setFooterAppLinkstarget, false);
};

const init = () => {
  mobileNav();
  topSignUpButtonConfig();
  signUpButtonConfig();
  shortenTestimonialTitles();
  setFooterAppLinkstarget();
  siteListeners();
  initCarousels();
  sendPhoneNumberToBranch();
};

init();
