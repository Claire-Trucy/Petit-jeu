import { useEffect, useState } from "react";
import './game.css';

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
      if (newPosition.x === 9 && newPosition.y === 9) {
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
  const colorPalette = ["#f87171", "#93c5fd", "green", "#8b5cf6", "#fdba74", "#525252"];

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let tileColor = "white";
      if (i === position.y && j === position.x) {
        tileColor = "yellow";
      } else if (i === 9 && j === 9) {
        tileColor = "green";
      } else {
        tileColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
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
    <div className='main'>
      <div className="touch-area">
      <div className='container'>
        {!gameOver && (
          <><h1 className='container-h1'>
              Bienvenue {username}
            </h1><p className='container-p'>
                Utilisez les touches fléchées pour déplacer le pion jusqu'à l'arrivée 'Vous êtes le pion jaune' !
              </p><p className='container-p'>
                Une seule case ne change jamais de couleur... c'est l'arrivée !
              </p></>
        )}
        
        {gameOver ? (
          <><h1 className="container-h1">
              Bravo {username}
            </h1><div className="game-over">
                Maintenant que vous m'avez trouvé vous pouvez m'engager =D !
                <br />
                <div>
                  <button className='game-over-button'
                    onClick={() => window.location.reload(false)}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = "#000";
                      e.target.style.color = "#ffdf00";
                      e.target.style.textShadow = "none";
                    } }
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = "#ffdf00";
                      e.target.style.color = "#000";
                      e.target.style.textShadow = "1px 1px #000";
                    } }
                  >
                    Redémarrer
                  </button>
                  <a href="https://engagez-moi.surge.sh" target="_blank"><button className="game-over-button"
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = "#000";
                      e.target.style.color = "#ffdf00";
                      e.target.style.textShadow = "none";
                    } }
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = "#ffdf00";
                      e.target.style.color = "#000";
                      e.target.style.textShadow = "1px 1px #000";
                    } }
                  >
                    Me contacter
                  </button></a>
                </div>
                    <ul>
                      <li style={{color: "#ef436b"}}>
                        <span className="base"></span>
                        <span className="title">Engagez</span>
                      </li>
                      <li style={{color: "#ffce5c"}}>
                        <span className="base"></span>
                        <span className="title">Moi</span>
                      </li>
                      <li style={{color: "#05c770"}}>
                        <span className="base"></span>
                        <span className="title">=D</span>
                      </li>
                    </ul>
              </div></>
        ) : (
          <div className="game-board">{tiles}</div>
        )}
      </div>
      </div>
    </div>
  );
}
  