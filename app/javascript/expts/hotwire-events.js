const events = [
  "turbo:before-visit",
  "turbo:before-frame-render",
  "turbo:before-stream-render",
  "turbo:before-render",
  "turbo:before-cache",
  "turbo:before-fetch-response",
  "turbo:before-fetch-request",
  "turbo:fetch-request-error",
  "turbo:frame-missing",
  "turbo:frame-load",
  "turbo:frame-render",
  "turbo:load",
  "turbo:render",
  "turbo:visit",
  "turbo:click",
  "turbo:submit-start",
  "turbo:submit-end",
]
events.forEach((event) => {
  addEventListener(event, (e) => {
    console.log(e.target.id, e.target.tagName, e.target)
  })
})
