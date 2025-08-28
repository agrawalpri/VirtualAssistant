import React, { use, useContext, useEffect, useRef, useState } from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { get } from "mongoose";
import aiImg from "../assets/ai.gif";
import userImg from "../assets/user.gif";
import { CgMenuMotion } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";

function Home() {
  const { userData, serverUrl, setUserData, getGeminiResponse } =
    useContext(UserDataContext);
  const navigate = useNavigate();

  const [listening, setListening] = useState(false);
  const [userText, setUserText] = useState("");
  const [aiText, setAiText] = useState("");
  const isSpeakingRef = useRef(false);
  const recognitionRef = useRef(null);
  const [ham, setHam] = useState(false);
  const isRecognisingRef = useRef(false);
  const synth = window.speechSynthesis;
  const handleLogout = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      setUserData(null);
      navigate("/signin");
    } catch (error) {
      setUserData(null);
      console.error("Error during logout:", error);
    }
  };

  const startRecognition = () => {
    if (!isSpeakingRef.current && !recognitionRef.current) {
      try {
        recognitionRef.current?.start();
        setListening(true);
      } catch (error) {
        if (error.message.includes("start")) {
          console.error(" recognition error:", error);
        }
      }
    }
  };
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "hi-IN";
    const voices = synth.getVoices();
    const hindiVoice = voices.find((v) => v.lang === "hi-IN");
    if (hindiVoice) {
      utterance.voice = hindiVoice;
    }
    isSpeakingRef.current = true;
    utterance.onend = () => {
      setAiText("");
      isSpeakingRef.current = false;
      setTimeout(() => {
        startRecognition(); //deleay before restarting recognition it avoids race condition
      }, 800);
    };
    synth.cancel(); // Cancel any ongoing speech
    synth.speak(utterance);
  };

  const handleCommand = (data) => {
    const { type, userInput, response } = data;
    speak(response);
    if (type === "google_search") {
      const query = encodeURIComponent(userInput);
      window.open(`https://www.google.com/search?q=${query}`, "_blank");
    }
    if (type === "youtube_search" || type === "youtube_play") {
      const query = encodeURIComponent(userInput);
      window.open(
        `https://www.youtube.com/results?search_query=${query}`,
        "_blank"
      );
    }
    if (type === "open_instagram") {
      const query = userInput.split(" ").pop();
      window.open(`https://www.instagram.com/${query}`, "_blank");
    }
    if (type === "open_facebook") {
      const query = userInput.split(" ").pop();
      window.open(`https://www.facebook.com/${query}`, "_blank");
    }
    if (type === "open_calculator") {
      window.open(
        `https://www.calculator.net/scientific-calculator.html`,
        "_blank"
      );
    }
    if (type === "open_whatsapp") {
      window.open(`https://web.whatsapp.com/`, "_blank");
    }
    if (type === "open_telegram") {
      window.open(`https://web.telegram.org/`, "_blank");
    }
    if (type === "weather_show") {
      window.open(`https://www.google.com/search?q=weather`, "_blank");
    }
  };
  useEffect(() => {
    const speechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new speechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";
    recognitionRef.current = recognition;

    let isMounted = true; // To track if the component is still mounted
    const startTimeout = setTimeout(() => {
      if (isMounted && !isSpeakingRef.current && !isRecognisingRef.current) {
        try {
          recognition.start();
          console.log("Recognition requested to start after timeout");
        } catch (error) {
          if (error.name !== "InvalidStateError") {
            console.error("Error starting recognition:", error);
          }
        }
        // startRecognition();
      }
    }, 1000); // Initial delay before starting recognition

    // const isRecognisingRef = { current: false };

    // const safeRecognition = () => {
    //   if (!isSpeakingRef.current && !isRecognisingRef.current) {
    //     try {
    //       recognition.start();
    //       isRecognisingRef.current = true;
    //       console.log("Recognition request started");
    //     } catch (error) {
    //       if (error.name !== "InvalidStateError") {
    //         console.error("Error starting recognition:", error);
    //       }
    //     }
    //   }
    // };
    recognition.onstart = () => {
      console.log("Recognition Started");
      isRecognisingRef.current = true;
      setListening(true);
    };
    recognition.onend = () => {
      console.log("Recognition Ended");
      isRecognisingRef.current = false;

      setListening(false);
      if (isMounted && !isSpeakingRef.current) {
        setTimeout(() => {
          if (isMounted) {
            try {
              recognition.start();
              console.log("Recognition restarted");
            } catch (error) {
              if (error.name !== "InvalidStateError") {
                console.error("Error restarting recognition:", error);
              }
            }
          }
        }, 1000);
      }
    };
    // Restart recognition after a short delay to avoid rapid restarts
    // if (!isSpeakingRef.current) {
    //   setTimeout(() => {
    //     safeRecognition();
    //   }, 1000); //delay loop to avoid rapid restarts
    // }

    recognition.onerror = (event) => {
      console.warn("Recognition error:", event.error);
      isRecognisingRef.current = false;
      setListening(false);
      if (event.error === "aborted" && isMounted && !isSpeakingRef.current) {
        setTimeout(() => {
          if (isMounted) {
            try {
              recognition.start();
              console.log("Recognition restarted after abort");
            } catch (error) {
              if (error.name !== "InvalidStateError") {
                console.error("Error restarting recognition:", error);
              }
            }
          }
        }, 1000);
      }
    };
    recognition.onresult = async (e) => {
      // console.log(e);
      const transcript = e.results[e.results.length - 1][0].transcript.trim();
      // const data = await getGeminiResponse(transcript);
      console.log("User said:" + transcript);
      if (
        transcript.toLowerCase().includes(userData.assistantName.toLowerCase())
      ) {
        setAiText("");
        setUserText(transcript);

        recognition.stop();
        isRecognisingRef.current = false;
        setListening(false);
        const data = await getGeminiResponse(transcript);
        console.log(data);
        handleCommand(data);
        setAiText(data.response);
        setUserText("");
      }
    };
    // const fallback = setInterval(() => {
    //   if (!isSpeakingRef.current && !isRecognisingRef.current) {
    //     safeRecognition();
    //   }
    // }, 10000);
    // safeRecognition();
    // window.speechSynthesis.onvoiceschanged = () => {
    const greeting = new SpeechSynthesisUtterance(
      `Hello ${userData.name}, what can i help you with?`
    );
    greeting.lang = "hi-IN";
    window.speechSynthesis.speak(greeting);
    // };
    return () => {
      isMounted = false;
      clearTimeout(startTimeout);
      recognition.stop();
      setListening(false);
      isRecognisingRef.current = false;
      // clearInterval(fallback);
    };
    // recognition.start();
  }, []);

  return (
    <div className="w-full  h-[100vh]  bg-gradient-to-t from-[black] to-[#02023d] flex justify-center items-center  flex-col  gap-[15px]">
      <CgMenuMotion
        className="lg:hidden text-white absolute top-[20px] right-[20px] w-[25px] h-[25px] cursor-pointer"
        onClick={() => {
          setHam(true);
        }}
      />
      <div
        className={`absolute top-0 w-full h-full bg-[#00000005] backdrop-blur-lg p-[20px] flex flex-col gap-[20px] items-start ${
          ham ? "translate-x-0" : "translate-x-[100%] "
        } transition-transform `}
      >
        <RxCross2
          className=" text-white absolute top-[20px] right-[20px] w-[25px] h-[25px] cursor-pointer"
          onClick={() => {
            setHam(false);
          }}
        />
        <button
          className="w-[180px] h-[45px]  bg-white rounded-full text-black font-semibold text-[13px] hover:bg-blue-400 transition-all duration-300  top-[20px] cursor-pointer"
          onClick={() => navigate("/customize")}
        >
          Customize your Assistant
        </button>
        <button
          className="w-[180px] h-[45px]  bg-white rounded-full text-black font-semibold text-[13px] hover:bg-blue-400 transition-all duration-300  top-[20px]  cursor-pointer"
          onClick={handleLogout}
        >
          Log Out
        </button>
        <div className="w-full h-[2px] bg-gray-400"></div>
        <h1 className="text-white font-semibold text-2xl">History</h1>
        <div className="w-full h-[60%] overlow-auto flex-col gap-[20px] overflow-y-auto ">
          {userData.history?.map((his) => (
            <span className=" text-gray-200 text-[18px] font-semibold truncate block mt-2 ">
              {" "}
              {his}
            </span>
          ))}
        </div>
      </div>

      <button
        className="min-w-[150px] h-[55px] mt-[30px] bg-white rounded-full text-black font-semibold text-[19px] hover:bg-blue-400 transition-all duration-300 absolute hidden lg:block top-[20px] right-[20px] cursor-pointer"
        onClick={() => navigate("/customize")}
      >
        Customize your Assistant
      </button>
      <button
        className="min-w-[150px] h-[55px] mt-[30px] px-[20px] py-[20px] bg-white rounded-full text-black font-semibold text-[19px] hover:bg-blue-400 transition-all duration-300 absolute hidden lg:block top-[100px] right-[20px] cursor-pointer"
        onClick={handleLogout}
      >
        Log Out
      </button>

      <div className=" w-[250px] h-[300px] flex justify-center items-center overflow-hidden rounded-4xl shadow-2xl shadow-blue-950">
        <img
          src={userData?.assistantImage}
          alt=""
          className="h-full object-cover"
        />
      </div>
      <h1 className="text-white text-2xl font-semibold">
        I'm {userData.assistantName}
      </h1>
      {!aiText && <img src={userImg} alt="" className="w-[200px]" />}
      {aiText && <img src={aiImg} alt="" className="w-[200px]" />}
      <h1 className="text-white text-[17px] ont-bold text-wrap ">
        {userText ? userText : aiText ? aiText : null}
      </h1>
    </div>
  );
}

export default Home;
