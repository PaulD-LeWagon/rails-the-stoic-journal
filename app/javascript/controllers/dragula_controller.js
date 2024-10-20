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

    const $collConts = $('.collapse-container');
    $collConts.on('shown.bs.collapse', (e) => {
      const $btn = $(`[aria-controls=${e.target.id}]`);
      const icon = $btn.find('i').get(0);
      if(icon.classList.contains('fa-chevron-down')) {
        icon.classList.remove('fa-chevron-down')
        icon.classList.add('fa-chevron-up')
      } else if(icon.classList.contains('fa-angles-down')) {
        icon.classList.remove('fa-angles-down')
        icon.classList.add('fa-angles-up')
      }
    })
    .on('hidden.bs.collapse', (e) => {
      const $btn = $(`[aria-controls=${e.target.id}]`);
      const icon = $btn.find('i').get(0);
      if(icon.classList.contains('fa-chevron-up')) {
        icon.classList.remove('fa-chevron-up')
        icon.classList.add('fa-chevron-down')
      } else if(icon.classList.contains('fa-angles-up')) {
        icon.classList.remove('fa-angles-up')
        icon.classList.add('fa-angles-down')
      }
    });

    let reap = this.element.querySelectorAll(':scope > .task');
    if (reap.length) {
      setCardOrdinals(reap);
    } else {
      reap = this.element.querySelectorAll('.subtask');
      setCardOrdinals(reap);
    }

    const drake = dragula([this.element], {
      // moves: (el, container, handle) => handle.classList.contains('handle'),
      revertOnSpill: true,
      accepts: (el, target, source, sibling) => {
        log(sibling)
        return false;
      }
    });
    drake.on('drop', (el, target) => {
      setCardOrdinals(el.parentNode.children);
    });

  }

  connect() {
    // counter += 1;
    // log('Connecting...')
    // log(counter)
  }
}
