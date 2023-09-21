import consultants from "./consultants.json";
import axios from "axios";
import {
  PUBLIC_WEBHOOK_URL,
  PUBLIC_CALL_WEBHOOK_URL,
  PUBLIC_DEVICE_ID,
  PUBLIC_BOOKINGS_URL,
  PUBLIC_ACCESS_TOKEN,
} from "$env/static/public";

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

async function call(link, number) {
  const body = {
    phone_number: number,
    message: link,
  };
  console.log(body);
  await axios.post(PUBLIC_CALL_WEBHOOK_URL, body).catch((e) => {
    console.log("Error in sending message:");
    console.log(e);
  });
}

async function roomBooking(startTime, title) {
  const body = {
    deviceId: PUBLIC_DEVICE_ID,
    body: {
      Bookings: [
        {
          Id: "1",
          Number: "rkanthet@cisco.com",
          Organizer: {
            Name: "Rajitha Kantheti",
          },
          Protocol: "Spark",
          MeetingPlatform: "Webex",
          Time: {
            Duration: 60,
            EndTimeBuffer: 50,
            StartTime: startTime,
          },
          Title: title,
        },
      ],
    },
  };
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${PUBLIC_ACCESS_TOKEN}`,
  };
  console.log(body);
  await axios
    .post(PUBLIC_BOOKINGS_URL, body, {
      headers: headers,
    })
    .then((r) => console.log("booking resp", r))
    .catch((e) => {
      console.log("Error in sending message:");
      console.log(e);
    });
}

export { sendMessage, call, roomBooking };
