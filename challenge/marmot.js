/**
 * BounceX Marmot Code Challenge
 *
 * 
 *
 *
 * @param 
 * @param
 */

const sharedVariables = {
  overlay: '',
  isAppended: false
}

const buildBackDrop = () => {
  const body = document.querySelector("body");
  const backDrop = document.createElement('div');

  backDrop.setAttribute("class", "backdrop");
  body.appendChild(backDrop);
};

const buildOverlay = () => {

  if (sharedVariables.isAppended) {
    return;
  }

  const newOverlayElement = document.createElement("div");
  const closeButton = document.createElement("div");
  const cartLink = document.createElement("a")
  const cartIcon = document.querySelector(".minicart-link ");
  const cartIconClone = cartIcon.cloneNode(true);
  const appendOverlay = document.getElementById("main");

  newOverlayElement.setAttribute("class", "overlay");
  newOverlayElement.style.backgroundColor = 'yellow';

  closeButton.setAttribute("class", "close");
  closeButton.innerHTML = "x";

  cartLink.setAttribute("class", "back-to-cart");
  cartLink.setAttribute("title", "Go to Cart");
  cartLink.href = "/cart";  

  appendOverlay.appendChild(newOverlayElement); 
  newOverlayElement.appendChild(closeButton);
  newOverlayElement.appendChild(cartIconClone);

  overlay = document.querySelectorAll(".overlay");

  if (overlay.length === 1) {
    sharedVariables.isAppended = true;
  }

  displayCartItems();

  const close = document.querySelector(".close");
  
  if (close !== -1 ) {
    close.addEventListener("click", closeOverlay, false);   
  } 

};

const closeOverlay = (e) => {
  if ( e.target.classList.contains("close") ) {
    overlay = document.querySelector(".overlay");
    overlay.style.display = "none";
  }
};

const displayCartItems = () => {

  const numberOfItems = document.querySelector(".minicart-quantity").firstChild.textContent;
  const convertToNumber = parseInt(numberOfItems);
  const cartTotal = document.querySelector(".mini-cart-totals .order-value").innerHTML;
  const products = document.querySelector(".mini-cart-products").children;

  //convert HTML Collection to an array so we can loop through it
  const arr = [].slice.call(products);

  arr.forEach(elem => {
    const thumbs = elem.querySelector(".mini-cart-image a img");
    const thumbsSrc = thumbs.src;
    const itemNames = elem.querySelector(".mini-cart-name a").innerHTML;
  
    addItems(thumbsSrc, itemNames);

  });

};

const addItems = (src, name) => {

  overlay = document.querySelector(".overlay");
  const container = document.createElement("div");
  const imageElement = document.createElement("img");
  const text = document.createElement("p");

  container.appendChild(imageElement);
  container.appendChild(text);

  imageElement.src = src;
  text.innerHTML = name;

  container.setAttribute("class", "item");
  overlay.appendChild(container);

};

const getScrollPosition = () => {
  const position = scrollPosition(document.body);
  const roundedPosition = Math.round(position);

  if (roundedPosition >= 90) {
    buildOverlay();

  }
};

const scrollPosition = (b) => {
  const parent = b.parentNode;
  const position = (b.scrollTop || parent.scrollTop) / (parent.scrollHeight - parent.clientHeight) * 100;

  return position;

};

const listeners = () => {
  window.addEventListener("scroll", getScrollPosition, false);
}

const init = () => {
  buildBackDrop();
  listeners();
}

init();

