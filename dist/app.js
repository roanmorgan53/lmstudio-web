var submitButton = document.getElementById('submitButton');
var userInput = document.getElementById('userInput');
var output = document.getElementById('output');
// Check if elements exist
if (!submitButton || !userInput || !output) {
    throw new Error('Required DOM elements not found');
}
submitButton.addEventListener('click', function () {
    console.log("Button Pressed!");
    console.log("user input was ".concat(userInput.value));
});
