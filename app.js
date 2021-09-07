const draggableList = document.querySelector("#draggable-list");
const checkButton = document.querySelector("#check");

// The original list in the right order (1-10)
const topLanguages = [
  "Python",
  "Java",
  "JavaScript",
  "C#",
  "PHP",
  "C/C#",
  "R",
  "TypeScript",
  "Swift",
  "Objective-C",
];

// Empty array to store the items in when they are being dragged and dropped
const listItems = [];

// initialise the variable to keep track of the sorting index
let dragStartIndex;

// calling function to create List items
createList();

function createList() {
  //using the spread operator to make a copy of the original list.
  [...topLanguages]
    // map over the array and turn it into an object with a value property and a sort property. Then generate a random number to scramble the list randomly at first load of the page (sort on random number)
    .map((language) => ({ value: language, sort: Math.random() }))
    // using a compare function to sort based on the randomly generated number
    .sort((a, b) => a.sort - b.sort)
    // convert the object back to an array of strings, where we only keep the value of the language (the list is already sorted randomnly)
    .map((language) => language.value)
    // for each element in the array, we create an li element
    .forEach((language, index) => {
      const listItem = document.createElement("li");

      // add an data-index to each li element
      listItem.setAttribute("data-index", index);

      //   HTML5: to make an element draggable --> add draggable="true"
      listItem.innerHTML = `
            <span class="number">${index + 1}</span>
            <div class="draggable" draggable="true">
            <p class="language-name">${language}</p>
            <i class="fas fa-grip-lines"></i>
            </div>
            `;

      listItems.push(listItem);

      draggableList.appendChild(listItem);
    });

  addEventListeners();
}

function dragStart() {
  // console.log("event: ", "dragstart");
  // at the start of the drag, we get the data-index of the closest li element. Putting a "+" in front of the method makes the result a number instead of a string
  dragStartIndex = +this.closest("li").getAttribute("data-index");
}
function dragEnter() {
  // console.log("event: ", "dragenter");
  this.classList.add("over");
}
function dragLeave() {
  // console.log("event: ", "dragleave");
  this.classList.remove("over");
}
function dragDrop() {
  // console.log("event: ", "dragdrop");
  const dragEndIndex = +this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove("over");
}

function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

function dragOver(e) {
  e.preventDefault();
  // console.log("event: ", "dragover");
}

function checkOrder() {
  listItems.forEach((listItem, index) => {
    const languageName = listItem.querySelector(".draggable").innerText.trim();

    if (languageName !== topLanguages[index]) {
      listItem.classList.add("wrong");
    } else {
      listItem.classList.remove("wrong");
      listItem.classList.add("right");
    }
  });
}

function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });

  dragListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

checkButton.addEventListener("click", checkOrder);
