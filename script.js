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
        display.value = eval(display.value);
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

