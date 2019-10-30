/**
 * Carousel Helpers
 *
 * This file contains helper functions for our carousels. We will export all of these and import them into
 * coast_carousels.js 
 */

/**
 * Swiper Object
 *
 * Our swiper object with default options.
 */

const swipers = {
  el: [],
  currentSwiper: "",
  options: {
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    speed: 200,
    watchOverflow: true
  }
};

/**
 * Setup Carousels
 *
 * This function sets up all our carousels on the homepage with custom options specific to each
 * carousel.
 */

const setupCarousels = () => {
  const swiperContainers = document.querySelectorAll(".swiper-container");

  swiperContainers.forEach((elem, index) => {
    const swiperSection = elem.parentNode.parentNode.getAttribute("class");
    let autoplay;
    let breakpoints;
    let effect;
    let slidesPerView;
    let spaceBetween;

    // adds a swiper class to each swiper so we can keep track of each carousel
    elem.classList.add(`swiper-${index}`);

    switch (swiperSection) {
      case "features":
        autoplay = {
          delay: 3000
        };
        effect = "fade";
        slidesPerView = 1;
        break;
      case "reviews":
        (breakpoints = {
          1260: {
            autoplay: false,
            noSwiping: true,
            slidesPerView: 4
          },
          880: {
            slidesPerView: 3.3
          },
          768: {
            slidesPerView: 2.3
          },
          520: {
            slidesPerView: 2.3
          }
        }),
          (effect = "slide");
        slidesPerView = 1.3;
        spaceBetween = 10;
        break;
      case "logos":
        autoplay = {
          delay: 3000
        };
        (breakpoints = {
          1260: {
            slidesPerView: 5,
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev"
            }
          },
          880: {
            slidesPerView: 4,
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev"
            }
          },
          768: {
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev"
            },
            slidesPerView: 3
          }
        }),
          (effect = "slide");
        slidesPerView = 2.5;
        spaceBetween = 10;
        break;
      case "testimonials":
        autoplay = {
          delay: 3000
        };
        effect = "fade";
        slidesPerView = 1;
        break;
      default:
    }

    // custom swiper options for each carousel
    swipers.options.autoplay = autoplay;
    swipers.options.breakpoints = breakpoints;
    swipers.options.effect = effect;
    swipers.options.slidesPerView = slidesPerView;
    swipers.options.spaceBetween = spaceBetween;

    // initialize swipers
    const swiper = new Swiper(`.swiper-${index}`, swipers.options);

    // push swipers into an array so we can use with our getCurrentSwiper function
    swipers.el.push(swiper);
  });
};

/**
 * Setup Carousel Navigation Items
 *
 * This function sets up our navigation items if we have nav controls. We'll add a data-index number
 * to each list item and then add an active class to the first nav item.
 */

const setupCarouselNav = menu => {
  const item = menu.querySelectorAll("li");
  let count = 0;
  item.forEach((elem, index) => {
    elem.setAttribute("data-index-number", count);
    count++;
    if (index === 0) {
      elem.setAttribute("class", "active");
    }
  });
};

/**
 * Carousel Navigation - List Items
 *
 * This function handles our carousel list items within our carousel navigation.
 * We're removing the active class on the current list item and then adding the
 * active class to our target. This happens on click. We then style the .active
 * class within our CSS.
 *
 * These carousels also have an autoplay feature. When the slide changes, we're also
 * updating our button within the navigation menu. Currently this function is called with
 * our app features carousel and testimonial carousel.
 *
 * @param {section} - The section element of the .swiper-container
 * @param {menu} - The unordered list of the carousel navigation
 * @param {swiperContainer} - The swiper container that needs to wrap around our
 * carousel items.
 */

const carouselListItemClicks = (menu, swiperContainer) => {
  const item = menu.querySelectorAll("li");
  const swiper = swipers.el[getCurrentSwiper(swiperContainer)];

  item.forEach((element, index) => {
    element.addEventListener("click", e => {
      item.forEach(elem => {
        elem.classList.remove("active");
      });

      e.currentTarget.classList.add("active");
      swiper.slideTo(index, 400, false);
    });

    // This is the swiper.js event that we can use to detect slide changes and then update
    // our buttons
    swiper.on("slideChange", () => {
      item.forEach(el => {
        el.classList.remove("active");
      });
      element.parentNode
        .querySelector(`li:nth-child(${swiper.activeIndex + 1})`)
        .classList.add("active");
    });
  }, false);
};

/**
 * Get Current Swiper
 *
 * This function looks for the closest .swiper-container and returns
 * the instance of that carousel. You just need to pass in the parent swiper container
 * and the function will return the number from .swiper-{number}
 *
 * @param {classes} - Classes of parent carousel element--.swiper-container
 * @returns {number}
 */

const getCurrentSwiper = classes => {
  const classesArr = classes
    .getAttribute("class")
    .replace(/-/g, " ")
    .split(" ");

  for (let i = 0; i < classesArr.length; i++) {
    if (!isNaN(classesArr[i])) {
      swipers.currentSwiper = classesArr[i];
    }
  }

  return swipers.currentSwiper;
};

/**
 * Add/Remove noSwiping Class
 *
 * This function will add or remove swiping capabilities for carousels. Use this if you need
 * a carousel at a certain screen width and not on another. We're currently using this function
 * for our review carousel.
 *
 * @className {.swiper-no-swiping} - Swiper.js class that allows us to disable swiping of a carousel.
 * @param {section} - The section element of the .swiper-container
 */

const addRemoveNoSwiperClass = section => {
  const swiperContainer = section.querySelector(".swiper-container");

  if (
    window.innerWidth > 1260 &&
    !swiperContainer.classList.contains("swiper-no-swiping")
  )
    swiperContainer.classList.add("swiper-no-swiping");
  else if (
    window.innerWidth <= 1260 &&
    swiperContainer.classList.contains("swiper-no-swiping")
  )
    swiperContainer.classList.remove("swiper-no-swiping");
};

export {
  swipers,
  setupCarousels,
  setupCarouselNav,
  carouselListItemClicks,
  getCurrentSwiper,
  addRemoveNoSwiperClass
};
