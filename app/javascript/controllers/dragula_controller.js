import { Controller } from "@hotwired/stimulus"

const log = something => console.log(typeof something, something)

// Connects to data-controller="dragula"
export default class extends Controller {

  static targets = [ "dracule" ]

  initialize() {
    this.count = this.element.children.length

    // Should not be needed as the cards/tasks are already ordered on creation
    // let reap = this.element.querySelectorAll(':scope > .task');
    // if (reap.length) {
    //   this.#setCardOrdinals(reap);
    // } else {
    //   reap = this.element.querySelectorAll('.subtask');
    //   this.#setCardOrdinals(reap);
    // }

    // Making the subtasks dragable is not working as expected??? Fix this!
    const drake = dragula([this.element], {
      moves: (el, container, handle) => handle.classList.contains('handle')
    });

    // This is the event that is fired when a task is dropped.
    // It will reset the task ordinals to reflect the new order.
    drake.on('drop', (el, target) => {
      this.updateOrdinals(target.children)
    });

    // This is where we watch for when a task/subtask is deleted.
    // Hotwire does not seem to support a 'delete' or turbo-frame remove event
    // so we have to use the 'childList' event of the MutationObserver class to
    // detect when a task/subtask is deleted. Then we reset the task ordinals
    // to reflect the new order.
    //
    // 1. Select the node that will be observed for mutations
    const targetNode = this.element
    // 2. Set the otions for the observer (which mutations to observe) we want
    //    to observe just the direct children of the target node - 'dragular'
    const config = { childList: true }
    // 3. Setup the callback function to execute when mutations are observed.
    const callback = (mutationList, observer) => {
      for (const mutation of mutationList) {
        if (mutation.type === "childList") {
          // console.log(`${mutation.target.id}`)
          // console.log(this.count, this.element.children.length)
          if (this.count !== this.element.children.length) {
            // Then we have deleted a child node
            // Or we've switched em out for a form but
            // updateOrdinals will take care of it
            this.updateOrdinals(this.element.children)
            this.count = this.element.children.length
          }
        }
      }
    }
    // 4. Create an observer instance and link it to the callback function. And,
    this.observer = new MutationObserver(callback)
    // 5. Start observing the target node for configured mutations
    this.observer.observe(targetNode, config)

  }

  connect() {}

  updateOrdinals(e) {
    const turboCards = this.element.hasChildNodes() ? this.element.children : false
    if (turboCards && turboCards.length && turboCards[0].tagName != "FORM") {
      const event = new Event("change")
      Array.from(turboCards).forEach((card, i) => {
        const j = i + 1;
        const orderWrap = card.querySelectorAll('.card-header span.order-wrapper')[0]
        orderWrap.innerText = j
        orderWrap.dispatchEvent(event)
      })
    }
  }

  disconnect() {
    this.observer.disconnect();
  }

  #printCount() {
    log(`${this.element.id} has ${this.count} children`)
  }
}
