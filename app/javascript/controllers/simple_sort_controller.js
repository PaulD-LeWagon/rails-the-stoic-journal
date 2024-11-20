import { Controller } from "@hotwired/stimulus"

Array.prototype.shuffle = function () {
  // Iterate over the array in reverse order
  for (let i = this.length - 1; i > 0; i--) {
    // Generate Random Index
    const j = Math.floor(Math.random() * (i + 1))

    // Swap elements
    ;[this[i], this[j]] = [this[j], this[i]]
  }
  return this
}

Array.prototype.toShuffle = function () {
  // Iterate over the array in reverse order
  const array = [...this]
  for (let i = array.length - 1; i > 0; i--) {
    // Generate Random Index
    const j = Math.floor(Math.random() * (i + 1))
    // Swap elements
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

const log = console.log

// Connects to data-controller="simple-sort"
export default class extends Controller {
  static targets = ["list", "button"]

  connect() {
    log("simple-sort connected")
  }

  sort(e) {
    const liArray = []

    if (this.hasListTarget) {
      Array.from(this.listTarget.children).forEach((li, i) => {
        liArray.push(li.parentNode.removeChild(li))
      })

      liArray.sort((a, b) => {
        const d1 = Date.parse(a.dataset.sortByValue)
        const d2 = Date.parse(b.dataset.sortByValue)
        const answer = d1 - d2
        // log(d1, d2, answer)
        return answer
      })

      liArray.forEach((li) => {
        this.listTarget.appendChild(li)
      })
    }
  }

  shuffle(e) {
    const liArray = []

    if (this.hasListTarget) {
      Array.from(this.listTarget.children).forEach((li, i) => {
        liArray.push(li.parentNode.removeChild(li))
      })

      liArray.shuffle()
      liArray.forEach((li) => {
        log(li.dataset.sortByValue)
      })

      liArray.forEach((li) => {
        this.listTarget.appendChild(li)
      })
    }
  }
}
