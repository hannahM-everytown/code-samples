/**
 * Coast Site - Main Helpers
 *
 * These are some helper functions for our main site.js file.
 */

import { rebuildForm, setupPhoneField } from "./coast_forms";

// Adding variables into an object to be used and shared throughout
const shared = {
  body: document.getElementsByTagName("body")[0],
  appended: false
};

/**
 * Main sign up buttons
 *
 * This function handles the main signup buttons between mobile and desktop views.
 * We'll export this out and then call it from the main site.js file.
 *
 * @param {button} - Main sign up buttons
 */

const signUpButtonFunctionality = button => {
  const buttonLink = document.createElement("a");
  buttonLink.href = detectApple();
  buttonLink.setAttribute("class", "mobile-link");

  let mobileLink = document.querySelectorAll(".mobile-link");

  if (window.innerWidth <= 768) {
    if (shared.appended) {
      return;
    }

    // Add button links to mobile app stores
    button.parentNode.insertBefore(buttonLink, button);
    buttonLink.appendChild(button);

    // We have three buttons with links to the app stores so once these are added,
    // we want to stop the DOM from appending more.
    if (mobileLink.length === 3) {
      shared.appended = true;
    }
  } else if (window.innerWidth > 768) {
    // after we resize, the links are appended so we need to remove them in order
    // for our modal to function on desktop properly
    if (shared.appended) {
      const callToAction = button.closest(".cta");
      mobileLink = callToAction.firstElementChild;
      mobileLink.parentNode.insertBefore(button, mobileLink);
      mobileLink.parentNode.removeChild(mobileLink);
    }

    // count the links again so reassign mobileLink back to a nodelist
    mobileLink = document.querySelectorAll(".mobile-link");

    if (mobileLink.length === 0) {
      shared.appended = false;
    }

    const form = button.nextElementSibling.nextElementSibling;
    // see blow
    formFunctionality(button, form);

    // close the form if we leave it open
    if (form.style.visibility === "visible") {
      form.style.visibility = "hidden";
    }
  }
};

/**
 * App Links
 *
 * This function detects if a user is on an Android or aniOS device and then returns the app link
 * associated with that device. We currently use this function for our main sign up buttons on mobile
 * and on the top sign up button within the nav menu.
 *
 * returns the Android or iOS link
 */

const detectApple = () => {
  const macOS =
    !!navigator.platform && /(Mac|iPhone|iPod|iPad)/.test(navigator.platform);
  let appLink;
  if (macOS) {
    appLink = "https://apps.apple.com/us/app/id1257883693?mt=8";
  } else {
    appLink =
      "https://play.google.com/store/apps/details?id=com.fomo.android.app&hl=en_US";
  }
  return appLink;
};

/**
 * Form Functionality
 *
 * This function handles the form, which includes opening and closing of the form
 * and rebuilding the form after a user closes the confirmation message. We also call
 * the setupPhoneField function in case the user wants to resubmit the form.
 *
 * @param {button} - Main sign up button
 * @param {form} - The form element
 */

const formFunctionality = (button, form) => {
  button.addEventListener("click", () => {
    if (window.innerWidth < 768) {
      return;
    }
    if (window.innerWidth > 768) {
      const input = form.querySelector("input");
      const formButton = form.querySelector("button");
      const span = form.querySelector("span:not(.sent):not(.error)");

      form.style.visibility = "visible";
      input.style.borderBottomColor = "#281E38";

      shared.body.addEventListener("click", e => {
        if (form.style.visibility === "visible") {
          if (form.contains(e.target) || e.target === button) {
          } else {
            form.style.visibility = "hidden";
            form.reset();

            const errorMessage = form.querySelector(".error");

            if (errorMessage.style.display === "block") {
              errorMessage.style.display = "none";
            }

            const sent = form.querySelector(".sent");

            // if the span element with the class sent exists, then the user submitted the form
            // and received the confirmation message.
            if (sent) {
              // now we want to rebuild the form in case a user wants to submit another number. See coast_forms.js
              rebuildForm(formButton, form, span);
              // setup the input field validation again for the rebuilt form
              setupPhoneField();
            }
          }
        }
      }, false);
    }
  }, false);
};

export default signUpButtonFunctionality;
