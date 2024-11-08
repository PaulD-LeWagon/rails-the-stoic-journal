import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="ordinal"
export default class extends Controller {

  static targets = [ 'ordinal' ]

  connect() {}

  onChange(e) {

  }

  get value() {
    return parseInt(this.ordinalTarget.innerText, 10)
  }

  set value(value) {
    this.ordinalTarget.innerText = value
  }
}
