

const mobileMenuButton = document.getElementById('mobile-menu');
const navList = document.querySelector('.nav-list');

mobileMenuButton.addEventListener('click', () => {
    navList.classList.toggle('active');
});

// Calculator controls

function appendToDisplay(value) {
    const display = document.getElementById("display");
    display.value += value;
}

function clearDisplay() {
    const display = document.getElementById("display");
    display.value = "";
}

function calculate() {
    const display = document.getElementById("display");
    try {
        const result = eval(display.value);
        display.value = result;
    } catch (e) {
        alert("Invalid calculation");
        clearDisplay();
    }
}

// Text to PDF controls

function generatePDF() {
    const content = document.getElementById('userText').value;

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    const splitText = doc.splitTextToSize(content, 180);
    doc.text(splitText, 10, 10);

    doc.save('downloaded-text.pdf');
}

// Proportion Controls

function calculateProportion() {
    // Get user input values
    const bValue = parseFloat(document.getElementById("bValue").value);
    const cValue = parseFloat(document.getElementById("cValue").value);
    const dValue = parseFloat(document.getElementById("dValue").value);

    // Check if the values are valid numbers
    if (isNaN(bValue) || isNaN(cValue) || isNaN(dValue)) {
        alert("Please enter valid numbers in the fields.");
        return;
    }

    // Calculate the proportion value for x (a)
    const aValue = (bValue * cValue) / dValue;

    // Display the result
    document.getElementById("result").value = aValue;
}