function toDoList () {
    const toDoListDiv = document.getElementById("toDoListDiv")
    const generateEmailDiv  = document.getElementById("generateEmailDiv");
    const product = document.getElementById("product").value;
    const renewalOrNew = document.getElementById("renewalOrNew").value;
    const supportLevel = document.getElementById("supportLevel").value;
    const partnerStatus = document.getElementById("resellerStatus").value;
    const NATSMessageDiv = document.getElementById("NATSMessageDiv");
    const satelliteAddon = document.getElementById("satelliteAddon").value;
    const deploymentLocation  = document.getElementById("deploymentLocation").value;

    let things = []
    let list = `<br><b>To Do List:</b><ul>${things}</ul>`

    if (deploymentLocation === "In the Cloud") {
        things.push('The partner has advised the customer plans to run in the cloud. The customer will need to complete <a href="https://www.redhat.com/en/technologies/cloud-computing/cloud-access" target="_blank">Red Hat Cloud Access.</a>')
    }




    for (let i = 0; i < things.length; i++) {
        list += `<li>${things[i]}</li>`;
    }

    toDoListDiv.innerHTML = list;
    toDoListDiv.style.display = "block";
    generateEmailDiv.display = "block";
}



const generateEmailButton = document.getElementById("generateEmailButton");

// Add a click event handler to the button
generateEmailButton.addEventListener("click", function() {
    generateEmail();
});

function generateEmail() {
    const emailDiv = document.getElementById("emailDiv");
    const product = document.getElementById("product").value;
    const renewalOrNew = document.getElementById("renewalOrNew").value;
    const supportLevel = document.getElementById("supportLevel").value;
    const partnerStatus = document.getElementById("resellerStatus").value;
    const NATSMessageDiv = document.getElementById("NATSMessageDiv");
    const satelliteAddon = document.getElementById("satelliteAddon").value;
    const deploymentLocation  = document.getElementById("deploymentLocation").value;

    let emailBody = `<br><b> Please consider using the following email template: </b> <br><br>Hi [Name],<br><br>Thank you for your interest in a quote for ${product}. Please see attached your quote.`;

    if (deploymentLocation === "In the Cloud") {
        emailBody += '<br><br>Since you have advised that this will be deployed in the cloud. I wanted to make sure you knew that in order for the customer to remain compliant with Red Hats terms, once purchased they will need to complete <a href="https://www.redhat.com/en/technologies/cloud-computing/cloud-access" target="_blank">Red Hat Cloud Access.</a>';
    }

    if (renewalOrNew === "New") {
        emailBody += "<br><br>Since this is a new subscription, it will qualify for deal registration. If you would like us to include the deal registration discount on your quote, please let us know the ORP ID. If you need help then let me know and we can point you in the right direction.";
    }

    if (NATSMessageDiv.style.display === "block") {
        if (partnerStatus === "Advanced" || partnerStatus === "Premier" || partnerStatus === "Premier Plus") {
            emailBody += `<br><br>Please be aware that as a ${partnerStatus} partner, there is a NATS discount included in this quote.`;
        } else {
            emailBody += "<br><br>Please be aware that this opportunity might qualify for NATS discounts. These are only available to Advanced and Premier partners. If you'd like to discuss improving your partner status with Red Hat, please let us know.";
        }
    }

    if (product === "Red Hat Enterprise Linux (RHEL)" && satelliteAddon === "No") {
        emailBody += "<br><br>I noticed that you did not ask for the Satellite Add-on. Red Hat recommends satellite for any customers running more than 10 RHEL machines. It might be worth asking if there are other RHEL machines in the estate that you are unaware of which might make Satellite a viable add-on for them. If you would like us to then we are more than happy to help you have a discussion with your customer about satellite and how it might help them.";
    }

    if (product === "Red Hat Enterprise Linux (RHEL)" && renewalOrNew === "Renewal") {
        emailBody += "<br><br>It might be worth checking with your customer which version of RHEL they are using, as there are many older versions out there that might require extra add-ons to receive support. If this is the case, there may be an opportunity to help them upgrade to a newer version or support them with purchasing the correct RHEL add-on.";
    }

    if (product === "Red Hat Enterprise Linux (RHEL)" ) {
        emailBody += "<br><br>You may want to advise your customer that they have access to a product called Red Hat insights, which is included within their RHEL subscription. Many customer do not know that they get this with RHEL and it provides them AI recommendations to improve system performance, security and stability. We are more than happy to help explain in more to your customer what insights is if you would like us to.";
    }

    if (supportLevel === "standard") {
        emailBody += "<br><br>Please note that Red Hat recommend premium support for any systems running in production. Premium support includes improved SLAs, 24x7 support and the EUS add-on. EUS enables a customer to remain supported on minor versions for longer. Depending on the workload, we find that is often a critical requirement to maintain application compatibility.";
    }

    emailBody += "<br><br>If there is anything else we can help with please let me know.";

    // Set the HTML content with line breaks
    emailDiv.innerHTML = emailBody;


}
