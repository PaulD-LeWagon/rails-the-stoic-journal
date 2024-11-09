import AbstractTask from 'controllers/abstract_task_controller'
import { log } from 'controllers/abstract_task_controller'
export default class extends AbstractTask {

  static targets = [ 'subtasksBtn','subtasksBtnIcon' ]

  static outlets = [ 'subtask' , 'task-manager' ]

  initialize() {
    super.initialize()
  }

  connect() {
    super.connect()
  }

  disconnect() {}

  update(e) {
    e.preventDefault()
    this.taskManagerOutlet.updateBackEnd(this)
  }

  doSubtasksOpen(e) {
    // e.preventDefault()
    const event = new Event('click')
    this.subtasksBtnTarget.dispatchEvent(event)
  }

  onSubtasksOpen(e) {
    e.preventDefault()
    this.subtasksBtnIconTarget.classList.replace('fa-angles-down', 'fa-angles-up')
  }

  onSubtasksClose(e) {
    e.preventDefault()
    this.subtasksBtnIconTarget.classList.replace('fa-angles-up', 'fa-angles-down')
  }

  onCheckboxClicked(e) {
    super.onCheckboxClicked(e)
    // Toggle the check icons
    if(!this.isChecked() && this.areAllSubtasksChecked() && this.subtasks.length) {
      this.subtasks[this.subtasks.length -1].uncheckIt()
    } else if (this.isChecked() && !this.areAllSubtasksChecked()) {
      this.subtasks.forEach((subtask) => {
        subtask.checkIt()
      })
    }
  }

  verifySubtasksCheckedState() {
    if (this.areAllSubtasksChecked()) {
      // Then check yourself b4 you reck-urself!!!
      this.checkIt()
    } else {
      // Then uncheck urself!!!
      this.uncheckIt()
    }
  }

  areAllSubtasksChecked() {
    let allChecked = true
    const subtasks = this.subtasks
    const count = subtasks.length
    for (let i = 0; i < count; i++) {
      if (!subtasks[i].checked) {
        allChecked = false
        break
      }
    }
    return allChecked
  }

  get subtasks() {
    if (this.hasSubtaskOutlet && this.subtaskOutlets.length) {
      return this.subtaskOutlets
    } else {
      return []
    }
  }

}