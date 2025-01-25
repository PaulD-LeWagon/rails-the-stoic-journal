/**
 * @file Utilities
 * Just a few useful functions collected from elsewhere and tweaked Oh, 
 * and one or two of my own.
 */

const log = console.log
export { log }

/**
 * Method: qs
 * Returns the first element matching the given selector.
 * If no element is found, returns null.
 *
 * @param {string} selector - The CSS selector to match
 * @param {HTMLElement} parent - A DOM element to search within.
 * Defaults to the document.
 *
 * @returns {HTMLElement|null} The first element matching the selector, or null if not found
 */
function qs(selector, parent = document) {
  return parent.querySelector(selector)
}
export { qs }

/**
 * Method: qsa
 * Returns an array of elements matching the given selector.
 * If no elements are found, returns an empty array.
 *
 * @param {string} selector - The CSS selector to match
 * @param {HTMLElement} parent - A DOM element to search within.
 * Defaults to the document.
 *
 * @returns {Array<HTMLElement>} An array of DOMelements matching the selector
 */
function qsa(selector, parent = document) {
  return [...parent.querySelectorAll(selector)]
}
export { qsa }

/**
 * Method: creEl
 * Creates a DOM element of the given type and with the given attributes object
 *
 * @param {string} type - The type of element to create e.g. "div"
 * @param {object} options - The attributes to pass to the element. Can include:
 *   - class: The class to add to the element
 *   - dataset: An object of data-* attributes to add to the element
 *   - text: The text content of the element
 *   - Any other attribute to set on the element
 *
 * @return {HTMLElement} The created element
 */
function creEl(type, options = {}) {
  const element = document.createElement(type)
  Object.entries(options).forEach(([key, value]) => {
    if (key.match(/text|class|dataset/)) {
      if (key === "text") {
        element.textContent = value
      }

      if (key === "class") {
        element.classList.add(value)
      }

      if (key === "dataset") {
        Object.entries(value).forEach(([dataKey, dataValue]) => {
          element.dataset[dataKey] = dataValue
        })
      }
    } else {
      element.setAttribute(key, value)
    }
  })
  return element
}
export { creEl }

/**
 * Method iae (insert adjacent element)
 * Inserts an element adjacent to another element.
 * @param {string} position - Where to insert the element - e.g. 'beforebegin', 'afterend' etc.
 * @param {HTMLElement} element - The element to be inserted
 * @param {HTMLElement} parent - The parent element, defaults to document.
 */
function iae(position, element, parent = document) {
  parent.insertAdjacentElement(position, element)
}
export { iae }

// ClassList functions

function hasCls(el, cls) {
  return el.classList.contains(cls)
}
export { hasCls }

function addCls(el, cls) {
  el.classList.add(cls)
}
export { addCls }

function remCls(el, cls) {
  el.classList.remove(cls)
}
export { remCls }

function toggleCls(el, cls) {
  el.classList.toggle(cls)
}
export { toggleCls }

function replCls(el, oldCls, newCls) {
  el.classList.replace(oldCls, newCls)
}
export { replCls }

// Event functions

function addGlobalEventListener(
  type,
  selector,
  callback,
  options,
  parent = document
) {
  parent.addEventListener(
    type,
    (e) => {
      if (e.target.matches(selector)) callback(e)
    },
    options
  )
}
export { addGlobalEventListener }

// Misc functions

function randInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}
export { randInt }

// Must be called with 'await' keyword to pause the execution of the code
// And only works in async functions
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
export { sleep }

// String prototype functions

String.prototype.toDate = function () {
  const date = Date.parse(this)
  return date
}

String.prototype.elipsize = function (maxLength) {
  if (this.length > maxLength) {
    return this.trim().substring(0, maxLength - 3) + "..."
  } else {
    return this
  }
}

String.prototype.titleCase = function () {
  return this.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
  })
}

String.prototype.sentenceCase = function () {
  return this.replace(/(^|\.\s*)(\w+)/g, (txt, c1, c2) => {
    return c1 + c2.charAt(0).toUpperCase() + c2.substring(1).toLowerCase()
  })
}

// Array prototype functions

Array.prototype.shuffle = function () {
  for (let i = this.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[this[i], this[j]] = [this[j], this[i]]
  }
  return this
}

Array.prototype.toShuffled = function () {
  const array = [...this]
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

Array.prototype.first = function (n = 1) {
  const array = [...this]
  if (n === 1) return array[0]
  return array.filter((_, index) => index < n)
}

Array.prototype.last = function (n = 1) {
  const array = [...this]
  if (n === 1) return array[array.length - 1]
  return array.filter((_, index) => array.length - index <= n)
}

Array.prototype.pluck = function (key) {
  const array = [...this]
  return array.map((element) => element[key])
}

Array.prototype.groupBy = function (key) {
  const array = [...this]
  return array.reduce((group, element) => {
    const keyValue = element[key]
    return { ...group, [keyValue]: [...(group[keyValue] ?? []), element] }
  }, {})
}

Array.prototype.sample = function (n = 1) {
  const array = [...this].toShuffled()
  const rArray = []
  for (let i = 0; i < n; i++) {
    rArray.push(array.pop())
  }
  return rArray
};
