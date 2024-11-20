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
    log(
      "HTML Markup for simple-sort commented out @ bottome of simple_sort_controller.js"
    )
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

{
  /* <div class="container d-none">
  <div class="row">
    <div class="col-md-6 p-3">
      <div data-controller="simple-sort">
        <button
          data-simple-sort-target="button"
          data-action="click->simple-sort#sort">
          Sort
        </button>

        <button
          data-simple-sort-target="button"
          data-action="click->simple-sort#shuffle">
          Shuffle
        </button>

        <ul
          id="list"
          class="list-group"
          data-simple-sort-target="list">
          <li
            class="list-group-item"
            data-sort-by-value="2024-11-19 06:00">
            06:00
          </li>
          <li
            class="list-group-item"
            data-sort-by-value="2024-11-19 12:00">
            12:00
          </li>
          <li
            class="list-group-item"
            data-sort-by-value="2024-11-19 08:00">
            08:00 (1)
          </li>
          <li
            class="list-group-item"
            data-sort-by-value="2024-11-19 10:00">
            10:00
          </li>
          <li
            class="list-group-item"
            data-sort-by-value="2024-11-19 07:00">
            07:00
          </li>
          <li
            class="list-group-item"
            data-sort-by-value="2024-11-19 11:00">
            11:00
          </li>
          <li
            class="list-group-item"
            data-sort-by-value="2024-11-19 09:00">
            09:00
          </li>
          <li
            class="list-group-item"
            data-sort-by-value="2024-11-19 08:00">
            08:00 (2)
          </li>
        </ul>
      </div>
    </div>
  </div>
</div> */
}
