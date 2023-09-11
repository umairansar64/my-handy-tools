
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

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
        saveCalculation(display.value); // Save the calculation directly
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

    saveText(userText); // Save the text directly
}

// Saving data to Firebase

function saveCalculation(calculation) {
    const db = getDatabase();
    const newCalculationRef = ref(db, 'calculations/').push(); // Get a reference to a new child with a unique ID
    set(newCalculationRef, { value: calculation }); // Save the calculation
}

function saveText(text) {
    const db = getDatabase();
    const newTextRef = ref(db, 'texts/').push(); // Get a reference to a new child with a unique ID
    set(newTextRef, { value: text }); // Save the text
}