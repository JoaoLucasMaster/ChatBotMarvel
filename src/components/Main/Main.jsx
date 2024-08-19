import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Main = () => {
  {console.log(import.meta.env.API_KEY)}
  
  const {
    onSent,
    onSentApi,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  const handleCardClick = (text) => {
    setInput(text);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onSentApi();
    }
  };
  return (
    <div className="main">
      <div className="nav">
        <p>Geek Assistente</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        <div className="greet">
          <p>
            <span>Olá Nerd</span>
          </p>
          <p>Sobre o que você quer saber no universo Marvel hoje?</p>
        </div>
        {!showResult ? (
          <>
            <div className="cards"  >
              <div className="card" onClick={() => handleCardClick('Qual é a história de origem do Iron Man?')}>
                <p>História de Origem do Iron Man</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card" onClick={() => handleCardClick('Quem é o personagem principal do filme "Iron Man"?')}>
                <p>Personagem Principal de "Iron Man"</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card" onClick={() => handleCardClick('Qual é a transformação que Bruce Banner sofre em "The Incredible Hulk"?')}>
                <p>Transformação de Bruce Banner</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card" onClick={() => handleCardClick('Quais são os desafios enfrentados por Tony Stark em "Iron Man 2"?')}>
                <p>Desafios em "Iron Man 2"</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
            {/* Fim dos Cards - mostra se não tiver resultado */}
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.dummy_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.user_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}
      {/* Fim mostra resultado */}
        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown} 
              value={input}
              type="text"
              placeholder="Faça sua pergunta geek aqui"
            />
            <div>
              <img onClick={() => onSentApi()} src={assets.send_icon} alt="" />
            </div>
          </div>
          <p className="bottom-info">
            O Geek Assistente utiliza uma API sobre filmes da Marvel. Algumas informações podem ser incorretas, sempre verifique as fontes recomendadas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
