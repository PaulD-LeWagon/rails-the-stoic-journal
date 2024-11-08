import { Controller } from "@hotwired/stimulus"
export const log = console.log
// Connects to data-controller="abstract-task"
export default class extends Controller {

  static targets = [

    "checkbox", 'realCheckbox', 'fauxCheckbox', 'fauxCheckIcon',

    "ordinal",

    "desc", "descButton", "descBtnIcon"

  ]

  static values = {
    url: String,
    checked: Boolean
  }

  initialize() {
    this.updateBackend = false
  }

  connect() {}

  // Checkbox functionality

   get checkbox() {
    return this.checkboxTarget
  }

  set checkbox(value) {
    this.checkboxTarget = value
  }

  onCheckboxClicked(e) {
    e.preventDefault()
    // Toggle the check icons
    if(this.isChecked()) {
      this.uncheckIt()
    } else {
      // If it's not checked
      this.checkIt()
    }
  }

  isChecked() {
    return this.realCheckboxTarget.checked
  }

  checkIt() {
    this.fauxCheckIconTarget.classList.remove('fa-square')
    this.fauxCheckIconTarget.classList.add('fa-square-check')
    this.realCheckboxTarget.checked = true
    this.checked = true
  }

  uncheckIt() {
    this.fauxCheckIconTarget.classList.remove('fa-square-check')
    this.fauxCheckIconTarget.classList.add('fa-square')
    this.realCheckboxTarget.checked = false
    this.checked = false
  }

  // Checked Value

  get checked() {
    return this.checkedValue
  }

  set checked(value) {
    this.checkedValue = value
  }

  checkedValueChanged() {
    this.checked ? this.element.classList.add('card-checked') : this.element.classList.remove('card-checked')
    // this.updateBackend = true
  }

  // Ordinal functionality

  get ordinal() {
    return Number(this.ordinalTarget.innerText)
  }

  set ordinal(value) {
    this.ordinalTarget.innerText = value
  }

  onChange(e) {
    log(this.element.id, this.ordinal, this.checked)
  }

  // Description functionality

  onDescOpen(e) {
    e.preventDefault()
    this.descBtnIconTarget.classList.replace('fa-chevron-down', 'fa-chevron-up')
  }

  onDescClose(e) {
    e.preventDefault()
    this.descBtnIconTarget.classList.replace('fa-chevron-up', 'fa-chevron-down')
  }

  haveDesc() {
    return this.descTarget.querySelector('p').textContent.trim().length > 0
  }

}
