document.addEventListener("DOMContentLoaded", function () {
    // Load JSON data from sku-map.json (assuming you have this file)
    fetch("sku-map.json")
        .then((response) => response.json())
        .then((data) => {
            // Add an event listener to the form
            document.getElementById("skuCalculatorForm").addEventListener("change", function () {
                // Get user selections from form items
                const term = document.getElementById("term").value;
                const product = document.getElementById("product").value;
                const runSAP = document.getElementById("runSAP").value;
                const architecture = document.getElementById("architecture").value;
                const virtualOrBareMetal = document.getElementById("virtualOrBareMetal").value;
                const densityGreaterThan7 = document.getElementById("densityGreaterThan7").value;
                const satelliteAddon = document.getElementById("satelliteAddon").value;
                const supportLevel = document.getElementById("supportLevel").value;
                const pctype = document.getElementById("pctype").value;
                const SAPversion = document.getElementById("SAPversion").value

                // Filter the JSON data based on user selections
                const filteredData = data.filter((item) => {
                    // Determine the SKU field to display based on the selected term

                    // Check if the user made a selection in each field before applying the filter
                    return (
                        (!runSAP || (runSAP === "Yes" && item["SAP"] === "TRUE") || (runSAP === "No" && item["SAP"] === "FALSE")) &&
                        (!SAPversion || (SAPversion === "minimum" && item["Sap Applications"] === "TRUE") || (SAPversion === "solution" && item["SAP Solutions"] === "TRUE")) &&
                        (!pctype || (pctype === "workstation" && item["Workstation"] === "TRUE") || (pctype === "HPC" && item["HPC"] === "TRUE" || (pctype === "server" && item["Server"] === "TRUE"))) &&
                        (!architecture || (architecture === "x86" && item["x86"] === "TRUE") || (architecture === "IBM POWER" && item["IBM POWER"] === "TRUE") || (architecture === "ARM" && item["ARM"] === "TRUE")) &&
                        (!virtualOrBareMetal || (virtualOrBareMetal === "Virtual" && item["Virtual"] === "TRUE") || (virtualOrBareMetal === "Bare Metal" && item["Physical"] === "TRUE")) &&
                        (!densityGreaterThan7 || (densityGreaterThan7 === "Yes" && item["Virtual Datacenters"] === "TRUE") || (densityGreaterThan7 === "No" && item["Virtual Datacenters"] === "FALSE")) &&
                        (!satelliteAddon || (satelliteAddon === "Yes" && item["Satellite / Smart Management"] === "TRUE") || (satelliteAddon === "No" && item["Satellite / Smart Management"] === "FALSE")) &&
                        (!supportLevel || (supportLevel === "standard" && item["Standard"] === "TRUE") || (supportLevel === "premium" && item["Premium"] === "TRUE")) &&
                        // standard exclusion filters
                        (item["Add-on"] !== "TRUE") && 
                        (item["Is it for Edge, Endpoint or gateway?"] !== "TRUE") &&
                        (item["Include in Data?"] == "TRUE") 
                   );
                });

                // Display the filtered results in the "skuList" div
                displayFilteredResults(filteredData);
            });
        })
        .catch((error) => {
            console.error("Error loading JSON data:", error);
        });
});


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


            } else if (LicensingModel === "ValueB") {
                // Do something for ValueB for this item
                console.log(`ValueB: Do something for SKU ${item["SKU"]}`);
            } else {
                // Handle other cases for this item
                console.log(`Other value: Do something else for SKU ${item["SKU"]}`);
            }
            
        });
    }
}

function displayFilteredResults(filteredData) {
    const skuListDiv = document.getElementById("skuList");
    skuListDiv.innerHTML = "";

    if (filteredData.length === 0) {
        skuListDiv.innerHTML = "<p>No matching SKUs found.</p>";
        return;
    }

    displayCorrectSliders(filteredData);

    const resultList = document.createElement("ul");
    filteredData.forEach((item) => {
        const LicensingModel = item["Licensing Model"]; // Get LicensingModel for the current item
        const quantity = calculateQuantity(LicensingModel); // Pass LicensingModel to the function

        const listItem = document.createElement("li");
        listItem.textContent = `Quantity: ${quantity} SKU: ${item["SKU"]} - ${item["SKU Description"]}`;
        resultList.appendChild(listItem);
    });

    //intro text
    const introText = document.createElement("p");
    introText.textContent = "List of Matching SKUs:";

    skuListDiv.appendChild(introText);
    skuListDiv.appendChild(resultList);
}

function calculateQuantity(LicensingModel) {
    const virtualOrBareMetalSelect = document.getElementById("virtualOrBareMetal");
    if (LicensingModel === "standard RHEL") {
        if (virtualOrBareMetalSelect.value === "Virtual") {
            return 5; // Calculate the quantity based on your criteria
        } else if (virtualOrBareMetalSelect.value === "Bare Metal") {
            return 10; // Calculate the quantity based on your criteria
        }
    }
    // Add more conditions as needed
    return 0; // Default value if no condition matches
}
