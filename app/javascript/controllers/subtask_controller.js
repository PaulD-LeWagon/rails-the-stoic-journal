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

  onChange(e) {
    super.onChange(e)
    this.parentTask.notify()
    this.doUpdate = true
  }

  onCheckboxClicked(e) {
    super.onCheckboxClicked(e)
    this.parentTask.notify()
  }
}
