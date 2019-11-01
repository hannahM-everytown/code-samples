/**
 * Coast Branch Integration - Main
 *
 * This file contains functions to handle our Branch integration. We have three forms on the homepage,
 * which consist of a phone number input field. The form is currently under on the top signup button,
 * under the headline, and within the signup section
 *
 * The homepage has a Branch.io integration in which unformatted phone numbers are sent to
 * Branch with the branch.sendSMS function. You will need to include the branch.min.js file,
 * which is currently in the vendor directory of our dev directory.
 *
 * Dpendency: Branch.io
 * https://branch.io/
 */

/**
 * Send Phone Number to Branch.io
 *
 * This is our main function that sends a customer's phone number to Branch and handles our
 * success and error functionality.
 */

import {
  buildConfirmation,
  setupPhoneField,
  validPhoneNumber
} from "./coast_forms";

const sendPhoneNumberToBranch = () => {
  // Initialize Branch with key
  branch.init("");
  const branchButton = document.querySelectorAll(".branch:not(.link-sent)");

  // handles our input field validation and some error/success handling. See coast_forms.js
  // for more detailed information about this.
  setupPhoneField();

  for (let i = 0; i < branchButton.length; i++) {
    branchButton[i].addEventListener("click", function(e) {
      e.preventDefault();

      const form = this.parentElement;
      const input = form.querySelector("input");
      const span = form.querySelector("span:not(.error)");

      // if we don't have an input field within the modal just return so the code stops running on button click
      if (!input) {
        return;
      }

      if (validPhoneNumber(input.value)) {
        // let the user know the number is valid by adding a green bottom border to the input field
        input.style.borderBottomColor = "#00CAAC";

        // if someone submits the form without entering a number or interacting with the input field, they'll
        // receive an error. If they submit a valid number after that, we need to remove the error message
        const errorMessage = document.querySelectorAll(".error");
        for (i = 0; i < errorMessage.length; i++) {
          if (errorMessage[i].style.display === "block") {
            errorMessage[i].style.display = "none";
          }
        }

        // Branch data
        const options = {};
        const linkData = {
          tags: [],
          channel: "Website",
          feature: "TextMeTheApp",
          data: {}
        };

        // Branch only accepts numbers within a string so we'll strip the input of
        // anything other than numbers
        const branchFormattedPhoneNumber = input.value.replace(/-/g, "");

        // Send to branch with parameters
        branch.sendSMS(branchFormattedPhoneNumber, linkData, options);

        // we'll use a timeout function after a user enters a valid number and submits the form. This will allow the user
        // to see the input field's bottom border as green for a bit longer before the confirmation message pops up.
        setTimeout(() => {
          // confirm that the user submitted the form -- see coast_forms.js
          buildConfirmation(this, input, span);

          form.querySelector(".send-again").addEventListener("click", () => {
            branch.sendSMS(branchFormattedPhoneNumber, linkData, options);
          }, false);
        }, 200);
      } else {
        e.preventDefault();
        // if a user doesn't interact with the input field at all and clicks submit
        // throw an error to the user
        const errorMessage = form.querySelector(".error");
        errorMessage.style.display = "block";
        input.style.borderBottomColor = "#FF5E84";
      }
    }, false);
  }
};

export default sendPhoneNumberToBranch;
