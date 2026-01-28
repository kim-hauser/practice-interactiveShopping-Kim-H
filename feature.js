//Grab elements from DOM:

const itemInput = document.getElementById('itemInput');
const addButton = document.getElementById('addButton');
const shoppingList = document.getElementById('shoppingList');

//Adds the event listener to the button:

addButton.addEventListener('click', addListItem);

//Function that adds list item to unordered list:

function addListItem() {
  const newItemText = itemInput.value.trim();
  if (newItemText === "") return;

  // Create the <li>
  const li = document.createElement("li");

  // Text display
  const span = document.createElement("span");
  span.textContent = newItemText;

  // Edit / Save button
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";

  // Remove button
  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";

  // Assemble <li>
  li.appendChild(span);
  li.appendChild(editButton);
  li.appendChild(removeButton);

  // Add to <ul>
  shoppingList.appendChild(li);

  // Clear input
  itemInput.value = "";

  // Remove behavior
  removeButton.addEventListener("click", () => {
    li.remove();
  });

  // Edit/Save behavior
  editButton.addEventListener("click", () => {
    handleEdit(editButton, li);
  });
}

function handleEdit(editButton, li) {
  const isEditing = editButton.textContent === "Save";

  if (!isEditing) {
    // Edit -> replace span with input
    const span = li.querySelector("span");
    const input = document.createElement("input");
    input.type = "text";
    input.value = span.textContent;

    li.insertBefore(input, span);
    li.removeChild(span);

    editButton.textContent = "Save";
    input.focus();
  } else {
    // Save -> replace input with span
    const input = li.querySelector("input");
    const newSpan = document.createElement("span");
    newSpan.textContent = input.value.trim() || "(empty)";

    li.insertBefore(newSpan, input);
    li.removeChild(input);

    editButton.textContent = "Edit";
  }
}
