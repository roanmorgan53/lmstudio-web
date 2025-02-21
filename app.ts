const submitButton = document.getElementById('submitButton') as HTMLButtonElement;
const userInput = document.getElementById('userInput') as HTMLInputElement;
const output = document.getElementById('output') as HTMLParagraphElement;

// Check if elements exist
if (!submitButton || !userInput || !output) {
    throw new Error('Required DOM elements not found');
}

submitButton.addEventListener('click', () => {
    console.log("Button Pressed!");
    console.log(`user input was ${userInput.value}`)
});