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
const searchReminders = document.querySelector("#sReminders")

const getItemsList = localStorage.getItem("items-list")

let itemsList = []
let parseditemsList = JSON.parse(getItemsList)

if (getItemsList) {
	parseditemsList.forEach(item => {
		item.checkItem = function () {
			this.isChecked = this.isChecked === false
		}
	})
}

const editContainer = document.querySelector(".edit-container")
const editReminder = document.querySelector("#edit-reminder")
const cancelEdit = document.querySelector(".cancel-edit")
const updateReminder = document.querySelector(".update-reminder")

const editBtn = document.querySelector(".edit-btn")
const doneBtn = document.querySelector(".done-btn")

const editItems = document.getElementsByClassName("edit-items")
const deleteBtn = document.getElementsByClassName("delete-btn")
const editItemBtn = document.getElementsByClassName("edit-item-btn")
const deleteBtnItems = document.getElementsByClassName("delete-btn-items")

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
                    <button class="action-btn edit-items d-none">Edit</button>
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
	checkIsChecked()

	showMainEditActions(editItemBtn, editItems)
	showMainEditActions(deleteBtn, deleteBtnItems)

	editReminderItems()
	deleteReminderItem()
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
		})
	}
}

// setStatus()

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
if (getItemsList && parseditemsList.length > 0) {
	itemsList = parseditemsList
	renderReminderItems()
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
//TODO 1: When completedBtn is clicked, create a function that ensures that removing the only item would remove it from the show completed list

// function checkIsEmpty() {
// 	if (completedBtn.classList.contains("d-none")) {
// 		// for (const item of itemsList) {
// 		// 	if (item.isChecked === false) {
// 		// 		reminderHeading.textContent = "Reminders"
// 		// 		showAllItems()
// 		// 	}
// 		// }
// 		itemsList.forEach(item => {
// 			if (item.isChecked === false) {
// 				reminderHeading.textContent = "Reminders"
// 				showAllItems()
// 			}
// 		})
// 	}
// }

//Show all
showAll.addEventListener("click", () => {
	reminderHeading.textContent = "Reminders"
	showAllItems()
})

//Search
const searchContainer = document.querySelector(".search-container")
const cancelSearch = document.querySelector(".cancel-search")

function searchActiveState(action1, action2) {
	titleContainer.classList[action1]("transform-y")
	searchContainer.classList[action1]("search-container-grow")
	cancelSearch.classList[action2]("d-none")
}

searchReminders.addEventListener("click", () => {
	searchActiveState("add", "remove")
})

cancelSearch.addEventListener("click", () => {
	searchActiveState("remove", "add")
})

//Search reminder items
searchReminders.addEventListener("keyup", () => {
	const searchRemindersLowerCase = searchReminders.value.toLowerCase()
	for (let i = 0; i < itemsList.length; i++) {
		let itemListLowerCase = itemsList[i].name.toLowerCase()
		itemListLowerCase.includes(searchRemindersLowerCase) ? reminderItem[i].classList.remove("d-none") : reminderItem[i].classList.add("d-none")
	}
})

// TODO 2: Create a function that checks when the search result is empty , then show empty state.

//Initialise edit button
function setEditableState(action1, action2) {
	for (let i = 0; i < itemsList.length; i++) {
		deleteBtn[i].classList[action1]("d-none")
		editItemBtn[i].classList[action1]("d-none")
		reminderItem[i].classList[action2]("editable")
	}
	reminderList.classList[action2]("reminder-list-editable")
}

editBtn.addEventListener("click", () => {
	editBtn.classList.add("d-none")
	doneBtn.classList.remove("d-none")

	setEditableState("remove", "add")
})

doneBtn.addEventListener("click", () => {
	editBtn.classList.remove("d-none")
	doneBtn.classList.add("d-none")

	setEditableState("add", "remove")
})

function showMainEditActions(call, response) {
	for (let i = 0; i < call.length; i++) {
		call[i].addEventListener("click", () => {
			response[i].classList.toggle("d-none")
		})
	}
}

//Edit reminder items
function editReminderItems() {
	for (let i = 0; i < editItems.length; i++) {
		editItems[i].addEventListener("click", () => {
			editContainer.classList.remove("d-none")
			editReminder.value = parseditemsList[i].name

			reminderItem[i].classList.add("editing")
		})
	}
}

// Remove disabled state from button
editReminder.addEventListener("keyup", () => {
	for (const item of parseditemsList) {
		updateReminder.disabled = editReminder.value === ""
	}
})

// Edit container action buttons

// Clear Editing
function clearEditing() {
	editContainer.classList.add("d-none")
	for (const item of reminderItem) {
		item.classList.remove("editing")
	}
}

//Cancel Edit
cancelEdit.addEventListener("click", () => {
	clearEditing()
})

//Update reminder after edit
updateReminder.addEventListener("click", () => {
	Array.from(reminderItem).forEach((item, index) => {
		if (item.classList.contains("editing")) {
			itemsList[index].name = editReminder.value
		}
	})

	setItemsILS()
	renderReminderItems()
	clearEditing()

	setEditableState("remove", "add")
})

const deleteConfirmation = document.querySelector(".delete-confirmation")

function showDeleteConfirmationMsg() {
	deleteConfirmation.classList.add("delete-confirmation-animation")
	deleteConfirmation.classList.remove("d-none")

	setTimeout(() => {
		deleteConfirmation.classList.remove("delete-confirmation-animation")
		deleteConfirmation.classList.add("d-none")
	}, 1500)
}

// Delete reminder items
function deleteReminderItem() {
	Array.from(deleteBtnItems).forEach((item, index) => {
		item.addEventListener("click", () => {
			deleteConfirmation.firstElementChild.textContent = `${itemsList[index].name} has been deleted successfully!`

			itemsList.splice(index, 1)

			setItemsILS()
			renderReminderItems()

			setEditableState("remove", "add")

			showDeleteConfirmationMsg()
		})
	})
}