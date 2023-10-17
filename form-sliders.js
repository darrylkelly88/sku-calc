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