import { Controller } from "@hotwired/stimulus"
import Swal from "sweetalert2";
const log = something => console.log(typeof something, something)

// Connects to data-controller="form"
export default class extends Controller {

  static targets = [ "form" ]

  static values = {  }

  initialize() { }

  connect() {
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

  submit(e) {
    // e.preventDefault()
    // fetch(this.formTarget.action, {
    //   method: "POST",
    //   headers: { "Accept": "application/json" },
    //   body: new FormData(this.formTarget)
    // })
    //   .then(response => response.json())
    //   .then((data) => {
    //     // Icons: warning, error, success, info, and question
    //     Swal.fire({
    //       title: this.#capitalise(data.status),
    //       text: data.message,
    //       icon: data.status,
    //       confirmButtonText: (data.status === 'success' ? 'Cool' : 'Okay'),
    //       customClass: {
    //         confirmButton: `btn btn-${data.status} btn-lg`,
    //       }
    //     });
    //     this.formTarget.reset()
    //     console.log(data)
    //   })
  }

  #capitalise(strOfWords) {
    const words = strOfWords.split(" ")
    return words.map((word) => { return word[0].toUpperCase() + word.substring(1); }).join(" ")
  }

}
