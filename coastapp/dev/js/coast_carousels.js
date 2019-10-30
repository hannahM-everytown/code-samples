/**
 * Carousels - Main
 *
 * These functions setup all of our carousels on the homepage with
 * custom options for each carousel. The helper function carouselListItemClicks
 * is also being called here for our feature carousel and our testimonial carousel.
 *
 * Dpendency: Swiper.js
 * https://swiperjs.com
 *
 * Note: Currently, we have to enqueue this file with WP because it doesn't want to load
 * properly when we import it to our site.js file.
 */

import {
  swipers,
  setupCarousels,
  setupCarouselNav,
  carouselListItemClicks,
  getCurrentSwiper,
  addRemoveNoSwiperClass
} from "./carousel_helpers";

const featureCarousel = () => {
  const featureSection = document.querySelector(".features");

  if (featureSection) {
    const carouselNav = featureSection.querySelector(".feature-nav");
    const swiperContainer = featureSection.querySelector(".swiper-container");

    setupCarouselNav(carouselNav);
    carouselListItemClicks(carouselNav, swiperContainer);
  }
};

const reviewCarousel = () => {
  const reviewSection = document.querySelector(".reviews");

  if (reviewSection) {
    addRemoveNoSwiperClass(reviewSection);
  }
};

const testimonialCarousel = () => {
  const testimonialSection = document.querySelector(".testimonials");

  if (testimonialSection) {
    const carouselNav = testimonialSection.querySelector(".testimonial-nav");
    const swiperContainer = testimonialSection.querySelector(
      ".swiper-container"
    );

    setupCarouselNav(carouselNav);
    carouselListItemClicks(carouselNav, swiperContainer);
  }
};

/**
 * Firefox Swiper.js fix
 *
 * The Swiper.js carousel overflows out of the .bundle contiainer on Firefox. According to the Swiper.js
 * developer, the carousel needs to have a width on it in px. So this function detects if the user is on Firefox,
 * retrieves the width of .bundle and then sets the .swiper-container width in px to its parent (.bundle )width.
 * We'll then call the function on resize so it's responsive.
 */

const fireFoxSwiperFix = () => {
  // all carousels are wrapped with a .bundle container. So we need to target this element in order to make
  // the fix on each carousel
  const bundle = document.querySelectorAll(".bundle");

  if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
    bundle.forEach(elem => {
      const featuresBundle = document.querySelector(".features .bundle");
      if (window.innerWidth <= 768) {
        featuresBundle.style.display = "none";
      } else if (window.innerWidth > 768) {
        featuresBundle.style.display = "grid";
      }

      elem.style.display = "grid";
      elem.style.alignItems = "center";
      elem.firstElementChild.style.width = "100%";

      const swiperContainer = elem.firstElementChild;
      swipers.el[getCurrentSwiper(swiperContainer)].update();
      swipers.el[getCurrentSwiper(swiperContainer)].updateSize();
    });
  }
};

const carouselListeners = () => {
  window.addEventListener("resize", reviewCarousel, false);
  window.addEventListener("resize", fireFoxSwiperFix, false);
};

const initCarousels = () => {
  setupCarousels();
  featureCarousel();
  reviewCarousel();
  testimonialCarousel();
  fireFoxSwiperFix();
  carouselListeners();
};

export default initCarousels;
