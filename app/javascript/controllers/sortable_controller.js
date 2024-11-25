import { Controller } from "@hotwired/stimulus"

import { log, qs, qsa, creEl, hasCls } from "utilities"
import { sleep } from "../utilities"

// Connects to data-controller="sortable"
export default class extends Controller {
  static targets = ["dragable", "form"]

  static outlets = ["task", "subtask"]

  static values = {
    taskOutletCount: { type: Number, default: 0 },
    group: String,
  }

  initialize() {
    super.initialize()
    // If you want to manipulate targets or outlets @ initialization time or on
    // connect wrap them in a setTimeout
    setTimeout(() => {}, 100)
  }

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

  domReady() {
    return document.readyState == "complete"
  }

  sort() {
    try {
      let selector
      if (this.hasTaskOutlet) {
        selector = `.${this.taskOutlet.identifier}`
      } else if (this.hasSubtaskOutlet) {
        selector = `.${this.subtaskOutlet.identifier}`
      } else {
        throw new Error("No task/subtaskOutlet to #sort")
      }

      const tasks = []

      qsa(selector, this.element).forEach((child) => {
        tasks.push(child.parentNode.removeChild(child))
      })

      tasks.sort((a, b) => {
        let d1, d2
        if (selector === ".task") {
          d1 = a.dataset.taskStartDateTimeValue.toDate()
          d2 = b.dataset.taskStartDateTimeValue.toDate()
        } else {
          d1 = a.dataset.subtaskStartDateTimeValue.toDate()
          d2 = b.dataset.subtaskStartDateTimeValue.toDate()
        }
        // return d1 < d2 ? -1 : 1
        // log(
        //   qs(".title-wrapper", a).textContent.trim(),
        //   qs(".title-wrapper", b).textContent.trim()
        // )
        // log(`SortableController.sort:`, d1, d2, d1 - d2)
        return d1 - d2
      })
      tasks.forEach((task) => {
        this.element.appendChild(task)
      })
    } catch (error) {
      console.error("SortableController.sort:\n", error)
      return false
    }
    return true
  }

  redoStartTimes(tasks) {
    if (tasks) {
      const dateObjs = []
      tasks.forEach((task, i) => {
        if (task.hasStartTime() && task.hasStartDateTime()) {
          dateObjs.push({ time: task.startTime, dateTime: task.startDateTime })
        }
      })
      dateObjs.sort((a, b) => {
        return a.dateTime.toDate() - b.dateTime.toDate()
      })
      tasks.forEach((task, i) => {
        if (task.hasStartTime() && task.hasStartDateTime()) {
          if (
            task.startTime !== dateObjs[i].time &&
            task.startDateTime !== dateObjs[i].dateTime
          ) {
            task.startTime = dateObjs[i].time
            task.startDateTime = dateObjs[i].dateTime
            task.startDateTimeValue = dateObjs[i].dateTime
            task.updateCardTitleDate(task.startDateTime)
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

  dragableTargetConnected(el) {
    this.dtConDiscSetUp()
  }

  dragableTargetDisconnected(el) {
    this.dtConDiscSetUp()
  }

  dtConDiscSetUp() {
    setTimeout(() => {
      const tasks = this.tasks ? this.tasks : this.subtasks
      this.disconnectFlatpickrs(tasks)
      this.redoOrdinals(tasks)
      this.redoStartTimes(tasks)
      this.connectFlatpickrs(tasks)
    }, 100)
  }

  connectFlatpickrs(tasks) {
    if (tasks && tasks.length > 0) {
      tasks.forEach((task) => {
        task.flatpickr = task.constructFlatpickr()
      })
    }
  }

  disconnectFlatpickrs(tasks) {
    if (tasks && tasks.length > 0) {
      tasks.forEach((task) => {
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
}
