"use client";
import React, { useEffect, useRef, useState, useCallback,useLayoutEffect } from "react";
import styles from "@/Styles/Chat.module.css";
import Language from "@/public/Chat/language.png";
import CloseCircle from "@/public/Chat/CloseCircle.png";
import Mic from "@/public/Chat/Mic.png";
import Refresh from "@/public/Chat/Refresh.png";
import RecordButton from "@/public/Chat/Record.png";
import Pin from "@/public/Chat/Pin.png";
import sent from "@/public/Chat/sent.webp";
import default_image from "@/public/Chat/default_Image.jpg";
import Image from "next/image";
import API from "@/app/api";
import UseSpeechToText from "../useSpeechToText";
import LoadingAnimation from "../Animations/LoadingAnimations";
import AudioElevenAnalyzer from "./AudioElevenAnalyzer";

const Chatbot = () => {
  const languageRef = useRef();
  const divRef=useRef(null);
  const [newMessage, setNewMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [influencerDetails, setInfluencerDetails] = useState({});
  const [languages, setLanguages] = useState([]);
  const [audio, setAudio] = useState(null);
  const [elevenAudio, setElevenAudio] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [validation, setValidation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [handleEmptyText, setHandleEmptyText] = useState(false);
  const { isListening, transcript, startListening, stopListening } =
    UseSpeechToText({ continuous: true });

  const authToken = localStorage.getItem("token");
  const influencer = "65f91744da497c8e1086c8af";

  useEffect(() => {
    setTextInput(transcript);
    console.log(textInput);
  }, [transcript]);

  const handleCancelButtonClick = () => {
    setIsChatOpen(true);
  };

  
  const elevenLabs = useCallback(
    (apiResponse) => {
      setIsLoading(true);
      console.log("this is elevenlabs: " + apiResponse.answer);
      fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${apiResponse.voiceId}/stream`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "xi-api-key": "30db19d4fc2dfc7942bce8f1ed0e2fda",
          }, 
          body: JSON.stringify({
            model_id: "eleven_multilingual_v2",
            text: apiResponse.answer,
            // voice_settings: {
            //   stability: 1,
            //   similarity_boost: 1.0,
            //   style: 1.0,
            //   use_speaker_boost: true,
            // },
          }),
        }
      )
        .then((response) => {
          if (!response.body) {
            throw new Error("ReadableStream not supported!");
          }
          return response.body;
        })
        .then((stream) => {
          console.log("first time stream");
          console.log(stream);
          playStreamingAudio(stream);
        })
        .catch((error) => {
          setIsLoading(false);
          console.error("Error calling API:", error);
        })
        .finally(() => {
          setIsLoading(false);
          setHandleEmptyText(false);
        });
    },
    [setIsLoading]
  );

  const playStreamingAudio = async (stream) => {
    const audio = new Audio();
    const mediaSource = new MediaSource();
    audio.src = URL.createObjectURL(mediaSource);

    let sourceBuffer;
    let bufferQueue = [];
    let previousBuffer;
    const chunkSize = 256;

    mediaSource.addEventListener("sourceopen", () => {
      sourceBuffer = mediaSource.addSourceBuffer("audio/mpeg");
      sourceBuffer.mode = "sequence";
      const reader = stream.getReader();

      const readChunk = async () => {
        const { value, done } = await reader.read();
        if (done) {
          mediaSource.endOfStream();
          return;
        }

        // Split the chunk into smaller chunks of size 'chunkSize'
        for (let i = 0; i < value.length; i += chunkSize) {
          const chunk = value.slice(i, i + chunkSize);
          bufferQueue.push(chunk);
        }

        if (!sourceBuffer.updating) {
          appendNextChunk();
        }
      };

      const appendNextChunk = () => {
        if (bufferQueue.length > 0) {
          if (!sourceBuffer.updating) {
            previousBuffer = bufferQueue.shift();
            sourceBuffer.appendBuffer(previousBuffer);
            console.log("appendNextChunk");
          }
        } else {
          readChunk();
        }
      };

      sourceBuffer.addEventListener("updateend", () => {
        setElevenAudio(audio);
        appendNextChunk();
      });

      audio.addEventListener("ended", () => {
        setValidation(false);
      });

      readChunk();
    });

    mediaSource.addEventListener("sourceended", () => {
      console.log("MediaSource has ended");
    });

    mediaSource.addEventListener("sourceclose", () => {
      console.log("MediaSource is closed");
    });

    audio.play().catch((error) => console.error("Error playing audio:", error));
  };

  const handleChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSubmitText = async (e) => {
    if (chatMessages.length >= 5) {
      window.alert("No more free trials");
      e.preventDefault();
      setNewMessage("");
    } else {
      setValidation(true);
      e.preventDefault();
      const message = newMessage;
      setNewMessage("");

      const message_object = {
        question: message,
        answer: "...",
      };

      setChatMessages([...chatMessages, message_object]);

      console.log("Message is: ", message);
      //Construct the request body

      const formData = new FormData();
      formData.set("influencerId", influencer);
      formData.set("questions", message);

      try {
        const response = await API.postAPICalling(
          "/users/askQuestionByLanguageNew",
          formData,
          authToken
        );
        setChatMessages([...chatMessages, response]);
        elevenLabs(response);
        setValidation(false);
        console.log(response);
      } catch (error) {
        console.log("Error : ", error);
      }
    }
  };

  const handleGetLanguages = async () => {
    if (!isVisible) {
      setIsVisible(true);
      try {
        const response = await API.getAPICalling(
          "/users/getAllLanguage",
          authToken
        );
        setLanguages(response);
        console.log(response);
      } catch (error) {
        console.log("Error: ", error);
      }
    } else {
      setIsVisible(false);
    }
  };

  const handleChangeLanguage = async (language, code) => {
    const data = {
      influencerId: influencer,
      language: language,
      code: code,
    };
    try {
      const response = await API.postAPICalling(
        "/users/updateLanguage",
        data,
        authToken
      );
      console.log(response);
      setIsVisible(false);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleMicButtonClick = () => {
    setIsChatOpen(false);
    setAudio(1);
    setElevenAudio(null);
    startListening();
  };

  const handleStopRecording = () => {
    setAudio(null);
    stopListening();
  };

  const handleCallApi = useCallback(async () => {
    setAudio(null);
    setValidation(true);
    setIsLoading(true);

    // SpeechRecognition.stopListening();
    // stopRecording();
    stopListening();
    console.log("StopListening Reached");
    // const messageToSendFromAudio = transcript.trim();
    if (textInput) {
      const message_object = {
        question: textInput,
        answer: "...",
      };

      setChatMessages([...chatMessages, message_object]);

      console.log("Message is: ", textInput);
      //Construct the request body

      const formData = new FormData();
      formData.set("influencerId", influencer);
      formData.set("questions", textInput);

      try {
        const response = await API.postAPICalling(
          "/users/askQuestionByLanguageNew",
          formData,
          authToken
        );
        elevenLabs(response);
        setChatMessages([...chatMessages, response]);
        
        setValidation(false);
        console.log(response);
      } catch (error) {
        console.log("Error : ", error);
      }
      // Reset the transcript after sending the message
      // resetTranscript();
    }
  }, [
    transcript,
    setAudio,
    setIsLoading,
    setHandleEmptyText,
    setChatMessages,
    // resetTranscript,
  ]);

  useEffect(() => {
    let timeoutId;
    if (isListening) {
      console.log("Speech recognition started...");
    } else {
      console.log("No voice detected.");
      // Set a timeout to stop listening after 1000 milliseconds (1.0 seconds)
      timeoutId = setTimeout(() => {
        if (stopListening) {
          // const messageToSendFromAudio = transcript.trim();
          console.log("Handleapicalled: transcript: ", textInput);
          if (textInput) {
            handleCallApi();
          } else {
            setAudio(null);
            setHandleEmptyText(true);
          }
        }
      }, 1000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isListening, transcript, setHandleEmptyText]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.getAPICalling(
          `/users/getChatMessagesNew?influencerId=${influencer}&page=1&limit=20`,
          authToken
        );
        setInfluencerDetails(response.influencerDetails);
        setChatMessages(response.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, []);




  return (
    <>
      {isChatOpen ? (
        <div className={styles.chatbot_container}>
          <div className={styles.top_container}>
            <div className={styles.left_items}>
              <h1> &lt; </h1>
              <div>
                <Image
                  src={
                    influencerDetails.avatarImageUrl
                      ? influencerDetails.avatarImageUrl
                      : default_image
                  }
                  className={styles.influencerImage}
                  width={30}
                  height={20}
                />
                {/* PC */}
              </div>
              <div className="font-bold">
                {influencerDetails && influencerDetails.userName}
              </div>
            </div>
            <button onClick={handleGetLanguages}>
              <div className={styles.language_image}>
                <Image src={Language} alt="Language selector button image" />
              </div>
            </button>
          </div>
          <div className={styles.main_container}>
            <div ref={divRef} className={styles.text_container}>
              {chatMessages &&
                chatMessages.map((message, index) => (
                  <>
                    <div className={`chat-message user`}>
                      {message.question}
                    </div>
                    <div className={`chat-message bot`}>{message.answer}</div>
                  </>
                ))}
            </div>
          </div>
          <form
            onSubmit={
              newMessage.trim("").length
                ? handleSubmitText
                : handleMicButtonClick
            }
          >
            <div className={styles.bottom_container}>
              <div className={styles.pin_image}>
                <Image src={Pin} width={30} height={30} />
              </div>
              <div className={styles.text_input}>
                <input
                  type="text"
                  value={newMessage}
                  name="newMessage"
                  onChange={handleChange}
                  placeholder="Message..."
                />
              </div>
              <div className={styles.internet_image}>
                <button type="submit" disabled={validation}>
                  <Image
                    src={newMessage.trim("").length ? sent : RecordButton}
                    width={50}
                    height={50}
                  />
                </button>
              </div>
            </div>
          </form>
          {isVisible && (
            <div ref={languageRef} className={styles.language_box}>
              <h1>Choose Your Language</h1>
              {languages.map((language, index) => (
                <button
                  key={index}
                  onClick={() =>
                    handleChangeLanguage(language.language, language.code)
                  }
                >
                  {language.language}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className={styles.audio_input_container}>
          <div className={styles.visualizer}>
            {!audio && !elevenAudio && !isLoading && handleEmptyText && (
              <div className="d-flex justify-center align-center text-center pt-5 text-white  font-serif flex-col p-3">
                {" "}
                <p className="text-4xl font-serif m-0">Oops!</p>
                <span className="font-serif text-l">
                  Voice not detect please tap on Re-load button to start
                  listening...
                </span>
              </div>
            )}
            {audio && (
              <div className={styles.user_voice_listening}>
                <p>LISTENING...</p>
              </div>
            )}
            {isLoading && <LoadingAnimation />}
            {elevenAudio && (
              <AudioElevenAnalyzer
              setValidation={setValidation}
              handleMicButtonClick={handleMicButtonClick}
              audio={elevenAudio}
            />
            )}
          </div>
          <div className={styles.control_box}>
            {/* <p>0:10</p> */}
            <div className={styles.controller_button_container}>
              <div className={styles.refresh}>
                <button onClick={handleMicButtonClick}>
                  <Image src={Refresh} alt="refresh image" />
                </button>
              </div>
              <div className={styles.mic_container}>
                <div className={styles.mic}>
                  <button onClick={handleStopRecording}>
                    <Image src={Mic} alt="Mic image" />
                  </button>
                </div>
              </div>
              <div onClick={handleCancelButtonClick} className={styles.cross}>
                <button>
                  <Image src={CloseCircle} alt="Cross image" />
                </button>
              </div>
            </div>
            <h1>{isListening && "Tap to stop recording"}</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
