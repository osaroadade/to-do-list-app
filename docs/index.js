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
const savedLists = localStorage.getItem("tasks")
const showCompleted = document.querySelector(".completed-btn")
const showAll = document.querySelector(".show-all")

let taskItems = []
let parsedSavedLists = JSON.parse(savedLists)

let containerItems = ""
function renderAll() {
    if (taskItems.length > 0) {
        for (let i = 0; i < taskItems.length; i++) {
            containerItems += `
                <div class="reminder-item">
                    <div><span class="circle"></span></div>
                    <p class="list-item">${taskItems[i].name}</p>
                </div>
            `
        }
        reminderList.innerHTML = containerItems
        containerItems = ""
    } else {
        emptyState.classList.toggle("d-block")
    }
    itemAction()
    if (parsedSavedLists) {
        getStatusTypeFLS()
    }
}

//Render from local storage
function RenderFromLS() {
    let stringItems = JSON.stringify(taskItems)
    localStorage.setItem("tasks", stringItems)
}


if (parsedSavedLists) {
    taskItems = parsedSavedLists
    renderAll()
    getStatusTypeFLS()
    setState()
    emptyState.classList.remove("d-block")
} else {
    renderAll()
}

function itemAction() {
    for (let i = 0; i < circle.length; i++) {
        function changeStatusType(action, toggleStatusType) {
            parsedSavedLists[i].statusType = toggleStatusType
            circle[i].classList[action]("circle-clicked")
            listItem[i].classList[action]("todo-done")
        }
        circle[i].addEventListener("click", () => {
            if (parsedSavedLists[i].statusType === "unchecked") {
                changeStatusType("add", "checked")
            } else {
                changeStatusType("remove", "unchecked")
            }
            RenderFromLS()
        })
    }
}

//Get Status Type from Local Storage
function getStatusTypeFLS() {
    for (let i = 0; i < circle.length; i++) {
        if (parsedSavedLists[i].statusType === "checked") {
            circle[i].classList.add("circle-clicked")
            listItem[i].classList.add("todo-done")
        }
    }
}

// Search
sReminders.addEventListener("keyup", () => {
    const sRemindersLC = sReminders.value.toLowerCase()
    for (let i = 0; i < taskItems.length; i++) {
        let listItemLC = taskItems[i].name.toLowerCase()
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

//Work on this part from
for (let i = 0; i < newReminder.length; i++) {
    if (newReminder[i].className.includes("here")) {
        newReminder[i].addEventListener("click", () => {
            newRContainer.classList.add("slideup", "d-block")
        })
    } else {
        newReminder[i].addEventListener("click", () => {
            newRContainer.classList.remove("slideup", "d-block")
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

//Adding Reminders
for (let i = 0; i < addReminder.length; i++) {
    addReminder[i].addEventListener("click", () => {
        const objectItems = {
            name: reminderTitle.value,
            statusType: "unchecked"
        }
        taskItems.push(objectItems)
        RenderFromLS()
        renderAll()
        setState()
        reminderTitle.value = ""
        emptyState.classList.remove("d-block")
        newRContainer.classList.remove("slideup")
    })
}

//Render Reminder Status Type
for (let i = 0; i < listItem.length; i++) {
    function actionWithClass(action1, action2) {
        showCompleted.classList[action1]("d-none")
        showAll.classList[action2]("d-none")
    }
    showCompleted.addEventListener("click", () => {
        actionWithClass("add", "remove")
        if (listItem[i].classList.contains("todo-done")) {
            emptyState.classList.remove("d-block")
        } else {
            reminderItem[i].classList.add("d-none")
            emptyState.classList.add("d-block")
            emptyState.innerHTML = `<p>You have not completed any reminders.</p>`
        }
    })
    showAll.addEventListener("click", () => {
        actionWithClass("remove", "add")
        if (reminderItem[i].classList.contains("d-none")) {
            reminderItem[i].classList.remove("d-none")
            emptyState.classList.remove("d-block")
        }
    })
}