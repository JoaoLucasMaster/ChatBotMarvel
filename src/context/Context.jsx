import { createContext, useState } from "react";
import runChat from "../config/gemini";
import getPythonData from "../config/api_python";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;
    setRecentPrompt(input);
    setPrevPrompts((prev) => [...prev, input]);
    
    // Envia a consulta ao chat baseado na API do Google Gemini
    response = await runChat(input);
    
    // Formata a resposta inserindo tags HTML para negrito
    let responseArray = response.split("**");
    let formatedResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 === 0) {
        formatedResponse += responseArray[i];
      } else {
        formatedResponse += "<b>" + responseArray[i] + "</b>";
      }
    }

    response = formatedResponse.replace(/\n/g, "<br />");

    setResultData(response);
    setLoading(false);
    setInput("");
  };

  const onSentApi = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;
    setRecentPrompt(input);
    setPrevPrompts((prev) => [...prev, input]);
    
    // Envia a consulta à API Python
    response = await getPythonData(input);
    
    // Formata a resposta inserindo tags HTML para negrito
    let responseArray = response.split("**");
    let formatedResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 === 0) {
        formatedResponse += responseArray[i];
      } else {
        formatedResponse += "<b>" + responseArray[i] + "</b>";
      }
    }

    response = formatedResponse.replace(/\n/g, "<br />");
    setResultData(response);
    setLoading(false);
    setInput("");
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    onSentApi,
    recentPrompt,
    setRecentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
