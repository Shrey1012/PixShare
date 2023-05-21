import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import jwtDecode from "jwt-decode";
import {client} from "../client";

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleResponse = (response) => {
    const cred = jwtDecode(response.credential);

    localStorage.setItem("user", JSON.stringify(cred));

    const { sub, name, picture } = cred;

    const doc = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    }

    client.createIfNotExists(doc)
    .then(() => {
      navigate("/", { replace: true });
    })

  }

  useEffect(() => {
   /*global google*/
    google.accounts.id.initialize({
      client_id : process.env.REACT_APP_GOOGLE_API_TOKEN,
      callback: handleGoogleResponse,
      cookie_policy: "single_host_origin",
    });

    google.accounts.id.renderButton(document.getElementById("g-button"), {
      theme: "outline",
      size: "large",
      shape: "rectangular",
    });
  }, []);
  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay ">
          <div className="p-5">
          <img src={logo} alt="logo" width="130px" />
        </div>
        <div className="shadow-2xl">
          <button id="g-button">
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
