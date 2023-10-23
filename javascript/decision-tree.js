
window.addEventListener('DOMContentLoaded', (event) => {
    //define divs
    const ccspMessageDiv = document.getElementById("ccspMessageDiv");
    const internalSoftwareDiv = document.getElementById("internalSoftwareDiv");
    const internalMessageDiv = document.getElementById("internalMessageDiv");
    const resellerStatusDiv = document.getElementById("resellerStatusDiv");
    const partnerSignUpDiv  = document.getElementById("partnerSignUpDiv");
    const academicCustomerDiv = document.getElementById("academicCustomerDiv");
    const academicMessageDiv = document.getElementById("academicMessageDiv");
    const deploymentLocationDiv = document.getElementById("deploymentLocationDiv");
    const cloudAccessMessageDiv = document.getElementById("cloudAccessMessageDiv");
    const renewalOrNewDiv = document.getElementById("renewalOrNewDiv");
    const ORPMessageDiv = document.getElementById("ORPMessageDiv");
    const supportlevelDiv = document.getElementById("supportlevelDiv");
    const termDiv = document.getElementById("termDiv");
    const productDiv = document.getElementById("productDiv");
    const pctypeDiv = document.getElementById("pctypeDiv");
    const ocpFlavourDiv = document.getElementById("ocpFlavourDiv");
    const HPC2MessageDiv = document.getElementById("HPC2MessageDiv");
    const runSAPDiv = document.getElementById("runSAPDiv");
    const SAPversionDiv = document.getElementById("SAPversionDiv");
    const architectureDiv = document.getElementById("architectureDiv");
    const virtualOrBareMetalDiv = document.getElementById("virtualOrBareMetalDiv");
    const ocpBundleDiv = document.getElementById("ocpBundleDiv");
    const densityGreaterThan7Div = document.getElementById("densityGreaterThan7Div");
    const satelliteAddonDiv = document.getElementById("satelliteAddonDiv");
    const toDoListDiv = document.getElementById("toDoListDiv");
    const generateEmailDiv  = document.getElementById("generateEmailDiv");
    //messages and SKU list.
    const HPCMessageDiv  = document.getElementById("HPCMessageDiv");
    const skuListDiv = document.getElementById("skuList");
    const NATSMessageDiv = document.getElementById("NATSMessageDiv");
    const ansibleMessageDiv = document.getElementById("ansibleMessageDiv");
    const OCPMessageDiv = document.getElementById("OCPMessageDiv");
    //define divs - sliders
    const coresDiv = document.getElementById("coresDiv");
    const vmsDiv = document.getElementById("vmsDiv");
    const socketPairsDiv = document.getElementById("socketPairsDiv");
    const lparsDiv = document.getElementById("lparsDiv");
    const nodesDiv = document.getElementById("nodesDiv");
    
    //define selections
    const managedServiceSelect = document.getElementById("managedService");
    const internalSoftwareSelect = document.getElementById("internalSoftware");
    const resellerStatusSelect= document.getElementById("resellerStatus");
    const academicCustomerSelect = document.getElementById("academicCustomer");
    const deploymentLocationSelect = document.getElementById("deploymentLocation");
    const renewalOrNewSelect = document.getElementById("renewalOrNew");
    const supportLevelSelect = document.getElementById("supportLevel");
    const termSelect = document.getElementById("term");
    const productSelect = document.getElementById("product");
    const pctypeSelect = document.getElementById("pctype");
    const ocpFlavourSelect = document.getElementById("ocpFlavour");
    const runSAPSelect = document.getElementById("runSAP");
    const SAPversionSelect = document.getElementById("SAPversion");
    const architectureSelect = document.getElementById("architecture");
    const virtualOrBareMetalSelect = document.getElementById("virtualOrBareMetal");
    const ocpBundleSelect = document.getElementById("ocpBundle");
    const densityGreaterThan7Select = document.getElementById("densityGreaterThan7");
    const satelliteAddonSelect = document.getElementById("satelliteAddon");

    // Initially hide all questions
    ccspMessageDiv.style.display = "none";
    internalSoftwareDiv.style.display = "none";
    internalMessageDiv.style.display = "none";
    resellerStatusDiv.style.display = "none";
    partnerSignUpDiv.style.display = "none";
    academicCustomerDiv.style.display = "none";
    academicMessageDiv.style.display = "none";
    deploymentLocationDiv.style.display = "none";
    cloudAccessMessageDiv.style.display = "none";
    renewalOrNewDiv.style.display = "none";
    ORPMessageDiv.style.display = "none";
    supportlevelDiv.style.display = "none";
    termDiv.style.display = "none";
    productDiv.style.display = "none";
    pctypeDiv.style.display = "none";
    ocpFlavourDiv.style.display = "none";
    HPC2MessageDiv.style.display = "none";
    runSAPDiv.style.display = "none";
    SAPversionDiv.style.display = "none";
    architectureDiv.style.display = "none";
    virtualOrBareMetalDiv.style.display = "none";
    ocpBundleDiv.style.display = "none";
    densityGreaterThan7Div.style.display = "none";
    satelliteAddonDiv.style.display = "none";
    HPCMessageDiv.style.display = "none";
    skuListDiv.style.display = "none";
    NATSMessageDiv.style.display = "none";
    ansibleMessageDiv.style.display = "none";
    OCPMessageDiv.style.display = "none";
    toDoListDiv.style.display = "none";
    generateEmailDiv.display = "none";
    //hide sliders
    coresDiv.style.display = "none";
    vmsDiv.style.display = "none";
    socketPairsDiv.style.display = "none";
    lparsDiv.style.display = "none";
    nodesDiv.style.display = "none";


    //start with CCSP question
    managedServiceSelect.addEventListener('change', function () {
        if (this.value === "Yes") {
            // Show the CCSP message and hide the "Is this being used to run software internally?" question
            ccspMessageDiv.style.display = "block";
            internalSoftwareDiv.style.display = "none";
        } else if (this.value === "No") {
            // Show the "Is this being used to run software internally?" question and hide the CCSP message
            internalSoftwareDiv.style.display = "block";
            ccspMessageDiv.style.display = "none";
        } else {
            // Hide both the "Is this being used to run software internally?" question and the CCSP message
            internalSoftwareDiv.style.display = "none";
            ccspMessageDiv.style.display = "none";
        }
    });

    //is this used internally?
    internalSoftwareSelect.addEventListener('change', function () {
        if (this.value === "Yes") {
            // If yes show a message about internal use and no more questions
            internalMessageDiv.style.display = "block";
            academicCustomerDiv.style.display = "none";
        } else if (this.value === "No") {
            // If no display the next question about deployment location
            academicCustomerDiv.style.display = "block";
            internalMessageDiv.style.display = "none";
        } else {
            // if something else e.g select option then hide all
            academicCustomerDiv.style.display = "none";
            internalMessageDiv.style.display = "none";
        }
    });


    //is this used by an academic customer?
    academicCustomerSelect.addEventListener('change', function () {
        if (this.value === "Yes") {
            // If yes show a message about internal use and no more questions
            academicMessageDiv.style.display = "block";
            deploymentLocationDiv.style.display = "none";
        } else if (this.value === "No") {
            // If no display the next question about deployment location
            deploymentLocationDiv.style.display = "block";
            academicMessageDiv.style.display = "none";
        } else {
            // if something else e.g select option then hide all
            deploymentLocationDiv.style.display = "none";
            academicMessageDiv.style.display = "none";
        }
    });


    //Where will this be deployed??
    deploymentLocationSelect.addEventListener('change', function () {
        if (this.value === "In the Cloud") {
            // If in the cloud display the message about Red Hat Cloud access and ask the next question
            cloudAccessMessageDiv.style.display = "block";
            renewalOrNewDiv.style.display = "block";
        } else if (this.value === "On Premise") {
            // If on premise then display the next question but dont display the message about cloud access.
            cloudAccessMessageDiv.style.display = "none";
            renewalOrNewDiv.style.display = "block";
        } else {
            // if something else e.g select option then hide all
            cloudAccessMessageDiv.style.display = "none";
            renewalOrNewDiv.style.display = "none";
        }
    });


    //Is this New or Renewal?
    renewalOrNewSelect.addEventListener('change', function () {
        if (this.value === "New") {
            // If new, display a reminder about ORP and promotions
            ORPMessageDiv.style.display = "block";
            supportlevelDiv.style.display = "block";
        } else if (this.value === "Renewal") {
            // If renewal move on to next question.
            ORPMessageDiv.style.display = "none";
            supportlevelDiv.style.display = "block";
        } else {
            // if something else e.g select option then hide all
            ORPMessageDiv.style.display = "none";
            supportlevelDiv.style.display = "none";
        }
    });

    //What support level do you need?
    supportLevelSelect.addEventListener('change', function () {
        if (this.value === "standard") {
            // If standard display next Q
            termDiv.style.display = "block";
        } else if (this.value === "premium") {
            // If premium display next Q
            termDiv.style.display = "block";
        } else {
            // if something else e.g select option then hide all
            termDiv.style.display = "none";
        }
    });

    //What term do you need?
    termSelect.addEventListener('change', function () {
        if (this.value === "1 year") {
            // If new, display a reminder about ORP and promotions
            productDiv.style.display = "block";
        } else if (this.value === "3 year") {
            // If renewal move on to next question.
            productDiv.style.display = "block";
        } else {
            // if something else e.g select option then hide all
            productDiv.style.display = "none";
        }
    });

    //Which product would you like to buy?
    productSelect.addEventListener('change', function () {
        if (this.value === "Red Hat Enterprise Linux (RHEL)") {
            // If new, display a reminder about ORP and promotions
            pctypeDiv.style.display = "block";

            //hide all other questions
            ocpFlavourDiv.style.display = "none";
            HPC2MessageDiv.style.display = "none";
            runSAPDiv.style.display = "none";
            SAPversionDiv.style.display = "none";
            architectureDiv.style.display = "none";
            virtualOrBareMetalDiv.style.display = "none";
            ocpBundleDiv.style.display = "none";
            densityGreaterThan7Div.style.display = "none";
            satelliteAddonDiv.style.display = "none";
            HPCMessageDiv.style.display = "none";
            skuListDiv.style.display = "none";
            NATSMessageDiv.style.display = "none";
            ansibleMessageDiv.style.display = "none";
            OCPMessageDiv.style.display = "none";
            //hide sliders
            coresDiv.style.display = "none";
            vmsDiv.style.display = "none";
            socketPairsDiv.style.display = "none";
            lparsDiv.style.display = "none";
            nodesDiv.style.display = "none";

            //reset all values.
            pctypeSelect.value = "";
            ocpFlavourSelect.value = "";
            runSAPSelect.value = "";
            SAPversionSelect.value = "";
            architectureSelect.value = "";
            virtualOrBareMetalSelect.value = "";
            ocpBundleSelect.value = "";
            densityGreaterThan7Select.value = "";
            satelliteAddonSelect.value = "";

        } else if (this.value === "Red Hat Ansible Automation Platform") {
            // If renewal move on to next question.
            skuListDiv.style.display = "block";
            pctypeDiv.style.display = "none";

            //hide all other questions
            ocpFlavourDiv.style.display = "none";
            HPC2MessageDiv.style.display = "none";
            runSAPDiv.style.display = "none";
            SAPversionDiv.style.display = "none";
            architectureDiv.style.display = "none";
            virtualOrBareMetalDiv.style.display = "none";
            ocpBundleDiv.style.display = "none";
            densityGreaterThan7Div.style.display = "none";
            satelliteAddonDiv.style.display = "none";
            HPCMessageDiv.style.display = "none";
            NATSMessageDiv.style.display = "none";
            ansibleMessageDiv.style.display = "none";
            OCPMessageDiv.style.display = "none";
            //hide sliders
            coresDiv.style.display = "none";
            vmsDiv.style.display = "none";
            socketPairsDiv.style.display = "none";
            lparsDiv.style.display = "none";

            //reset all values.
            pctypeSelect.value = "";
            ocpFlavourSelect.value = "";
            runSAPSelect.value = "";
            SAPversionSelect.value = "";
            architectureSelect.value = "";
            virtualOrBareMetalSelect.value = "";
            ocpBundleSelect.value = "";
            densityGreaterThan7Select.value = "";
            satelliteAddonSelect.value = "";

        } else if (this.value === "Red Hat OpenShift Container Platform") {
            // If renewal move on to next question.
            skuListDiv.style.display = "none";
            pctypeDiv.style.display = "none";
            ocpFlavourDiv.style.display = "block";

            //hide all other questions
            HPC2MessageDiv.style.display = "none";
            runSAPDiv.style.display = "none";
            SAPversionDiv.style.display = "none";
            architectureDiv.style.display = "none";
            virtualOrBareMetalDiv.style.display = "none";
            ocpBundleDiv.style.display = "none";
            densityGreaterThan7Div.style.display = "none";
            satelliteAddonDiv.style.display = "none";
            HPCMessageDiv.style.display = "none";
            NATSMessageDiv.style.display = "none";
            ansibleMessageDiv.style.display = "none";
            OCPMessageDiv.style.display = "none";
            //hide sliders
            coresDiv.style.display = "none";
            vmsDiv.style.display = "none";
            socketPairsDiv.style.display = "none";
            lparsDiv.style.display = "none";
            nodesDiv.style.display = "none";

            //reset all values.
            pctypeSelect.value = "";
            ocpFlavourSelect.value = "";
            runSAPSelect.value = "";
            SAPversionSelect.value = "";
            architectureSelect.value = "";
            virtualOrBareMetalSelect.value = "";
            ocpBundleSelect.value = "";
            densityGreaterThan7Select.value = "";
            satelliteAddonSelect.value = "";

        } else {
            // if something else e.g select option then hide all
            pctypeDiv.style.display = "none";
            //hide all other questions
            ocpFlavourDiv.style.display = "none";
            HPC2MessageDiv.style.display = "none";
            runSAPDiv.style.display = "none";
            SAPversionDiv.style.display = "none";
            architectureDiv.style.display = "none";
            virtualOrBareMetalDiv.style.display = "none";
            ocpBundleDiv.style.display = "none";
            densityGreaterThan7Div.style.display = "none";
            satelliteAddonDiv.style.display = "none";
            HPCMessageDiv.style.display = "none";
            skuListDiv.style.display = "none";
            NATSMessageDiv.style.display = "none";
            ansibleMessageDiv.style.display = "none";
            OCPMessageDiv.style.display = "none";
            //hide sliders
            coresDiv.style.display = "none";
            vmsDiv.style.display = "none";
            socketPairsDiv.style.display = "none";
            lparsDiv.style.display = "none";
            nodesDiv.style.display = "none";

            //reset all values.
            pctypeSelect.value = "";
            ocpFlavourSelect.value = "";
            runSAPSelect.value = "";
            SAPversionSelect.value = "";
            architectureSelect.value = "";
            virtualOrBareMetalSelect.value = "";
            ocpBundleSelect.value = "";
            densityGreaterThan7Select.value = "";
            satelliteAddonSelect.value = "";
        }
    });


    //Which OCP version do you need?
    ocpFlavourSelect.addEventListener('change', function () {
        if (this.value === "OKE") {
            // If new, display a reminder about ORP and promotions
            architectureDiv.style.display = "block";
        } else if (this.value === "OCP") {
            // If renewal move on to next question.
            architectureDiv.style.display = "block";
        } else if (this.value === "OPP") {
            // If renewal move on to next question.
            architectureDiv.style.display = "block";
        } else {
            // if something else e.g select option then hide all
            architectureDiv.style.display = "none";
        }
    });

    //RHEL use case?
    pctypeSelect.addEventListener('change', function () {
        if (this.value === "server") {
            // If server, move on to next question. Clear other divs if changing this later.
            runSAPDiv.style.display = "block";
            skuListDiv.style.display = "none";
            architectureDiv.style.display = "none";
            HPCMessageDiv.style.display = "none";
            satelliteAddonDiv.style.display = "none";
            HPC2MessageDiv.style.display = "none";
            //clear filters if changing this after selections later.
            satelliteAddonSelect.value = "";
            architectureSelect.value = "";
        } else if (this.value === "workstation") {
            // Workstation, display SKU's
            runSAPDiv.style.display = "none";
            skuListDiv.style.display = "block";
            architectureDiv.style.display = "none";
            HPCMessageDiv.style.display = "none";
            satelliteAddonDiv.style.display = "none";
            HPC2MessageDiv.style.display = "none";
            //clear filters if changing this after selections later.
            runSAPSelect.value = "";
            architectureSelect.value = "";
            satelliteAddonSelect.value = "";
        } else if (this.value === "HPC") {
            // If HPC display HPC messages, relevant questions and hide irrelevant questions.
            runSAPDiv.style.display = "none";
            // skuListDiv.style.display = "block";
            architectureDiv.style.display = "block";
            // HPCMessageDiv.style.display = "block";
            // HPC2MessageDiv.style.display = "block";
            // satelliteAddonDiv.style.display = "block";
            //clear filters if changing this after selections later.
            runSAPSelect.value = "";
        } else {
            // if something else e.g select option then hide all
            runSAPDiv.style.display = "none";
            skuListDiv.style.display = "none";
            architectureDiv.style.display = "none";
            HPCMessageDiv.style.display = "none";
            satelliteAddonDiv.style.display = "none";
            HPC2MessageDiv.style.display = "none";
        }
    });

    //Is this being used to run SAP?
    runSAPSelect.addEventListener('change', function () {
        if (this.value === "No") {
            // If no, move on to architecture
            architectureDiv.style.display = "block";
            SAPversionDiv.style.display = "none";
            //reset filters if changed later
            SAPversionSelect.value = "";
        } else if (this.value === "Yes") {
            // If yes ask which version is needed.
            architectureDiv.style.display = "none";
            SAPversionDiv.style.display = "block";
        } else {
            // if something else e.g select option then hide all
            architectureDiv.style.display = "none";
            SAPversionDiv.style.display = "none";
        }
    });

    //which SAP version do you need?
    SAPversionSelect.addEventListener('change', function () {
        if (this.value === "minimum") {
            // If selection is made show next question
            architectureDiv.style.display = "block";
        } else if (this.value === "solution") {
            // If selection is made show next question
            architectureDiv.style.display = "block";
            satelliteAddonSelect.value= "No";
        } else {
            // if something else e.g select option then hide all
            architectureDiv.style.display = "none";
        }
    });

    //which architecture are you using?
    architectureSelect.addEventListener('change', function () {
        if (productSelect.value === "Red Hat Enterprise Linux (RHEL)") {
            if (pctypeSelect.value === "server") {
                if (this.value === "x86") {
                    // Decision tree for RHEL on x86 for server
                    virtualOrBareMetalDiv.style.display = "block";
                } else if (this.value === "IBM POWER") {
                    // Decision tree for RHEL on IBM POWER for server
                    virtualOrBareMetalDiv.style.display = "block";
                } else if (this.value === "ARM") {
                    // Decision tree for RHEL on ARM for server
                    virtualOrBareMetalDiv.style.display = "block";
                } else {
                    // Default for RHEL server: hide
                    virtualOrBareMetalDiv.style.display = "none";
                }
            } else if (pctypeSelect.value === "HPC") {
                if (this.value === "x86") {
                    // Decision tree for RHEL on x86 for HPC
                    satelliteAddonDiv.style.display = "block";
                } else if (this.value === "IBM POWER") {
                    // Decision tree for RHEL on IBM POWER for HPC
                    satelliteAddonDiv.style.display = "block";
                } else if (this.value === "ARM") {
                    // Decision tree for RHEL on ARM for HPC
                    satelliteAddonDiv.style.display = "block";
                } else {
                    // Default for RHEL HPC: hide
                    virtualOrBareMetalDiv.style.display = "none";
                }
            }
        } else if (productSelect.value === "Red Hat OpenShift Container Platform") {
            // Decision tree for OpenShift
            if (this.value === "x86") {
                virtualOrBareMetalDiv.style.display = "block";
            } else if (this.value === "IBM POWER") {
                virtualOrBareMetalDiv.style.display = "block";
            } else if (this.value === "ARM") {
                virtualOrBareMetalDiv.style.display = "block";
            } else {
                // Default for OpenShift: hide
                virtualOrBareMetalDiv.style.display = "none";
            }
        }
    });
    

    // Is this virtual or bare metal?
    virtualOrBareMetalSelect.addEventListener('change', function () {
        if (productSelect.value === "Red Hat Enterprise Linux (RHEL)") {
            // Handle RHEL-specific logic
            if (this.value === "Virtual") {
                // If virtual ask about density
                densityGreaterThan7Div.style.display = "block";
                satelliteAddonDiv.style.display = "none";

                satelliteAddonSelect.value = "";
                densityGreaterThan7Select.value = "";

                skuListDiv.style.display = "none";
            } else if (this.value === "Bare Metal") {
                // If bare metal move on to the satellite question
                densityGreaterThan7Div.style.display = "none";
                satelliteAddonDiv.style.display = "block";

                // Clear filters
                densityGreaterThan7Select.value = "No";
                satelliteAddonSelect.value ="";

                skuListDiv.style.display = "none";
            } else {
                // If something else, e.g., select option, then hide all
                ORPMessageDiv.style.display = "none";
                supportlevelDiv.style.display = "none";
            }
        } else if (productSelect.value === "Red Hat OpenShift Container Platform") {
            if (this.value === "Virtual") {
                if (architectureSelect.value === "x86") {
                    if (ocpFlavourSelect.value === "OCP" || ocpBundleSelect.value === "OPP") {
                        ocpBundleDiv.style.display = "block";
                    } else {
                        ocpBundleDiv.style.display = "none";
                        skuListDiv.style.display = "block";
                    }
                } else {
                    skuListDiv.style.display = "block";
                }
            } else if (this.value === "Bare Metal") {
                skuListDiv.style.display = "block";
                ocpBundleDiv.style.display = "none";
            } else {
                skuListDiv.style.display = "none";
                ocpBundleDiv.style.display = "none";
            }
        }
    });



    //Does the customer need further supporting tools for app development?
    ocpBundleSelect.addEventListener('change', function () {
        if (this.value === "no") {
            
            skuListDiv.style.display = "block";
        } else if (this.value === "runtimes") {
            
            skuListDiv.style.display = "block";
        } else if (this.value === "appfoundations") {
            
            skuListDiv.style.display = "block";
        } else {
            // if something else e.g select option then hide all
            skuListDiv.style.display = "none";

        }
    });


    //density of greater than 7?
    densityGreaterThan7Select.addEventListener('change', function () {
        if (this.value === "No") {
            // If new, display a reminder about ORP and promotions
            satelliteAddonDiv.style.display = "block";
        } else if (this.value === "Yes") {
            // If renewal move on to next question.
            satelliteAddonDiv.style.display = "block";
        } else {
            // if something else e.g select option then hide all
            satelliteAddonDiv.style.display = "none";

        }
    });



    //do you need the satellite add-on
    satelliteAddonSelect.addEventListener('change', function () {
        if (this.value === "No") {
            // If new, display a reminder about ORP and promotions
            skuListDiv.style.display = "block";
        } else if (this.value === "Yes") {
            // If renewal move on to next question.
            skuListDiv.style.display = "block";
        } else {
            // if something else e.g select option then hide all
            skuListDiv.style.display = "none";
        }
    });



});