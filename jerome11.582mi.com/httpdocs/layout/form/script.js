let currentTab = 0; // Current tab is set to be the first tab (0)

document.addEventListener("DOMContentLoaded", function () {
    showTab(currentTab); // Display the current tab
});

function showTab(n) {
    // This function will display the specified tab of the form
    const tabs = document.getElementsByClassName("tab");
    tabs[n].style.display = "block"; // Show the current tab
    // Hide the previous and next buttons if it's the first or last tab
    if (n === 0) {
        document.getElementById("prevBtn").style.display = "none"; // Hide the previous button if it's the first tab
    } else {
        document.getElementById("prevBtn").style.display = "inline"; // Show the previous button
    }
    if (n === (tabs.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "Submit"; // Change the next button to submit if it's the last tab
    } else {
        document.getElementById("nextBtn").innerHTML = "Next"; // Change the next button to next if it's not the last tab
    }
    // Update the step indicators
    updateStepIndicator(n);
}

function nextPrev(n) {
    // This function will figure out which tab to display
    const tabs = document.getElementsByClassName("tab");
    // Validate the current tab before navigating
    if (n === 1 && !validateForm()) return false; // If next button is clicked, validate the form
    tabs[currentTab].style.display = "none"; // Hide the current tab
    currentTab += n; // Increment or decrement the current tab
    if (currentTab >= tabs.length) {
        document.getElementById("regForm").submit(); // Submit the form if it's the last tab
        return false; // Prevent further execution
    }
    showTab(currentTab); // Show the new current tab
}

function validateForm() {
    // This function will validate the form fields in the current tab
    const tabs = document.getElementsByClassName("tab");
    const inputs = tabs[currentTab].getElementsByTagName("input");
    let valid = true;
    // Loop through all input fields in the current tab
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value === "") {
            inputs[i].className += " invalid"; // Add an invalid class if the input is empty
            valid = false; // Set valid to false
        }
    }
    return valid; // Return the validity of the form
}

function updateStepIndicator(n) {
    // This function will update the step indicators
    const steps = document.getElementsByClassName("step");
    for (let i = 0; i < steps.length; i++) {
        steps[i].className = steps[i].className.replace(" active", ""); // Remove active class from all steps
    }
    steps[n].className += " active"; // Add active class to the current step
}
