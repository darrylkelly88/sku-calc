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

// Update text input for "How many LPAR's?" slider
nodesSlider.addEventListener('input', function () {
    nodesInput.value = nodesSlider.value;
});

// Initial updates when the page loads
window.onload = function() {
    coresInput.value = coresSlider.value;
    vmsInput.value = vmsSlider.value;
    socketPairsInput.value = socketPairsSlider.value;
    lparsInput.value = lparsSlider.value;
    nodesInput.value = nodesSlider.value;
};

document.addEventListener("DOMContentLoaded", function() {
    const selectElements = document.querySelectorAll("#skuCalculatorForm select");
    const skuListDiv = document.getElementById("skuList");
    const coresDiv = document.getElementById("coresDiv");
    const vmsDiv = document.getElementById("vmsDiv");
    const socketPairsDiv = document.getElementById("socketPairsDiv");
    const lparsDiv = document.getElementById("lparsDiv");
    const nodesDiv = document.getElementById("nodesDiv");

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
            }
        });
    });
});