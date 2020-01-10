/**
 * BounceX Marmot Code Challenge
 *
 * This script creates an overlay on the Marmot homepage and displays items from a user's shopping cart
 * To run this script, copy/paste it into your browser's console.
 *
 */

// Shared global variables

const sharedVariables = {
  body: document.getElementsByTagName("body")[0],
  overlay: "",
  isAppended: false
};

/**
 * Build our Overlay with Backdrop
 *
 * This is our main Overlay element. We'll create everything on the fly and then set up a trigger for it so that the overlay
 * launches when a user scrolls within 10% of the bottom of the page. See getScrollPosition for how the trigger is set up.
 *
 */

const buildOverlay = () => {

  // Create our overlay components on the fly

  const backDropElement = document.createElement("div"),
  overlayElement = document.createElement("div"),
  overlayHeader = document.createElement("header"),
  closeButtonElement = document.createElement("button"),
  headingElement = document.createElement("h3");
  editElement = document.createElement("a");  
  overlayBody = document.createElement("div"),
  overlayFooter = document.createElement("footer"),
  numberOfItemsElement = document.createElement("p"),
  cartTotalElement = document.createElement("p");

  // Assign existing elements to variables to be used for display and appending

  const cartIcon = document.querySelector(".minicart-link "),
  numberOfItems = "Total Items: " + document.querySelector(".minicart-quantity").firstChild.textContent,
  cartTotal = "Total: " + document.querySelector(".mini-cart-totals .order-value").innerHTML,
  main = document.getElementById("main");

  // Set attributes

  backDropElement.setAttribute("class", "backdrop");
  overlayElement.setAttribute("class", "overlay");
  overlayElement.setAttribute("role", "dialog");  

  overlayHeader.setAttribute("class", "overlay-header mini-cart-header");
  editElement.setAttribute("href", "/cart");
  editElement.setAttribute("class", "primary-link");  

  closeButtonElement.setAttribute("class", "close");
  overlayBody.setAttribute("class", "overlay-body items");
  overlayFooter.setAttribute("class", "overlay-footer");

  // Manipulate elements

  closeButtonElement.innerHTML = "x";
  headingElement.innerHTML = "Items Added to Cart";
  editElement.innerHTML = "Edit Cart";
  numberOfItemsElement.innerHTML = numberOfItems;
  cartTotalElement.innerHTML = cartTotal;

  // Append elements within the overlay

  overlayElement.appendChild(overlayHeader);
  overlayElement.appendChild(overlayBody);  
  overlayElement.appendChild(overlayFooter);

  overlayHeader.appendChild(headingElement);
  overlayHeader.appendChild(editElement);   
  overlayHeader.appendChild(closeButtonElement);

  overlayFooter.appendChild(numberOfItemsElement);
  overlayFooter.appendChild(cartTotalElement);

  // Append overlay and backdrop to the main and body elements 

  main.appendChild(overlayElement);
  sharedVariables.body.appendChild(backDropElement);

};

/**
 * These next two functions handle our items that a user has added to her shopping cart. We'll need to create new elements so
 * we can place them into the overlay and then we run getItems within displayCartItems so we can loop through the products
 * and capture all the details we'll need.
 *
 */

const displayCartItems = () => {

  // Select all children of .mini-cart-products element, which contains our cart items

  const products = document.querySelector(".mini-cart-products").children;

  // products is an HTML Collection so we need to convert it to an array so we can loop through it

  const arr = [].slice.call(products);

  arr.forEach(elem => {

    const thumbsSrc = elem.querySelector(".mini-cart-image a img").src,
    itemName = elem.querySelector(".mini-cart-name a").innerHTML,
    itemQuantity = elem.querySelector(".mini-cart-pricing .quantity .value").innerHTML,
    itemPrice = elem.querySelector(".mini-cart-pricing .price").innerHTML;

    getItems(thumbsSrc, itemName, itemQuantity, itemPrice);

  });

};

