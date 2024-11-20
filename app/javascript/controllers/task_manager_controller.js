import { Controller } from "@hotwired/stimulus"
import Swal from "sweetalert2"
const log = console.log

export default class extends Controller {

  static outlets = [ 'task' ]

  static values = {
    updateRate: {
      type: Number,
      default: 5000
    }
  }

  initialize() {
    this.createFormCont()
  }

  connect() {
    const ut = setInterval(() => {
      this.updateBackEnd()
    }, this.updateRate)
    this.updateTimer = ut
  }

  disconnect() {
    clearInterval(this.updateTimer)
    this.updateBackEnd()
  }

  get updateRate() {
    return this.updateRateValue
  }

  set updateRate(value) {
    this.updateRateValue = Number(value)
  }

  updateBackEnd() {
    if(this.hasTaskOutlet) {
      this.taskOutlets.forEach((task) => {
        // log('Check for update?', task.doUpdate)
        if (task.doUpdate === true) {
          this.doFetch(task)
        }
      })
    }
  }

  doFetch(task) {

    if (task == null) {
      return false
    }

    fetch(`${task.urlValue}/edit`, {
      method: "GET",
      headers: { "Accept": "application/json" },
    })
      .then(response => response.json())
      .then((data) => {

        this.hiddenFormCont.innerHTML = data.form
        this.form = this.hiddenFormCont.getElementsByTagName('form')[0]

        const formData = new FormData(this.form)

        formData.set('task[title]', task.title.trim())
        formData.set('task[description]', task.desc.trim())
        formData.set('task[completed]', task.checked ? 1 : 0)
        formData.set('task[order]', task.ordinal)

        if (task.subtasks) {
          task.subtasks.forEach((subtask, i) => {
            formData.set(`task[subtasks_attributes][${i}][title]`, subtask.title.trim())
            formData.set(`task[subtasks_attributes][${i}][description]`, subtask.desc.trim())
            formData.set(`task[subtasks_attributes][${i}][completed]`, subtask.checked ? 1 : 0)
            formData.set(`task[subtasks_attributes][${i}][order]`, subtask.ordinal)
          })
        }

        const request = {
          method: "PATCH",
          headers: { "Accept": "application/json" },
          body: formData
        }

        fetch(this.form.action, request)
          .then(response => response.json())
          .then((data) => {
            // Icons: warning, error, success, info, and question
            Swal.fire({
              position: "top-end",
              icon: data.status,
              title: this.capitalise(data.status),
              text: data.message,
              showConfirmButton: false,
              timer: 1500,
              showClass: {
                popup: `
                  animate__animated
                  animate__fadeInDown
                  animate__faster
                `
              },
              hideClass: {
                popup: `
                  animate__animated
                  animate__fadeOutDown
                  animate__faster
                `
              }
            })
            // log(task.element.id, data.task.title, data.task.order, data.task.completed)
            this.form.remove()
            task.doUpdate = false
            // log(`${task.element.id}, ${data.task.title}, needs update? ${task.doUpdate}`)
          })
      });
  }

  capitalise(strOfWords) {
    const words = strOfWords.split(" ")
    return words.map((word) => { return word[0].toUpperCase() + word.substring(1); }).join(" ")
  }

  createFormCont() {
    this.hiddenFormCont = document.createElement('div')
    this.hiddenFormCont.classList.add('d-none')
    document.getElementsByTagName('body')[0]
      .insertAdjacentElement('beforeend', this.hiddenFormCont)
  }
}
