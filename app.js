console.log("calculator running...");

// Get the calculator screen element
const screen = document.getElementById("screen");

// Get the addition button
const addButton = document.getElementById("add");
let waitingForNextNumber = false;
let pendingOperation = null;
let memoryValue = 0;

// Initialize a variable to store the current value on the screen
let currentValue = "0";

// Get the touch sound elements
const touchSound = document.getElementById('touchSound');
const touchSound1 = document.getElementById('touchSound1');
const touchSound2 = document.getElementById('touchSound2');
const touchSound3 = document.getElementById('touchSound3');

// Function to play the touch sound
function playTouchSound(sound) {
  sound.currentTime = 0; // Rewind the audio to the beginning
  sound.play();
}

// Function to update the calculator screen with the given value
function updateScreen(value) {
  screen.textContent = value;
}

// Add event listeners to the calculator buttons
const buttons = document.querySelectorAll(".calculator-button");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    playTouchSound(touchSound1);
    const buttonValue = button.textContent;
    if (buttonValue === "C") {
      // Clear the screen when "C" button is clicked
      currentValue = "0";
      updateScreen(currentValue);
    } else if (buttonValue === "⌫") {
      // Remove the last character when "⌫" button is clicked
      currentValue = currentValue.slice(0, -1);
      if (currentValue === "") {
        currentValue = "0"; // If the screen becomes empty, set it to '0'
      }
      updateScreen(currentValue);
    } else {
      const buttonValue = button.textContent;

      // If waiting for the next number, update the screen with the new number
      if (waitingForNextNumber) {
        updateScreen(buttonValue);
        waitingForNextNumber = false;
      } else {
        // If not waiting, append the number to the current value on the screen
        updateScreen(
          screen.textContent === "0"
            ? buttonValue
            : screen.textContent + buttonValue
        );
      }
    }
  });
});

// Get all buttons with class "calculator-button2" and add event listeners
const buttons2 = document.querySelectorAll('.calculator-button2');
buttons2.forEach(button => {
  button.addEventListener('click', () => {
    if (button.id !== 'equals') {
      // Play touchSound2 when any calculator-button2 is clicked (excluding the equal sign)
      playTouchSound(touchSound);
    } else {
      // Play touchSound when the equal sign is clicked
      playTouchSound(touchSound2);
    }
  });
});

// Get all buttons with class "calculator-button1" and add event listeners
const buttons1 = document.querySelectorAll('.calculator-button1');
buttons1.forEach(button => {
  button.addEventListener('click', () => {
    // Play touchSound3 when any calculator-button1 is clicked
    playTouchSound(touchSound3);
  });
});

//add event listener for the add button
function performAddition() {
  // Convert the current value on the screen to a number
  const currentNumber = parseFloat(currentValue);

  // Convert the new input value (from the screen) to a number
  const userInput = parseFloat(screen.textContent);

  // If the user input is a valid number, perform the addition operation
  if (!isNaN(userInput)) {
    return currentNumber + userInput;
  }
  return currentNumber;
}

// Function to perform the subtraction operation and update the screen
function performSubtraction() {
  // Convert the current value on the screen to a number
  const currentNumber = parseFloat(currentValue);

  // Convert the new input value (from the screen) to a number
  const userInput = parseFloat(screen.textContent);

  // If the user input is a valid number, perform the subtraction operation
  if (!isNaN(userInput)) {
    return currentNumber - userInput;
  }
  return currentNumber;
}

// Function to perform the multiplication operation and update the screen
function performMultiplication() {
  // Convert the current value on the screen to a number
  const currentNumber = parseFloat(currentValue);

  // Convert the new input value (from the screen) to a number
  const userInput = parseFloat(screen.textContent);

  // If the user input is a valid number, perform the multiplication operation
  if (!isNaN(userInput)) {
    return currentNumber * userInput;
  }
  return currentNumber;
}

// Function to perform the division operation and update the screen
function performDivision() {
  // Convert the current value on the screen to a number
  const currentNumber = parseFloat(currentValue);

  // Convert the new input value (from the screen) to a number
  const userInput = parseFloat(screen.textContent);

  // If the user input is a valid number and not zero, perform the division operation
  if (!isNaN(userInput) && userInput !== 0) {
    return currentNumber / userInput;
  }
  return currentNumber;
}

// Function to perform the percentage operation and update the screen
function performPercentage() {
  // Convert the current value on the screen to a number
  const currentNumber = parseFloat(currentValue);

  // Convert the new input value (from the screen) to a number
  const userInput = parseFloat(screen.textContent);

  // If the user input is a valid number, perform the percentage operation
  if (!isNaN(userInput)) {
    return (currentNumber * userInput) / 100;
  }
  return currentNumber;
}

