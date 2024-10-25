import React, { useEffect } from 'react'
import styles from "./Hero.module.css"

export default function QuickStats() {
    useEffect
  return (
    <>
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
                              src="/Liga_Logos/Liga_Portugal.svg"
                              alt="Liga Portugal Logo"
                            />
                          );
                        case "4509":
                          return (
                            <img
                              src="/Liga_Logos/allianzcup_white.png"
                              alt="Allianz Cup"
                              style={{ filter: "invert(100%)" }}
                            />
                          );
                        case "4480":
                          return (
                            <img
                              src="/Liga_Logos/UEFA_Champions_League_logo_no_text_great.svg"
                              alt="Champions League Logo"
                            />
                          );

                        case "4510":
                          return (
                            <img
                              src="/Liga_Logos/taca-de-portugal.svg"
                              alt="Taca de Portugal Logo"
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
    </>
  )
}
