import React, { Fragment, useState } from "react";
import { AiOutlineFileDone } from "react-icons/ai";
import { usePostData } from "../../hooks/dataApi";

import toast from "react-hot-toast";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import DialogBody from "../../components/button/DialogBody";

const firebaseConfig = {
  apiKey: "AIzaSyDoLHyOX0LV2PV9190R6I3RYEXaOPlGEh4",
  authDomain: "ukilsab-sms.firebaseapp.com",
  projectId: "ukilsab-sms",
  storageBucket: "ukilsab-sms.appspot.com",
  messagingSenderId: "182704194443",
  appId: "1:182704194443:web:17c661b9f836e72fa7a58e",
  measurementId: "G-0C04T57PDE"
};

const DeviceRegister = ({
  path = "/deviceregister/create",
  title = "Device Register",
  action,
}) => {
  const [token, setToken] = useState();
  function requestPermission() {
    //konsole.log("Requesting permission...");
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        //konsole.log("Notification permission granted.");
        const app = initializeApp(firebaseConfig);
        const messaging = getMessaging(app);
        getToken(messaging, {
          vapidKey:
            "BINEGakVxIFh43_tgHhmExpOTtmFPVgp2WEmCFYS6ql0JmUKLOzveHp4OFnYT6aIE5l2rG2MtFxlL8YfHvuL22A",
        }).then((currentToken) => {
          if (currentToken) {
            //konsole.log("currentToken: ", currentToken);
            setToken(currentToken);
          } else {
            //konsole.log("Can not get token");
          }
        });
      } else {
        //konsole.log("Do not have permission!");
      }
    });
  }
  requestPermission();

  const { mutateAsync } = usePostData();

  const onSubmit = async () => {
    var data = new FormData();
    data.append("token", token);
    data.append("deviceName", "Test Device");
    try {
      const { status } = await mutateAsync({
        path: path,
        formData: data,
      });
      if (status === 201) {
        toast.success("Successfully processed!");
      }
    } catch (error) {
      if (error.response) {
        toast.error("Response : " + error.response.data);
      } else if (error.request) {
        toast.error("Request : " + error.message);
      } else {
        toast.error("Error :", error.message);
      }
    } finally {
      action();
      closeModal();
    }
  };

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button
        className="btn-success w-24 md:w-72 h-10 flex align-middle space-x-2"
        onClick={() => {
          openModal();
        }}
      >
        <span>
          <AiOutlineFileDone size={24} />
        </span>
        <div className="hidden md:block">{title}</div>
      </button>
      <DialogBody
        closeModal={closeModal}
        isOpen={isOpen}
        onSubmit={onSubmit}
        bodyText=" Are you update your token ?"
      />
    </>
  );
};

export default DeviceRegister;
