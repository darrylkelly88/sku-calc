document.addEventListener("DOMContentLoaded", function () {
    // Load JSON data from sku-map.json (assuming you have this file)
    fetch("ocp-sku-map.json")
        .then((response) => response.json())
        .then((data) => {
            // Add an event listener to the form
            document.getElementById("skuCalculatorForm").addEventListener("change", function () {
                // Get user selections from form items
                const term = document.getElementById("term").value;
                const product = document.getElementById("product").value;
                const architecture = document.getElementById("architecture").value;
                const ocpFlavour = document.getElementById("ocpFlavour").value;
                const virtualOrBareMetal = document.getElementById("virtualOrBareMetal").value;
                const supportLevel = document.getElementById("supportLevel").value;
                const skuListDiv = document.getElementById("skuList");


                if (product === "Red Hat OpenShift Container Platform" && getComputedStyle(skuListDiv).display === "block") {
                    // Filter the JSON data based on user selections
                    const filteredData = data.filter((item) => {
                        // Determine the SKU field to display based on the selected term

                        // Check if the user made a selection in each field before applying the filter
                        return (
                            (!architecture || (architecture === "x86" && item["x86"] === "TRUE") || (architecture === "IBM POWER" && item["IBM POWER"] === "TRUE") || (architecture === "ARM" && item["ARM"] === "TRUE")) &&
                            (!ocpFlavour || (ocpFlavour === "OKE" && item["Engine"] === "TRUE") || (ocpFlavour === "OCP" && item["Container Platform"] === "TRUE") || (ocpFlavour === "OPP" && item["Platform Plus"] === "TRUE")) &&
                            (!supportLevel || (supportLevel === "standard" && item["Standard"] === "TRUE") || (supportLevel === "premium" && item["Premium"] === "TRUE")) &&
                            // standard exclusion filters
                            (item["Edge"] !== "TRUE") &&
                            (item["Distributed Computing"] !== "TRUE") &&
                            (item["Windows"] !== "TRUE") &&
                            (item["Data Foundation"] !== "TRUE") &&
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
