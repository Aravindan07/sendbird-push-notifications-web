import SendBird from "sendbird";
import { initializeApp } from "firebase/app";
import { getMessaging, onMessage, getToken } from "firebase/messaging";
import { firebaseConfig } from "./firebaseConfig";
import { initializeApp } from "firebase/app";

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging();

const appId = "480C8E8F-BF7B-4EFF-810B-2209D40E0881";
const userId = "User1";
const vapidKey =
  "BDldD8F0RziVdVCcLLbnUAd_muB1MHUaZXXO6bgiRF57dwee0CvgFW6wWFtPhr-hPxhNbA5-SBEmTR8PeA2x4QE";

const sb = new SendBird({ appId });

sb.connect(userId, (user, error) => {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      getToken(messaging, { vapidKey })
        .then((currentToken) => {
          if (currentToken) {
            sb.registerGCMPushTokenForCurrentUser(
              currentToken,
              (response, error) => {
                if (error) console.log(error);
                console.log("Token Registered:", currentToken);
              }
            );
          }
        })
        .catch((err) => {
          console.log("An error occurred while retrieving token. ", err);
        });
    } else {
      console.log("Unable to get permission to notify.");
    }
  });
});

//Register your service worker.
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register(new URL("../firebase-messaging-sw.js", import.meta.url), {
      type: "module",
    })
    .then(
      function (response) {
        // Service worker registration done
        console.log("Registration Successful", response);
      },
      function (error) {
        // Service worker registration failed
        console.log("Registration Failed", error);
      }
    );
}

// const ChannelHandler = new sb.ChannelHandler();

// ChannelHandler.onMessageReceived = function (channel, message) {
//   // Consider calling the Notification service from here.
// };

// sb.addChannelHandler(UNIQUE_HANDLER_ID, ChannelHandler);

onMessage(messaging, (payload) => {
  console.log("Notification received!", payload);
});
