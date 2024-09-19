import { createContext, useState, useContext, useEffect } from "react";
import { InitialContext } from "./InitialContext";

export const LatestAndFutureGamesContext = createContext();

export default function LatestAndFutureGamesProvider({ children }) {
  const { lastHomeGames, setLastHomeGames } = useContext(InitialContext);

  // Liga Portugal:
  const [comingLeagueGame, setComingLeagueGame] = useState(null);
  const [latestLeagueGame, setLatestLeagueGame] = useState(null);

  // Champions League:
  const [comingCLGame, setComingCLGame] = useState(null);
  const [latestCLGame, setLatestCLGame] = useState(null);

  // Taca de Portugal:
  const [comingCupGame, setComingCupGame] = useState(null);
  const [latestCupGame, setLatestCupGame] = useState(null);

  // Taca da Liga:
  const [comingLeagueCupGame, setComingLeagueCupGame] = useState(null);
  const [latestLeagueCupGame, setLatestLeagueCupGame] = useState(null);

  // Close games in all Competitions:
  const [closeGames, setCloseGames] = useState([]);


  useEffect(() => {
    console.log("## Close Games:", closeGames);
}, [closeGames])

  // ----------
  // Primeira Liga:
  const checkLeagueGames = async () => {
    const leagueId = "4344";

    if (!lastHomeGames || !lastHomeGames.results) return;

    const today = new Date();

    const filteredLeagueGames = lastHomeGames.results.filter(
      (game) => game.idLeague === leagueId
    );

    const sortedLeagueGames = filteredLeagueGames.sort(
      (a, b) => new Date(a.dateEvent) - new Date(b.dateEvent)
    );

    let lastLeagueGame = sortedLeagueGames[sortedLeagueGames.length - 1];

    let checkGameId = parseInt(lastLeagueGame.intRound) + 1;

    try {
      let checkGame = await fetchCheckGame(leagueId, checkGameId);
      //   console.log("Gefundenes Spiel:", checkGame);

      while (checkGame && checkGame.dateEvent < today) {
        const newLastGames = [...sortedLeagueGames];
        newLastGames.push(checkGame);
        setLastHomeGames(...lastHomeGames, newLastGames);

        lastLeagueGame = checkGame;
        checkGameId++;
        console.log("innerLeagueGame", lastLeagueGame);

        checkGame = await fetchCheckGame(leagueId, checkGameId);
        
      }

      console.log("#######################",closeGames);
      
      if (checkGame) {
        const _closeGames = [...closeGames];
        const foundGames = [];
        
        setComingLeagueGame(checkGame);
        if (checkGame && (_closeGames.filter((match) => match.id == checkGame[0].id).length === 0)) {
          // setCloseGames((prevGames) => [...prevGames, checkGame[0]]);
          foundGames.push(checkGame)
        }
        console.warn("Found Game:", foundGames);
        setLatestLeagueGame(lastLeagueGame);
        if (lastLeagueGame && (_closeGames.filter((match) => match.id == lastLeagueGame.id).length === 0)) {
          // setCloseGames((prevGames) => [...prevGames, lastLeagueGame]);
          foundGames.push(lastLeagueGame);
        }
        console.warn("Found Game:", foundGames);
        console.warn("Liga:", _closeGames);
        
        setCloseGames([...closeGames, ...foundGames]);
      }
    } catch (error) {
      console.error("Fehler beim Abrufen des Spiels:", error);
    }
  };

  // ----------
  // Champions League:
  const checkCLGames = async () => {
    const leagueId = "4480";

    if (!lastHomeGames || !lastHomeGames.results) return;

    const today = new Date();

    const filteredLeagueGames = lastHomeGames.results.filter(
      (game) => game.idLeague === leagueId
    );

    const sortedLeagueGames = filteredLeagueGames.sort(
      (a, b) => new Date(a.dateEvent) - new Date(b.dateEvent)
    );

    // console.log("sorted cl games:", sortedLeagueGames);

    let lastLeagueGame = sortedLeagueGames[sortedLeagueGames.length - 1];

    let checkGameId =
      sortedLeagueGames > 0 ? parseInt(lastLeagueGame.intRound) + 1 : "1";
    // console.log("cl-game-id", checkGameId);

    try {
      let checkGame = await fetchCheckGame(leagueId, checkGameId);
      //   console.log("Gefundenes Spiel:", checkGame);

      while (checkGame && checkGame.dateEvent < today) {
        const newLastGames = [...sortedLeagueGames];
        newLastGames.push(checkGame);
        setLastHomeGames(...lastHomeGames, newLastGames);

        lastLeagueGame = checkGame;
        checkGameId++;
        console.log("innerLeagueGame", lastLeagueGame);

        try {
          checkGame = await fetchCheckGame(leagueId, checkGameId);
        } catch (error) {
          console.error("Fehler bei innerem Aufruf des Spiels");
        }
      }

      
      if (checkGame) {
        const _closeGames = [...closeGames]
        const foundGames = [];
        
        setComingLeagueGame(checkGame);
        if (checkGame && (_closeGames.filter((match) => match.id == checkGame[0].id).length === 0)) {
          // setCloseGames((prevGames) => [...prevGames, checkGame[0]]);
          foundGames.push(checkGame);
          
        }
        setLatestLeagueGame(lastLeagueGame);
        if (lastLeagueGame && (_closeGames.filter((match) => match.id == lastLeagueGame.id).length === 0)) {
          foundGames.push(lastLeagueGame);
          // setCloseGames((prevGames) => [...prevGames, lastLeagueGame]);
        }
        console.log("## ## _closeGames:", _closeGames);
        console.log("Champions League:", _closeGames);
        setCloseGames([...closeGames, ...foundGames]);
      }
    } catch (error) {
      console.error("Fehler beim Abrufen des Spiels:", error);
    }
  };

  // ----------
  // Taca de Portugal:
  const checkCupGames = async () => {
    const leagueId = "4510";

    if (!lastHomeGames || !lastHomeGames.results) return;

    const today = new Date();

    const filteredLeagueGames = lastHomeGames.results.filter(
      (game) => game.idLeague === leagueId
    );

    const sortedLeagueGames = filteredLeagueGames.sort(
      (a, b) => new Date(a.dateEvent) - new Date(b.dateEvent)
    );

    // console.log("sorted cl games:", sortedLeagueGames);

    let lastLeagueGame = sortedLeagueGames[sortedLeagueGames.length - 1];

    let checkGameId =
      sortedLeagueGames > 0 ? parseInt(lastLeagueGame.intRound) + 1 : "1";
    // console.log("cl-game-id", checkGameId);

    try {
      let checkGame = await fetchCheckGame(leagueId, checkGameId);
      //   console.log("Gefundenes Spiel:", checkGame);

      while (checkGame && checkGame.dateEvent < today) {
        const newLastGames = [...sortedLeagueGames];
        newLastGames.push(checkGame);
        setLastHomeGames(...lastHomeGames, newLastGames);

        lastLeagueGame = checkGame;
        checkGameId++;
        console.log("innerLeagueGame", lastLeagueGame);

        try {
          checkGame = await fetchCheckGame(leagueId, checkGameId);
        } catch (error) {
          console.error("Fehler bei innerem Aufruf des Spiels");
        }
      }

      if (checkGame) {
        const _closeGames = [...closeGames]
        const foundGames = []
        
        setComingLeagueGame(checkGame);
        if (checkGame && (_closeGames.filter((match) => match.id == checkGame[0].id).length === 0)) {
          // setCloseGames((prevGames) => [...prevGames, checkGame[0]]);
          foundGames.push(checkGame)
        }
        setLatestLeagueGame(lastLeagueGame);
        if (lastLeagueGame && (_closeGames.filter((match) => match.id == lastLeagueGame.id).length === 0)) {
          // setCloseGames((prevGames) => [...prevGames, lastLeagueGame]);
          foundGames.push
        }
        console.log("Pokal:", _closeGames);
        setCloseGames([...closeGames, ...foundGames])
      }
    } catch (error) {
      console.error("Fehler beim Abrufen des Spiels:", error);
    }
  };

  // ----------
  // Taca da Liga:
  const checkLeagueCupGames = async () => {
    const leagueId = "4509";

    if (!lastHomeGames || !lastHomeGames.results) return;

    const today = new Date();

    const filteredLeagueGames = lastHomeGames.results.filter(
      (game) => game.idLeague === leagueId
    );

    const sortedLeagueGames = filteredLeagueGames.sort(
      (a, b) => new Date(a.dateEvent) - new Date(b.dateEvent)
    );

    // console.log("sorted cl games:", sortedLeagueGames);

    let lastLeagueGame = sortedLeagueGames[sortedLeagueGames.length - 1];

    let checkGameId =
      sortedLeagueGames > 0 ? parseInt(lastLeagueGame.intRound) + 1 : "0";
    // console.log("cl-game-id", checkGameId);

    try {
      let checkGame = await fetchCheckGame(leagueId, checkGameId);
      //   console.log("Gefundenes Spiel:", checkGame);

      while (checkGame && checkGame.dateEvent < today) {
        const newLastGames = [...sortedLeagueGames];
        newLastGames.push(checkGame);
        setLastHomeGames(...lastHomeGames, newLastGames);

        lastLeagueGame = checkGame;
        checkGameId++;
        console.log("innerLeagueGame", lastLeagueGame);

        try {
          checkGame = await fetchCheckGame(leagueId, checkGameId);
        } catch (error) {
          console.error("Fehler bei innerem Aufruf des Spiels");
        }
      }

      if (checkGame) {
        const _closeGames = [...closeGames]
        const foundGames = [];
        console.log("Liga Pokal:", _closeGames);
        
        setComingLeagueGame(checkGame);
        if (checkGame && (_closeGames.filter((match) => match.id == checkGame[0].id).length === 0)) {
          // setCloseGames((prevGames) => [...prevGames, checkGame[0]]);
          foundGames.push(checkGame)

        }
        setLatestLeagueGame(lastLeagueGame);
        if (lastLeagueGame && (_closeGames.filter((match) => match.id == lastLeagueGame.id).length === 0)) {
          // setCloseGames((prevGames) => [...prevGames, lastLeagueGame]);
          foundGames.push(lastLeagueGame)
        }
        
        setCloseGames([...closeGames, ...foundGames]);
        console.warn("#############:", _closeGames)

      }
    } catch (error) {
      console.error("Fehler beim Abrufen des Spiels:", error);
    }
  };

  // ==========

  // fetch und filtern vom letzten Spiel:
  async function fetchCheckGame(leagueId, gameId) {
    let allMatches = [];
    try {
      const url = `https://www.thesportsdb.com/api/v1/json/3/eventsround.php?id=${leagueId}&r=${gameId}&s=2024-2025`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Spiel nicht gefunden: ${response.status}`);
      }
      const result = await response.json();
      allMatches = result;
    } catch (error) {
      console.error("Fehler beim Aufrufen der Daten:", error);
    }

    // console.log("From fetch function:", allMatches);

    return allMatches.events.filter(
      (match) => match.idAwayTeam === "134108" || match.idHomeTeam === "134108"
    );
  }

  // ==========
  //Ausgabe:
  return (
    <LatestAndFutureGamesContext.Provider
      value={{
        // Liga Portugal:
        comingLeagueGame,
        setComingLeagueGame,
        latestLeagueGame,
        setLatestLeagueGame,
        // Championsleague
        comingCLGame,
        setComingCLGame,
        latestCLGame,
        setLatestCLGame,
        // Taca de Portugal:
        comingCupGame,
        setComingCupGame,
        latestCupGame,
        setLatestCupGame,
        //Taca da Liga
        comingLeagueCupGame,
        setComingLeagueCupGame,
        latestLeagueCupGame,
        setLatestLeagueCupGame,
        // Alle spiele:
        closeGames,
        //Funktionen:
        checkLeagueGames,
        checkCLGames,
        checkCupGames,
        checkLeagueCupGames,
      }}
    >
      {children}
    </LatestAndFutureGamesContext.Provider>
  );
}
