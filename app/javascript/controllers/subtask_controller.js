import AbstractTask from "controllers/abstract_task_controller"
import { log } from "controllers/abstract_task_controller"

export default class extends AbstractTask {
  static targets = ["ordinal"]

  static outlets = ["task"]

  initialize() {
    super.initialize()
  }

  connect() {
    super.connect()
  }

  get parentTask() {
    if (this.hasTaskOutlet) {
      return this.taskOutlet
    } else {
      return null
    }
  }

  // Ordinal functionality

  hasOrdinal() {
    return this.hasOrdinalTarget
  }

  get ordinal() {
    if (this.hasOrdinalTarget) {
      return parseInt(this.ordinalTarget.innerText.trim(), 10)
    } else {
      return 0
    }
  }

  set ordinal(value) {
    if (this.hasOrdinalTarget) {
      this.ordinalTarget.innerText = value
    }
  }

  onOrdinalChange(e) {
    // Triggered by drag 'n' drop event.
    e.preventDefault()
    if (this.hasDoUpdateValue) {
      this.doUpdate = true
    }
  }

  onCheckboxClicked(e) {
    super.onCheckboxClicked(e)
    this.parentTask.verifySubtasksCheckedState()
    this.doUpdate = true
  }

  /**
   * @param {boolean} value
   */
  set doUpdate(value) {
    if (this.hasDoUpdateValue) {
      this.doUpdateValue = value
      if (typeof value === "boolean" && value === true && this.parentTask) {
        this.parentTask.doUpdate = value
      }
    }
  }
}
