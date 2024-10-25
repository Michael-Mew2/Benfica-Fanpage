import React, { useContext, useEffect, useState } from "react";
import { InitialContext } from "../../store/InitialContext";
import { LatestAndFutureGamesContext } from "../../store/LatestAndFutureGamesContext";
import styles from "./Hero.module.css";
import { h3, img } from "framer-motion/client";
import QuickStats from "./QuickStats";

// ----------

export default function () {
  const {
    // Liga Portugal:
    comingLeagueGame,
    latestLeagueGame,
    // Champions League:
    comingCLGame,
    latestCLGame,
    // Taca de Portugal:
    comingCupGame,
    latestCupGame,
    // Taca da Liga
    comingLeagueCupGame,
    latestLeagueCupGame,
    // Alle spiele
    closeGames,
    //Funktionen
    checkLeagueGames,
    checkCLGames,
    checkCupGames,
    checkLeagueCupGames,
    zipItUp,
    //Abort-Controller:
    abortController,
  } = useContext(LatestAndFutureGamesContext);

  // ----------

  const [sortedGames, setSortedGames] = useState([]);

  // const [leagueId, setLeagueId] = useState({id: url})

  useEffect(() => {
    const fetchAndProcessData = async () => {
      await checkLeagueGames();
      await checkCLGames();
      await checkCupGames();
      await checkLeagueCupGames();
    };

    fetchAndProcessData();
    localStorage.setItem("Prev_and_Next_Games", JSON.stringify(closeGames));

    //   return ()=>{
    //     abortController.abort()
    // }
  }, []);

  useEffect(() => {
    sortGames();
  }, [closeGames]);

  const sortGames = async () => {
    const games = [...closeGames];
    console.log("pre-sorted:", games);

    const compareDates = (a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (dateA < dateB) return -1;
      if (dateA > dateB) return 1;
      return 0;
    };

    const _sortedGames = games.sort(compareDates);

    setSortedGames(_sortedGames);

    console.log("sorted:", _sortedGames);
  };

  // ----------

  function getGameStatusClass(dateString) {
    const gameDate = new Date(dateString);
    const today = new Date();

    gameDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    // console.log(gameDate, today);

    if (gameDate > today) {
      return styles.futureGames;
    } else if (gameDate < today) {
      return styles.pastGames;
    } else {
      return styles.todayGame;
    }
  }

  function checkIfToday(dateString) {
    const gameDate = new Date(dateString);
    const today = new Date();

    gameDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    // console.log(gameDate, today);

    if (gameDate.getTime() === today.getTime()) {
      return "Heute ";
    } else {
      return `Am ${gameDate.getDate()}.${gameDate.getMonth() + 1}. `;
    }
  }

  // console.log("Nächstes Spiel:", comingLeagueGame);
  // console.log("Letztes Spiel:", latestLeagueGame);
  // console.log("Nächstes CL-Spiel", comingCLGame);
  // console.log("letztes CL-Spiel", latestCLGame);
  // console.log("Nächstes Pokal-Spiel", comingCupGame);
  // console.log("letztes Pokal-Spiel", latestCupGame);
  // console.log("Nächstes Liga-Pokal-Spiel", comingLeagueCupGame);
  // console.log("letztes Liga-Pokal-Spiel", latestLeagueCupGame);

  // ==========
  // ******* */
  // ==========

  return (
    <div className={styles.hero}>
      <div className={styles.blur}>
        <h1>Willkommen im roten Inferno</h1>
        <div className={styles.quickStats}>
          {/* <QuickStats /> */}
        </div>
      </div>
    </div>
  );
}
