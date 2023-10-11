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
                const supportLevel = document.getElementById("support-level").value;
                const pctype = document.getElementById("pctype").value;

                // Filter the JSON data based on user selections
                const filteredData = data.filter((item) => {
                    // Determine the SKU field to display based on the selected term

                    // Check if the user made a selection in each field before applying the filter
                    return (
                        (!runSAP || (runSAP === "Yes" && item["SAP"] === "TRUE") || (runSAP === "No" && item["SAP"] === "FALSE")) &&
                        (!pctype || (pctype === "workstation" && item["Workstation"] === "TRUE") || (pctype === "HPC" && item["HPC"] === "TRUE" && !(pctype === "server"))) &&
                        (!architecture || (architecture === "x86" && item["x86"] === "TRUE") || (architecture === "IBM POWER" && item["IBM POWER"] === "TRUE") || (architecture === "ARM" && item["ARM"] === "TRUE")) &&
                        (!virtualOrBareMetal || (virtualOrBareMetal === "Virtual" && item["Virtual"] === "TRUE") || (virtualOrBareMetal === "Bare Metal" && item["Physical"] === "TRUE")) &&
                        (!densityGreaterThan7 || (densityGreaterThan7 === "Yes" && item["Virtual Datacenters"] === "TRUE") || (densityGreaterThan7 === "No" && item["Virtual Datacenters"] === "FALSE")) &&
                        (!satelliteAddon || (satelliteAddon === "Yes" && item["Satellite / Smart Management"] === "TRUE") || (satelliteAddon === "No" && item["Satellite / Smart Management"] === "FALSE")) &&
                        (!supportLevel || (supportLevel === "standard" && item["Standard"] === "TRUE") || (supportLevel === "premium" && item["Premium"] === "TRUE")) &&
                        // standard exclusion filters
                        (item["Add-on"] !== "TRUE") && 
                        (item["Is it for Edge, Endpoint or gateway?"] !== "TRUE") &&
//                        (item["HPC"] !== "TRUE") &&
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

function displayFilteredResults(filteredData) {
    // Display the filtered results in the "skuList" div
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
        resultList.appendChild(listItem);
    });

    skuListDiv.appendChild(resultList);
}
