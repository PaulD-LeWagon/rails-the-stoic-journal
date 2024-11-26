import AbstractTask from "controllers/abstract_task_controller"

import { log } from "utilities"

export default class extends AbstractTask {
  static targets = ["ordinal"]

  static outlets = ["task"]

  initialize() {
    super.initialize()
  }

  connect() {
    super.connect()
  }

  disconnect() {
    super.disconnect()
  }

  get parentTask() {
    if (this.hasTaskOutlet) {
      return this.taskOutlet
    } else {
      return null
    }
  }

  hasParentTask() {
    return this.hasTaskOutlet
  }

  // Ordinal functionality

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

  hasOrdinal() {
    return this.hasOrdinalTarget
  }

  onOrdinalChange(e) {
    // Triggered by drag 'n' drop event.
    e.preventDefault()
    if (this.hasDoUpdateValue) {
      this.doUpdate = true
    }
  }

  onCheckboxClicked(e) {
    e.preventDefault()
    // Toggle the check icons
    this.isChecked() ? this.uncheckIt() : this.checkIt()
    this.parentTask.verifySubtasksCheckedState()
    this.doUpdate = true
  }

  doUpdateValueChanged(newValue, oldValue) {
    if (this.domReady()) {
      if (this.hasParentTask()) {
        this.parentTask.doUpdate = newValue
      }
    }
  }
}
