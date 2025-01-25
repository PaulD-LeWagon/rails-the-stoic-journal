function logHotwireEvents() {
  // A quick way to see which events are being fired by Turbo
  const events = [
    "turbo:load",
    "turbo:render",
    "turbo:visit",
    "turbo:click",
    "turbo:frame-missing",
    "turbo:frame-load",
    "turbo:frame-render",
    "turbo:submit-start",
    "turbo:submit-end",
    "turbo:before-visit",
    "turbo:before-frame-render",
    "turbo:before-stream-render",
    "turbo:before-render",
    "turbo:before-cache",
    "turbo:before-fetch-response",
    "turbo:before-fetch-request",
    "turbo:fetch-request-error",
  ]
  console.log("Setting up hotwire/turbo event listeners...")
  events.forEach((eventName) => {
    addEventListener(eventName, (e) => {
      console.log(
        eventName,
        e.target.id,
        e.target.tagName,
        e.target.title.elipsize(),
        e.detail
      )
    })
  })
}

export default logHotwireEvents;
