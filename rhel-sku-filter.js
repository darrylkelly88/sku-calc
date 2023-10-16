document.addEventListener("DOMContentLoaded", function () {
    fetch("sku-map.json")
        .then((response) => response.json())
        .then((data) => {
            document.getElementById("skuCalculatorForm").addEventListener("change", function () {
                const managedService = document.getElementById("managedService").value;
                const internalSoftware = document.getElementById("internalSoftware").value;
                const deploymentLocation = document.getElementById("deploymentLocation").value;
                const renewalOrNew = document.getElementById("renewalOrNew").value;
                const supportLevel = document.getElementById("supportLevel").value;
                const term = document.getElementById("term").value;
                const product = document.getElementById("product").value;
                const pctype = document.getElementById("pctype").value;
                const runSAP = document.getElementById("runSAP").value;
                const SAPversion = document.getElementById("SAPversion").value;
                const architecture = document.getElementById("architecture").value;
                const virtualOrBareMetal = document.getElementById("virtualOrBareMetal").value;
                const densityGreaterThan7 = document.getElementById("densityGreaterThan7").value;
                const satelliteAddon = document.getElementById("satelliteAddon").value;

                // Calculate SKUs based on the selected options
                const selectedOptions = {
                    virtualOrBareMetal,
                    virtualMachines: parseInt(document.getElementById("vmsInput").value),
                    socketPairs: parseInt(document.getElementById("socketPairsInput").value),
                    // Add other form values as needed
                };

                const filteredData = data.filter((item) => {
                    const skuMatches = (
                        (!runSAP || (runSAP === "No" && item["Is this for SAP?"] === "No") || (runSAP === "Yes" && item["Is this for SAP?"] === "Yes")) &&
                        (!SAPversion || (SAPversion === "minimum" && item["Is this for SAP Applications?"] === "Yes") || (SAPversion === "solution" && item["Is this for SAP Solutions?"] === "Yes")) &&
                        (!pctype || (pctype === "workstation" && item["Is this for Workstation?"] === "Yes") || (pctype === "HPC" && item["Is this for HPC?"] === "Yes") || (pctype === "server" && item["Is this for Server?"] === "Yes")) &&
                        (!architecture || (architecture === "x86" && item["Is this for x86?"] === "Yes") || (architecture === "IBM POWER" && item["Is this for IBM POWER?"] === "Yes") || (architecture === "ARM" && item["Is this for ARM?"] === "Yes")) &&
                        (!virtualOrBareMetal || (virtualOrBareMetal === "Virtual" && item["Is this Virtual?"] === "Yes") || (virtualOrBareMetal === "Bare Metal" && item["Is this Bare Metal?"] === "Yes")) &&
                        (!densityGreaterThan7 || (densityGreaterThan7 === "Yes" && item["Is this for Virtual Datacenters?"] === "Yes") || (densityGreaterThan7 === "No" && item["Is this for Virtual Datacenters?"] === "No")) &&
                        (!satelliteAddon || (satelliteAddon === "Yes" && item["Is this for Satellite / Smart Management?"] === "Yes") || (satelliteAddon === "No" && item["Is this for Satellite / Smart Management?"] === "No")) &&
                        (!managedService || (managedService === "Yes" && item["Is this for Managed Service?"] === "Yes") || (managedService === "No" && item["Is this for Managed Service?"] === "No")) &&
                        (!internalSoftware || (internalSoftware === "Yes" && item["Is this for Internal Software?"] === "Yes") || (internalSoftware === "No" && item["Is this for Internal Software?"] === "No")) &&
                        (!deploymentLocation || (deploymentLocation === "On Premise" && item["Is this for On Premise?"] === "Yes") || (deploymentLocation === "In the Cloud" && item["Is this for In the Cloud?"] === "Yes")) &&
                        (!renewalOrNew || (renewalOrNew === "Renewal" && item["Is this for Renewal?"] === "Yes") || (renewalOrNew === "New" && item["Is this for Renewal?"] === "No")) &&
                        (!supportLevel || (supportLevel === "standard" && item["Is this for Standard Support?"] === "Yes") || (supportLevel === "premium" && item["Is this for Premium Support?"] === "Yes")) &&
                        (!term || item["Term"] === term) &&
                        (!product || item["Product"] === product)
                    );

                    if (skuMatches) {
                        const skusNeeded = calculateSKUNumber(selectedOptions, item["Licensing Model"]);
                        return skusNeeded > 0; // Exclude entries that don't require any SKUs
                    }

                    return false; // Exclude entries that don't match the criteria
                });

                displayFilteredResults(filteredData);
            });
        })
        .catch((error) => {
            console.error("Error loading JSON data:", error);
        });
});

// Helper function to calculate SKUs
function calculateSKUNumber(selectedOptions, licensingModel) {
    let skusNeeded = 1;

    if (licensingModel === "standard RHEL") {
        if (selectedOptions.virtualOrBareMetal === "Virtual") {
            skusNeeded = Math.ceil(selectedOptions.virtualMachines / 2);
        } else if (selectedOptions.virtualOrBareMetal === "Bare Metal") {
            skusNeeded = selectedOptions.socketPairs;
        }
    }

    return skusNeeded;
}

function displayFilteredResults(filteredData) {
    const skuListDiv = document.getElementById("skuList");
    skuListDiv.innerHTML = "";

    if (filteredData.length === 0) {
        skuListDiv.innerHTML = "<p>No matching SKUs found.</p>";
        return;
    }

    const resultList = document.createElement("ul");
    filteredData.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item["SKU"]} - ${item["SKU Description"]}`;

        // Display the calculated number of SKUs next to the SKU
        const skuCount = document.createElement("span");
        skuCount.textContent = `SKUs Needed: ${calculateSKUNumber(selectedOptions, item["Licensing Model"])}`;
        listItem.appendChild(skuCount);

        resultList.appendChild(listItem);
    });

    const introText = document.createElement("p");
    introText.textContent = "List of Matching SKUs:";
    skuListDiv.appendChild(introText);
    skuListDiv.appendChild(resultList);
}
