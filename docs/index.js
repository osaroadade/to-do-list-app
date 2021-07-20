const circle = document.getElementsByClassName("circle")
const listItem = document.getElementsByClassName("list-item")
const reminderList = document.getElementById("reminder-list")
const emptyState = document.getElementById("empty-state")
const newReminder = document.getElementById("new-reminder")
const newRContainer = document.querySelector(".newR-container")

let todoListItem = []
let containerItems = ""

function renderItems() {
	for (let i = 0; i < todoListItem.length; i++) {
		containerItems += `
			<div class="reminder-item">
				<span class="circle"></span>
				<p class="list-item">${todoListItem[i]}</p>
			</div>
		`
	}
	reminderList.innerHTML = containerItems
}

if (todoListItem.length > 0) {
	renderItems()
} else {
	emptyState.classList.toggle("d-block")
}

for (let i = 0; i < circle.length; i++) {
	circle[i].addEventListener("click", () => {
		circle[i].classList.toggle("circle-clicked")
		listItem[i].classList.toggle("todo-done")
	})

}

newReminder.addEventListener("click", () => {
	newRContainer.classList.add("animationforcc")
	console.log("Clicked")
})