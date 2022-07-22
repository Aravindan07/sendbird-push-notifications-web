import { initializeApp } from "firebase/app";
import { onMessage } from "firebase/messaging";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";

/*
Go to firebase console.
Click on settings cog
Under General click Add App if not done so. Choose Webapp.
Provide a name and register.
You should now see the credentials required below.
 */

const firebaseConfig = {
  apiKey: "AIzaSyDRpA2oW4jWCCgT-EPbKiCgwpXUxTnIiXg",
  authDomain: "sendbird-web-push-test.firebaseapp.com",
  projectId: "sendbird-web-push-test",
  storageBucket: "sendbird-web-push-test.appspot.com",
  messagingSenderId: "874581382936",
  appId: "1:874581382936:web:0cf30342829f07609eb06d",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const messaging = getMessaging(firebaseApp);

onBackgroundMessage(messaging, (payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  // Customize notification here
  const notificationTitle = payload.data.message;
  const notificationOptions = {
    body: "hello guys",
  };
  self.registration
    .showNotification(notificationTitle, notificationOptions)
    .then(() => {
      console.log("notificationTitle", notificationTitle);
      console.log("Notification Complete");
    })
    .catch((error) => {
      console.log(error);
    });
});

onMessage(messaging, (payload) => {
  console.log("[firebase-messaging-sw.js] Received message ", payload);

  // Customize notification here
  const notificationTitle = payload.data.message;
  const notificationOptions = {
    body: "hello guys",
  };
  self.registration
    .showNotification(notificationTitle, notificationOptions)
    .then(() => {
      console.log("notificationTitle", notificationTitle);
      console.log("Notification Complete");
    })
    .catch((error) => {
      console.log(error);
    });
});
