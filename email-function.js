function generateEmail() {
    const emailDiv = document.getElementById("emailDiv");
    const product = document.getElementById("product").value;
    const renewalOrNew = document.getElementById("renewalOrNew").value;
    const supportLevel = document.getElementById("supportLevel").value;
    const partnerStatus = document.getElementById("resellerStatus").value;
    const cloudAccessMessageDiv = document.getElementById("cloudAccessMessageDiv");
    const newOpportunityMessageDiv = document.getElementById("ORPMessageDiv");
    const NATSMessageDiv = document.getElementById("NATSMessageDiv");
    const satelliteAddon = document.getElementById("satelliteAddon").value;
    const pctype = document.getElementById("pctype").value;


    let emailBody = `Hi [Name],\n\nThank you for your interest in a quote for ${product}. Please see attached your quote.`;

    if (deploymentLocation === "In the Cloud") {
        emailBody += "\n\nIn order to remain compliant with Red Hat's terms, once the customer purchases these subscriptions, they will need to complete Red Hat Cloud Access here: [Link]";
    }

    if (renewalOrNew === "New") {
        emailBody += "\n\nPlease be aware that since this is for a new subscription, it will qualify for deal registration. If you would like us to include the deal registration discount on your quote, please let us know the ORP ID. If you need help getting this registered, please let us know.";
    }

    if (NATSMessageDiv.style.display === "block") {
        if (partnerStatus === "Advanced" || partnerStatus === "Premier" || partnerStatus === "Premier Plus") {
            emailBody += `\n\nPlease be aware that as a ${partnerStatus} partner, there is a NATS discount included in this quote.`;
        } else {
            emailBody += "\n\nPlease be aware that this opportunity might qualify for NATS discounts. These are only available to advanced and premier partners. If you'd like to discuss improving your partner status with Red Hat, please let us know.";
        }
    }

    if (product === "Red Hat Enterprise Linux (RHEL)" && satelliteAddon === "No") {
        emailBody += "\n\nRed Hat recommends the satellite add-on for any customers running more than 10 RHEL machines. We are more than happy to help you have a discussion with your customer about satellite and its benefits if you would like. It might be worth asking if there are other RHEL machines in the estate that you are unaware of.";
    }

    if (product === "Red Hat Enterprise Linux (RHEL)" && renewalOrNew === "Renewal") {
        emailBody += "\n\nIt might be worth checking with your customer which version of RHEL they are using, as there are many older versions out there that might require extra add-ons to receive support. If this is the case, there may be an opportunity to help them upgrade to a newer version or support them with purchasing the correct RHEL add-on.";
    }

    if (supportLevel === "standard") {
        emailBody += "\n\nPlease note that we recommend premium support for any production systems. Premium support includes both improved SLAs and the EUS add-on. EUS enables a customer to remain supported on minor versions for longer. Depending on the workload, we find that is often a critical requirement to maintain application compatibility.";
    }


    // For demonstration purposes, you can log the email body to the console
    emailDiv.textContent = emailBody;
    console.log(emailBody);

    // You can also use this email body to send an email using a server-side script.
}
