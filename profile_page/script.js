document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById("moneyUsageGraph").getContext("2d");
    const timeFrameSelect = document.getElementById("time-frame");

    const monthlyData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "Expenses",
                data: [400, 500, 450, 600, 700, 800, 750, 650, 550, 600, 700, 800],
                borderColor: "#e74c3c",
                backgroundColor: "rgba(231, 76, 60, 0.2)",
                fill: true,
                tension: 0.4
            },
            {
                label: "Income",
                data: [600, 700, 650, 800, 900, 850, 950, 800, 900, 850, 950, 700],
                borderColor: "#2ecc71",
                backgroundColor: "rgba(46, 204, 113, 0.2)",
                fill: true,
                tension: 0.4
            }
        ]
    };

    const yearlyData = {
        labels: ["2018", "2019", "2020", "2021", "2022", "2023"],
        datasets: [
            {
                label: "Expenses",
                data: [4800, 5200, 4900, 5800, 6400, 7500],
                borderColor: "#e74c3c",
                backgroundColor: "rgba(231, 76, 60, 0.2)",
                fill: true,
                tension: 0.4
            },
            {
                label: "Income",
                data: [7000, 7200, 7300, 7500, 7600, 7800],
                borderColor: "#2ecc71",
                backgroundColor: "rgba(46, 204, 113, 0.2)",
                fill: true,
                tension: 0.4
            }
        ]
    };

    const config = {
        type: "line",
        data: monthlyData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "top"
                }
            },
            animation: {
                duration: 1000
            }
        }
    };

    let chart = new Chart(ctx, config);

    timeFrameSelect.addEventListener("change", (e) => {
        const selectedValue = e.target.value;

        if (selectedValue === "monthly") {
            chart.config.data = monthlyData;
        } else if (selectedValue === "yearly") {
            chart.config.data = yearlyData;
        }
        
        chart.update();
    });
});
