import { Controller } from "@hotwired/stimulus"

let counter = 0;

const log = something => console.log(typeof something, something)

// Connects to data-controller="dragula"
export default class extends Controller {

  static targets = [ "dracule" ]

  initialize() {

    counter += 1

    // let reap = this.element.querySelectorAll(':scope > .task');
    // if (reap.length) {
    //   this.#setCardOrdinals(reap);
    // } else {
    //   reap = this.element.querySelectorAll('.subtask');
    //   this.#setCardOrdinals(reap);
    // }

    const drake = dragula([this.element], {
      // moves: (el, container, handle) => handle.classList.contains('handle'),
      // revertOnSpill: true,
      // accepts: (el, target, source, sibling) => {
      //   // log(sibling)
      //   return true;
      // }
    });

    drake.on('drop', (el, target) => {
      const alucard = el.parentNode.children
      this.#setCardOrdinals(alucard)
    });

  }

  connect() { }

  onDeleteTask(e) {
    // e.preventDefault()
    this.#setCardOrdinals(this.draculeTarget.children)
  }

  updateOrdinals(e) {
    const domEls = e.target.hasChildNodes() ? e.target.children : false
    if (domEls && domEls.length && domEls[0].tagName != "FORM") {
      this.#setCardOrdinals(domEls)
    }
  }

  #setCardOrdinals(cards) {
    const event = new Event("change")
    // Array.from(cards).forEach((card, i) => {
    //   const j = i + 1;
    //   const orderWrap = card.querySelectorAll('.card-header span.order-wrapper')[0]
    //   orderWrap.innerText = j
    //   orderWrap.dispatchEvent(event)
    // })
  }
}
