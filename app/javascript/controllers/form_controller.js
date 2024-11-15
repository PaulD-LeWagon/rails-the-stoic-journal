import { Controller } from "@hotwired/stimulus"
const log = console.log

// Connects to data-controller="form"
export default class extends Controller {
  static targets = ["routine", "recursOnCont"]

  connect() {}

  onRoutineChange(e) {
    const routine = this.routineTarget.value
    const regex = new RegExp("morning|day|evening")
    const recCl = this.recursOnContTarget.classList
    if (routine.match(regex)) {
      if (recCl.contains("d-none")) {
        recCl.remove("d-none")
      }
    } else {
      if (!recCl.contains("d-none")) {
        recCl.add("d-none")
      }
    }
  }
}
