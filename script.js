

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

// How many Days Page Controls

function calculateDaysDifference() {
    const startDateInput = document.getElementById("startDate").value;
    const endDateInput = document.getElementById("endDate").value;

    const [startDay, startMonth, startYear] = startDateInput.split("/").map(Number);
    const [endDay, endMonth, endYear] = endDateInput.split("/").map(Number);

    const startDate = new Date(startYear, startMonth - 1, startDay);
    const endDate = new Date(endYear, endMonth - 1, endDay);

    // Calculate total days difference
    const daysDifference = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));

    // Calculate difference in years, months, and days
    let yearsDifference = endYear - startYear;
    let monthsDifference = endMonth - startMonth;
    let dateDifference = endDay - startDay;

    if (dateDifference < 0) {
        monthsDifference--;
        dateDifference += new Date(startYear, startMonth, 0).getDate();
    }
    if (monthsDifference < 0) {
        yearsDifference--;
        monthsDifference += 12;
    }

    document.getElementById("ymdResult").value = `${yearsDifference} Years, ${monthsDifference} Months, ${dateDifference} Days`;
    document.getElementById("mdResult").value = `${(yearsDifference * 12) + monthsDifference} Months, ${dateDifference} Days`;
    document.getElementById("dResult").value = `${daysDifference} Days`;
}

// Product cost estimator

function calculateEstimate() {
    const vatRate = parseFloat(document.getElementById("vat").value) / 100;
    const deliveryCharge = parseFloat(document.getElementById("deliveryCharge").value);
    const pricePerUnit = parseFloat(document.getElementById("pricePerUnit").value);
    const budget = parseFloat(document.getElementById("budget").value);
    const numProducts = parseInt(document.getElementById("numProducts").value);

    const resultField = document.getElementById("result");

    if (!pricePerUnit) {
        alert("Error: Please enter a valid Price Per Unit.");
        return;
    }

    if (!vatRate && vatRate !== 0) {
        alert("Error: Please enter a valid VAT Rate.");
        return;
    }

    if (!deliveryCharge && deliveryCharge !== 0) {
        alert("Error: Please enter a valid Delivery Charge.");
        return;
    }

    if (budget) {
        const numOfProducts = Math.floor((budget - deliveryCharge) / (pricePerUnit + (pricePerUnit * vatRate)));
        resultField.value = `${numOfProducts} Products`;
    } else if (numProducts) {
        const totalCost = (((pricePerUnit * numProducts) + deliveryCharge) * (1 + vatRate));
        resultField.value = `£${totalCost.toFixed(2)}.`;
    } else {
        alert("Error: Please enter either a Budget or Number of Products to estimate.");
    }
}