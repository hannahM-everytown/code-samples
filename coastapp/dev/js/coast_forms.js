/**
 * Phone Number Input Field - Data Validation and Formatting
 *
 * These next functions take care of our phone number input field. We've set this as a text
 * field so we can listen for a keyup event. Since Branch does not allow inter-country SMS,
 * we can only accept US and Canadian numbers. So as a user is typing, we'll add dashes to the number
 * so it is formatted as xxx-xxx-xxxx. Then we'll validate it against a regular expression for
 * US/Canadian numbers.
 *
 * @param {rawPhoneNumber} - Original unformatted user phone number
 * @param {userInput} - User phone number
 */

const setupPhoneField = () => {
  const phoneFields = document.getElementsByClassName("phone");
  for (let i = 0; i < phoneFields.length; i++) {
    if (phoneFields[i].type.toLowerCase() === "text") {
      phoneFields[i].addEventListener("keyup", onKeyUp);
    }
  }
};

const onKeyUp = e => {
  const input = e.target;
  const formattedPhoneNumber = formatPhoneNumber(input.value);
  const errorMessage = document.querySelectorAll(".error");

  // if a user inputs an invalid number, reset the input after they delete everything in the field
  for (let i = 0; i < errorMessage.length; i++) {
    if (input.value.length === 0) {
      input.style.borderBottomColor = "#281E38";
      if (errorMessage[i].style.display === "block") {
        errorMessage[i].style.display = "none";
      }
    }
  }

  // match the user's input with the formatted number (with dashes)
  input.value = formattedPhoneNumber;
};

const formatPhoneNumber = rawPhoneNumber => {
  // strip out all characters other than numbers
  let newValue = rawPhoneNumber.replace(/[^0-9]/g, "");

  // add dashes
  if (newValue.length > 3 && newValue.length <= 6) {
    newValue = `${newValue.slice(0, 3)}-${newValue.slice(3)}`;
  } else if (newValue.length > 6) {
    newValue = `${newValue.slice(0, 3)}-${newValue.slice(
      3,
      6
    )}-${newValue.slice(6)}`;
  }

  return newValue;
};

const validPhoneNumber = userInput => {
  const phoneRegExp = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
  const numbers = userInput.replace(/\D/g, "");

  return phoneRegExp.test(numbers);
};

/**
 * Confirmation Message
 *
 * This function creates a new UI with a confirmation message after a user successfully submits
 * a valid phone number in the above input field. This message updates the form with a confirmation
 * We call this from coast_branch.js after form submit.
 *
 * @param {button} - Form button (Branch submit)
 * @param {input} - Form input field
 * @param {span} - Form bottom span element
 */

const buildConfirmation = (button, input, span) => {
  const sent = document.createElement("span");
  const hr = document.createElement("hr");

  sent.innerHTML = "Check your phone";
  sent.setAttribute("class", "sent");
  input.parentNode.replaceChild(sent, input);
  sent.appendChild(hr);

  button.style.backgroundColor = "#00CAAC";
  button.style.borderColor = "#00CAAC";
  button.setAttribute("class", "link-sent");
  button.value = "Link Sent";
  button.innerText = "Link Sent";
  span.innerHTML = `Having trouble? <a class="send-again">Send it again</a> to ${input.value} or <a href="mailto:support@coastapp.com">contact us</a>.`;
};

/**
 * Regenerate Original Form
 *
 * After a user submits a valid phone number and receives the confirmation message,
 * we'll rebuild the form in its original design in case the user wants to submit another
 * number. The form is regenerated after a user closes the confirmation message by clicking
 * off the form on body. We call this function from site_helpers.js file from within formFunctionality
 *
 * @param {button} - Form button (Branch submit)
 * @param {form} - The form element
 * @param {span} - Bottom span element
 */

const rebuildForm = (button, form, span) => {
  const input = document.createElement("input");
  const sent = form.querySelector(".sent");

  input.type = "text";
  input.setAttribute("class", "phone");
  input.name = "phone";
  input.placeholder = "Enter your mobile number";
  input.style.borderBottomColor = "#281E38";
  sent.parentNode.replaceChild(input, sent);

  button.style.backgroundColor = "#281E38";
  button.style.borderColor = "#281E38";
  button.classList.remove("link-sent");
  button.setAttribute("class", "button branch");
  button.type = "button";
  button.value = "Send App Link";
  button.innerText = "Send App Link";
  span.innerHTML = `You’ll receive a link to the <a href="https://apps.apple.com/us/app/coast-employee-messaging/id1257883693?mt=8" target="_blank">App Store</a> or <a href="https://play.google.com/store/apps/details?id=com.fomo.android.app&hl=en_US" target="_blank">Google Play Store</a>. No spam. Coast is free during our early access period`;
};

export { setupPhoneField, validPhoneNumber, buildConfirmation, rebuildForm };
