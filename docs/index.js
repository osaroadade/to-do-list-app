let todoListItem = []

const circle = document.getElementsByClassName("circle")
const listItem = document.getElementsByClassName("list-item")
const reminderList = document.getElementById("reminder-list")
const emptyState = document.getElementById("empty-state")
const newReminder = document.getElementsByClassName("cancel-re")
const newRContainer = document.querySelector(".newR-container")
const reminderTitle = document.getElementById("reminder-title")
const addReminder = document.getElementsByClassName("add-reminder")

let containerItems = ""
let reminderChild = localStorage.getItem("Reminders")
let remindersFLS = JSON.parse(reminderChild)
// console.log(remindersFLS)
if (remindersFLS) {
    todoListItem = remindersFLS
    renderAll()
    setState()
    emptyState.classList.remove("d-block")
}

function renderAll() {
    if (todoListItem.length > 0) {
        for (const i in todoListItem) {
            containerItems += `
                <div class="reminder-item">
                    <span class="circle"></span>
                    <p class="list-item">${todoListItem[i]}</p>
                </div>
            `
        }
        reminderList.innerHTML = containerItems
    } else {
        emptyState.classList.toggle("d-block")
    }
    for (let i = 0; i < circle.length; i++) {
        circle[i].addEventListener("click", () => {
            circle[i].classList.toggle("circle-clicked")
            listItem[i].classList.toggle("todo-done")
        })
    }
}

if (!reminderChild) {
    renderAll()
}

// renderAll()

//Work on this part from
for (let i = 0; i < newReminder.length; i++) {
    if (newReminder[i].className.includes("here")) {
        newReminder[i].addEventListener("click", () => {
            newRContainer.classList.add("slideup")
        })
    } else {
        newReminder[i].addEventListener("click", () => {
            newRContainer.classList.remove("slideup")
        })
    }
}
// to here

function setState() {
    for (let i = 0; i < addReminder.length; i++) {
        addReminder[i].disabled = true
        if (reminderTitle.value != "") {
            addReminder[i].disabled = false
        }
    }
}

reminderTitle.addEventListener("keyup", () => {
    setState()
})

for (let i = 0; i < addReminder.length; i++) {
    addReminder[i].addEventListener("click", () => {
        todoListItem.push(reminderTitle.value)
        reminderTitle.value = ""
        let saveReminders = JSON.stringify(todoListItem)
        localStorage.setItem("Reminders", saveReminders)
        renderAll()
        setState()
        emptyState.classList.remove("d-block")
        newRContainer.classList.remove("slideup")
    })
}