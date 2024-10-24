import { Controller } from "@hotwired/stimulus"
const log = something => console.log(typeof something, something)
// Connects to data-controller="task-buttons"
export default class extends Controller {
  static targets = [ 'desc', 'subtasks', 'addSubtaskBtn', 'viewSubtasksBtn' ]
  connect() {}

  addSubtaskClick(e) {
    if (!this.subtasksTarget.classList.contains('show')) {
      // show.bs.collapse
      const event = new Event("click")
      this.viewSubtasksBtnTarget.dispatchEvent(event)
      // log(this.viewSubtasksBtnTarget)
    }
  }
}
