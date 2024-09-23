import React, { useContext, useEffect, useState } from "react";
import { InitialContext } from "../../store/InitialContext";
import { LatestAndFutureGamesContext } from "../../store/LatestAndFutureGamesContext";
import styles from "./Hero.module.css";
import { h3, img } from "framer-motion/client";

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
          <ul>
            {sortedGames.map((game, i) => (
              <li key={i}>
                <div
                  className={`${styles.gameContainer} ${getGameStatusClass(
                    game.dateEvent
                  )}`}
                >
                  <div className={styles.leagueImg}>
                    {(() => {
                      switch (game.idLeague) {
                        case "4344":
                          return (
                            <img
                              src="src/assets/Liga_Portugal.svg"
                              alt="Liga Portugal Logo"
                            />
                          );
                        case "4509":
                          return (
                            <img
                              src="src/assets/allianzcup_white.png"
                              alt="Allianz Cup"
                              style={{ filter: "invert(100%)" }}
                            />
                          );
                        case "4480":
                          return (
                            <img
                              src="src/assets/UEFA_Champions_League_logo_no_text_great.svg"
                              alt="Liga Portugal Logo"
                            />
                          );

                        default:
                          return <p>{game.strLeague}</p>;
                      }
                    })()}
                  </div>
                  {game.strHomeTeam === "Benfica" ? (
                    <div className={styles.opponent}>
                      <h3>vs.</h3>
                      <h3>{game.strAwayTeam}</h3>
                    </div>
                  ) : (
                    <div className={styles.opponent}>
                      <h3>@</h3>
                      <h3>{game.strHomeTeam}</h3>
                    </div>
                  )}
                  {game.intHomeScore ? (
                    <div className={styles.score}>
                      <h3>
                        {game.intHomeScore} : {game.intAwayScore}
                      </h3>
                    </div>
                  ) : (
                    ""
                  )}
                  {!game.intHomeScore ? (
                    <h4>
                      {checkIfToday(game.dateEvent)}
                      {game.strTime.slice(0, 2) === "00"
                        ? "(Uhrzeit nicht bekannt)"
                        : "um " +
                          (parseInt(game.strTime.slice(0, 2)) + 2).toString()}
                      {game.strTime.slice(0, 2) === "00"
                        ? ""
                        : ":" + game.strTime.slice(3, 5)}{" "}
                    </h4>
                  ) : (
                    ""
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
