import React, { useContext, useEffect, useState } from "react";
import { InitialContext } from "../../store/InitialContext";
import { LatestAndFutureGamesContext } from "../../store/LatestAndFutureGamesContext";
import styles from "./Hero.module.css";

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

  useEffect(() => {
    const fetchAndProcessData = async () => {
      await checkLeagueGames();
      await checkCLGames();
      await checkCupGames();
      await checkLeagueCupGames();
    };

    fetchAndProcessData();
    localStorage.setItem("Prev_and_Next_Games", JSON.stringify(closeGames))

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
          <ul>
            {sortedGames.map((game, i) => (
              <li key={i}>
                <div>
                  <h2>{game.strEvent}</h2>
                  <p>
                    {game.strLeague} Spieltag: {game.intRound}
                  </p>
                  <p>{game.dateEvent}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
