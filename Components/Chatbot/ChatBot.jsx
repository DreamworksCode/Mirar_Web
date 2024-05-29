"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
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
import Loader from "../Animations/Loader";
import German from "@/public/Country_Flag/German@3x.png";
import Turkish from "@/public/Country_Flag/turkish@3x.png";
import Polish from "@/public/Country_Flag/polish@3x.png";
import Romanian from "@/public/Country_Flag/romanian@3x.png";
import Malay from "@/public/Country_Flag/malay@3x.png";
import Japanese from "@/public/Country_Flag/japanese@3x.png";
import Chinese from "@/public/Country_Flag/China@3x.png";
import Hindi from "@/public/Country_Flag/hindi@3x.png";
import French from "@/public/Country_Flag/french@3x.png";
import Spanish from "@/public/Country_Flag/spain@3x.png";
import Swedish from "@/public/Country_Flag/swedish@3x.png";
import Arabic from "@/public/Country_Flag/arabic@3x.png";
import Czech from "@/public/Country_Flag/czech@3x.png";
import Greek from "@/public/Country_Flag/greek@3x.png";
import Danish from "@/public/Country_Flag/danish@3x.png";
import English from "@/public/Country_Flag/english us@3x.png";
import Korean from "@/public/Country_Flag/korean@3x.png";
import Portuguese from "@/public/Country_Flag/Prtugese@3x.png";
import Indonesian from "@/public/Country_Flag/indonesian@3x.png";
import Finnish from "@/public/Country_Flag/finnish@3x.png";
import Slovak from "@/public/Country_Flag/slovak@3x.png";
import Italian from "@/public/Country_Flag/italian@3x.png";
import Dutch from "@/public/Country_Flag/dutch@3x.png";
import Croatian from "@/public/Country_Flag/croatia@3x.png";
import File from "@/public/Chat/file_image2.png";
import ProfileCover from "@/public/Chat/profile_cover_image.webp";
import Link from "next/link";
import Back from "@/public/Chat/Back3x.png";
import Cross from "@/public/Chat/cross4.png";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Mobile_Navbar from "../Navbar/Mobile_Navbar";
import { decoders } from "audio-decode";

//some visualizer content
let audioContext;
let streamReader;
let gainNode;

const BUFFER_SIZE = 5; // Adjust the buffer size as needed
let audioBufferQueue = []; // Queue to store audio buffers
let isPlaying = false; // Flag to track if audio is currently playing
let startTime = 0;
var flag=false;
let offset = 0;

