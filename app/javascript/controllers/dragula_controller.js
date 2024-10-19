import { Controller } from "@hotwired/stimulus"

const log = something => console.log(typeof something, something)

const setCardOrdinals = (container) => {
  const cards = container.querySelectorAll('.card.subtask');
  cards.forEach((card, i) => {
    const j = i + 1;
    card.querySelectorAll('.card-header span')[0].innerText = j;
  });
}

// Connects to data-controller="dragula"
export default class extends Controller {
  connect() {

    setCardOrdinals(this.element);

    const containers = [];

    containers.push(this.element);

    console.log(containers);

    const drake = dragula(containers, {
      // moves: function (el, container, handle) {
      //   console.log(handle.classList.contains('handle'))
      //   return handle.classList.contains('handle');
      // }
    });
    drake.on('drop', (el, target) => {
      setCardOrdinals(this.element);
    });

  }
}