// Function to perform the square operation and update the screen
function performSquare() {
  // Convert the current value on the screen to a number
  const currentNumber = parseFloat(currentValue);

  // Perform the square operation
  const result = currentNumber * currentNumber;

  // Update the screen with the result
  updateScreen(result);

  return result;
}

// Function to perform the square root operation and update the screen
function performSquareRoot() {
  // Convert the current value on the screen to a number
  const currentNumber = parseFloat(currentValue);

  // If the current number is negative, display an error
  if (currentNumber < 0) {
    updateScreen("Error");
    return currentNumber;
  }

  // Perform the square root operation
  const result = Math.sqrt(currentNumber);

  // Update the screen with the result
  updateScreen(result);

  return result;
}

// Function to handle the equal sign (=) operation
function handleEqual() {
  // Perform the pending operation (if any) and update the screen
  if (pendingOperation) {
    const result = pendingOperation();
    updateScreen(result);

    // Store the result as the new current value for further calculations
    currentValue = result.toString();
  }

  // Reset the pending operation and the flag for waiting for the next number
  pendingOperation = null;
  waitingForNextNumber = false;
}

// Function to handle the Memory Recall (MR) operation
function memoryRecall() {
  // Retrieve the value from memory and update the screen
  updateScreen(memoryValue);
  return memoryValue;
}

// Function to handle the Memory Add (M+) operation
function memoryAdd() {
  // Add the current value on the screen to the value in memory
  memoryValue += parseFloat(screen.textContent);
  return memoryValue;
}

// Function to handle the Memory Subtract (M-) operation
function memorySubtract() {
  // Subtract the current value on the screen from the value in memory
  memoryValue -= parseFloat(screen.textContent);
  return memoryValue;
}

// Function to handle the Memory Clear (MC) operation
function memoryClear() {
  // Clear the value in memory
  memoryValue = 0;
}

// Function to handle the Backspace (⌫) operation
function backspace() {
  // Remove the last digit from the current value on the screen
  const currentNumber = screen.textContent;
  const newNumber = currentNumber.slice(0, -1);
  updateScreen(newNumber);

  // If the current value on the screen becomes empty, set it to 0
  if (newNumber === "") {
    updateScreen("0");
  }
}
// Function to handle the All Clear (AC) operation
function allClear() {
  // Clear the current value and reset the calculator
  currentValue = "0";
  waitingForNextNumber = false;
  pendingOperation = null;
  updateScreen(currentValue);
}
// Function to handle the Decimal (.) operation
function decimal() {
  // If the screen does not already contain a decimal point, add one
  if (!screen.textContent.includes(".")) {
    updateScreen(screen.textContent + ".");
  }
}

// Function to handle the Exponent (^) operation
function exponent() {
  // Convert the current value on the screen to a number
  const currentNumber = parseFloat(currentValue);

  // Perform the exponentiation operation with the current value as the base and 2 as the exponent
  const result = Math.pow(currentNumber, 2);

  // Update the screen with the result
  updateScreen(result);

  return result;
}

// Function to handle the Delete (C) operation
function deleteLastCharacter() {
  // Remove the last character from the current value on the screen
  const currentNumber = screen.textContent;
  const newNumber = currentNumber.slice(0, -1);
  updateScreen(newNumber);

  // If the current value on the screen becomes empty, set it to 0
  if (newNumber === "") {
    updateScreen("0");
  }
}

// Add event listener to the "Add" button
addButton.addEventListener("click", () => {
  // Store the current value on the screen in the variable
  currentValue = screen.textContent;

  // Set the pending operation to addition
  pendingOperation = performAddition;

  // Set the flag to indicate waiting for the next number
  waitingForNextNumber = true;
});

// Add event listener to the "Subtract" button
const subtractButton = document.getElementById("subtract");
subtractButton.addEventListener("click", () => {
  // Store the current value on the screen in the variable
  currentValue = screen.textContent;

  // Set the pending operation to subtraction
  pendingOperation = performSubtraction;

  // Set the flag to indicate waiting for the next number
  waitingForNextNumber = true;
});

// Add event listener to the "Multiply" button
const multiplyButton = document.getElementById("multiply");
multiplyButton.addEventListener("click", () => {
  // Store the current value on the screen in the variable
  currentValue = screen.textContent;

  // Set the pending operation to multiplication
  pendingOperation = performMultiplication;

  // Set the flag to indicate waiting for the next number
  waitingForNextNumber = true;
});

// Add event listener to the "Divide" button
const divideButton = document.getElementById("divide");
divideButton.addEventListener("click", () => {
  // Store the current value on the screen in the variable
  currentValue = screen.textContent;

  // Set the pending operation to division
  pendingOperation = performDivision;

  // Set the flag to indicate waiting for the next number
  waitingForNextNumber = true;
});

