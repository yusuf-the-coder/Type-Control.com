// Array to hold the data
let dataArray = [];

// Load saved data from localStorage
function loadData() {
    const savedData = localStorage.getItem('data');
    if (savedData) {
        dataArray = JSON.parse(savedData);
        displayData();
    }
}

// Function to add data to the table and array
function addData() {
    const dataInput = document.getElementById('DATA').value;
    if (dataInput) {
        dataArray.push(dataInput);
        displayData();
        document.getElementById('DATA').value = ''; // Clear input field
    }
}

// Function to display data in table format
function displayData() {
    const tableBody = document.querySelector('#dataTable tbody');
    tableBody.innerHTML = ''; // Clear current table rows

    dataArray.forEach((data, index) => {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.textContent = data;
        row.appendChild(cell);

        // Create a "Remove" button for each row
        const removeCell = document.createElement('td');
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');
        removeButton.onclick = function() {
            removeData(index);
        };
        removeCell.appendChild(removeButton);
        row.appendChild(removeCell);

        tableBody.appendChild(row);
    });
}

// Function to save data to localStorage
function saveData() {
    localStorage.setItem('data', JSON.stringify(dataArray));
}

// Function to remove data from the table and array
function removeData(index) {
    dataArray.splice(index, 1); // Remove the item from the array
    saveData(); // Save the updated data to localStorage
    displayData(); // Update the table display
}

// Function to change text style (size and color)
function changeTextStyle() {
    const textSize = document.getElementById('textSize').value;
    const textColor = document.getElementById('textColor').value;

    // Apply the selected styles to the table
    const tableCells = document.querySelectorAll('#dataTable td');
    tableCells.forEach(cell => {
        cell.style.fontSize = textSize;
        cell.style.color = textColor;
    });
}

// Load data when the page is loaded
window.onload = loadData;

// Add beforeunload event to warn user before refreshing
window.onbeforeunload = function () {
    if (dataArray.length > 0) {
        return "You have unsaved data. Are you sure you want to leave without saving?";
    }
};