import { Controller } from "@hotwired/stimulus"

import { log, addCls, hasCls, remCls } from "utilities"

// Connects to data-controller="form"
export default class extends Controller {
  static targets = ["routine", "recursOnCont"]

  connect() {}

  onRoutineChange(e) {
    const routine = this.routineTarget.value
    const regex = new RegExp("morning|day|evening")
    const recursOn = this.recursOnContTarget
    if (routine.match(regex)) {
      if (hasCls(recursOn, "d-none")) {
        remCls(recursOn, "d-none")
      }
    } else {
      if (!hasCls(recursOn, "d-none")) {
        addCls(recursOn, "d-none")
      }
    }
  }
};
