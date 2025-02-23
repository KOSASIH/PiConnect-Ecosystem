# PiConnect Ecosystem - E-Commerce Integration Example

This document provides an example of how to integrate the PiConnect Ecosystem with e-commerce platforms. The integration allows e-commerce businesses to facilitate charitable donations directly through their checkout process, enhancing customer engagement and supporting charitable causes.

## Overview

Integrating the PiConnect Ecosystem with an e-commerce platform involves the following key steps:

1. **API Integration**: Utilize the PiConnect API to handle donation requests.
2. **Frontend Modifications**: Update the e-commerce frontend to include donation options during the checkout process.
3. **Webhook Setup**: Implement webhooks to receive notifications about donation status and updates.

## Step 1: API Integration

### 1.1. Set Up API Access

To interact with the PiConnect API, you need to obtain an API key. This key will be used to authenticate requests made from your e-commerce platform.

1. Register your e-commerce application with the PiConnect Ecosystem.
2. Obtain your API key from the PiConnect developer portal.

### 1.2. Making Donation Requests

When a customer opts to make a donation during checkout, your e-commerce platform should send a POST request to the PiConnect API to process the donation.

**Example Request**:

```javascript
const donationData = {
    amount: 10.00, // Amount to donate
    charityId: 'charity123', // ID of the selected charity
    userId: 'user123', // ID of the user making the donation
};

fetch('https://api.piconnect.org/donations', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer YOUR_API_KEY`,
    },
    body: JSON.stringify(donationData),
})
.then(response => response.json())
.then(data => {
    console.log('Donation successful:', data);
})
.catch(error => {
    console.error('Error processing donation:', error);
});
```

## Step 2: Frontend Modifications

### 2.1. Update Checkout Page

Modify your e-commerce platform's checkout page to include an option for customers to make a donation. This can be a checkbox or a dropdown menu where users can select a charity and specify the donation amount.

**Example UI Component**:

```html
<div>
    <h3>Make a Donation</h3>
    <label>
        <input type="checkbox" id="donateCheckbox" />
        I would like to donate to a charity
    </label>
    <div id="donationDetails" style="display: none;">
        <select id="charitySelect">
            <option value="charity123">Charity Name 1</option>
            <option value="charity456">Charity Name 2</option>
        </select>
        <input type="number" id="donationAmount" placeholder="Amount" />
    </div>
</div>

<script>
    document.getElementById('donateCheckbox').addEventListener('change', function() {
        document.getElementById('donationDetails').style.display = this.checked ? 'block' : 'none';
    });
</script>
```

### 2.2. Handle Donation Submission

When the customer submits the checkout form, include the donation data in the request to the PiConnect API as shown in Step 1.2.

## Step 3: Webhook Setup

### 3.1. Implement Webhooks

To receive real-time updates about donation statuses, set up webhooks in your e-commerce platform. The PiConnect Ecosystem can send notifications to your specified endpoint whenever a donation is processed or updated.

**Example Webhook Endpoint**:

```javascript
app.post('/webhooks/donations', (req, res) => {
    const donationData = req.body;

    // Handle the donation update (e.g., update order status, notify user)
    console.log('Donation update received:', donationData);

    res.status(200).send('Webhook received');
});
```

### 3.2. Register Webhook URL

Register your webhook URL with the PiConnect Ecosystem through the developer portal or API. Ensure that your endpoint is publicly accessible and can handle incoming POST requests.

## Conclusion

Integrating the PiConnect Ecosystem with your e-commerce platform allows you to offer customers the opportunity to support charitable causes during their shopping experience. By following the steps outlined in this document, you can successfully implement donation functionality and enhance your platform's social impact.

For further assistance or questions regarding the integration process, please reach out to the PiConnect support team.
