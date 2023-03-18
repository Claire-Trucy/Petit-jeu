
import React, { useState } from "react";
import Game from "./Game";

function App() {
  const [username, setUsername] = useState("");
  const [gameStarted, setGameStarted] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setGameStarted(true);
  };

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  if (!gameStarted) {
    return (
      <div className="app_container"
        style={{
          backgroundColor: "#1d1f25",
          color: "#fff",
          fontFamily: "monospace",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "2px 2px 10px #000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h1
            style={{
              textAlign: "center",
              fontSize: "40px",
              marginBottom: "20px",
              textShadow: "1px 1px #000",
            }}
          >
            Bienvenue dans mon mini-jeu !
          </h1>
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="username" style={{ fontSize: "24px", marginBottom: "10px" }}>Pseudo:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleInputChange}
              style={{
                backgroundColor: "#fff",
                border: "none",
                borderRadius: "5px",
                padding: "10px",
                fontSize: "18px",
                marginBottom: "20px",
                width: "100%",
                boxShadow: "2px 2px 10px #000",
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: "#ffdf00",
                color: "#000",
                fontFamily: "monospace",
                padding: "10px 20px",
                fontSize: "24px",
                borderRadius: "10px",
                border: "none",
                boxShadow: "2px 2px 10px #000",
                cursor: "pointer",
                textShadow: "1px 1px #000",
                transition: "all 0.3s ease",
                marginBottom: "20px",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#000";
                e.target.style.color = "#ffdf00";
                e.target.style.textShadow = "none";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "#ffdf00";
                e.target.style.color = "#000";
                e.target.style.textShadow = "1px 1px #000";
              }}
            >
              Commencer
            </button>
          </form>
        </div>
      </div>
    );
  } else {
    return <Game username={username} />;
  }
}

export default App;