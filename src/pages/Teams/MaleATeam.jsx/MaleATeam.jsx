import React, { useEffect, useRef, useState } from "react";
import styles from "./MaleATeam.module.css";
import { playerList } from "../../../data/benficaPlayers";

export default function MaleATeam() {
  const [players, setPlayers] = useState([]);
  const [goalkeepers, setGoalkeepers] = useState([]);
  const [defenders, setDefenders] = useState([]);
  const [midfielders, setMidfielders] = useState([]);
  const [forwards, setForwards] = useState([]);
  const fetchedPlayersRef = useRef([]);
  const [loading, setLoading] = useState(true);

  // ----------

  useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem("benficaPlayers"));

    if (storedPlayers && storedPlayers.length === playerList.length) {
      setPlayers(storedPlayers);
      splitByPosition(storedPlayers);
      setLoading(false);
    } else {
      fetchAllPlayers();
    }
  }, []);

  // ----------

  async function fetchAllPlayers() {
    const fetchedPlayers = [];

    for (const player of playerList) {
      const playerUrl = player.replace(/\s/g, "_");
      const data = await fetchPlayerData(playerUrl);
      if (data) {
        fetchedPlayers.push(data);
      }
    }

    setPlayers(fetchedPlayers);
    localStorage.setItem("benficaPlayers", JSON.stringify(fetchedPlayers));
    splitByPosition(fetchedPlayers);
    setLoading(false);
  }

  // ----------

  async function fetchPlayerData(playerUrl) {
    try {
      const url = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${playerUrl}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Spieler nicht gefunden: ${response.status}`);
      }
      const result = await response.json();
      return result.player ? result.player[0] : null;
    } catch (error) {
      console.error("Fehler beim Abrufen der Spielerinformationen:", error);
      return null;
    }
  }

  // ----------

  function splitByPosition(players) {
    const goalkeeper = players.filter(
      (player) => player.strPosition === "Goalkeeper"
    );
    const defender = players.filter(
      (player) =>
        player.strPosition === "Defender" ||
        player.strPosition === "Right-Back" ||
        player.strPosition === "Left-Back" ||
        player.strPosition === "Centre-Back" ||
        player.strPosition === "Full-Back"
    );
    const midfield = players.filter(
      (player) =>
        player.strPosition === "Central Midfield" ||
        player.strPosition === "Midfielder" ||
        player.strPosition === "Attacking Midfield" ||
        player.strPosition === "Defensive Midfield" ||
        player.strPosition === "Wide Midfielder" ||
        player.strPosition === "Right Midfielder" ||
        player.strPosition === "Left Midfielder"
    );
    const forward = players.filter(
      (player) =>
        player.strPosition === "Striker" ||
        player.strPosition === "Centre-Forward" ||
        player.strPosition === "Second Striker" ||
        player.strPosition === "Forward" ||
        player.strPosition === "Right Winger" ||
        player.strPosition === "Left Winger" ||
        player.strPosition === "Winger" ||
        player.strPosition === "Attacker" ||
        player.strPosition === "Right Forward" ||
        player.strPosition === "Left Forward" ||
        player.strPosition === "False 9"
    );

    setGoalkeepers(goalkeeper);
    setDefenders(defender);
    setMidfielders(midfield);
    setForwards(forward);
  }

  // ==========

  return (
    <>
      {loading ? (
        <div className={styles.loadingMessage}>
          <p>Mannschaft wird zusammengestellt...</p>
        </div>
      ) : (
        <div className={styles.main}>
          <div className={styles.teamHero}>
            <h1>Das Team</h1>
          </div>
          <div className={styles.teamMembers}>
            <div className={styles.playerGroup}>
              <h2>Tor</h2>
              <div className={styles.playerList}>
                {goalkeepers.map((player) => (
                  <div key={player.idPlayer} className={styles.player}>
                    <div className={styles.playerBackground}></div>

                    <h3>{player.strNumber}</h3>
                    <img src={player.strCutout} alt={player.strDescriptionEN} />
                    <div className={styles.playerInfo} style={{backgroundColor:"#AEB4A9"}}>
                      <h4>{player.strPlayer}</h4>
                      <h5>#{player.strNumber}</h5>
                      <p>
                        <span>Geb.:</span> {player.dateBorn.slice(8, 10)}.
                        {player.dateBorn.slice(5, 7)}.
                        {player.dateBorn.slice(0, 4)}, in{" "}
                        {player.strBirthLocation}
                      </p>
                      <p>
                        <span>Nationalität:</span> {player.strNationality}
                      </p>
                      <p>
                        <span>Größe:</span> {player.strHeight}
                      </p>
                      <p>
                        <span>Gewicht:</span> {player.strWeight}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.playerGroup}>
              <h2>Verteidigung</h2>
              <div className={styles.playerList}>
                {defenders.map((player) => (
                  <div key={player.idPlayer} className={styles.player}>
                    <div className={styles.playerBackground}></div>

                    <h3>{player.strNumber}</h3>
                    <img src={player.strCutout} alt={player.strDescriptionEN} />
                    <div className={styles.playerInfo} style={{backgroundColor:"#E0C1B3"}}>
                      <h4>{player.strPlayer}</h4>
                      <h5>#{player.strNumber}</h5>
                      <p>
                        <span>Geb.:</span> {player.dateBorn.slice(8, 10)}.
                        {player.dateBorn.slice(5, 7)}.
                        {player.dateBorn.slice(0, 4)}, in{" "}
                        {player.strBirthLocation}
                      </p>
                      <p>
                        <span>Nationalität:</span> {player.strNationality}
                      </p>
                      <p>
                        <span>Größe:</span> {player.strHeight}
                      </p>
                      <p>
                        <span>Gewicht:</span> {player.strWeight}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.playerGroup}>
              <h2>Mittelfeld</h2>
              <div className={styles.playerList}>
                {midfielders.map((player) => (
                  <div key={player.idPlayer} className={styles.player}>
                    <div className={styles.playerBackground}></div>

                    <h3>{player.strNumber}</h3>
                    <img src={player.strCutout} alt={player.strDescriptionEN} />
                    <div className={styles.playerInfo} style={{backgroundColor:"#D89A9E"}}>
                      <h4>{player.strPlayer}</h4>
                      <h5>#{player.strNumber}</h5>
                      <p>
                        <span>Geb.:</span> {player.dateBorn.slice(8, 10)}.
                        {player.dateBorn.slice(5, 7)}.
                        {player.dateBorn.slice(0, 4)}, in{" "}
                        {player.strBirthLocation}
                      </p>
                      <p>
                        <span>Nationalität:</span> {player.strNationality}
                      </p>
                      <p>
                        <span>Größe:</span> {player.strHeight}
                      </p>
                      <p>
                        <span>Gewicht:</span> {player.strWeight}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.playerGroup}>
              <h2>Angriff</h2>
              <div className={styles.playerList}>
                {forwards.map((player) => (
                  <div key={player.idPlayer} className={styles.player}>
                    <div className={styles.playerBackground}></div>

                    <h3>{player.strNumber}</h3>
                    <img src={player.strCutout} alt={player.strDescriptionEN} />
                    <div className={styles.playerInfo} style={{backgroundColor:"#C37D92"}}>
                      <h4>{player.strPlayer}</h4>
                      <h5>#{player.strNumber}</h5>
                      <p>
                        <span>Geb.:</span> {player.dateBorn.slice(8, 10)}.
                        {player.dateBorn.slice(5, 7)}.
                        {player.dateBorn.slice(0, 4)}, in{" "}
                        {player.strBirthLocation}
                      </p>
                      <p>
                        <span>Nationalität:</span> {player.strNationality}
                      </p>
                      <p>
                        <span>Größe:</span> {player.strHeight}
                      </p>
                      <p>
                        <span>Gewicht:</span> {player.strWeight}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
