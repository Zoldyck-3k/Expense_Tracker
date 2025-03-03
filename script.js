const form = document.getElementById("expense-form");
const expenseList = document.getElementById("expense-list");
let totalSpent = 0;
const monthlyBudget = 5000; // Default monthly budget

// Setup chart context
const expenseChartCtx = document.getElementById("expense-chart").getContext("2d");
let expenseChart;

// Initialize categories
const categories = {
    Food: 0,
    Transportation: 0,
    Stationery: 0,
    Books: 0,
    "Hostel Rent": 0,
    Utilities: 0,
    Recreation: 0,
    Clothing: 0,
    Gadgets: 0,
    "Study Materials": 0,
    Miscellaneous: 0
};

// Function to set today's date automatically
function setDefaultDate() {
    const dateInput = document.getElementById("date");
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    dateInput.value = formattedDate;
}

// Function to update the remaining budget
function updateRemainingBudget() {
    const remainingBudget = monthlyBudget - totalSpent;
    document.getElementById("remaining-budget").textContent = `₹${remainingBudget}`;
    return remainingBudget;
}

// Function to get the top category
function getTopCategory() {
    const sortedCategories = Object.entries(categories).sort((a, b) => b[1] - a[1]);
    const topCategory = sortedCategories[0][1] > 0 ? sortedCategories[0][0] : "-";
    document.getElementById("top-category").textContent = topCategory;
}

// Function to initialize or update the chart
function updateChart() {
    if (expenseChart) {
        expenseChart.destroy();
    }

    const remainingBudget = updateRemainingBudget();
    const chartData = { ...categories, "Remaining Budget": remainingBudget };

    expenseChart = new Chart(expenseChartCtx, {
        type: 'pie',
        data: {
            labels: Object.keys(chartData),
            datasets: [{
                label: 'Expenses',
                data: Object.values(chartData),
                backgroundColor: [
                    '#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#ff9f40', 
                    '#4bc0c0', '#f743b7', '#ffc0cb', '#6a4ca4', '#007bff', '#ff6347',
                    '#8e44ad'
                ],
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

// Set the default date on page load
window.addEventListener("load", () => {
    setDefaultDate();
    updateRemainingBudget(); // Initialize remaining budget display
    updateChart(); // Initialize chart display
});

// Handle form submission
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const amount = parseInt(document.getElementById("amount").value);
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;
    const productsInput = document.getElementById("products").value;

    if (amount && category && date && productsInput) {
        const products = productsInput.split(",").map(product => product.trim());

        products.forEach(product => {
            const li = document.createElement("li");
            li.textContent = `${date} - ₹${amount} (${category}) [Product: ${product}]`;
            expenseList.appendChild(li);
        });

        totalSpent += amount;
        document.getElementById("total-spent").textContent = `₹${totalSpent}`;

        // Update categories
        categories[category] += amount;

        // Update remaining budget
        updateRemainingBudget();

        // Update top category
        getTopCategory();

        // Update chart
        updateChart();

        // Clear form inputs
        form.reset();
        setDefaultDate();
    } else {
        alert("Please fill out all fields!");
    }
});

// Initial remaining budget display
updateRemainingBudget();
getTopCategory();
