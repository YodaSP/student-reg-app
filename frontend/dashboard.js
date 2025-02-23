if (!localStorage.getItem("adminAuth")) {
    window.location.href = "admin.html"; // Redirect if not authenticated
}

function logout() {
    localStorage.removeItem("adminAuth");
    window.location.href = "admin.html";
}

document.getElementById('logoutButton').addEventListener('click', function() {
    alert('Logged out successfully!');
    window.location.href = 'admin.html';
});

// Fetch students and populate table
async function loadStudents() {
    const response = await fetch("http://localhost:5000/api/students");
    const students = await response.json();

    const tableBody = document.querySelector("#studentTable tbody");
    tableBody.innerHTML = "";

    students.forEach(student => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.astraeaID}</td>
            <td>${student.name}</td>
            <td>${student.city}</td>
            <td>${student.college}</td>
        `;
        tableBody.appendChild(row);
    });

    animateTableRows();
    loadStudentStats(students);
}

// Animate table rows using Anime.js
function animateTableRows() {
    anime({
        targets: "table tbody tr",
        opacity: [0, 1],
        translateY: [10, 0],
        delay: anime.stagger(100)
    });
}

// Analyze city-wise student count and update pie chart
function loadStudentStats(students) {
    let cityCounts = {};
    
    students.forEach(student => {
        cityCounts[student.city] = (cityCounts[student.city] || 0) + 1;
    });

    const cities = Object.keys(cityCounts);
    const studentCounts = Object.values(cityCounts);

    // Highlight city with the most students
    const maxCity = cities[studentCounts.indexOf(Math.max(...studentCounts))];
    console.log(`City with most students: ${maxCity}`);

    const ctxPie = document.getElementById("cityPieChart").getContext("2d");

    new Chart(ctxPie, {
        type: "pie",
        data: {
            labels: cities,
            datasets: [{
                data: studentCounts,
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#BA68C8"]
            }]
        },
        options: {
            responsive: true,
            animation: { duration: 1500 },
            plugins: {
                legend: {
                    labels: {
                        color: "white"  // 🔹 Sets the text color to white
                    }
                }
            }
        }
    });
    
}

loadStudents();
