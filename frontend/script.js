async function registerStudent(event) {
    if (event) event.preventDefault(); // Prevent form submission

    const astraeaID = document.getElementById("astraeaID").value.trim();
    const name = document.getElementById("name").value.trim();
    const city = document.getElementById("city").value.trim();
    const college = document.getElementById("college").value.trim();
    const responseMessage = document.getElementById("responseMessage");

    if (!astraeaID || !name || !city || !college) {
        responseMessage.innerText = "All fields are required!";
        responseMessage.style.color = "red";
        return;
    }

    // Ensure astraeaID contains only numerical values
    if (!/^\d+$/.test(astraeaID)) {
        responseMessage.innerText = "Astraea ID must be a numerical value!";
        responseMessage.style.color = "red";
        return;
    }

    // Fetch existing students to check for duplicate astraeaID
    const studentsResponse = await fetch("http://localhost:5000/api/students");
    const students = await studentsResponse.json();

    const isDuplicate = students.some(student => student.astraeaID === astraeaID);
    if (isDuplicate) {
        responseMessage.innerText = "Student already registered!";
        responseMessage.style.color = "red";
        return;
    }

    const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ astraeaID, name, city, college })
    });

    if (response.ok) {
        // ✅ Redirect to success page
        window.location.href = "success.html";
    } else {
        const result = await response.json();
        responseMessage.innerText = result.message || "Registration failed!";
        responseMessage.style.color = "red";
    }
}

// Prevent non-numeric input in astraeaID field
document.getElementById("astraeaID").addEventListener("input", function(event) {
    this.value = this.value.replace(/[^0-9]/g, '');
});
