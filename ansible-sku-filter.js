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
                const nodesInput = document.getElementById("nodesInput");

                if (product === "Red Hat Ansible Automation Platform" && getComputedStyle(skuListDiv).display === "block") {
                    // Filter the JSON data based on user selections
                    const filteredData = data.filter((item) => {
                        // Determine the SKU field to display based on the selected term

                        // Check if the user made a selection in each field before applying the filter
                        const baseFilter = (
                            (!supportLevel || (supportLevel === "standard" && item["Standard"] === "TRUE") || (supportLevel === "premium" && item["Premium"] === "TRUE")) &&
                            // Standard exclusion filters
                            (item["Edge"] !== "TRUE") &&
                            (item["Include in Data"] == "TRUE")
                        );

                        // Get the number of nodes for the current item
                        const numberOfNodes = item["# of Nodes"];
                        // Parse the value from nodesInput
                        const nodesInputValue = parseInt(nodesInput.value);

                        // Apply filter conditions based on nodesInputValue
                        if (nodesInputValue >= 1 && nodesInputValue < 4901) {
                            return baseFilter && numberOfNodes === 100;
                        } else if (nodesInputValue >= 4901 && nodesInputValue <= 9999) {
                            return baseFilter && numberOfNodes === 5000;
                        } else if (nodesInputValue > 9999) {
                            return baseFilter && numberOfNodes === 10000;
                        }

                        return false; // Default: Do not include the item
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

