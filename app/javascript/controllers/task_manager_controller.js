import { Controller } from "@hotwired/stimulus"
import Swal from "sweetalert2"
const log = console.log

// Connects to data-controller="task-manager"
export default class extends Controller {

  initialize() {
    this.createFormCont()
  }

  connect() { }

  updateBackEnd(task) {

    log(task.element.id, task.ordinal, task.checked)
    task.subtasks.forEach((subtask) => {
      log(subtask.element.id, subtask.ordinal, subtask.checked)
    })

    return

    fetch(`${task.urlValue}/edit`, {
      method: "GET",
      headers: { "Accept": "application/json" },
    })
      .then(response => response.json())
      .then((data) => {

        this.hiddenFormCont.innerHTML = data.form
        this.form = this.hiddenFormCont.getElementsByTagName('form')[0]

        log('taskmanager#updateBackEnd')
        log(task)

        return


        let checkbox = this.form.querySelector(`#${this.cardTarget.id}_completed`)
        let orderInput = this.form.querySelector(`#${this.cardTarget.id}_order`)

        checkbox.checked = this.cardCompletedTarget.checked
        orderInput.value = parseInt(this.cardOrderTarget.innerHTML, 10)

        const request = {
          method: "POST",
          headers: { "Accept": "application/json" },
          body: new FormData(this.form)
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
            console.log(this.element.id, data.task.title, data.task.completed)
            this.form.remove()
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
