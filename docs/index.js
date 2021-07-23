let todoListItem = []
let doneListItem = []

const circle = document.getElementsByClassName("circle")
const listItem = document.getElementsByClassName("list-item")
const reminderList = document.getElementById("reminder-list")
const emptyState = document.getElementById("empty-state")
const newReminder = document.getElementsByClassName("cancel-re")
const newRContainer = document.querySelector(".newR-container")
const reminderTitle = document.getElementById("reminder-title")
const addReminder = document.getElementsByClassName("add-reminder")
const sReminders = document.querySelector("#sReminders")
const reminderItem = document.getElementsByClassName("reminder-item")
const titleContianer = document.querySelector(".title-container")
const searchContainer = document.querySelector(".search-container")
const cancelSearch = document.querySelector(".cancel-search")
const reminderChild = localStorage.getItem("Reminders")

// Search
sReminders.addEventListener("keyup", () => {
    const sRemindersLC = sReminders.value.toLowerCase()
    for (let i = 0; i < listItem.length; i++) {
        let listItemLC = listItem[i].textContent.toLowerCase()
        if (listItemLC.includes(sRemindersLC)) {
            reminderItem[i].style.display = "flex"
        } else {
            reminderItem[i].style.display = "none"
        }
    }
})

function searchMotion(action) {
    searchContainer.classList[action]("search-container-grow")
    cancelSearch.classList[action]("d-block")
    titleContianer.classList[action]("transform-y")
}

sReminders.addEventListener("click", () => {
    searchMotion("add")
})

cancelSearch.addEventListener("click", () => {
    searchMotion("remove")
})

let containerItems = ""
let remindersFLS = JSON.parse(reminderChild)
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
                    <div><span class="circle"></span></div>
                    <p class="list-item">${todoListItem[i]}</p>
                </div>
            `
        }
        reminderList.innerHTML = containerItems
        containerItems = ""
    } else {
        emptyState.classList.toggle("d-block")
    }
    for (let i = 0; i < circle.length; i++) {
        circle[i].addEventListener("click", () => {
            circle[i].classList.toggle("circle-clicked")
            listItem[i].classList.toggle("todo-done")
            if (!listItem[i].classList.contains("todo-done")) {
                let savedDoneReminders = JSON.parse(localStorage.getItem("Completed List"))
                // console.log(savedDoneReminders)
                savedDoneReminders.splice(i, 1)
                savedDoneReminders = JSON.stringify(savedDoneReminders)
                if (savedDoneReminders === '[]') {
                    localStorage.removeItem("Completed List")
                } else {
                    localStorage.setItem("Completed List", savedDoneReminders)
                }
                // console.log(doneListItem)
            } else {
                doneListItem.splice(i, 0, todoListItem[i])
                let saveDoneReminders = JSON.stringify(doneListItem)
                localStorage.setItem("Completed List", saveDoneReminders)
                // console.log(doneListItem)
            }
        })
    }
}

if (!reminderChild) {
    renderAll()
}

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