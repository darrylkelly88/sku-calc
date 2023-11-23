document.addEventListener("DOMContentLoaded", function () {
    // Load JSON data from sku-map.json (assuming you have this file)
    fetch("/sku-calc/sku-maps/middleware-sku-map.json")
        .then((response) => response.json())
        .then((data) => {
            // Add an event listener to the form
            document.getElementById("skuCalculatorForm").addEventListener("change", function () {
                // Get user selections from form items
                const term = document.getElementById("term").value;
                const product = document.getElementById("product").value;
                const middlewareproduct = document.getElementById("middlewareproduct").value; 
                const jbossProduct = document.getElementById("jboss").value;
                const supportLevel = document.getElementById("supportLevel").value;
                const skuListDiv = document.getElementById("skuList");

                if (product === "Red Hat Middleware" && getComputedStyle(skuListDiv).display === "block") {
                    // Filter the JSON data based on user selections
                    const filteredData = data.filter((item) => {
                        // Determine the SKU field to display based on the selected term

                        // Check if the user made a selection in each field before applying the filter
                        return (
                            (!supportLevel || (supportLevel === "standard" && item["Standard"] === "TRUE") || (supportLevel === "premium" && item["Premium"] === "TRUE")) &&
                            (!middlewareproduct ||
                                (
                                  (middlewareproduct === "JBOSS" &&
                                    (
                                      (!jbossProduct || (jbossProduct === "EAP" && item["JbossEAP"] === "TRUE") || (jbossProduct === "Web Server" && item["JbossWebServer"] === "TRUE"))
                                    )
                                  ) ||
                                  (middlewareproduct === "3scale" && item["3Scale"] === "TRUE") ||
                                  (middlewareproduct === "AMQ" && item["AMQ"] === "TRUE") ||
                                  (middlewareproduct === "Data Grid" && item["Data Grid"] === "TRUE") ||
                                  (middlewareproduct === "Fuse" && item["Fuse"] === "TRUE") ||
                                  (middlewareproduct === "Service Interconnect" && item["Service Interconnect"] === "TRUE") ||
                                  (middlewareproduct === "OpenJDK" && item["OpenJDK"] === "TRUE") ||
                                  (middlewareproduct === "Quarkus" && item["Quarkus"] === "TRUE") ||
                                  (middlewareproduct === "Red Hat Integration" && item["Integration"] === "TRUE") ||
                                  (middlewareproduct === "Red Hat Runtimes" && item["Runtimes"] === "TRUE") ||
                                  (middlewareproduct === "Application Foundations" && item["Application Foundations"] === "TRUE")
                                )
                              ) &&
                            
                            // Standard exclusion filters
                            (item["Edge"] !== "TRUE") && 
                            (item["ELS"] !== "TRUE") && 
                            (item["Distributed Computing"] !== "TRUE") &&
                            (item["Cluster Edition"] !== "TRUE") &&
                            (item["Openshift"] !== "TRUE")
                            // (item["Include in Data?"] === "TRUE") 
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
