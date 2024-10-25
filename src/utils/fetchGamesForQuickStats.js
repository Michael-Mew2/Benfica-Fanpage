export default async function fetchGamesForQuickStats(leagueId, gameId) {
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