import { Controller } from "@hotwired/stimulus"

const log = console.log

// Connects to data-controller="sortable"
export default class extends Controller {

  static targets = [ 'dragable' ]

  static values = { group: String }

  connect() {
    Sortable.create(this.element, {
      group: { name: this.group, pull: false },
      draggable: ".dragable-item",
      handle: '.fa-grip-vertical',
      animation: 150
    })
  }

  dragableTargetConnected(el) {
    // Recount the ordinals
    this.reOrder()
  }

  dragableTargetDisconnected(el) {
    // Recount the ordinals
    this.reOrder()
  }

  get dragables() {
    if (this.hasDragableTarget) {
      return this.dragableTargets
    } else {
      return []
    }
  }

  get group() {
    return this.groupValue
  }

  reOrder() {
    const event = new Event("change")
    Array.from(this.dragables).forEach((task, i) => {
      const j = i + 1;
      const orderWrap = task.querySelectorAll('.card-header span.order-wrapper')[0]
      orderWrap.innerText = j
      orderWrap.dispatchEvent(event)
    })
  }
}
