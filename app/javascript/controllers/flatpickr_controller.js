import { Controller } from "@hotwired/stimulus"

// import Flatpickr
import Flatpickr from "stimulus-flatpickr"

import { log, MyUtils } from "my-utils"

// Connects to data-controller="flatpickr"
export default class extends Flatpickr {
  connect() {
    flatpickr(this.element, {})
  }
}