/**
 * Get Items
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

const getItems = (src, name, quantity, price) => {

  // Create elements on the fly

  const itemElement = document.createElement("div"),
  imageElement = document.createElement("img"),
  textElement = document.createElement("p"),
  quantityElement = document.createElement("p"),
  priceElement = document.createElement("p"),

  // Assign existing elements to variables

  items = document.querySelector(".items");

  // Set attributes

  itemElement.setAttribute("class", "item");

  // Manipulate elements

  imageElement.src = src;
  textElement.innerHTML = name;
  quantityElement.innerHTML = "QTY: " + quantity;
  priceElement.innerHTML = price;

  // Append elements

  itemElement.appendChild(imageElement);
  itemElement.appendChild(textElement);
  itemElement.appendChild(quantityElement);
  itemElement.appendChild(priceElement);

  items.appendChild(itemElement);
  sharedVariables.isAppended = true;

};

/**
 * Close Button Functionality
 *
 * This function handles our close button functionality. When a user clicks on the body or close button, 
 * the overlay and backdrop will be removed
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
    backdrop.parentNode.removeChild(backdrop);

    sharedVariables.isAppended = false;
  }

};

/**
 * Add Styles for Overlay and Backdrop
 *
 * Create a style script with CSS styles for our overlay. This style tag will be appended to the head of the document
 * after the page loads.
 *
 */

const addOverlayStyles = () => {
  const head = document.getElementsByTagName("head")[0],
  style = document.createElement("style"),
  css =
    `.backdrop {
      background: #000;
      height: 100%;
      left: 0;
      opacity: .4;         
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 1;
    }

    .overlay {
      background: #fff;
      border: 1px solid #cbcbcb;
      left: 50%;
      line-height: 18px;
      padding:40px;    
      position: fixed;
      top: 50%;
      transform: translate(-50%, -50%);
      width:65%;
      z-index: 2; 
    }

    .overlay-header {
      display: flex;
      justify-content: space-between;
    }

    .item {
      margin-top: 20px;
    }

    .overlay-footer {
      margin-top: 10px;
    }
  `;

  style.type = "text/css";
  style.appendChild(document.createTextNode(css));
  head.appendChild(style);

};

 /**
 * Initialize Overlay
 *
 */

const overlayInit = () => {

  // We'll use a boolean flag to detect whether or not the overlay has been created. We start off with false and return.
  
  if (sharedVariables.isAppended) {
    return;
  }

  // Call to buildOverlay to create and append all components of overlay

  buildOverlay();

  // Here we'll check if the overlay has been added to the DOM.
  // And set our flag to true so the DOM doesn't continue to create and append elements.

  overlay = document.querySelectorAll(".overlay");

  if (overlay.length === 1) {
    sharedVariables.isAppended = true;
  }
  
  // Call our displayCartItems to add and display any cart items to the overlay.

  displayCartItems();

  // Call to closeButton so we can close the overlay

  const closeButton = document.querySelector(".close"); 

  if (closeButton.length !== -1) {
    sharedVariables.body.addEventListener("click", closeOverlay, false);  
  }

};

/**
 * Get User's Scroll Position
 *
 * This function will get a user's scroll position and then makes a call overlayInit to launch our overlay.
 *
 */

const getScrollPosition = () => {

  const emptyCart = document.querySelectorAll(".minicart-empty");

  // If a user's shopping cart is empty, the mini-cart-empty class appears within the DOM twice. So we'll check if this
  // class exists twice, and if true, then we'll return else we continue to execute the rest of the code.

  if (emptyCart.length === 2) {
    return;
  } else {
    const position = scrollPosition(sharedVariables.body),
    roundedPosition = Math.round(position);

    if (roundedPosition > 90) {
      overlayInit();
    }    
  }
};

/**
 * Calculate scroll position
 *
 * @returns {number}
 *
 */

const scrollPosition = b => {
  const parent = b.parentNode,
  position =
    ((b.scrollTop || parent.scrollTop) /
      (parent.scrollHeight - parent.clientHeight)) *
    100;

  return position;
};

const init = () => {
  window.addEventListener("scroll", getScrollPosition, false);
  addOverlayStyles();
};

// Initialize everything

init();