"use strict"

const listItem = document.getElementsByClassName("list-item")
const circle = document.getElementsByClassName("circle")
const reminderList = document.querySelector("#reminder-list")
const emptyState = document.querySelector("#empty-state")
const titleContainer = document.querySelector(".title-container")
const completedBtn = document.querySelector(".completed-btn")
const newReminder = document.querySelector(".new-reminder")
const newReminderContainer = document.querySelector(".new-reminder-container")
const cancelRe = document.querySelector(".cancel-re")
const addReminder = document.querySelectorAll(".add-reminder")
const reminderTitle = document.querySelector("#reminder-title")
const reminderItem = document.getElementsByClassName("reminder-item")
const showAll = document.querySelector(".show-all")

const getItemsList = localStorage.getItem("items-list")

let itemsList = []
let parseditemsList = JSON.parse(getItemsList)
parseditemsList.forEach(item => {
    item.checkItem = function () {
        this.isChecked = this.isChecked === false
    }
})

//Render reminder items
if (itemsList.length > 0) {
    renderReminderItems()
}

function renderReminderItems() {
    reminderList.classList.remove("d-none")
    setDefaultEmptyState()

    let reminderItem = ""
    for (let i = 0; i < itemsList.length; i++) {
        reminderItem += `
                <div class="reminder-item">
                    <button class="action-btn edit-btn-items d-none">Edit</button>
                    <button class="delete-btn d-none"><img src="./assets/delete.svg" alt="delete"></button>
                    <div>
                        <span class="circle"></span>
                    </div>
                    <p class="list-item">${itemsList[i].name}</p>
                    <button class="edit-item-btn d-none"><img src="./assets/edit.svg" alt="edit"></button>
                    <button class="action-btn delete-btn-items d-none">Delete</button>
                </div>`
    }
    reminderList.innerHTML = reminderItem

    setStatus()
}

function setDefaultEmptyState() {
    if (itemsList.length > 0) {
        emptyState.classList.add("d-none")
        titleContainer.classList.remove("d-none")
    }
}

function setStatus() {
    for (let i = 0; i < itemsList.length; i++) {
        circle[i].addEventListener("click", () => {
            circle[i].classList.toggle("circle-clicked")
            listItem[i].classList.toggle("todo-done")

            itemsList[i].checkItem()
            setItemsILS()

            setCompleted()

            if (completedBtn.classList.contains("d-none")) {
                showcompletedItems()
            }

            // if (reminderItem[i]) {
            //     showAllItems()
            // }
        })
    }
}

setStatus()

function setCompleted() {
    completedBtn.disabled = true
    for (let i = 0; i < itemsList.length; i++) {
        if (listItem[i].classList.contains("todo-done")) {
            completedBtn.disabled = false
        }
    }
}

newReminder.addEventListener("click", () => {
    newReminderContainer.classList.remove("d-none")
    newReminderContainer.classList.add("slideup")

    // Autofocus on the add reminder field

    resetNRCClassList()
})

cancelRe.addEventListener("click", () => {
    newReminderContainer.classList.add("slidedown")
})

//Reset newReminderContainer
function resetNRCClassList() {
    if (newReminderContainer.classList.contains("slidedown")) {
        newReminderContainer.classList.remove("slidedown")
    }
}

//Create new reminder

function setDisabled() {
    addReminder.forEach(item => {
        if (reminderTitle.value !== "") {
            item.disabled = false
        }
    })
}

//Enter name for new reminder
reminderTitle.addEventListener("keyup", () => {
    //Enable buttons to add reminder
    setDisabled()
})

//Create new reminder object
function Item(name) {
    this.name = name
    this.isChecked = false
}

addReminder.forEach(item => {
    item.addEventListener("click", () => {
        itemsList.push(new Item(reminderTitle.value))
        setItemsILS()
        reminderTitle.value = ""
        setDisabled()
        renderReminderItems()

        newReminderContainer.classList.add("slidedown")
    })
})

// Set items in local storage
function setItemsILS() {
    let stringedItems = JSON.stringify(itemsList)
    localStorage.setItem("items-list", stringedItems)
}

//Render items from local storage
if (parseditemsList.length > 0) {
    itemsList = parseditemsList
    renderReminderItems()
    checkIsChecked()
    setCompleted()
}

// Check if items from local storage is checked
function checkIsChecked() {
    if (parseditemsList.length > 0) {
        for (let i = 0; i < parseditemsList.length; i++) {
            if (parseditemsList[i].isChecked === true) {
                circle[i].classList.add("circle-clicked")
                listItem[i].classList.add("todo-done")
            }
        }
    }
}

function showcompletedItems() {
    for (let i = 0; i < circle.length; i++) {
        if (!circle[i].classList.contains("circle-clicked")) {
            reminderItem[i].classList.add("d-none")
            completedBtn.classList.add("d-none")
            showAll.classList.remove("d-none")
        }
    }
}

function showAllItems() {
    for (let i = 0; i < circle.length; i++) {
        if (!circle[i].classList.contains("circle-clicked")) {
            reminderItem[i].classList.remove("d-none")
            completedBtn.classList.remove("d-none")
            showAll.classList.add("d-none")
        }
    }
}

const reminderHeading = document.querySelector("div.reminder-container > h1")

//Show completed
completedBtn.addEventListener("click", () => {
    reminderHeading.textContent = "Completed"
    showcompletedItems()
})

// Dev notes: When completedBtn is clicked, create a function that ensures that removing the only item would remove it from the showcompleted list

//Show all
showAll.addEventListener("click", () => {
    reminderHeading.textContent = "Reminders"
    showAllItems()
})