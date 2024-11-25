import { Application } from "@hotwired/stimulus"

const application = Application.start()

// Configure Stimulus development experience
application.debug = false
window.Stimulus = application

export { application }

// // To determine if the stimulus callbacks are being triggered, on the initial page load
// document.addEventListener("turbo:load", (event) => {
//   const isInitialPageLoad = Object.keys(event.detail.timing).length === 0
// })
