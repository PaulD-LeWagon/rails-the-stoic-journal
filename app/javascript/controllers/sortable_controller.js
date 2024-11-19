import { Controller } from "@hotwired/stimulus"

const log = console.log

// Connects to data-controller="sortable"
export default class extends Controller {
  static targets = ["dragable"]

  static outlets = ["task", "subtask"]

  static values = { group: String }

  connect() {
    setTimeout(() => {
      Sortable.create(this.element, {
        group: { name: this.group, pull: false },
        draggable: ".dragable-item",
        handle: ".fa-grip-vertical",
        animation: 150,
      })
    }, 100)
  }

  dragableTargetConnected(el) {
    this.dtConDiscSetUp()
  }

  dragableTargetDisconnected(el) {
    this.dtConDiscSetUp()
  }

  dtConDiscSetUp() {
    setTimeout(() => {
      const tasks = this.tasks ? this.tasks : this.subtasks
      this.disconnectFlatpickrs()
      this.redoOrdinals(tasks)
      this.redoStartTimes(tasks)
      this.connectFlatpickrs()
    }, 100)
  }

  connectFlatpickrs() {
    if (this.tasks && this.tasks.length > 0) {
      this.tasks.forEach((task) => {
        task.flatpickr = task.constructFlatpickr()
      })
    }
  }

  disconnectFlatpickrs() {
    if (this.tasks && this.tasks.length > 0) {
      this.tasks.forEach((task) => {
        if (task.flatpickr != null) {
          task.flatpickr.destroy()
          task.flatpickr = null
          delete task.flatpickr
        }
      })
    }
  }

  get group() {
    return this.groupValue
  }

  get dragables() {
    if (this.hasDragableTarget) {
      return this.dragableTargets
    } else {
      return false
    }
  }

  get tasks() {
    if (this.hasTaskOutlet) {
      return this.taskOutlets
    } else {
      return false
    }
  }

  get subtasks() {
    if (this.hasSubtaskOutlet) {
      return this.subtaskOutlets
    } else {
      return false
    }
  }

  redoStartTimes() {
    if (this.tasks) {
      const dateObjs = []
      this.tasks.forEach((task, i) => {
        if (task.hasStartTime() && task.hasStartDateTime()) {
          dateObjs.push({ time: task.startTime, dateTime: task.startDateTime })
        }
      })
      dateObjs.sort((a, b) => {
        return a.dateTime < b.dateTime ? -1 : 1
      })
      this.tasks.forEach((task, i) => {
        if (task.hasStartTime() && task.hasStartDateTime()) {
          if (
            task.startTime !== dateObjs[i].time &&
            task.startDateTime !== dateObjs[i].dateTime
          ) {
            task.startTime = dateObjs[i].time
            task.startDateTime = dateObjs[i].dateTime
            task.doUpdate = true
          }
        }
      })
    }
  }

  redoOrdinals(tasks) {
    // Processes tasks and subtasks
    if (tasks) {
      tasks.forEach((task, i) => {
        if (task.hasOrdinal) {
          const j = i + 1
          const curVal = task.ordinal
          if (curVal !== j) {
            task.ordinal = j
            // No need to trigger events in the dom!!! ???
            // valueChanged will handle it all
            task.doUpdate = true
          }
        }
      })
    }
  }
}
