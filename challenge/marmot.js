/**
 * BounceX Marmot Code Challenge
 *
 * This script creates an overlay on the Marmot homepage and displays items from a user's shopping cart
 * To run this script, copy/paste it into your browser's console.
 *
 */

// Shared global variables

const sharedVariables = {
  overlay: "",
  isAppended: false
};

/**
 * Build our Backdrop
 *
 * This function will create a new element so that we can use it as a backdrop for our overlay.
 *
 */

const buildBackDrop = () => {
  // Create backdrop element
  const backDropElement = document.createElement("div");

  // assign body to a variable so we can append the newly created back drop element
  const body = document.body;

  // Add styles
  backDropElement.setAttribute("class", "backdrop");

  // Display none so that the backdrop is not visible until we need it.
  backDropElement.style.display = "none";

  // Append the backdrop to the body element
  body.appendChild(backDropElement);
};

/**
 * Build our Overlay
 *
 * This is our main Overlay element. We'll create everything on the fly and then set up a trigger for it so that the overlay
 * launches when a user scrolls within 10% of the bottom of the page. See getScrollPosition for how the trigger is set up.
 *
 */

const buildOverlay = () => {

  // We'll use a boolean flag to detect whether or not the overlay has been created. We start off with false and return.
  if (sharedVariables.isAppended) {
    return;
  }

  // Now we can create our overlay
  // Create our overlay elements on the fly
  const overlayElement = document.createElement("div");
  const overlayHeader = document.createElement("header");
  const closeButtonElement = document.createElement("div");
  const cartIcon = document.querySelector(".minicart-link ");
  const cartIconClone = cartIcon.cloneNode(true);
  const overlayBody = document.createElement("div");
  const overlayFooter = document.createElement("footer");
  const numberOfItemsElement = document.createElement("p");
  const cartTotalElement = document.createElement("p");

  // Assign existing elements to variables to be used for display and appending
  const numberOfItems =
    "Total Items: " +
    parseInt(
      document.querySelector(".minicart-quantity").firstChild.textContent
    );
  const cartTotal =
    "Total: " +
    document.querySelector(".mini-cart-totals .order-value").innerHTML;
  const main = document.getElementById("main");

  // set attributes and/or styling
  overlayElement.setAttribute("class", "overlay");
  overlayHeader.setAttribute("class", "overlay-header");
  closeButtonElement.setAttribute("class", "close");
  overlayBody.setAttribute("class", "overlay-body items");
  overlayFooter.setAttribute("class", "overlay-footer");

  closeButtonElement.innerHTML = "x";
  numberOfItemsElement.innerHTML = numberOfItems;
  cartTotalElement.innerHTML = cartTotal;

  // Append elements of the overlay
  overlayElement.appendChild(overlayHeader);
  overlayElement.appendChild(overlayBody);
  overlayElement.appendChild(overlayFooter);

  overlayHeader.appendChild(closeButtonElement);
  overlayHeader.appendChild(cartIconClone);

  overlayFooter.appendChild(numberOfItemsElement);
  overlayFooter.appendChild(cartTotalElement);

  // Append overlay to the main element
  main.appendChild(overlayElement);

  // Here we'll check if the overlay has been added to the DOM.
  // And set our flag to true so the DOM doesn't continue to create and append elements.
  overlay = document.querySelectorAll(".overlay");

  if (overlay.length === 1) {
    sharedVariables.isAppended = true;
  }

  // Call our displayCartItems to add any cart items to the overlay.
  displayCartItems();

  // This is our close functionality. After the overlay is built, we need a way to get out of it. So on the X button we created
  // above, we'll set a trigger to listen for a click on that element or the backdrop element and then we'll remove the overlay, and hide the
  // backdrop
  const closeButton = document.querySelector(".close");

  if (closeButton.length !== -1) {
    closeButton.addEventListener("click", closeOverlay, false);
  }
};

/**
 * Close Button Functionality
 *
 * This function handles our close button functionality. When a user clicks on the x button, the overlay and backdrop will
 * close.
 *
 */

const closeOverlay = e => {
  overlay = document.querySelector(".overlay");
  backdrop = document.querySelector(".backdrop");

  if (
    e.target.classList.contains("close") ||
    e.target.classList.contains("backdrop")
  ) {
    overlay.parentNode.removeChild(overlay);
    backdrop.style.display = "none";
    sharedVariables.isAppended = false;
  }
};

/**
 * These next two functions handle our items that a user has added to her shopping cart. We'll need to create new elements so
 * we can place them into the overlay and then we run addItems within displayCartItems so we can loop through the products
 * and capture all the details we'll need.
 *
 */

const displayCartItems = () => {
  const products = document.querySelector(".mini-cart-products").children;

  //convert HTML Collection to an array so we can loop through it
  const arr = [].slice.call(products);

  arr.forEach(elem => {
    const thumbs = elem.querySelector(".mini-cart-image a img");
    const thumbsSrc = thumbs.src;
    const itemNames = elem.querySelector(".mini-cart-name a").innerHTML;
    const itemQuantity = elem.querySelector(".mini-cart-pricing .quantity .value").innerHTML;
    const itemPrice = elem.querySelector(".mini-cart-pricing .price").innerHTML;

    addItems(thumbsSrc, itemNames, itemQuantity, itemPrice);
  });
};

/**
 * Add Items
 *
 * We're going to create some new elements to add to our overlay, which will contain all the information from the
 * items in a user's cart.
 *
 * @param {src} item thumbnail source
 * @param {name} the item name
 * @param {quantity} the number of each item the user has added
 * @param {price} the price of each item
 *
 */

const addItems = (src, name, quantity, price) => {
  // create elements on the fly

  const itemElement = document.createElement("div");
  const imageElement = document.createElement("img");
  const textElement = document.createElement("p");
  const quantityElement = document.createElement("p");
  const priceElement = document.createElement("p");

  // assign existing elements to variables
  const items = document.querySelector(".items");

  // set styling or attributes

  itemElement.setAttribute("class", "item");

  imageElement.src = src;
  textElement.innerHTML = name;
  quantityElement.innerHTML = "QTY: " + quantity;
  priceElement.innerHTML = price;

  //Append elements

  itemElement.appendChild(imageElement);
  itemElement.appendChild(textElement);
  itemElement.appendChild(quantityElement);
  itemElement.appendChild(priceElement);

  items.appendChild(itemElement);
};

/**
 * Get User's Scroll Position
 *
 * This function will get a user's scroll position and then launch our overlay.
 */

const getScrollPosition = () => {
  const position = scrollPosition(document.body);
  const roundedPosition = Math.round(position);
  const backdrop = document.querySelector(".backdrop");

  if (roundedPosition > 90) {
    buildOverlay();
  }
};

/**
 * Calculate scroll position
 *
 * @returns {number}
 *
 */

const scrollPosition = b => {
  const parent = b.parentNode;
  const position =
    ((b.scrollTop || parent.scrollTop) /
      (parent.scrollHeight - parent.clientHeight)) *
    100;

  return position;
};

const listeners = () => {
  window.addEventListener("scroll", getScrollPosition, false);
};

const init = () => {
  buildBackDrop();
  listeners();
};

// Initialize everything
init();