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


    if (partnerStatus === "Not a Partner") {
        things.push('The partner is currently not a partner. In order to place an order with TDsynnex they must be at least Ready Status. To sign up they need to complete an application <a href="https://redhat.secure.force.com/partner/PartnerAccess" target="_blank">here.</a> In addition they will need to complete 1 x sales accreditation on the <a href="https://training-lms.redhat.com/sso/saml/login/rhopen" target="_blank">training portal.</a> However they wont have acess to this until their status is approved by Red Hat.')
    }

    if (deploymentLocation === "In the Cloud") {
        things.push('The partner has advised the customer plans to run in the cloud. The customer will need to complete <a href="https://www.redhat.com/en/technologies/cloud-computing/cloud-access" target="_blank">Red Hat Cloud Access.</a>')
    }

    if (renewalOrNew === "New") {
        things.push('The partner has advised that this is a new subscription. Please make sure they are aware they can deal reg it.')
    }

    if (NATSMessageDiv.style.display === "block") {
        if (partnerStatus === "Advanced" || partnerStatus === "Premier" || partnerStatus === "Premier Plus") {
            things.push('The partner may have access to NATS discount due to this quote being over 43k and their status being Advanced / Premier. Please complete a co-term calculator when quoting to ensure theyre getting the best price')
        } else {
            things.push('This quote may have access to NATs pricing since it is over 43k. However the partner is only Ready status so does not have access to NATS. This means that they may be uncompetitive on this deal. Please ask them about their desire to improve their partner status.')
        }
    }

    if (product === "Red Hat Enterprise Linux (RHEL)" && satelliteAddon === "No") {
        things.push('This quote is for RHEL but it does not include the satellite Addon. Red Hat recommends satellite for customer with over 10 RHEL machines. Its possibly worth trying to upsell satellite. Dont forget the customer might have machines other than what we are quoting.')
    }

    if (product === "Red Hat Enterprise Linux (RHEL)" && renewalOrNew === "Renewal") {
        things.push('Since this is a renewal it is worth asking the partner which version of RHEL the customer is running. If it is an older version, it may be an opportunity to sell extended support, or provide an introduction to another partner to sell proffessional services.')
    }

    if (product === "Red Hat Enterprise Linux (RHEL)" ) {
        things.push('Since this is a quote for RHEL it is worth ensuring that the partner informs the customer about the free tool - Red Hat Insights. This can often lead to conversations about products which can be upsold later. TDSynnex can provide overviews or demos of insights.')
    }

    if (supportLevel === "standard") {
        things.push('The partner has asked for standard support. You should try to upsell to premium support if they are running these subscriptions in production. Premium support gives better  SLAs, 24/7 support and includes the EUS addon.')
    }

    for (let i = 0; i < things.length; i++) {
        list += `<li>${things[i]}</li>`;
    }

    toDoListDiv.innerHTML = list;
    toDoListDiv.style.display = "block";
    generateEmailDiv.style.display = "block";
}


const generateEmailButton = document.getElementById("generateEmailButton");
const emailDiv = document.getElementById("emailDiv"); 

// Add a click event handler to the button
generateEmailButton.addEventListener("click", function() {
    if (emailDiv.style.display === "none" || emailDiv.style.display === "") {
        emailDiv.style.display = "block"; // Show the element
    } else {
        emailDiv.style.display = "none"; // Hide the element
    }
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

    if (partnerStatus === "Not a Partner") {
        emailBody += '<br><br>xxxxxxxx are currently not showing for me as a Red Hat parnter. In order to place an order for this quote on TDSynnex you would need to be a minimum status of Ready. You can sign up <a href="https://redhat.secure.force.com/partner/PartnerAccess" target="_blank">here,</a> which should take no more than 20 minutes. Once approved by Red Hat should get access to the <a href="https://training-lms.redhat.com/sso/saml/login/rhopen" target="_blank">red hattraining portal,</a> where you need to complete 1xsales accreditation. If you need any help with this or if you would like to speak to a member of our team about accelerating your partner status further, please let me know.';
    }

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
