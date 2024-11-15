import { Controller } from "@hotwired/stimulus"
export const log = console.log
// Connects to data-controller="abstract-task"
export default class extends Controller {
  static targets = [
    "title",
    "checkbox",
    "realCheckbox",
    "fauxCheckbox",
    "fauxCheckIcon",
    "ordinal",
    "desc",
    "descBtn",
    "descBtnIcon",
    "descContainer",
  ]

  static values = {
    url: String,
    checked: Boolean,
    doUpdate: {
      type: Boolean,
      default: false,
    },
  }

  initialize() {}

  connect() {}

  onHandleGrabbed(e) {
    // Do not cancel the event: e.preventDefault()
    if (this.descContainerTarget.classList.contains("show")) {
      // Then close it
      const event = new Event("click")
      this.descBtnTarget.dispatchEvent(event)
    }
  }

  get doUpdate() {
    return this.doUpdateValue
  }

  set doUpdate(value) {
    if (this.hasDoUpdateValue) {
      this.doUpdateValue = value
    }
  }

  doUpdateValueChanged() {}

  // Title functionality

  get title() {
    return this.titleTarget.innerText
  }

  set title(value) {
    this.titleTarget.innerText = value
  }

  onTitleChange(e) {
    e.preventDefault()
    e.target.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
    this.doUpdate = true
  }

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
    if (this.isChecked()) {
      this.uncheckIt()
    } else {
      // If it's not checked
      this.checkIt()
    }
    this.doUpdate = true
  }

  isChecked() {
    return this.realCheckboxTarget.checked
  }

  isNotChecked() {
    return !this.realCheckboxTarget.checked
  }

  checkIt() {
    this.fauxCheckIconTarget.classList.remove("fa-square")
    this.fauxCheckIconTarget.classList.add("fa-square-check")
    this.realCheckboxTarget.checked = true // Do we need this?
    this.checked = true
  }

  uncheckIt() {
    this.fauxCheckIconTarget.classList.remove("fa-square-check")
    this.fauxCheckIconTarget.classList.add("fa-square")
    this.realCheckboxTarget.checked = false // Do we need this?
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
    this.checked
      ? this.element.classList.add("card-checked")
      : this.element.classList.remove("card-checked")
  }

  // Ordinal functionality

  get ordinal() {
    return Number(this.ordinalTarget.innerText)
  }

  set ordinal(value) {
    this.ordinalTarget.innerText = value
  }

  onOrdinalChange(e) {
    // Triggered by drag 'n' drop event.
    e.preventDefault()
    if (this.hasDoUpdateValue) {
      this.doUpdate = true
    }
  }

  // Description functionality

  onDescOpen(e) {
    e.preventDefault()
    this.descBtnIconTarget.classList.replace("fa-chevron-down", "fa-chevron-up")
  }

  onDescClose(e) {
    e.preventDefault()
    this.descBtnIconTarget.classList.replace("fa-chevron-up", "fa-chevron-down")
  }

  onDescChange(e) {
    e.preventDefault()
    this.doUpdate = true
  }

  haveDesc() {
    return this.descTarget.textContent.trim().length > 0
  }

  get desc() {
    return this.descTarget.textContent.trim()
  }

  set desc(value) {
    this.descTarget.innerText = value
  }
}
