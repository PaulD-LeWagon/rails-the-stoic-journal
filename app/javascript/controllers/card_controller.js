import { Controller } from "@hotwired/stimulus"
import Swal from "sweetalert2";

const log = console.log

const setButtonTogglers = (controllerID) => {
  const $collConts = $('.collapse-container')
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

  static targets = [ "card", "form", "cardOrder", "cardCompleted", "cardFauxCheck" ]

  static outlets = [ "card" ]

  static values = { url: String }

  initialize() {
    this.type = this.element.classList.contains('task') ? 'task' : 'subtask'
    this.hiddenFormCont = document.createElement('div')
    this.hiddenFormCont.classList.add('d-none')
    document.getElementsByTagName('body')[0]
      .insertAdjacentElement('beforeend', this.hiddenFormCont)
  }

  connect() {
    setButtonTogglers(this.element.id)
  }

  onReorder(e) {
    this.updateBackEnd()
  }

  onChecked(e) {
    e.preventDefault()
    // Toggle the check icons
    if(this.cardIsChecked()) {
      this.uncheckCard()
      this.updateBackEnd()
      if (this.type == 'subtask' && this.hasCardOutlet && this.cardOutlets.length === 1) {
        // Which should be the parent card. Have the parent card/task
        // uncheck itself if it is checked.
        if (this.cardOutlet.cardIsChecked()) {
          this.cardOutlet.uncheckCard()
          this.cardOutlet.updateBackEnd()
        }
      }
    } else { // If it's not checked
      this.checkCard()
      this.updateBackEnd()
      if (this.type == 'task' && this.hasCardOutlet && this.cardOutlets.length > 0) {
        this.checkAllChildren()
      } else if (this.type == 'subtask' && this.hasCardOutlet && this.cardOutlets.length === 1) {
        // Which should be the parent card.
        this.cardOutlet.checkChildren()
      }
    }
  }

  checkAllChildren() {
    this.cardOutlets.forEach(outlet => {
      if(outlet.cardIsNotChecked()) {
        outlet.checkCard()
        outlet.updateBackEnd()
      }
    })
  }

  checkChildren() {
    let allChecked = true
    for (let i = 0; i < this.cardOutlets.length; i++) {
      if (this.cardOutlets[i].cardIsNotChecked()) {
        log(this.cardOutlets[i].element.id, this.cardOutlets[i].checked)
        allChecked = false
        break
      }
    }
    if (allChecked) {
      this.checkCard()
      this.updateBackEnd()
    } else {
      this.uncheckCard()
      this.updateBackEnd()
    }
  }

  cardIsNotChecked() {
    return this.cardIsChecked() ? false : true
  }
  cardIsChecked() {
    return this.cardCompletedTarget.checked
  }

  checkCard() {
    this.cardFauxCheckTarget.classList.remove('fa-square')
    this.cardFauxCheckTarget.classList.add('fa-square-check')
    this.element.classList.add('card-checked')
    this.cardCompletedTarget.checked = true
  }

  uncheckCard() {
    this.cardFauxCheckTarget.classList.remove('fa-square-check')
    this.cardFauxCheckTarget.classList.add('fa-square')
    this.element.classList.remove('card-checked')
    this.cardCompletedTarget.checked = false
  }

  get card() {
    return this.cardTarget
  }

  get cardOrder() {
    return this.cardOrderTarget
  }

  get cardCompleted() {
    return this.cardCompletedTarget
  }

  get cardFauxCheck() {
    return this.cardFauxCheckTarget
  }

  updateBackEnd() {
    fetch(`${this.urlValue}/edit`, {
      method: "GET",
      headers: { "Accept": "application/json" },
    })
      .then(response => response.json())
      .then((data) => {

        this.hiddenFormCont.innerHTML = data.form
        this.form = this.hiddenFormCont.getElementsByTagName('form')[0]
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
}
