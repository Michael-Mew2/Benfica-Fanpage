import { createContext, useState, useContext, useEffect, useRef } from "react";
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

  const NewCloseGames = useRef([]);

  useEffect(() => {
    // console.log("## Close Games:", closeGames);
}, [closeGames])

  // ----------
  // Primeira Liga:
  const checkLeagueGames = async () => {
    NewCloseGames.current = [];
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

        checkGame = await fetchCheckGame(leagueId, checkGameId);
      }
      
      if (checkGame) {
        // console.log({checkGame});
          setComingLeagueGame(checkGame);
          // Objekt wenn zwei Ids gleich sind, sonst undefined
          const foundGame = NewCloseGames.current.find(match => match.idEvent == checkGame[0].idEvent)
          // console.log({checkGame, foundGame});
          
          if (checkGame && !foundGame){
          NewCloseGames.current.push(...checkGame)
          
          // NewCloseGames.current.push(...checkGame)
        }
        // if (checkGame && closeGames.find(match => match.id == checkGame[0].id)){
        //   // setCloseGames((prevGames) => [...prevGames, checkGame[0]]);
        //   console.log("in find one");
          
        //   NewCloseGames.current.push(checkGame)
        // }
        setLatestLeagueGame(lastLeagueGame);
        if (lastLeagueGame && !foundGame) {
          // setCloseGames((prevGames) => [...prevGames, lastLeagueGame]);
          NewCloseGames.current.push(lastLeagueGame);
        }
        // setCloseGames(NewCloseGames.current);
        // console.log("League", NewCloseGames.current);
        
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

    const today = new Date().toJSON().slice(0, 10);

    const filteredLeagueGames = lastHomeGames.results.filter(
      (game) => game.idLeague === leagueId
    );

    const sortedLeagueGames = filteredLeagueGames.sort(
      (a, b) => new Date(a.dateEvent) - new Date(b.dateEvent)
    );

    //  console.log("sorted cl games:", sortedLeagueGames);

    let lastLeagueGame = sortedLeagueGames[sortedLeagueGames.length - 1];

    let checkGameId =
      sortedLeagueGames.length > 0 ? parseInt(lastLeagueGame.intRound) + 1 : 1;
    // console.log("cl-game-id", checkGameId);

    try {
      let checkGame = await fetchCheckGame(leagueId, checkGameId);
        // console.log("Gefundenes Spiel:", checkGame[0].dateEvent);

      while (checkGame && checkGame[0].dateEvent < today) {
        const newLastGames = [...sortedLeagueGames];
        newLastGames.push(checkGame);
        // setLastHomeGames(...lastHomeGames, newLastGames);

        lastLeagueGame = checkGame;
        checkGameId++;
        // console.log("Championsleague ID", checkGameId);
        

        try {
          checkGame = await fetchCheckGame(leagueId, checkGameId);
        } catch (error) {
          console.error("Fehler bei innerem Aufruf des Spiels");
        }
      }

      // console.log("last", lastLeagueGame, "next", checkGame);
      
      if (checkGame) {
        setComingLeagueGame(checkGame);
        // Objekt wenn zwei Ids gleich sind, sonst undefined
        const foundGame = NewCloseGames.current.find(match => match.idEvent == checkGame[0].idEvent)
        // console.log("Champions League:", {checkGame, foundGame});
        
        if (checkGame && !foundGame) {
          // setCloseGames((prevGames) => [...prevGames, checkGame[0]]);
          NewCloseGames.current.push(...checkGame);
        }
        setLatestLeagueGame(lastLeagueGame);
        if (lastLeagueGame && !foundGame) {
          NewCloseGames.current.push(...lastLeagueGame);

          // NewCloseGames.current.push(lastLeagueGame);
          // setCloseGames((prevGames) => [...prevGames, lastLeagueGame]);
        }
        // setCloseGames(NewCloseGames);
      }
    } catch (error) {
      console.error("Fehler beim Abrufen des Spiels:", error);
    }
    // console.log("Champions League", NewCloseGames.current);
    
  };

  // ----------
  // Taca de Portugal:
  const checkCupGames = async () => {
    const leagueId = "4510";

    if (!lastHomeGames || !lastHomeGames.results) return;

    const today = new Date().toJSON().slice(0, 10);

    const filteredLeagueGames = lastHomeGames.results.filter(
      (game) => game.idLeague === leagueId
    );

    const sortedLeagueGames = filteredLeagueGames.sort(
      (a, b) => new Date(a.dateEvent) - new Date(b.dateEvent)
    );

    // console.log("sorted cl games:", sortedLeagueGames);

    let lastLeagueGame = sortedLeagueGames[sortedLeagueGames.length - 1];

    let checkGameId =
      sortedLeagueGames > 0 ? parseInt(lastLeagueGame.intRound) + 1 : 0;
    // console.log("cl-game-id", checkGameId);

    try {
      let checkGame = await fetchCheckGame(leagueId, checkGameId);
      //   console.log("Gefundenes Spiel:", checkGame);

      while (checkGame && checkGame[0].dateEvent < today) {
        const newLastGames = [...sortedLeagueGames];
        newLastGames.push(checkGame);
        // setLastHomeGames(...lastHomeGames, newLastGames);

        lastLeagueGame = checkGame;
        checkGameId++;

        try {
          checkGame = await fetchCheckGame(leagueId, checkGameId);
        } catch (error) {
          console.error("Fehler bei innerem Aufruf des Spiels");
        }
      }

      if (checkGame) {
        setComingLeagueGame(checkGame);
        // Objekt wenn zwei Ids gleich sind, sonst undefined
        const foundGame = NewCloseGames.current.find(match => match.idEvent == checkGame[0].idEvent)
        // console.log({checkGame, foundGame});
        
        if (checkGame && !foundGame) {
          // setCloseGames((prevGames) => [...prevGames, checkGame[0]]);
          NewCloseGames.current.push(...checkGame);
        }
        setLatestLeagueGame(lastLeagueGame);
        if (lastLeagueGame && !foundGame) {
          NewCloseGames.current.push(lastLeagueGame);

          // NewCloseGames.current.push(lastLeagueGame);
          // setCloseGames((prevGames) => [...prevGames, lastLeagueGame]);
        }
        // setCloseGames(NewCloseGames);
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

    const today = new Date().toJSON().slice(0, 10);

    const filteredLeagueGames = lastHomeGames.results.filter(
      (game) => game.idLeague === leagueId
    );

    const sortedLeagueGames = filteredLeagueGames.sort(
      (a, b) => new Date(a.dateEvent) - new Date(b.dateEvent)
    );

    // console.log("sorted cl games:", sortedLeagueGames);

    let lastLeagueGame = sortedLeagueGames[sortedLeagueGames.length - 1];

    let checkGameId =
      sortedLeagueGames > 0 ? parseInt(lastLeagueGame.intRound) + 1 : 0;
    // console.log("cl-game-id", checkGameId);

    try {
      let checkGame = await fetchCheckGame(leagueId, checkGameId);
      //   console.log("Gefundenes Spiel:", checkGame);

      while (checkGame && checkGame.dateEvent < today) {
        const newLastGames = [...sortedLeagueGames];
        newLastGames.push(checkGame);
        // setLastHomeGames(...lastHomeGames, newLastGames);

        lastLeagueGame = checkGame;
        checkGameId++;

        try {
          checkGame = await fetchCheckGame(leagueId, checkGameId);
        } catch (error) {
          console.error("Fehler bei innerem Aufruf des Spiels");
        }
      }

      if (checkGame) {
        setComingLeagueGame(checkGame);
        // Objekt wenn zwei Ids gleich sind, sonst undefined
        const foundGame = NewCloseGames.current.find(match => match.idEvent == checkGame[0].idEvent)
        // console.log({checkGame, foundGame});
        
        if (checkGame && !foundGame) {
          // setCloseGames((prevGames) => [...prevGames, checkGame[0]]);
          NewCloseGames.current.push(...checkGame);
        }
        setLatestLeagueGame(lastLeagueGame);
        if (lastLeagueGame && !foundGame) {
          NewCloseGames.current.push(lastLeagueGame);

          // NewCloseGames.current.push(lastLeagueGame);
          // setCloseGames((prevGames) => [...prevGames, lastLeagueGame]);
        }
        // setCloseGames(NewCloseGames);
      }
      setCloseGames(NewCloseGames.current);
    } catch (error) {
      console.error("Fehler beim Abrufen des Spiels:", error);
    }
  };

  // ==========
  
  // fetch und filtern vom letzten Spiel:
  async function fetchCheckGame(leagueId, gameId) {
    let allMatches = [];
    try {
      // const abortController = new AbortController();
      const url = `https://www.thesportsdb.com/api/v1/json/3/eventsround.php?id=${leagueId}&r=${gameId}&s=2024-2025`;
      const response = await fetch(url, /* {signal: abortController.signal} */);

      if (!response.ok) {
        throw new Error(`Spiel nicht gefunden: ${response.status}`);
      }
      const result = await response.json();
      allMatches = result;
    } catch (error) {
      if(error.name === "AbortError") {
        console.log("Fetch aborted!");
      }
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
        setCloseGames,
        //Funktionen:
        checkLeagueGames,
        checkCLGames,
        checkCupGames,
        checkLeagueCupGames,
        //Abort-Controller:
        // abortController
      }}
    >
      {children}
    </LatestAndFutureGamesContext.Provider>
  );
}
