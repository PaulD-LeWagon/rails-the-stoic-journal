import { Controller } from "@hotwired/stimulus"

import flatpickr from "flatpickr"

import { log, hasCls, addCls, remCls, replCls } from "utilities"

import logHotwireEvents from "expts/hotwire-events"

// Connects to data-controller="abstract-task"
export default class extends Controller {
  static targets = [
    "cardTitle",
    "startTime",
    "startDateTime",

    "title",

    "checkbox",
    "realCheckbox",
    "fauxCheckbox",
    "fauxCheckIcon",

    "desc",
    "descBtn",
    "descBtnIcon",
    "descContainer",
  ]

  static outlets = ["sortable"]

  static values = {
    url: String,
    checked: Boolean,
    startTime: String,
    startDateTime: String,
    doUpdate: { type: Boolean, default: false },
  }

  initialize() {
    super.initialize()
    // Time format: HH:MM
    this.timeRegex = /^\d{2}:\d{2}$/
    // Date format: YYYY-MM-DD HH:MM
    this.dateTimeRegex = /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}$/
    // Listen for when a task/subtask form has been edited (submitted via turbo)
    this.element.addEventListener("turbo:frame-load", (e) => {
      this.checkStartDateTime(e)
    })
  }

  connect() {
    if (this.domReady()) {
      super.connect()
      if (
        this.timeRegex.test(this.startTime) &&
        this.dateTimeRegex.test(this.startDateTime) &&
        this.startTime != this.startTimeValue &&
        this.startDateTime != this.startDateTimeValue
      ) {
        this.startTimeValue = this.startTime
        this.startDateTimeValue = this.startDateTime
        this.updateCardTitleDate(this.startDateTime)
      }
    } else {
      setTimeout(() => {
        this.connect()
      }, 100)
    }
  }

  domReady() {
    return document.readyState == "complete"
  }

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
    // Open the date picker
    this.startDateTimeTarget.click()
  }

  // StartDateTime functionality

  startDateTimeValueChanged(theValue, oldValue) {
    if (this.domReady()) {
      this.updateCardTitleDate(theValue)
      this.doUpdate = true
    }
  }

  updateCardTitleDate(theDate) {
    try {
      if (this.hasCardTitleTarget) {
        const fmt = new Intl.DateTimeFormat("en-GB", {
          dateStyle: "full",
          timeStyle: "short",
        }).format(theDate.toDate())
        this.cardTitleTarget.title = fmt
      }
    } catch (error) {
      console.error("AbstractTaskController.updateCardTitleDate:\n", error)
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

  checkStartDateTime(e) {
    if (
      this.timeRegex.test(this.startTime) &&
      this.dateTimeRegex.test(this.startDateTime) &&
      this.startTime != this.startTimeValue &&
      this.startDateTime != this.startDateTimeValue
    ) {
      this.startTimeValue = this.startTime
      this.startDateTimeValue = this.startDateTime
      this.updateCardTitleDate(this.startDateTime)
      this.doUpdate = true

      this.sortableOutlet.sort()
    }
  }

  onStartDateTimePickerClose(selectedDates, dateStr, instance) {
    if (this.hasStartDateTime()) {
      const newDate = dateStr.toDate()
      const formatter = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      })
      this.startTime = formatter.format(newDate)
      if (this.startDateTime !== this.startDateTimeValue) {
        this.startDateTimeValue = this.startDateTime
        this.updateCardTitleDate(this.startDateTime)
      }
      if (this.hasSortableOutlet) {
        this.sortableOutlet.sort()
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
    if (hasCls(this.descContainerTarget, "show")) {
      // Then close it
      // const event = new Event("click")
      // this.descBtnTarget.dispatchEvent(event)
      this.descBtnTarget.click()
    }
  }

  get doUpdate() {
    return this.doUpdateValue
  }

  set doUpdate(value) {
    if (this.hasDoUpdateValue) {
      this.doUpdateValue = value
    } else {
      throw new Error(`${this.identifier} doUpdateValue not set`)
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
    remCls(this.fauxCheckIconTarget, "fa-square")
    addCls(this.fauxCheckIconTarget, "fa-square-check")
    this.realCheckboxTarget.checked = true // Do we need this, the real checkbox, I mean?
    this.checked = true
  }

  uncheckIt() {
    remCls(this.fauxCheckIconTarget, "fa-square-check")
    addCls(this.fauxCheckIconTarget, "fa-square")
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
      ? addCls(this.element, "card-checked")
      : remCls(this.element, "card-checked")
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
    replCls(this.descBtnIconTarget, "fa-chevron-down", "fa-chevron-up")
  }

  onDescClose(e) {
    e.preventDefault()
    replCls(this.descBtnIconTarget, "fa-chevron-up", "fa-chevron-down")
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

    if (this.descChar != this.desc) {
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
