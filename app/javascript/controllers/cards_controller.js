import { Controller } from "@hotwired/stimulus"
import Swal from "sweetalert2";
const log = something => console.log(typeof something, something)
const setButtonTogglers = () => {
  const $collConts = $('.collapse-container');
    $collConts.on('shown.bs.collapse', (e) => {
      const $btn = $(`[aria-controls=${e.target.id}]`)
      const icon = $btn.find('i').get(0)
      if(icon.classList.contains('fa-chevron-down')) {
        icon.classList.remove('fa-chevron-down')
        icon.classList.add('fa-chevron-up')
      } else if(icon.classList.contains('fa-angles-down')) {
        icon.classList.remove('fa-angles-down')
        icon.classList.add('fa-angles-up')
      }
    })
    .on('hidden.bs.collapse', (e) => {
      const $btn = $(`[aria-controls=${e.target.id}]`)
      const icon = $btn.find('i').get(0)
      if(icon.classList.contains('fa-chevron-up')) {
        icon.classList.remove('fa-chevron-up')
        icon.classList.add('fa-chevron-down')
      } else if(icon.classList.contains('fa-angles-up')) {
        icon.classList.remove('fa-angles-up')
        icon.classList.add('fa-angles-down')
      }
    })
}
// Connects to data-controller="cards"
export default class extends Controller {
  static targets = [ "card", "form", "cardOrder", "cardCompleted" ]

  static values = { url: String }

  initialize() {
    // log(this.cardTarget.id)
    this.hiddenFormContainer = document.createElement('div')
    this.hiddenFormContainer.classList.add('d-none')
    document.getElementsByTagName('body')[0].insertAdjacentElement('beforeend', this.hiddenFormContainer)
  }
  connect() {
    setButtonTogglers()
  }

  onReorder(e) {
    this.#updateBackEnd()
  }

  onChecked(e) {
    this.#updateBackEnd()
  }

  #updateBackEnd() {
    fetch(`${this.urlValue}/edit`, {
      method: "GET",
      headers: { "Accept": "application/json" },
    })
      .then(response => response.json())
      .then((data) => {

        this.hiddenFormContainer.innerHTML = data.form
        this.form = this.hiddenFormContainer.getElementsByTagName('form')[0]
        let checkbox = this.form.querySelector(`#${this.cardTarget.id}_completed`)
        let orderInput = this.form.querySelector(`#${this.cardTarget.id}_order`)

        checkbox.checked = this.cardCompletedTarget.checked
        orderInput.value = this.cardOrderTarget.innerHTML

        const request = {
          method: "POST",
          headers: { "Accept": "application/json" },
          body: new FormData(this.form)
        }

        fetch(this.form.action, request)
          .then(response => response.json())
          .then((data) => {
            // Icons: warning, error, success, info, and question
            // Swal.fire({
            //   title: this.#capitalise(data.status),
            //   text: data.message,
            //   icon: data.status,
            //   confirmButtonText: (data.status === 'success' ? 'Cool' : 'Okay'),
            //   customClass: {
            //     confirmButton: `btn btn-${data.status} btn-lg`,
            //   }
            // });
            console.log(data.message)
            this.form.remove()
          })
      });
  }

  #capitalise(strOfWords) {
    const words = strOfWords.split(" ")
    return words.map((word) => { return word[0].toUpperCase() + word.substring(1); }).join(" ")
  }
}
