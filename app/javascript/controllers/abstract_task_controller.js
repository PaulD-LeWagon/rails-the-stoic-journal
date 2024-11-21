import { Controller } from "@hotwired/stimulus"

import flatpickr from "flatpickr"

export const log = console.log

// Connects to data-controller="abstract-task"
export default class extends Controller {
  static targets = [
    "startTime",
    "startDateTime",

    "title",

    "cardTitle",

    "checkbox",
    "realCheckbox",
    "fauxCheckbox",
    "fauxCheckIcon",

    "desc",
    "descBtn",
    "descBtnIcon",
    "descContainer",
  ]

  static values = {
    url: String,
    checked: Boolean,
    startTime: String,
    startDateTime: String,
    doUpdate: { type: Boolean, default: false },
  }

  initialize() {}

  connect() {}

  disconnect() {}

  // StartTime functionality

  hasStartTime() {
    return this.hasStartTimeTarget
  }

  get startTime() {
    if (this.hasStartTimeTarget) {
      return this.startTimeTarget.innerText
    } else {
      return false
    }
  }

  set startTime(value) {
    if (this.hasStartTimeTarget) {
      this.startTimeTarget.innerText = value
      this.startTimeValue = value
    }
  }

  onStartTimeClick(e) {
    e.preventDefault()
    // this.startDateTimeTarget.classList.toggle("d-none")
    this.startDateTimeTarget.click()
  }

  // StartDateTime functionality

  startDateTimeValueChanged(theValue, oldValue) {
    if (
      typeof theValue === "string" &&
      theValue.length > 0 &&
      this.hasStartDateTime() &&
      theValue !== oldValue
    ) {
      this.doUpdate = true
    }
    this.updateCardTitleDate(theValue)
  }

  updateCardTitleDate(theDate) {
    if (this.hasCardTitleTarget) {
      const fmt = new Intl.DateTimeFormat("en-GB", {
        dateStyle: "full",
        timeStyle: "short",
      }).format(new Date(theDate))
      this.cardTitleTarget.title = fmt
    }
  }

  hasStartDateTime() {
    return this.hasStartDateTimeTarget
  }

  get startDateTime() {
    if (this.hasStartDateTimeTarget) {
      return this.startDateTimeTarget.value
    } else {
      return false
    }
  }

  set startDateTime(value) {
    if (this.hasStartDateTimeTarget) {
      this.startDateTimeTarget.value = value
    }
  }

  onStartDateTimePickerClose(selectedDates, dateStr, instance) {
    if (this.hasStartDateTime()) {
      // this.startDateTimeTarget.classList.toggle("d-none")
      const newDate = new Date(dateStr)
      const formatter = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      })
      this.startTime = formatter.format(newDate)
      if (this.startDateTime !== this.startDateTimeValue) {
        this.startDateTimeValue = this.startDateTime
        // log("startDateTimeValue changed in onStartDateTimePickerClose")
        // this.doUpdate = true
      }
    }
  }

  constructFlatpickr(customOptions = {}) {
    if (this.hasStartDateTimeTarget) {
      const that = this
      const confirmDateOptions = {
        confirmIcon: "<i class='fa-solid fa-circle-check'></i>",
        confirmText: "Done",
      }
      const confirmDate = new confirmDatePlugin(confirmDateOptions)
      const options = {
        positionElement: this.startTimeTarget,
        position: "above center",
        dateFormat: "Y-m-d H:i",
        enableTime: true,
        time_24hr: true,
        minTime: "06:00",
        maxTime: "18:00",
        minuteIncrement: 15,
        plugins: [confirmDate],
        onClose: function (selectedDates, dateStr, instance) {
          if (this.fpBtnConfirmed) {
            that.onStartDateTimePickerClose(selectedDates, dateStr, instance)
            this.fpBtnConfirmed = false
          }
        },
      }
      const cfg = Object.assign(options, customOptions)
      return flatpickr(this.startDateTimeTarget, cfg)
    }
  }

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
    if (typeof value == "boolean" && this.hasDoUpdateValue) {
      this.doUpdateValue = value
    }
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

  // Title functionality

  get title() {
    return this.titleTarget.innerText
  }

  set title(value) {
    this.titleTarget.innerText = value
  }

  onTitleFocus(e) {
    e.preventDefault()
    this.titleChar = this.title
  }

  onTitleLostFocus(e) {
    e.preventDefault()
    e.target.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
    if (this.titleChar !== this.title) {
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

  onDescFocus(e) {
    e.preventDefault()
    this.descChar = this.desc
  }

  onDescLostFocus(e) {
    e.preventDefault()
    e.target.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
    if (this.descChar !== this.desc) {
      this.doUpdate = true
    }
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
