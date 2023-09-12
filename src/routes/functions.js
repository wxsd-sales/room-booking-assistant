import consultants from "./consultants.json";
import axios from "axios";
import {
  PUBLIC_BACKGROUND_URL,
  PUBLIC_CREATE_URL,
  PUBLIC_WEBHOOK_URL,
} from "$env/static/public";
function getConsultantDetails(name) {
  let obj = consultants.consultants.find((o) => o.name === name);
  return { email: obj.email, phone: obj.phone };
}

async function getLinks(sip, timeInSec, hostPhone, guestPhone, notification) {
  setTimeout(() => {
    console.log(sip);
    const body = {
      expire_hours: 2,
      sip_target: sip,
      version: 2,
      background_url: PUBLIC_BACKGROUND_URL,
    };
    axios
      .post(PUBLIC_CREATE_URL, body)
      .then((response) => {
        const { data } = response;
        var hostLink = data.urls.Licensed[0];
        var guestLink = data.urls.Guest[0];
        guestLink = guestLink.replace("guest", "hidden");
        console.log(guestLink);
        if (notification.toLowerCase() === "whatsapp") {
          sendMessage(hostLink, hostPhone, "whatsapp");
          sendMessage(guestLink, guestPhone, "whatsapp");
        } else if (notification.toLowerCase() === "sms") {
          sendMessage(hostLink, hostPhone, "sms");
          sendMessage(guestLink, guestPhone, "sms");
        }
      })
      .catch((e) => {
        console.log("URL creation error:");
        console.log(e);
      });
  }, timeInSec * 1000);
}

async function sendMessage(link, number, method) {
  const body = {
    number: number,
    message: link,
    method: method,
  };
  console.log(body);
  await axios.post(PUBLIC_WEBHOOK_URL, body).catch((e) => {
    console.log("Error in sending message:");
    console.log(e);
  });
}

export { getConsultantDetails, getLinks };
