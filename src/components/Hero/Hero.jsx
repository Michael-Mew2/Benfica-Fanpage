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
  } = useContext(LatestAndFutureGamesContext);

  // ----------

  useEffect(() => {
    const fetchAndProcessData = async () => {
      await checkLeagueGames();
      await checkCLGames();
      // await checkCupGames();
      await checkLeagueCupGames();
    };

    fetchAndProcessData();
  }, []);

  // ----------

  // console.log("Nächstes Spiel:", comingLeagueGame);
  // console.log("Letztes Spiel:", latestLeagueGame);
  // console.log("Nächstes CL-Spiel", comingCLGame);
  // console.log("letztes CL-Spiel", latestCLGame);
  // console.log("Nächstes Pokal-Spiel", comingCupGame);
  // console.log("letztes Pokal-Spiel", latestCupGame);
  // console.log("Nächstes Liga-Pokal-Spiel", comingLeagueCupGame);
  // console.log("letztes Liga-Pokal-Spiel", latestLeagueCupGame);

  console.log("Alle spiele", closeGames);

  // ==========
  // ******* */
  // ==========

  return (
    <div className={styles.hero}>
      <div className={styles.blur}>
        <h1>Willkommen im roten Inferno</h1>
        <div className="quickStats">
          <ul>
            <li>
              {closeGames.map((game, i) => (
                <div key={i}>
                  <h2>{game.strEvent}</h2>
                  <p>
                    {game.strLeague} Spieltag: {game.intRound}
                  </p>
                </div>
              ))}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
