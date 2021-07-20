/* const inputEl = document.getElementById("inputEl")
const addToList = document.querySelector(".addToList")
const listItem = document.getElementById("list-item")
const searchList = document.getElementById("searchList")
const manChild = document.querySelectorAll("#todoItem")

let todoList = []
let mainArr = ""
function renderList() {
    // let dosAction = ""
    const newLi = document.createElement("li")
    newLi.id = "todoItem"
    for (let i = 0; i < todoList.length; i++) {
        // dosAction += `<li class="todoItem">${todoList[i]}</li>`
        newLi.textContent = todoList[i]
        mainArr += todoList[i].toLowerCase()
    }
    listItem.appendChild(newLi)
}

addToList.addEventListener("click", () => {
    if (inputEl.value) {
        todoList.push(inputEl.value)
        inputEl.value = ""
    }
    renderList()
})

searchList.addEventListener("keyup", (event) => {
    let boyMan = event.target.value.toLowerCase()
    const girlWoman = document.querySelectorAll("#todoItem")
    for (let i = 0; i < girlWoman.length; i++) {
        if (mainArr.includes(boyMan)) {
            girlWoman[i].style.display = "block"
        } else {
            girlWoman[i].style.display = "none"
        }
    }
}) */

// const pTag = document.createElement("p")
// pTag.className = "list-item"

// const spanTag = document.createElement("span")
// spanTag.className = "circle"

// const divTag = document.createElement("div")
// divTag.className = "reminder-item"
// divTag.append(spanTag, pTag)


	// pTag.textContent = todoListItem[i]

// reminderItem.appendChild(divTag)