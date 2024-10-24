import { Controller } from "@hotwired/stimulus"
import Swal from "sweetalert2";
const log = something => console.log(typeof something, something)

// Connects to data-controller="form"
export default class extends Controller {

  static targets = [ "form" ]

  static values = { }

  initialize() { }

  connect() {
    log(this.element.id + ' form')
    // log(this)
  }

  submit(e) {
    e.preventDefault()
    fetch(this.formTarget.action, {
      method: "POST",
      headers: { "Accept": "application/json" },
      body: new FormData(this.formTarget)
    })
      .then(response => response.json())
      .then((data) => {
        // Icons: warning, error, success, info, and question
        Swal.fire({
          title: this.#capitalise(data.status),
          text: data.message,
          icon: data.status,
          confirmButtonText: (data.status === 'success' ? 'Cool' : 'Okay'),
          customClass: {
            confirmButton: `btn btn-${data.status} btn-lg`,
          }
        });
        console.log(data)
      })
  }

  #capitalise(strOfWords) {
    const words = strOfWords.split(" ")
    return words.map((word) => { return word[0].toUpperCase() + word.substring(1); }).join(" ")
  }

}
