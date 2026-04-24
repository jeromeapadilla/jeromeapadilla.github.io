function validateForm(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get all input fields
    var inputs = document.querySelectorAll('input[required], select[required]');
    var isValid = true;
    var errorMessage = "";

    // Check if any required field is empty
    inputs.forEach(function(input) {
        if (!input.value.trim()) {
            isValid = false;
            errorMessage += "Please fill out the " + input.name + " field.\n";
            input.style.border = "2px solid red"; // Highlight missing fields
        } else {
            input.style.border = ""; // Remove highlight if filled
        }
    });

    if (isValid) {
        // Show the thank-you prompt (modal)
        document.getElementById('thankYouModal').style.display = 'block';
    } else {
        alert(errorMessage); // Show error message if validation fails
    }

    return isValid;
}

function closeModal() {
    document.getElementById('thankYouModal').style.display = 'none'; // Close modal
}
