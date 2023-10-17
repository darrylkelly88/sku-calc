document.addEventListener("DOMContentLoaded", function () {
    // Load JSON data from sku-map.json (assuming you have this file)
    fetch("ansible-sku-map.json")
        .then((response) => response.json())
        .then((data) => {
            // Add an event listener to the form
            document.getElementById("skuCalculatorForm").addEventListener("change", function () {
                // Get user selections from form items
                const term = document.getElementById("term").value;
                const product = document.getElementById("product").value;
                const supportLevel = document.getElementById("supportLevel").value;
                const skuListDiv = document.getElementById("skuList");


                if (product === "Red Hat Ansible Automation Platform" && getComputedStyle(skuListDiv).display === "block") {
                    // Filter the JSON data based on user selections
                    const filteredData = data.filter((item) => {
                        // Determine the SKU field to display based on the selected term

                        // Check if the user made a selection in each field before applying the filter
                        return (
                            (!supportLevel || (supportLevel === "standard" && item["Standard"] === "TRUE") || (supportLevel === "premium" && item["Premium"] === "TRUE")) &&
                            // standard exclusion filters
                            (item["Edge"] !== "TRUE") &&
                            (item["Include in Data"] == "TRUE") 
                       );
                    });

                    // Display the filtered results in the "skuList" div
                    displayFilteredResults(filteredData);
                }
            });
        })
        .catch((error) => {
            console.error("Error loading JSON data:", error);
        });
});


function displayFilteredResults(filteredData) {
    const skuListDiv = document.getElementById("skuList");
    const term = document.getElementById("term").value;
    skuListDiv.innerHTML = "";
    let total;
    let showNATSMessage = false;

    if (filteredData.length === 0) {
        skuListDiv.innerHTML = "<p>No matching SKUs found.</p>";
        return;
    }

    displayCorrectSliders(filteredData);


    const resultList = document.createElement("ul");
    filteredData.forEach((item) => {
        const LicensingModel = item["Licensing Model"]; // Get LicensingModel for the current item
        const quantity = calculateQuantity(LicensingModel, item); // Pass LicensingModel to the function
        let sku = item["SKU"];
        let msrp;
        
        //get msrp price
        msrp = getMSRP(item);
       
        // Check if either msrp or quantity is not a valid number
        if (isNaN(msrp) || isNaN(quantity)) {
            total = "Unknown";
        } else {
            // Calculate the total price by multiplying MSRP by quantity
            total = msrp * quantity;
            
            // Round the total to two decimal places
            total = total.toFixed(2);

            // Convert the rounded total back to a number
            total = parseFloat(total);

             // Check if the total for this item is over 43000
            if (total > 43000) {
                showNATSMessage = true; // Set the flag to true if any item's total is over 43000
            }
        }

        // Show or hide the NATSMessageDiv based on the flag
        if (showNATSMessage) {
            NATSMessageDiv.style.display = "block";
        } else {
            NATSMessageDiv.style.display = "none";
        }


        // Check if term is "3 year" and append "F3" to SKU if true
        const term = document.getElementById("term").value;
        if (term === "3 year") {
            sku += "F3";
        }

        const listItem = document.createElement("li");
        listItem.textContent = `Quantity: ${quantity} SKU: ${sku} - ${item["SKU Description"]} - MSRP: ${msrp} - Total:${total}`;
        resultList.appendChild(listItem);
    });

    //intro text
    const introText = document.createElement("p");
    introText.textContent = "List of Matching SKUs:";

    skuListDiv.appendChild(introText);
    skuListDiv.appendChild(resultList);
}


function displayCorrectSliders(filteredData) {
    const virtualOrBareMetalSelect = document.getElementById("virtualOrBareMetal");
    const skuListDiv = document.getElementById("skuList");
    
    //if SKUlistdiv is visible then check licensing models for SKU's that have been filtered and show correct sliders
    if (getComputedStyle(skuListDiv).display === "block") {
        
        // Iterate through the filtered data and read Licensing Model from each item
        filteredData.forEach((item) => {
            const LicensingModel = item["Licensing Model"];

            // load the correct sliders based on the value of "LicensingModel" for each item
            if (LicensingModel === "standard RHEL") {

                //show sliders based on which option is selected
                    if (virtualOrBareMetalSelect.value === "Virtual") {
                        // If virtual ask how many VM's
                        vmsDiv.style.display = "block";
                        socketPairsDiv.style.display = "none";
                    } else if (virtualOrBareMetalSelect.value === "Bare Metal") {
                        // If bare metal ask how many socket pairs
                        vmsDiv.style.display = "none";
                        socketPairsDiv.style.display = "block";
                    } else {
                        // if something else e.g select option then hide all
                        vmsDiv.style.display = "none";
                        socketPairsDiv.style.display = "none";
                    }

            } else if (LicensingModel === "POWER") {
                // If licensing model is power show correct sliders
                coresDiv.style.display = "block";
                lparsDiv.style.display = "block";

            } else if (LicensingModel === "VDC") {
                // if licensing model is vdc show correct sliders
                socketPairsDiv.style.display = "block";
            } else if (LicensingModel === "node") {
                // if licensing model is vdc show correct sliders
                nodesDiv.style.display = "block";
            } else {
                // Handle other cases for this item
                console.log(`SKU ${item["SKU"]} does not have a licensing model created for it`);
            }
            
        });
    }
}

function calculateQuantity(LicensingModel, item) {
    const virtualOrBareMetalSelect = document.getElementById("virtualOrBareMetal");
    const socketPairsInput = document.getElementById("socketPairsInput");
    const vmsInput = document.getElementById("vmsInput");
    const lparsInput = document.getElementById("lparsInput");
    const coresInput = document.getElementById("coresInput");
    const nodesInput = document.getElementById("nodesInput");

    if (LicensingModel === "standard RHEL") {
        if (virtualOrBareMetalSelect.value === "Virtual") {
            const quantity = Math.ceil(parseInt(vmsInput.value) / 2);
            return quantity;
        } else if (virtualOrBareMetalSelect.value === "Bare Metal") {
            const quantity = parseInt(socketPairsInput.value);
            return quantity;
        }
    } else if (LicensingModel === "POWER") {
        const lparsValue = parseInt(lparsInput.value);
        const coresValue = parseInt(coresInput.value);

        // Calculate the higher of lparsValue / 4 or coresValue / 4
        const quantity = Math.max(Math.ceil(lparsValue / 4), Math.ceil(coresValue / 4));
        return quantity;
    } else if (LicensingModel === "VDC") {
        const quantity = parseInt(socketPairsInput.value);
        return quantity;
    } else if (LicensingModel === "node") {
        const numberOfNodes = item["Number of Nodes"]; // Get the number of nodes from the JSON data
        const quantity = Math.ceil(parseInt(nodesInput.value) / numberOfNodes); // Divide and round up
        console.log(quantity)
        return quantity;
    }
    // Add more conditions as needed
    return "Unknown - Please Contact Presales"; // Default value if no condition matches
}

function getMSRP(item) {
    const term = document.getElementById("term").value;
    let msrp;
    if (term === "3 year") {
        // Look up "3-Year MSRP" from the filtered data
        msrp = item["3-Year MSRP"]; // Assuming the MSRP data is available in the filtered data
        return msrp;
    } else {
        // Look up "1-Year MSRP" from the filtered data
        msrp = item["1-Year MSRP"]; // Assuming the MSRP data is available in the filtered data
        return msrp;
    }
}