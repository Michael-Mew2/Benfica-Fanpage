import React from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import { InitialContext } from "../../store/InitialContext";
import { useContext, useEffect } from "react";
import { LatestAndFutureGamesContext } from "../../store/LatestAndFutureGamesContext";

export default function Layout() {
  const {
    // State-Status:
    setLoading,
    loading,
    // State-Leagues:
    portugalLeagues,
    ligaPortugal,
    setPortugalLeagues,
    setLigaPortugal,
    // Funktionen:
    fetchPortugueseLeagues,
    fetchLigaPortugalStandings,
    fetchPastLeagueGames,
    setLastHomeGames,
    saveDate,
    lastHomeGames,
  } = useContext(InitialContext);

  const {
    // Alle spiele:
    closeGames,
    //Funkionen
    checkLeagueGames,
    checkCLGames,
    checkCupGames,
    checkLeagueCupGames,
  } = useContext(LatestAndFutureGamesContext);

  // ----------

  // console.log(loading);

  // console.log(typeof setPortugalLeagues);

  useEffect(() => {
    // Aktuellen Tag:
    const currentDate = new Date().toJSON().slice(0, 10);
    console.log("Today is", currentDate);
    const savedDate = localStorage.getItem("SavedDate");
    console.log("Last save at:", savedDate);

    const storedPortugalLeagues = localStorage.getItem("PortugalLeagues");
    const storedLeagueTable = localStorage.getItem("LigaPortugal_Tabelle");

    const storedPastHomeGames = localStorage.getItem("LastHomeGames");

    const storedCloseGames = localStorage.getItem("CloseGames")

    // ##### #####

    // Überprüfen ob Daten schon im Localen-Speicher gespeichert sind:
    if (
      storedPortugalLeagues &&
      storedLeagueTable &&
      storedPastHomeGames &&
      currentDate === savedDate
    ) {
      setPortugalLeagues(JSON.parse(storedPortugalLeagues));
      setLigaPortugal(JSON.parse(storedLeagueTable));
      setLastHomeGames(JSON.parse(storedPastHomeGames));
      setLoading(false);
      console.log("Datensatz aus dem LocalStorage genommen");
      // console.log(portugalLeagues);
    } else {
      fetchPortugueseLeagues();
      fetchLigaPortugalStandings();
      fetchPastLeagueGames();
      saveDate();
      console.log("Daten wurden neu gefetched");
      setLoading(false)
    }
  }, []);


  // ==========

  return (
    <>
      {loading ? (
        <h1>Daten werden geladen</h1>
      ) : (
        <>
          <Header />
          <main>
            <Outlet />
          </main>
        </>
      )}
    </>
  );
}
