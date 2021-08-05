"use strict"
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
const deleteBtn = document.getElementsByClassName("delete-btn")
const editItemBtn = document.getElementsByClassName("edit-item-btn")
const editBtn = document.querySelector(".edit-btn")
const doneBtn = document.querySelector(".done-btn")
const deleteBtnItems = document.getElementsByClassName("delete-btn-items")
const editBtnItems = document.getElementsByClassName("edit-btn-items")
const deleteConfirmation = document.querySelector("delete-confirmation")
const editContainer = document.querySelector(".edit-container")
const cancelEdit = document.querySelector(".cancel-edit")
const editReminder = document.querySelector("#edit-reminder")
const updateReminder = document.querySelector(".update-reminder")

let taskItems = []
let parsedSavedLists = JSON.parse(savedLists)

//Get Status Type from Local Storage
function getStatusTypeFLS() {
    for (let i = 0; i < circle.length; i++) {
        if (parsedSavedLists[i].statusType === "checked" && parsedSavedLists.length > 0) {
            circle[i].classList.add("circle-clicked")
            listItem[i].classList.add("todo-done")
        }
    }
}

function renderAll() {
    let containerItems = ""
    if (taskItems.length > 0) {
        for (let i = 0; i < taskItems.length; i++) {
            containerItems += `
                <div class="reminder-item">
                    <button class="action-btn edit-btn-items d-none">Edit</button>
                    <button class="delete-btn d-none"><img src="./assets/delete.svg"></button>
                    <div><span class="circle"></span></div>
                    <p class="list-item">${taskItems[i].name}</p>
                    <button class="edit-item-btn d-none"><img src="./assets/edit.svg"></button>
                    <button class="action-btn delete-btn-items d-none">Delete</button>
                </div>
            `
        }
        reminderList.innerHTML = containerItems
        // containerItems = ""
    } else {
        emptyState.classList.toggle("d-block")
    }
    itemAction()
    if (parsedSavedLists.length > 0) {
        getStatusTypeFLS()
    }
    if (taskItems.length === 0) {
        editBtn.classList.add("d-none")
    } else {
        editBtn.classList.remove("d-none")
    }
}

//Render from local storage
function RenderFromLS() {
    let stringItems = JSON.stringify(taskItems)
    localStorage.setItem("tasks", stringItems)
}


if (parsedSavedLists.length > 0) {
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
            if (parsedSavedLists[i].statusType === "unchecked" && parsedSavedLists.length > 0) {
                changeStatusType("add", "checked")
            } else {
                changeStatusType("remove", "unchecked")
            }
            RenderFromLS()
        })
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
        if (reminderList.className.includes("reminder-list-editable")) {
            reminderList.classList.remove("reminder-list-editable")
            doneBtn.classList.add("d-none")
        }
    })
}

//Toggle buttons on click in title continers
function actionWithClass(name1, name2) {
    name1.classList.toggle("d-none")
    name2.classList.toggle("d-none")
}

//Render Reminder Status Type (Show all and show completed)
for (let i = 0; i < listItem.length; i++) {
    showCompleted.addEventListener("click", () => {
        actionWithClass(showCompleted, showAll)
        if (listItem[i].classList.contains("todo-done")) {
            emptyState.classList.remove("d-block")
        } else {
            reminderItem[i].classList.add("d-none")
            emptyState.classList.add("d-block")
            emptyState.innerHTML = `<p>You have not completed any reminders.</p>`
        }
    })
    showAll.addEventListener("click", () => {
        actionWithClass(showCompleted, showAll)
        if (reminderItem[i].classList.contains("d-none")) {
            reminderItem[i].classList.remove("d-none")
            emptyState.classList.remove("d-block")
        }
    })
}

// Render Edit Actions for reminder items
function renderEditActions(elementName) {
    function toggleEditActions(action, className) {
        for (const i of action) {
            i.classList.toggle(className)
        }
    }
    elementName.addEventListener("click", () => {
        actionWithClass(editBtn, doneBtn)
        toggleEditActions(deleteBtn, "d-none")
        toggleEditActions(editItemBtn, "d-none")
        toggleEditActions(reminderItem, "editable")
        reminderList.classList.toggle("reminder-list-editable")

        if (elementName === doneBtn) {
            for (const i of editBtnItems) {
                if (!i.classList.contains("d-none")) {
                    i.classList.toggle("d-none")
                }
            }
            for (const i of deleteBtnItems) {
                if (!i.classList.contains("d-none")) {
                    i.classList.toggle("d-none")
                }
            }
        }

        eLforActionBtn()
        deleteReminder()
        editReminderItems()
    })
}

renderEditActions(editBtn)
renderEditActions(doneBtn)

// Edit list for action button
function eLforActionBtn() {
    for (let i = 0; i < reminderItem.length; i++) {
        editItemBtn[i].addEventListener("click", () => {
            editBtnItems[i].classList.toggle("d-none")
            if (!deleteBtnItems[i].classList.contains("d-none")) {
                deleteBtnItems[i].classList.toggle("d-none")
            }
        })
        deleteBtn[i].addEventListener("click", () => {
            deleteBtnItems[i].classList.toggle("d-none")
            if (!editBtnItems[i].classList.contains("d-none")) {
                editBtnItems[i].classList.toggle("d-none")
            }
        })
    }
}

function renderEditedItems() {
    RenderFromLS()
    renderAll()
    if (reminderList.className.includes("reminder-list-editable")) {
        editBtn.classList.add("d-none")
        function stayEditable(arrayName, className, action) {
            for (const item of arrayName) {
                item.classList[action](className)
            }
        }
        stayEditable(reminderItem, "editable", "add")
        stayEditable(editItemBtn, "d-none", "remove")
        stayEditable(deleteBtn, "d-none", "remove")
    }
}

//Delete Reminder
function deleteReminder() {
    for (let i = 0; i < reminderItem.length; i++) {
        deleteBtnItems[i].addEventListener("click", () => {
            parsedSavedLists.splice(i, 1)
            renderEditedItems()
            // deleteConfirmation.
        })
    }
}

// Edit Reminder
function editReminderItems() {
    for (let i = 0; i < reminderItem.length; i++) {
        editBtnItems[i].addEventListener("click", () => {
            editContainer.classList.remove("d-none")
            listItem[i].classList.add("editing")
            editReminder.value = listItem[i].textContent
        })

        updateReminder.addEventListener("click", () => {
            if (listItem[i].classList.contains("editing")) {
                listItem[i].classList.remove("editing")
                renderEditedItems()
                editContainer.classList.remove("d-none")
            }
        })
    }
}

function setEditInputState() {
    updateReminder.disabled = true
    if (editReminder.value != "") {
        updateReminder.disabled = false
    }
}

editReminder.addEventListener("keyup", () => {
    setEditInputState()
})

cancelEdit.addEventListener("click", () => {
    editContainer.classList.add("d-none")
    editReminder.value = ""
})