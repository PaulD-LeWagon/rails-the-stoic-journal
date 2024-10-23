import { Controller } from "@hotwired/stimulus"

let counter = 0;

const log = something => console.log(typeof something, something)

const setCardOrdinals = (cards) => {
  Array.from(cards).forEach((card, i) => {
    const j = i + 1;
    card.querySelectorAll('.card-header span')[0].innerText = j;
  });
}
// Connects to data-controller="dragula"
export default class extends Controller {
  initialize() {
    counter += 1

    // log(this.identifier + " " + this.element.id + " " + counter)

    let reap = this.element.querySelectorAll(':scope > .task');
    if (reap.length) {
      setCardOrdinals(reap);
    } else {
      reap = this.element.querySelectorAll('.sub-task');
      setCardOrdinals(reap);
    }

    const drake = dragula([this.element], {
      // moves: (el, container, handle) => handle.classList.contains('handle'),
      // revertOnSpill: true,
      // accepts: (el, target, source, sibling) => {
      //   // log(sibling)
      //   return true;
      // }
    });
    drake.on('drop', (el, target) => {
      const event = new Event("click")
      const alucard = el.parentNode.children
      setCardOrdinals(alucard)
      Array.from(alucard).forEach((dracula, i) => {
        dracula
          .querySelectorAll('.card-header span')[0]
          .dispatchEvent(event)
      })
    });

  }

  connect() { }
}
