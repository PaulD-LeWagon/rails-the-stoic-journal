import AbstractTask from 'controllers/abstract_task_controller'
import { log } from 'controllers/abstract_task_controller'

export default class extends AbstractTask {

  static outlets = [ 'task' ]

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

  onOrdinalChange(e) {
    // Full override
    e.preventDefault()
    if (this.doUpdate != null) {
      this.doUpdate = true
    }
  }

  onTitleChange(e) {
    // Full override
    e.preventDefault()
    if (this.doUpdate != null) {
      this.doUpdate = true
    }
  }

  onCheckboxClicked(e) {
    super.onCheckboxClicked(e)
    this.parentTask.verifySubtasksCheckedState()
    this.doUpdate = true
  }

  get doUpdate() {
    if (this.hasDoUpdateValue) {
      return this.doUpdateValue
    }
  }

  set doUpdate(value) {
    if (this.hasDoUpdateValue) {
      this.doUpdateValue = value
      if (value) {
        this.parentTask.doUpdate = value
      }
    }
  }
}
