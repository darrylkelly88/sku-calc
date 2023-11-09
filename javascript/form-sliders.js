// Update text input for "How many cores?" slider
coresSlider.addEventListener('input', function () {
    coresInput.value = coresSlider.value;
});

// Update text input for "How many VM's?" slider
vmsSlider.addEventListener('input', function () {
    vmsInput.value = vmsSlider.value;
});

// Update text input for "How many Socket Pairs?" slider
socketPairsSlider.addEventListener('input', function () {
    socketPairsInput.value = socketPairsSlider.value;
});

// Update text input for "How many LPAR's?" slider
lparsSlider.addEventListener('input', function () {
    lparsInput.value = lparsSlider.value;
});

// Update text input for "How many nodes's?" slider
nodesSlider.addEventListener('input', function () {
    nodesInput.value = nodesSlider.value;
});

// Update text input for "How many vcpu's?" slider
vcpuSlider.addEventListener('input', function () {
    vcpuInput.value = vcpuSlider.value;
});

// Update text input for "How many full time faculty?" slider
fullTimeFacultySlider.addEventListener('input', function () {
    fullTimeFacultyInput.value = fullTimeFacultySlider.value;
});

// Update text input for "How many part time faculty" slider
partTimeFacultySlider.addEventListener('input', function () {
    partTimeFacultyInput.value = partTimeFacultySlider.value;
});

// Update text input for "How many full time staff?" slider
fullTimeStaffSlider.addEventListener('input', function () {
    fullTimeStaffInput.value = fullTimeStaffSlider.value;
});

// Update text input for "How many part time staff?" slider
partTimeStaffSlider.addEventListener('input', function () {
    partTimeStaffInput.value = partTimeStaffSlider.value;
});


// Initial updates when the page loads
window.onload = function() {
    coresInput.value = coresSlider.value;
    vmsInput.value = vmsSlider.value;
    socketPairsInput.value = socketPairsSlider.value;
    lparsInput.value = lparsSlider.value;
    nodesInput.value = nodesSlider.value;
    vcpuInput.value = vcpuSlider.value;
};

document.addEventListener("DOMContentLoaded", function() {
    const selectElements = document.querySelectorAll("#skuCalculatorForm select");
    const skuListDiv = document.getElementById("skuList");
    const coresDiv = document.getElementById("coresDiv");
    const vmsDiv = document.getElementById("vmsDiv");
    const socketPairsDiv = document.getElementById("socketPairsDiv");
    const lparsDiv = document.getElementById("lparsDiv");
    const nodesDiv = document.getElementById("nodesDiv");
    const vcpuDiv = document.getElementById("vcpuDiv");

    selectElements.forEach((select) => {
        select.addEventListener("input", function() {
            console.log("SKU List Div Display: " + getComputedStyle(skuListDiv).display);
            if (getComputedStyle(skuListDiv).display === "none") {
                console.log("Hiding sliders");
                coresDiv.style.display = "none";
                vmsDiv.style.display = "none";
                socketPairsDiv.style.display = "none";
                lparsDiv.style.display = "none";
                nodesDiv.style.display = "none";
                vcpuDiv.style.display = "none";
            }
        });
    });
});