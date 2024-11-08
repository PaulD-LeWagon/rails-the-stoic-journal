import AbstractTask from 'controllers/abstract_task_controller'
import { log } from 'controllers/abstract_task_controller'
export default class extends AbstractTask {

  static targets = [ 'subtasksBtnIcon' ]

  static outlets = [ 'subtask' , 'task-manager' ]

  initialize() {
    super.initialize()
  }

  connect() {
    super.connect()
    // this.updateTimer = setInterval(this.update, 5000)
  }

  disconnect() {
    // clearInterval(this.updateTimer)
  }

  update(e) {
    e.preventDefault()
    this.taskManagerOutlet.updateBackEnd(this)
    // this.taskManagerOutlet.updateBackEnd(this.element)
    // if (this.updateBackend && this.hasTaskManagerOutlet) {
    //   this.taskManagerOutlet.updateBackEnd(this.element)
    //   this.updateBackend = false
    // }
    // log('Calling taskmanager#updateBackEnd')
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
    if(!this.isChecked() && this.areAllSubtasksChecked()) {
      this.subtasks[this.subtasks.length -1].uncheckIt()
    } else if (this.isChecked() && !this.areAllSubtasksChecked()) {
      this.subtasks.forEach((subtask) => {
        subtask.checkIt()
      })
    }
  }

  notify() {
    if (this.areAllSubtasksChecked()) {
      // Then check yourself b4 you reck-urself!!!
      this.checkIt()
    } else {
      // Then uncheck urself!!!
      this.uncheckIt()
    }
    this.updateBackend = true
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
    if (this.hasSubtaskOutlet) {
      return this.subtaskOutlets
    } else {
      return null
    }
  }

}
