import AbstractTask from "controllers/abstract_task_controller"
import { log } from "controllers/abstract_task_controller"

export default class extends AbstractTask {
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
      if (value && this.parentTask) {
        this.parentTask.doUpdate = value
      }
    }
  }
}
