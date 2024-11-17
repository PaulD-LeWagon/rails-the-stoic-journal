import AbstractTask from "controllers/abstract_task_controller"
import Swal from "sweetalert2"
import { log } from "controllers/abstract_task_controller"

export default class extends AbstractTask {
  static targets = [
    "startTime",
    "subtasksBtn",
    "subtasksBtnIcon",
    "subtasksContainer",
  ]

  static outlets = ["subtask"]

  static values = { startTime: String }

  initialize() {
    super.initialize()
    this.createFormCont()
  }

  connect() {
    super.connect()
  }

  disconnect() {
    super.disconnect()
  }

  doUpdateValueChanged(newValue) {
    if (newValue) {
      this.update(this)
    }
  }

  onHandleGrabbed(e) {
    // Do not cancel the event: e.preventDefault()
    super.onHandleGrabbed(e)
    if (this.subtasksContainerTarget.classList.contains("show")) {
      // Then close it
      const event = new Event("click")
      this.subtasksBtnTarget.dispatchEvent(event)
    }
  }

  doSubtasksOpen(e) {
    // e.preventDefault()
    const event = new Event("click")
    this.subtasksBtnTarget.dispatchEvent(event)
  }

  onSubtasksOpen(e) {
    e.preventDefault()
    this.subtasksBtnIconTarget.classList.replace(
      "fa-angles-down",
      "fa-angles-up"
    )
  }

  onSubtasksClose(e) {
    e.preventDefault()
    this.subtasksBtnIconTarget.classList.replace(
      "fa-angles-up",
      "fa-angles-down"
    )
  }

  onCheckboxClicked(e) {
    super.onCheckboxClicked(e)
    // Toggle the check icons
    if (
      this.isNotChecked() &&
      this.subtasks.length &&
      this.allSubtasksChecked()
    ) {
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
            `HTTP error on GET edit form! status: ${response.statusText} ${response.status}`
          )
        }
        return response.json() // Parse the response as JSON
      })
      .then((data) => {
        this.hiddenFormCont.innerHTML = data.form
        this.form = this.hiddenFormCont.getElementsByTagName("form")[0]

        const formData = new FormData(this.form)

        formData.set("task[title]", this.title.trim())
        formData.set("task[description]", this.desc.trim())
        formData.set("task[completed]", this.checked ? 1 : 0)
        formData.set("task[order]", this.ordinal)

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
                `HTTP error on update fetch call! status: ${response.statusText} ${response.status}`
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

            log(`${this.element.id}, ${data.message}`)

            this.form.remove()
            this.doUpdate = false
          })
          .catch((error) => {
            console.error("Error fetching data:", error)
          })
      })
      .catch((error) => {
        console.error("Error fetching data:", error)
      })
  }

  capitalise(strOfWords) {
    const words = strOfWords.split(" ")
    return words
      .map((word) => {
        return word[0].toUpperCase() + word.substring(1)
      })
      .join(" ")
  }

  createFormCont() {
    this.hiddenFormCont = document.createElement("div")
    this.hiddenFormCont.classList.add("d-none")
    document
      .getElementsByTagName("body")[0]
      .insertAdjacentElement("beforeend", this.hiddenFormCont)
  }
}
