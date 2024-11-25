import AbstractTask from "controllers/abstract_task_controller"

import logHotwireEvents from "hotwire-events"

import { log, creEl, qs, hasCls, replCls, iae } from "utilities"

export default class extends AbstractTask {
  static targets = ["subtasksBtn", "subtasksBtnIcon", "subtasksContainer"]

  static outlets = ["subtask"]

  initialize() {
    super.initialize()
  }

  connect() {
    super.connect()
    this.createFormCont()
  }

  disconnect() {
    super.disconnect()
  }

  subtaskOutletConnected(el) {}

  subtaskOutletDisconnected(el) {}

  doUpdateValueChanged(newValue, oldValue) {
    if (newValue === true) {
      this.update(this)
    }
  }

  onHandleGrabbed(e) {
    // Do not cancel the event: e.preventDefault()
    super.onHandleGrabbed(e)
    if (hasCls(this.subtasksContainerTarget, "show")) {
      // Then close it
      this.subtasksBtnTarget.click()
    }
  }

  doSubtasksOpenForNewSubtask(e) {
    // e.preventDefault()
    if (!hasCls(this.subtasksContainerTarget, "show")) {
      // Then open it
      // const event = new Event("click")
      // this.subtasksBtnTarget.dispatchEvent(event)
      this.subtasksBtnTarget.click()
    }
  }

  onSubtasksOpen(e) {
    e.preventDefault()
    replCls(this.subtasksBtnIconTarget, "fa-angles-down", "fa-angles-up")
  }

  onSubtasksClose(e) {
    e.preventDefault()
    replCls(this.subtasksBtnIconTarget, "fa-angles-up", "fa-angles-down")
  }

  onCheckboxClicked(e) {
    super.onCheckboxClicked(e)
    // Toggle the check icons
    if (
      this.isNotChecked() &&
      this.subtasks.length &&
      this.allSubtasksChecked()
    ) {
      // Would not '-1' sufice?
      this.subtasks[this.subtasks.length - 1].uncheckIt()
    } else if (this.isChecked() && this.allSubtasksNotChecked()) {
      this.subtasks.forEach((subtask) => {
        subtask.checkIt()
      })
    }
  }

  verifySubtasksCheckedState() {
    if (this.allSubtasksChecked()) {
      // Then check yourself b4 you reck-urself!!!
      this.checkIt()
    } else {
      // Then uncheck urself!!!
      this.uncheckIt()
    }
  }

  allSubtasksChecked() {
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

  allSubtasksNotChecked() {
    return !this.allSubtasksChecked()
  }

  get subtasks() {
    if (this.hasSubtaskOutlet && this.subtaskOutlets.length) {
      return this.subtaskOutlets
    } else {
      return []
    }
  }

  update() {
    // Fetch the edit form
    fetch(`${this.urlValue}/edit`, {
      method: "GET",
      headers: { Accept: "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `AJAX [GET] Exception: ${response.status} ${response.statusText}`
          )
        }
        return response.json() // Parse the response as JSON
      })
      .then((data) => {
        this.hiddenFormCont.innerHTML = data.form
        this.form = qs("form", this.hiddenFormCont)

        const formData = new FormData(this.form)

        formData.set("task[title]", this.title.trim())
        formData.set("task[description]", this.desc.trim())
        formData.set("task[completed]", this.checked ? 1 : 0)
        formData.set("task[start_date]", this.startDateTime)

        if (this.subtasks) {
          this.subtasks.forEach((subtask, i) => {
            formData.set(
              `task[subtasks_attributes][${i}][title]`,
              subtask.title.trim()
            )
            formData.set(
              `task[subtasks_attributes][${i}][description]`,
              subtask.desc.trim()
            )
            formData.set(
              `task[subtasks_attributes][${i}][completed]`,
              subtask.checked ? 1 : 0
            )
            formData.set(
              `task[subtasks_attributes][${i}][order]`,
              subtask.ordinal
            )
            formData.set(
              `task[subtasks_attributes][${i}][start_date]`,
              subtask.startDateTime
            )
          })
        }

        const request = {
          method: "PATCH",
          headers: { Accept: "application/json" },
          body: formData,
        }

        fetch(this.form.action, request)
          .then((response) => {
            if (!response.ok) {
              throw new Error(
                `AJAX [PATCH] Exception: ${response.status} ${response.statusText}}`
              )
            }
            return response.json() // Parse the response as JSON
          })
          .then((data) => {
            // // Icons: warning, error, success, info, and question
            // Swal.fire({
            //   position: "top-end",
            //   icon: data.status,
            //   title: this.capitalise(data.status),
            //   text: data.message,
            //   showConfirmButton: false,
            //   timer: 1500,
            //   showClass: {
            //     popup: `
            //       animate__animated
            //       animate__fadeInDown
            //       animate__faster
            //     `,
            //   },
            //   hideClass: {
            //     popup: `
            //       animate__animated
            //       animate__fadeOutDown
            //       animate__faster
            //     `,
            //   },
            // })
            log(`${this.element.id}, ${this.title.elipsize(13)}, updated.`)
            this.form.remove()
            this.doUpdate = false
          })
          .catch((error) => {
            console.error("TaskController.update:\n", error)
          })
      })
      .catch((error) => {
        console.error("TaskController.update:\n", error)
      })
  }

  createFormCont() {
    this.hiddenFormCont = creEl("div", {
      id: `${this.element.id}_update_form_container`,
      class: "d-none",
    })
    iae("beforeend", this.hiddenFormCont, qs("body"))
  }
}
