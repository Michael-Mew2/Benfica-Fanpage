import { createContext, useState } from "react";

export const InitialContext = createContext();

export default function InitialProvider({ children }) {
  // # State Variablen:
  const [loading, setLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  // const [today, setToday] = useState("");
  // ## Ge-fetchte Daten:
  const [portugalLeagues, setPortugalLeagues] = useState(null);
  const [ligaPortugal, setLigaPortugal] = useState(null);
  // Letzte (heim-)Liga-Spiele fetchen:
  const [lastHomeGames, setLastHomeGames] = useState(null)

  async function fetchPortugueseLeagues() {
    try {
      const url = `https://www.thesportsdb.com//api/v1/json/3/search_all_leagues.php?c=Portugal&s=Soccer`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      localStorage.setItem("PortugalLeagues", JSON.stringify(result));
    //   console.log(result);

      setPortugalLeagues(result);
      setIsLoaded(true);
    } catch (error) {
      console.error("Fehler beim Laden der Ligen:", error);
      setIsLoaded(false);
    } finally {
      // setLoading(false);
    }
  }

  // ----------

  async function fetchLigaPortugalStandings() {
    try {
      const url = `https://www.thesportsdb.com///api/v1/json/3/lookuptable.php?l=4344&s=2024-2025`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      localStorage.setItem("LigaPortugal_Tabelle", JSON.stringify(result));
    //   console.log(result);

      setLigaPortugal(result);
      setIsLoaded(true);
    } catch (error) {
      console.error(
        "Fehler beim Laden der Liga-Tabelle (Liga Portugal):",
        error
      );
      setIsLoaded(false);
    } finally {
      // setLoading(false);
    }
  }

  // ----------

  async function saveDate() {
    const today = new Date().toJSON().slice(0, 10);
    localStorage.setItem("SavedDate", today);
  }

  // ----------

 // Letzte (Heim-)Spiele fetchen:
  async function fetchPastLeagueGames() {
    try {
        const url = "https://www.thesportsdb.com/api/v1/json/3/eventslast.php?id=134108"

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Fehler beim fetchen des nächsten Spiels: ${response.status}`);
        }

        const result = await response.json();
        localStorage.setItem("LastHomeGames", JSON.stringify(result));
        console.log("Past Games", result);

        setLastHomeGames(result);
        setIsLoaded(true)
        
    } catch (error) {
     console.error("Fehler beim speichern der Daten:", error)   
    }
}

  // ==========

  return (
    <InitialContext.Provider
      value={{
        loading,
        setIsLoaded,
        // setToday,
        // today,
        portugalLeagues,
        ligaPortugal,
        setPortugalLeagues,
        setLigaPortugal,
        setLoading,
        fetchPortugueseLeagues,
        fetchLigaPortugalStandings,
        saveDate,
        lastHomeGames,
        setLastHomeGames,
        fetchPastLeagueGames
      }}
    >
      {children}
    </InitialContext.Provider>
  );
}
