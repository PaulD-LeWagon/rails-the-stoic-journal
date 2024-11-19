const ul = document.createElement("ul")
const lis = []
this.tasks.forEach((task, i) => {
  const li = document.createElement("li")
  li.innerHTML = `${task.startTime} ${task.title}`
  li.setAttribute("data-order", task.startTime)
  lis.push(li)
})

lis.shuffle().forEach((li) => {
  ul.appendChild(li)
})

ul.addEventListener("click", (e) => {
  const LIs = Array.from(e.target.closest("ul").children).sort((a, b) => {
    return a.getAttribute("data-order") < b.getAttribute("data-order") ? -1 : 1
  })
  ul.innerHTML = ""
  LIs.forEach((li) => {
    ul.appendChild(li)
  })
})

document.getElementById("all-tasks").appendChild(ul)
