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

        if (LicensingModel === "Cores") {
            OCPMessageDiv.style.display = "block";
        } else {
            OCPMessageDiv.style.display = "none";
        }
        

        // Check if term is "3 year" and append "F3" to SKU if true
        const term = document.getElementById("term").value;
        if (term === "3 year") {
            sku += "F3";
        }

        const listItem = document.createElement("li");
        listItem.textContent = `Quantity: ${quantity} SKU: ${sku} - ${item["SKU Description"]} - MSRP: ${msrp} - Total:${total}`;
        resultList.appendChild(listItem);
        
        
        //display todolist
        toDoList()

        //update or run email generation
        //generateEmail()
        
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
    const coresDiv = document.getElementById("coresDiv");
    const vmsDiv = document.getElementById("vmsDiv");
    const socketPairsDiv = document.getElementById("socketPairsDiv");
    const lparsDiv = document.getElementById("lparsDiv");
    const nodesDiv = document.getElementById("nodesDiv");
    const vcpuDiv = document.getElementById("vcpuDiv");
    const academicDiv = document.getElementById("academicDiv");
    
    // Define a list of slider divs
    const sliderDivs = [coresDiv, vmsDiv, socketPairsDiv, lparsDiv, nodesDiv, academicDiv];
    
    // Hide all slider divs
    sliderDivs.forEach((div) => {
        div.style.display = "none";
    });

    // If SKUlistdiv is visible, check licensing models for SKU's in the filtered data
    if (getComputedStyle(skuListDiv).display === "block") {
        filteredData.forEach((item) => {
            const LicensingModel = item["Licensing Model"];

            // Determine which slider divs should be displayed based on LicensingModel
            let sliderDivsToShow = [];

            if (LicensingModel === "standard RHEL") {
                if (virtualOrBareMetalSelect.value === "Virtual") {
                    sliderDivsToShow.push(vmsDiv);
                } else if (virtualOrBareMetalSelect.value === "Bare Metal") {
                    sliderDivsToShow.push(socketPairsDiv);
                }
            } else if (LicensingModel === "POWER") {
                sliderDivsToShow.push(coresDiv, lparsDiv);
            } else if (LicensingModel === "VDC") {
                sliderDivsToShow.push(socketPairsDiv);
            } else if (LicensingModel === "node") {
                sliderDivsToShow.push(nodesDiv);
            } else if (LicensingModel === "Cores") {
                sliderDivsToShow.push(coresDiv, vcpuDiv);
            } else if (LicensingModel === "Socket Pairs") {
                sliderDivsToShow.push(socketPairsDiv);
            } else if (LicensingModel === "academic") {
                sliderDivsToShow.push(academicDiv);
            }

            // Show the determined slider divs
            sliderDivsToShow.forEach((div) => {
                div.style.display = "block";
            });
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
    const vcpuInput = document.getElementById("vcpuInput");
    const fullTimeFacultyInput = document.getElementById("fullTimeFacultyInput");
    const partTimeFacultyInput = document.getElementById("partTimeFacultyInput");
    const fullTimeStaffInput = document.getElementById("fullTimeStaffInput");
    const partTimeStaffInput = document.getElementById("partTimeStaffInput");

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
        const numberOfNodes = item["# of Nodes"]; // Get the number of nodes from the JSON data
        const quantity = Math.ceil(parseInt(nodesInput.value) / numberOfNodes); // Divide and round up
        const nodesInputValue = parseInt(nodesInput.value);
        const ansibleMessageDiv = document.getElementById("ansibleMessageDiv");

        // Show message to contact presales for opps with over 5000 nodes.
        if (nodesInputValue >= 1 && nodesInputValue < 5000) {
            ansibleMessageDiv.style.display = "none";
        } else if (nodesInputValue >= 5000 && nodesInputValue <= 10000) {
            ansibleMessageDiv.style.display = "block";
        } else if (nodesInputValue > 10000) {
            ansibleMessageDiv.style.display = "block";
        }
        return quantity; 

    } else if (LicensingModel === "Cores") {
        const numberOfCores = item["# of Cores"];
        const quantity = Math.max(Math.ceil(parseInt(coresInput.value) / numberOfCores), Math.ceil(parseInt(vcpuInput.value)/ 2 / numberOfCores));
        OCPMessageDiv.style.display = "block";
        return quantity;
    } else if (LicensingModel === "Socket Pairs") {
        const quantity = parseInt(socketPairsInput.value);
        return quantity;
    } else if (LicensingModel === "academic") {
        const quantity = Math.ceil( parseInt(fullTimeFacultyInput.value) + (parseInt(partTimeFacultyInput.value)/3) + parseInt(fullTimeStaffInput.value) + (parseInt(partTimeStaffInput.value)/2));
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