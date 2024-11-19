function Greetings() {
  log("Salve Mundus! Futue te Ipsum!")
}
export default () => {}

class MyUtils {
  constructor() {
    this.shuffle = this.shuffle.bind(this)
    this.getRandomInt = this.getRandomInt.bind(this)
  }
  static getRandInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
}
export { MyUtils }

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

export { log }
