import consultants from "./consultants.json";
import axios from "axios";
function getConsultantDetails(name) {
  let obj = consultants.consultants.find((o) => o.name === name);
  return { email: obj.email, phone: obj.phone };
}

async function getLinks(sip, timeInSec, hostPhone, guestPhone, notification) {
  setTimeout(() => {
    const body = {
      expire_hours: 2,
      sip_target: sip,
      version: 2,
      background_url:
        "https://cdn.glitch.global/9d61d6d3-fe2d-454a-8661-2a5ac9778baa/drs_bg.png?v=1689857064033",
      auto_dial: true,
    };
    axios
      .post("https://wxsd.wbx.ninja/create_url", body)
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
        console.log("URL reation error:");
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
  await axios
    .post("https://hooks.us.webexconnect.io/events/M00X1SNUX0", body)
    .catch((e) => {
      console.log("Error in sending message:");
      console.log(e);
    });
}

export { getConsultantDetails, getLinks };
