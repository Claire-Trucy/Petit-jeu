import { useEffect, useState } from "react";

export default function Game({ username }) {
  const [position, setPosition] = useState({ x: 1, y: 1 });
  const [gameOver, setGameOver] = useState(false);

  const handleKeyDown = (event) => {
    if (!gameOver) {
      let newPosition = { ...position };
      switch (event.keyCode) {
        case 37: //left
          if (newPosition.x > 0) newPosition.x -= 1;
          break;
        case 38: //up
          if (newPosition.y > 0) newPosition.y -= 1;
          break;
        case 39: //right
          if (newPosition.x < 9) newPosition.x += 1;
          break;
        case 40: //down
          if (newPosition.y < 9) newPosition.y += 1;
          break;
        default:
          break;
      }
      if (newPosition.x === 8 && newPosition.y === 8) {
        setGameOver(true);
      } else {
        setPosition(newPosition);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const tiles = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let tileColor = "white";
      if (i === position.y && j === position.x) {
        tileColor = "yellow";
      } else if (i === 8 && j === 8) {
        tileColor = "green";
      } else if (i % 2 === 0 && j % 2 === 0) {
        tileColor = "gray";
      }
      tiles.push(
        <div
          key={`${i}-${j}`}
          style={{
            backgroundColor: tileColor,
            width: "50px",
            height: "50px",
            border: "2px solid #000",
            display: "inline-block",
            margin: "1px",
            borderRadius: "3px",
            boxShadow: "1px 1px 2px #000",
            position: "relative",
          }}
        >
          {i === position.y && j === position.x && (
            <div
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: "#ff0",
                borderRadius: "50%",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                boxShadow: "1px 1px 2px #000",
              }}
            ></div>
          )}
        </div>
      );
    }
    tiles.push(<br key={i} />);
  }

  return (
    <div
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
          Bienvenue {username}
        </h1>
        <p style={{ textAlign: "center", fontSize: "18px", marginBottom: "20px" }}>
        Utilisez les touches fléchées pour déplacer le pion jusqu'à l'arrivée 'Vous êtes le pion jaune, l'arrivée le pion vert' !
      </p>
        {gameOver ? (
          <div className="game-over" style={{ textAlign: "center", fontSize: "25px", marginBottom: "20px" }}>
            Maintenant que vous m'avez trouvé vous pouvez m'engager =D !
            <br />
            <div>
            <button
            onClick={() => window.location.reload(false)}
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
              marginTop: "20px",
              
              marginRight: "25px"
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
            Redémarrer
          </button>
          <a href="https://engagez-moi.surge.sh" target="_blank"><button
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
              marginTop: "20px",
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
            Me contacter
          </button></a>
          </div>
          </div>
        ) : (
          <div className="game-board">{tiles}</div>
        )}
      </div>
    </div>
  );
}
  