const Chatbot = () => {
  const languageRef = useRef();
  const inputRef = useRef(null);
  const divRef = useRef(null);
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
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [handleEmptyText, setHandleEmptyText] = useState(false);
  const [isChatLoaded, setIsChatLoaded] = useState(false);
  const [isLanguagesLoaded, setIsLanguagesLoaded] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [influencer, setInfluencer] = useState(null);
  const [file, setFile] = useState(null);
  const [isAuthToken, setIsAuthToken] = useState(false);
  const [isInfluencer, setIsInfluencer] = useState(false);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { isListening, transcript, startListening, stopListening } =
    UseSpeechToText({ continuous: true });
  const [content, setContent] = useState("Initial content");
  const [check, setCheck] = useState(false);
  const [device, setDevice] = useState(false);
  const [audioData, setAudioData] = useState(new Uint8Array());
  // const [flag,setFlag]=useState(false);
  // const flagSetter=(value)=>{
  //   flag=value;
  //   return flag;
  // }
  function flagSetter(value){
    flag=value;
    return flag;
  }
  useEffect(() => {
    const item = localStorage.getItem("token");
    setAuthToken(item);
    const user = localStorage.getItem("influencer");
    setInfluencer(user);
    if (item !== null || user !== null) {
      const fetchData = async () => {
        try {
          console.log("FetchData reached");
          const response = await API.getAPICalling(
            `/users/getChatMessagesNew?influencerId=${user}&page=1&limit=20`,
            item
          );
          setInfluencerDetails(response.influencerDetails);
          setChatMessages(response.data);
          setIsChatLoaded(true);
          setIsAuthToken(true);
          setIsInfluencer(true);
          console.log(response);
          let timeout = setTimeout(() => {
            setIsPageLoading(false);
          }, 500);
          return () => {
            clearTimeout(timeout);
          };
        } catch (error) {
          // setIsChatLoaded(true);
          console.log(error.message);
          if (error.message === "Unauthorized") {
            // setIsAuthToken(false);
            setIsInfluencer(true);
          } else if (error.message === "Invalid influencerId not found") {
            // setIsInfluencer(false);
            setIsAuthToken(true);
          }
          let timeout = setTimeout(() => {
            setIsPageLoading(false);
          }, 500);
          return () => {
            clearTimeout(timeout);
          };
          // localStorage.removeItem('influencer');
        }
      };
      fetchData();
    } else {
      setIsPageLoading(false);
    }
  }, []);

  useEffect(() => {
    setTextInput(transcript);
    console.log(textInput);
  }, [transcript]);

  useEffect(() => {
    logContent(`Platform is ${isiOS() ? "iOS" : "Not iOS"}`);
    const item=isiOS();
    setDevice(item);
    loadDecoders();
  }, []);

  const isiOS = () => {
    var iosQuirkPresent = function () {
      var audio = new Audio();

      audio.volume = 0.5;
      return audio.volume === 1; // volume cannot be changed from "1" on iOS 12 and below
    };

    var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    var isAppleDevice = navigator.userAgent.includes("Macintosh");
    var isTouchScreen = navigator.maxTouchPoints >= 1; // true for iOS 13 (and hopefully beyond)

    return isIOS || (isAppleDevice && (isTouchScreen || iosQuirkPresent()));
  };

  const [item,setItem]=useState(0);

  const audioContextMaker=()=>{
    if(!audioContext){
      // console.log(data_block);
      // setItem(1);
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      // audioContext = new (window.AudioContext || window.webkitAudioContext)({ latencyHint: 'playback', sampleRate: 44100 });
      // alert("Use effect called");
    // Create a GainNode
    gainNode = audioContext.createGain();

    // Connect the GainNode to the destination (speakers)
    gainNode.connect(audioContext.destination);
    // Set the gain value to increase volume (default is 1)
    const volume = 1; // Increase the volume by multiplying it by a factor
    gainNode.gain.value = volume;

    const source = audioContext.createBufferSource();
    const audioBuffer = audioContext.createBuffer(1, 1, 22050);
    source.buffer = audioBuffer;
    source.connect(gainNode);
    source.start();
    logContent("Audio context started...");
  }
  }

  const loadDecoders = async () => {
    await decoders.mp3(); // load & compile decoder
  };

  const handleCancelButtonClick = () => {
    setIsChatOpen(true);
    stopListening();
    setTextInput(null);
  };

  const elevenLabs = useCallback(
    (apiResponse) => {
      setIsLoading(true);
      console.log("this is elevenlabs: " + apiResponse.answer);
      fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${apiResponse.voiceId}/stream?optimize_streaming_latency=2`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "xi-api-key": "30db19d4fc2dfc7942bce8f1ed0e2fda",
          },
          body: JSON.stringify({
            model_id: "eleven_turbo_v2",
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
          isiOS()?playAudioStream(stream):playStreamingAudio(stream);
          // playAudioStream(stream);
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

  function chunkToArrayBuffer(chunk) {
    // Convert chunk to Uint8Array
    const uint8Array = new Uint8Array(chunk);

    // Create ArrayBuffer from Uint8Array
    return uint8Array;
  }

  const playNextAudioChunk = () => {
    if (audioBufferQueue.length > 0) {
      isPlaying = true;
      const audioBuffer = audioBufferQueue.shift();
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(gainNode);

      const currentTime = audioContext.currentTime;
      if (startTime === 0) {
        startTime = currentTime + 0.1; // slight delay to start the first chunk
      }

      // Schedule the chunk to play at the correct time
      source.start(startTime + offset);
      offset += audioBuffer.duration;

      source.onended = () => {
        isPlaying = false;
        playNextAudioChunk();
      };
      // console.log(Scheduled buffer of duration ${audioBuffer.duration} seconds at time ${startTime + offset});
    } else {
      setValidation(false);
      console.log("Empty Audio Buffer!!!");
      isPlaying = false;
      console.log(check);
      setElevenAudio(null); 
      setAudioData(null);
      // setOpenMicModel(false);
      // handleCancelButtonClick();
      console.log(flag);
      if(flag){
        handleMicButtonClick();
      }
    }
  };

  const logContent = (text) => {
    setContent((prevValue) => {
      let mainContent = prevValue + "*****" + text;
      return mainContent;
    });
  };

  const playAudioStream = async (stream) => {
    logContent("in PlayAudioStream");
    streamReader = stream.getReader();
    while (true) {
      const { value, done } = await streamReader.read();
      console.log(value);
      if (done) {
        logContent("Finished downloading chunks.");
        break;
      }
      if (!value) {
        console.log("Empty chunk.");
        alert("Empty Chunk");
        continue;
      }
      const arrayBuffer = chunkToArrayBuffer(value);
      setElevenAudio(1);
      console.log(new Uint8Array(arrayBuffer));
      setAudioData(new Uint8Array(arrayBuffer));
      if (arrayBuffer) {
        const audioBuffer = await decoders.mp3(arrayBuffer); // decode
        logContent("buffer downloaded.");
        audioBufferQueue.push(audioBuffer);
        
        if (!isPlaying) playNextAudioChunk();
      }
    
    }
  };

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
      // window.alert("No more free trials");
      setMessage("No More Free Trials");
      handleShow();
      e.preventDefault();
      setNewMessage("");
    } else {
      
      flagSetter(false);
      console.log(flag);
    isiOS()&&audioContextMaker();
    // audioContextMaker();
      setValidation(true);
      e.preventDefault();
      const message = newMessage;
      setNewMessage("");

      const message_object = {
        question: message,
        answer: "...",
        isFileType: file ? true : false,
      };

      setChatMessages([...chatMessages, message_object]);

      console.log("Message is: ", message);
      //Construct the request body

      const formData = new FormData();
      formData.set("influencerId", influencer);
      formData.set("questions", message);
      if (file) {
        formData.set("fileUrl", file);
        setFile(null);
      }

      try {
        const response = await API.PostFormAPICalling(
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
        setIsLanguagesLoaded(true);
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

  const handleMicButtonClick = (e) => {
    if (chatMessages.length >= 5) {
      e.preventDefault();
      // alert("No more free trials");
      setMessage("No more free trials");
      handleShow();
      handleCancelButtonClick();
    } else {
      flagSetter(true);
      console.log(flag);
    isiOS()&&audioContextMaker();
    // audioContextMaker();
      setIsChatOpen(false);
      setAudio(1);
      setElevenAudio(null);
      startListening();
    }
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

  function handleFileButtonClick() {
    inputRef.current.click();
  }

  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    console.log(selectedFile);
  }

  const handleFileSelectionContainer = () => {
    setFile(null);
  };

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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await API.getAPICalling(
  //         `/users/getChatMessagesNew?influencerId=${influencer}&page=1&limit=20`,
  //         authToken
  //       );
  //       setInfluencerDetails(response.influencerDetails);
  //       setChatMessages(response.data);
  //       setIsChatLoaded(true);
  //       console.log(response);
  //     } catch (error) {
  //       // setIsChatLoaded(true);
  //       console.log(error);
  //       // localStorage.removeItem('influencer');
  //     }
  //   };
  //   if (authToken !== null) {
  //     fetchData();
  //   }
  //   let timeout = setTimeout(() => {
  //     setIsPageLoading(false);
  //   }, 500);
  //   return () => {
  //     clearTimeout(timeout);
  //   };
  // }, [authToken,influencer]);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, []);

  const Country_Images = [
    default_image,
    English,
    Japanese,
    Chinese,
    German,
    Hindi,
    French,
    Korean,
    Portuguese,
    Italian,
    Spanish,
    Indonesian,
    Dutch,
    Turkish,
    Polish,
    Swedish,
    default_image,
    Romanian,
    Arabic,
    Czech,
    Greek,
    Finnish,
    Croatian,
    Slovak,
    Danish,
    default_image,
    default_image,
    default_image,
    default_image,
    default_image,
    Malay,
  ];

  return (
    // <div className="hidden">

    //   {isPageLoading ? (
    //     <div className="text-center pt-10">
    //       <LoadingAnimation />
    //     </div>
    //   ) : authToken!==null && influencer!==null ? (
    //     isChatOpen ? (
    //       <div className={styles.chatbot_container}>
    //         <div className={styles.top_container}>
    //           <div className={styles.left_items}>
    //             <Link href="/welcome">
    //               <Image src={Back} height={20} width={20}/>
    //             </Link>
    //             <div>
    //               <Link href={`/?id=${influencer}`}>
    //               <Image
    //                 src={
    //                   influencerDetails.avatarImageUrl
    //                     ? influencerDetails.avatarImageUrl
    //                     : ProfileCover
    //                   }
    //                 className={styles.influencerImage}
    //                 width={30}
    //                 height={20}
    //                 alt="Avatar Image"
    //                 />
    //                 </Link>
    //               {/* PC */}
    //             </div>
    //             <div className="font-bold">
    //               {influencerDetails && influencerDetails.userName}
    //             </div>
    //           </div>
    //           <button onClick={handleGetLanguages}>
    //             <div className={styles.language_image} title="Change Language">
    //               {
    //                 !isVisible?<Image src={Language} alt="Language selector button image" />:"X"
    //               }
    //             </div>
    //           </button>
    //         </div>
    //         <div className={styles.main_container}>
    //           {isChatLoaded ? (
    //             <div ref={divRef} className={styles.text_container}>
    //               {chatMessages &&
    //                 chatMessages.map((message, index) => {
    //                   return message.isFileType ? (
    //                     <div className={styles.chats_container} key={index}>
    //                       <div className={styles.file_holder} >
    //                         <Image
    //                           src={File}
    //                           className={styles.chatFileHolder}
    //                           />
    //                       </div>
    //                       <div className={`chat-message user`}>
    //                         {message.question}
    //                       </div>
    //                       <div className={`chat-message bot`}>
    //                         {message.answer}
    //                       </div>
    //                     </div>
    //                   ) : (
    //                     <div className={styles.chats_container} key={index}>
    //                       <div className={`chat-message user`}>
    //                         {message.question}
    //                       </div>
    //                       <div className={`chat-message bot`}>
    //                         {message.answer}
    //                       </div>
    //                     </div>
    //                   );
    //                 })}
    //             </div>
    //           ) : (
    //             <div className={styles.loader}>
    //               <Loader />
    //             </div>
    //           )}
    //         </div>
    //         {file && (
    //           <div className={styles.file_selection_container}>
    //             <div>
    //               <div >
    //                 <Image
    //                   src={File}
    //                   className={styles.file_image}
    //                   alt="File Logo"
    //                   />
    //               </div>
    //               {file.name}
    //               {/* hey */}
    //             </div>
    //             <div>
    //               <button onClick={handleFileSelectionContainer}>X</button>
    //             </div>
    //           </div>
    //         )}
    //         <form
    //           onSubmit={
    //             newMessage.trim("").length
    //             ? handleSubmitText
    //               : handleMicButtonClick
    //           }

    //         >
    //           <div className={styles.bottom_container}>
    //             <div className={styles.pin_image}>
    //               <button type="button" onClick={handleFileButtonClick} title="Add an Attachment">
    //                 <Image src={Pin} className={styles.pin} alt="Pin image" />
    //               </button>
    //               <input
    //                 type="file"
    //                 ref={inputRef}
    //                 name="file"
    //                 id="fileInput"
    //                 accept=".pdf,.json,.html,.jpeg,.png"
    //                 onChange={handleFileChange}
    //                 />
    //             </div>
    //             <div className={styles.text_input}>
    //               <input
    //                 type="text"
    //                 value={newMessage}
    //                 name="newMessage"
    //                 onChange={handleChange}
    //                 placeholder="Message..."
    //                 />
    //             </div>
    //             <div className={styles.internet_image}>
    //               <button type="submit" disabled={validation}>
    //                 <Image
    //                   src={newMessage.trim("").length ? sent : RecordButton}
    //                   className={styles.mic}
    //                   alt="Submit image"
    //                 />
    //               </button>
    //             </div>
    //           </div>
    //         </form>
    //         {isVisible && (
    //           <div ref={languageRef} className={styles.language_box}>
    //             <h1>Choose Your Language</h1>
    //             {isLanguagesLoaded ? (
    //               languages.map((language, index) => {
    //                 return (
    //                   <button
    //                     key={index}
    //                     onClick={() =>
    //                       handleChangeLanguage(language.language, language.code)
    //                     }
    //                   >
    //                     <Image
    //                       width={30}
    //                       height={30}
    //                       alt="Country image"
    //                       className={styles.country_image}
    //                       src={Country_Images[language.languageId - 1]}
    //                       />
    //                     {/* {console.log(language.language)} */}
    //                     {language.language}
    //                   </button>
    //                 );
    //               })
    //             ) : (
    //               <div className={styles.loader}>
    //                 <Loader />
    //               </div>
    //             )}
    //           </div>
    //         )}
    //       </div>
    //     ) : (
    //       <div className={styles.audio_input_container}>
    //         <div className={styles.visualizer}>
    //           {!audio && !elevenAudio && !isLoading && handleEmptyText && (
    //             <div className="d-flex justify-center align-center text-center pt-5 text-white  font-serif flex-col p-3">
    //               {" "}
    //               <p className="text-4xl font-serif m-0">Oops!</p>
    //               <span className="font-serif text-l">
    //                 Voice not detect please tap on Re-load button to start
    //                 listening...
    //               </span>
    //             </div>
    //           )}
    //           {audio && (
    //             <div className={styles.user_voice_listening}>
    //               <p>LISTENING...</p>
    //             </div>
    //           )}
    //           {isLoading && (
    //             <div className={styles.processing}>
    //               <LoadingAnimation />
    //               <div className="mt-12 text-white text-center">
    //                 Processing..
    //               </div>
    //             </div>
    //           )}
    //           {elevenAudio && (
    //             <AudioElevenAnalyzer
    //               setValidation={setValidation}
    //               handleMicButtonClick={handleMicButtonClick}
    //               audio={elevenAudio}
    //             />
    //           )}
    //         </div>
    //         <div className={styles.control_box}>
    //           {/* <p>0:10</p> */}
    //           <div className={styles.controller_button_container}>
    //             <div className={styles.refresh}>
    //               <button onClick={handleMicButtonClick}>
    //                 <Image src={Refresh} alt="refresh image" />
    //               </button>
    //             </div>
    //             <div className={styles.mic_container}>
    //               <div className={styles.mic}>
    //                 <button onClick={handleStopRecording}>
    //                   <Image src={Mic} alt="Mic image" />
    //                 </button>
    //               </div>
    //             </div>
    //             <div onClick={handleCancelButtonClick} className={styles.cross}>
    //               <button>
    //                 <Image src={CloseCircle} alt="Cross image" />
    //               </button>
    //             </div>
    //           </div>
    //           <h1>{isListening && "Tap to stop recording"}</h1>
    //         </div>
    //       </div>
    //     )
    //   ) : authToken!==null && influencer===null ? (
    //     <div className={styles.non_influencer}>
    //       <h1>Shhhh!</h1>
    //       <p>We are not getting the required id from your device... Make sure you follow the right link to enter the website</p>
    //     </div>
    //   ) : authToken===null && influencer!==null ? (
    //     <div className={styles.non_influencer}>
    //       <h1>OOPS!!!</h1>
    //       <p>To enjoy this feature you need to <Link className={styles.nav_link} href="/signup">Signup</Link> or <Link className={styles.nav_link} href="/signin">Login </Link> into our website</p>
    //     </div>
    //   ) : (
    //     <div className={styles.non_influencer}>
    //       <h1>Failed</h1>
    //       <p>It seems like you are not accessing our website through the given source... please follow the steps to enjoy this feature </p>
    //     </div>
    //   )}
    // </div>
    <>
      {isPageLoading ? (
        <div className="text-center pt-10">
          <LoadingAnimation />
        </div>
      ) : isAuthToken && isInfluencer ? (
        isChatOpen ? (
          <div className={styles.chatbot_container}>
            <div className={styles.top_container}>
              <div className={styles.left_items}>
                <Link href="/welcome">
                  <Image src={Back} height={20} width={20} />
                </Link>
                <div>
                  <Link href={`/?id=${influencer}`}>
                    <Image
                      src={
                        influencerDetails
                          ? influencerDetails.avatarImages &&
                            influencerDetails.avatarImages.length > 0
                            ? influencerDetails.avatarImages[0].avatarImageUrl
                            : influencerDetails.avatarImageUrl
                          : ProfileCover
                        // influencerDetails.avatarImageUrl
                        //   ? influencerDetails.avatarImageUrl
                        //   : ProfileCover
                      }
                      className={styles.influencerImage}
                      width={30}
                      height={20}
                      alt="Avatar Image"
                    />
                  </Link>
                  {/* PC */}
                </div>
                <div className="font-bold">
                  {influencerDetails && influencerDetails.userName}
                </div>
              </div>
              <button onClick={handleGetLanguages}>
                <div className={styles.language_image} title="Change Language">
                  {!isVisible ? (
                    <Image src={Language} alt="Language selector button" />
                  ) : (
                    <Image src={Cross} alt="Cross Button" />
                  )}
                </div>
              </button>
            </div>
            <div className={styles.main_container}>
              {isChatLoaded ? (
                <div ref={divRef} className={styles.text_container}>
                  {chatMessages &&
                    chatMessages.map((message, index) => {
                      return message.isFileType ? (
                        <div className={styles.chats_container} key={index}>
                          <div className={styles.file_holder}>
                            <Image
                              src={File}
                              className={styles.chatFileHolder}
                            />
                          </div>
                          <div className={`chat-message user`}>
                            {message.question}
                          </div>
                          <div className={`chat-message bot`}>
                            {message.answer}
                          </div>
                        </div>
                      ) : (
                        <div className={styles.chats_container} key={index}>
                          <div className={`chat-message user`}>
                            {message.question}
                          </div>
                          <div className={`chat-message bot`}>
                            {message.answer}
                          </div>
                        </div>
                      );
                    })}
                </div>
              ) : (
                <div className={styles.loader}>
                  <Loader />
                </div>
              )}
            </div>
            {file && (
              <div className={styles.file_selection_container}>
                <div>
                  <div>
                    <Image
                      src={File}
                      className={styles.file_image}
                      alt="File Logo"
                    />
                  </div>
                  {file.name}
                  {/* hey */}
                </div>
                <div>
                  <button onClick={handleFileSelectionContainer}>
                    {" "}
                    <Image
                      src={Cross}
                      className={styles.cross_image}
                      alt="Cross button"
                    />
                  </button>
                </div>
              </div>
            )}
            <form
              onSubmit={
                newMessage.trim("").length
                  ? handleSubmitText
                  : handleMicButtonClick
              }
            >
              <div className={styles.bottom_container}>
                <div className={styles.pin_image}>
                  <button
                    type="button"
                    onClick={handleFileButtonClick}
                    title="Add an Attachment"
                  >
                    <Image src={Pin} className={styles.pin} alt="Pin image" />
                  </button>
                  <input
                    type="file"
                    ref={inputRef}
                    name="file"
                    id="fileInput"
                    accept=".pdf,.json,.html,.jpeg,.png"
                    onChange={handleFileChange}
                  />
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
                      className={styles.mic}
                      alt="Submit image"
                    />
                  </button>
                </div>
              </div>
            </form>

            <Mobile_Navbar />
            {isVisible && (
              <div ref={languageRef} className={styles.language_box}>
                <p>Choose Your Language</p>
                {isLanguagesLoaded ? (
                  languages.map((language, index) => {
                    return (
                      <button
                        key={index}
                        onClick={() =>
                          handleChangeLanguage(language.language, language.code)
                        }
                      >
                        <Image
                          width={30}
                          height={30}
                          alt="Country image"
                          className={styles.country_image}
                          src={Country_Images[language.languageId - 1]}
                        />
                        {/* {console.log(language.language)} */}
                        {language.language}
                      </button>
                    );
                  })
                ) : (
                  <div className={styles.loader}>
                    <Loader />
                  </div>
                )}
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
              {isLoading && (
                <div className={styles.processing}>
                  <LoadingAnimation />
                  <div className="mt-12 text-white text-center">
                    Processing..
                  </div>
                </div>
              )} 
              {elevenAudio && (
                <>
                {!device? <AudioElevenAnalyzer
                  setValidation={setValidation}
                  handleMicButtonClick={handleMicButtonClick}
                  audio={elevenAudio}
                /> :<div className="d-flex justify-center align-center text-center pt-5  font-serif flex-col p-3">
                {" "}
                <p className="text-4xl font-serif m-0">Speaking...</p>
                </div>}
                
                </>
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
              <p className="text-center">
                {isListening && "Tap to stop recording"}
              </p>
            </div>
          </div>
        )
      ) : isAuthToken && !isInfluencer ? (
        <div className={styles.non_influencer}>
          <h1>Shhhh!</h1>
          <p>
            We are not getting the required id from your device... Make sure you
            follow the right link to enter the website
          </p>
        </div>
      ) : !isAuthToken && isInfluencer ? (
        <div className={styles.non_influencer}>
          <h1>OOPS!!!</h1>
          <p>
            To enjoy this feature you need to{" "}
            <Link className={styles.nav_link} href="/signup">
              Signup
            </Link>{" "}
            or{" "}
            <Link className={styles.nav_link} href="/signin">
              Login{" "}
            </Link>{" "}
            into our website
          </p>
        </div>
      ) : (
        <div className={styles.non_influencer}>
          <h1>Failed</h1>
          <p>
            It seems like you are not accessing our website through the given
            source... please follow the steps to enjoy this feature{" "}
          </p>
        </div>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Okay
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Chatbot;
