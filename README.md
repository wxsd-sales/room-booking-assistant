# Room Booking Assistant


This demo helps user schedule appointments on a room device and sends notification about the booking through WhatsApp, SMS and call.

<p align="center">
   <a href="https://app.vidcast.io/share/800513b6-14bf-4252-a496-046cdf31d9d3" target="_blank">
       <img src="virtual_assist.png" alt="virtaul-scheduling-assistant-demo"  width="100%" height="100%"/>
    </a>
</p>


## Setup

### Prerequisites & Dependencies: 

- Webex Connect Sandbox - Available to setup here: https://imimobile.com/products/webex-connect/sandbox

### Installation Steps:

### Setup Webex Connect Flow

1. Download the ``31502.workflow`` file from this repo 
2. Create a new Flow on your Webex Connect Sandbox and select the Upload a flow method and use the ``29413.workflow`` file

3. Modify the Webhook and create a new Webex for this Flow and use the following JSON template and parse it:
```js
{
    "number":"+18642xxxxxx",
    "message":"Hello Test",
    "method":"sms"
}
```
4. Select the WhatsApp and SMS nodes and make sure to add the "From Number" field

4. Save the flow changes and click make live.

### Setup Webpage

1. Clone this repository and change directory:

   ```
   git clone https://github.com/wxsd-sales/room-booking-assistant.git
   ```

2. Copy `.env.example` file as `.env`:
   ```
   cp .env.example .env
   ```
3. Add PUBLIC_BACKGROUND_URL and the webhook you got from your Webex Connect flow in your `.env` file
4. Run
   ```
   npm install
   ```
5. Run
   ```
   npm dev run
   ```

  
## Demo

*For more demos & PoCs like this, check out our [Webex Labs site](https://collabtoolbox.cisco.com/webex-labs).


## License

All contents are licensed under the MIT license. Please see [license](LICENSE) for details.


## Disclaimer

Everything included is for demo and Proof of Concept purposes only. Use of the site is solely at your own risk. This site may contain links to third party content, which we do not warrant, endorse, or assume liability for. These demos are for Cisco Webex use cases, but are not Official Cisco Webex Branded demos.


## Questions
Please contact the WXSD team at [wxsd@external.cisco.com](mailto:wxsd@external.cisco.com?subject=room-presets-macro) for questions. Or, if you're a Cisco internal employee, reach out to us on the Webex App via our bot (globalexpert@webex.bot). In the "Engagement Type" field, choose the "API/SDK Proof of Concept Integration Development" option to make sure you reach our team. 

