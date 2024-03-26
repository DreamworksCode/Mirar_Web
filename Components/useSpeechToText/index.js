import React, { useEffect, useRef, useState } from "react";

const UseSpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recgonitionRef = useRef(null);
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      console.log("web speech api is not supported in the browser");
      return;
    }
    const options={};
    recgonitionRef.current = new window.webkitSpeechRecognition();
    const recognition = recgonitionRef.current;
    recognition.interimResults = options.interimResults || true;
    recognition.lang = options.lang || "en-US";
    recognition.continuous = options.continuous || false;
    if ("webkitSpeechGrammarList" in window) {
      const grammar ="#JSGF V1.0; grammar punctuation; public ‹punc> = . | , | ? | ! | ; | :";
      const speechRecognitionList = new window.webkitSpeechGrammarList();
      speechRecognitionList.addFromString(grammar, 1);
      recognition.grammars = speechRecognitionList;
    }

    recognition.onresult=(event)=>{
        let text="";
        for(let i=0; i<event.results.length; i++){
            text+=event.results[i][0].transcript;
        }
        setTranscript(text);
    }
    recognition.onerror=(event)=>{
        console.log("Speech Recognition Error : "+ event.error)
    }
    
    recognition.onend=()=>{
        setIsListening(false);
        setTranscript('');
    }
    return ()=>{
        recognition.stop();
    }

  },[]);

  const startListening=()=>{
    console.log("Start Listening in the index.jsx file called");
    if(recgonitionRef.current && !isListening){
        recgonitionRef.current.start();
        setIsListening(true);
    }
  }

  const stopListening=()=>{
    if(recgonitionRef.current && isListening){
        recgonitionRef.current.stop();
        setIsListening(false);
    }
  }


  return {
    isListening,
    transcript,
    startListening,
    stopListening
  }
};

export default UseSpeechToText;