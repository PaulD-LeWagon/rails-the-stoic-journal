import { Controller } from "@hotwired/stimulus"
const log = console.log
// Connects to data-controller="checkbox"
export default class extends Controller {

  static targets = [ 'realCheckbox', 'fauxCheckbox', 'fauxCheckIcon' ]

  static outlets = [ 'task' ]

  initialize() {

  }

  connect() {

  }

  onChecked(e) {
    e.preventDefault()
    // Toggle the check icons
    if(this.isChecked()) {
      this.uncheckIt()
      this.parentTask.checked = false
    } else {
      // If it's not checked
      this.checkIt()
      this.parentTask.checked = true
    }
  }

  get parentTask() {
    if (this.hasTaskOutlet) {
      return this.taskOutlet
    } else {
      return null
    }
  }

  isNotChecked() {
    return this.isChecked() ? false : true
  }

  isChecked() {
    return this.realCheckbox.checked
  }

  get realCheckbox() {
    return this.realCheckboxTarget
  }

  get fauxCheckbox() {
    return this.fauxCheckboxTarget
  }

  get fauxCheckIcon() {
    return this.fauxCheckIconTarget
  }

  get checked() {
    return this.isChecked()
  }

  set checked(boolean) {
    if (boolean) {
      this.checkIt()
    } else {
      this.uncheckIt()
    }
  }

  checkIt() {
    this.fauxCheckIcon.classList.remove('fa-square')
    this.fauxCheckIcon.classList.add('fa-square-check')
    this.realCheckbox.checked = true
  }

  uncheckIt() {
    this.fauxCheckIcon.classList.remove('fa-square-check')
    this.fauxCheckIcon.classList.add('fa-square')
    this.realCheckbox.checked = false
  }
}