// Add event listener to the "Percentage" button
const percentageButton = document.getElementById("percentage");
percentageButton.addEventListener("click", () => {
  // Store the current value on the screen in the variable
  currentValue = screen.textContent;

  // Set the pending operation to percentage
  pendingOperation = performPercentage;

  // Perform the percentage operation immediately
  const result = pendingOperation();
  updateScreen(result);

  // Store the result as the new current value for further calculations
  currentValue = result.toString();

  // Reset the pending operation and the flag for waiting for the next number
  pendingOperation = null;
  waitingForNextNumber = false;
});

// Add event listener to the "Square" button
const squareButton = document.getElementById("square");
squareButton.addEventListener("click", () => {
  // Store the current value on the screen in the variable
  currentValue = screen.textContent;

  // Perform the square operation and update the screen
  const result = performSquare();

  // Store the result as the new current value for further calculations
  currentValue = result.toString();

  // Reset the pending operation and the flag for waiting for the next number
  pendingOperation = null;
  waitingForNextNumber = false;
});

// Add event listener to the "Square Root" button
const squareRootButton = document.getElementById("square-root");
squareRootButton.addEventListener("click", () => {
  // Store the current value on the screen in the variable
  currentValue = screen.textContent;

  // Perform the square root operation and update the screen
  const result = performSquareRoot();

  // Store the result as the new current value for further calculations
  currentValue = result.toString();

  // Reset the pending operation and the flag for waiting for the next number
  pendingOperation = null;
  waitingForNextNumber = false;
});

// Add event listener to the "Equal" button
const equalButton = document.getElementById("equals");
equalButton.addEventListener("click", () => {
  // Handle the equal sign operation
  handleEqual();
});

// Add event listener to the Memory Recall (MR) button
const memoryRecallButton = document.getElementById("memoryRecall");
memoryRecallButton.addEventListener("click", () => {
  // Perform the Memory Recall operation and update the screen
  const result = memoryRecall();
  // Store the result as the new current value for further calculations
  currentValue = result.toString();
});

// Add event listener to the Memory Add (M+) button
const memoryAddButton = document.getElementById("memoryAdd");
memoryAddButton.addEventListener("click", () => {
  // Perform the Memory Add operation
  memoryAdd();
});

// Add event listener to the Memory Subtract (M-) button
const memorySubtractButton = document.getElementById("memorySubtract");
memorySubtractButton.addEventListener("click", () => {
  // Perform the Memory Subtract operation
  memorySubtract();
});

// Add event listener to the Memory Clear (MC) button
const memoryClearButton = document.getElementById("memoryClear");
memoryClearButton.addEventListener("click", () => {
  // Perform the Memory Clear operation
  memoryClear();
});

// Add event listener to the Backspace (⌫) button
const backspaceButton = document.getElementById("backspace");
backspaceButton.addEventListener("click", () => {
  // Perform the Backspace operation
  backspace();
});

// Add event listener to the Decimal (.) button
const decimalButton = document.getElementById("decimal");
decimalButton.addEventListener("click", () => {
  // Perform the Decimal operation and update the screen
  decimal();
});

// Add event listener to the Exponent (^) button
const exponentButton = document.getElementById("exponent");
exponentButton.addEventListener("click", () => {
  // Perform the Exponent operation and update the screen
  const result = exponent();
  // Store the result as the new current value for further calculations
  currentValue = result.toString();
});

// Add event listener to the Delete (C) button
const deleteButton = document.getElementById("delete");
deleteButton.addEventListener("click", () => {
  // Perform the Delete operation
  allClear();
});

// Add event listener to the Parentheses () button
const parentheses = document.getElementById("clear");
parentheses.addEventListener("click", () => {
  // Add parentheses to the current value on the screen
  updateScreen(screen.textContent + "(");
});
// Add event listener to the Parentheses () button
const parenthesesButton = document.getElementById("percentage1");
parenthesesButton.addEventListener("click", () => {
  // Add parentheses to the current value on the screen
  updateScreen(screen.textContent + ")");
});

// Function to handle the "See More" button click event
function handleSeeMoreButtonClick() {
  window.location.href = 'https://jonnfrancis.github.io'; // Redirect to your portfolio project link
}

// Function to handle the "Refresh Page" button click event
function handleRefreshPageButtonClick() {
  location.reload(); // Reload the current page
}

// Add event listener to the "See More" button
const seeMoreButton = document.getElementById('seeMore');
seeMoreButton.addEventListener('click', handleSeeMoreButtonClick);

// Add event listener to the "Refresh Page" button
const refreshPageButton = document.getElementById('refreshPage');
refreshPageButton.addEventListener('click', handleRefreshPageButtonClick);

