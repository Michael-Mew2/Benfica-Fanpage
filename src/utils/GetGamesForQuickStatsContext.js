import compareFetchedGames from "./compareFetchedGamesForQuickStats.js";

export default async function getGamesForQuickStats(
  leagueId,
  lastHomeGames,
  setLastHomeGames
) {
  if (!lastHomeGames || !lastHomeGames.results) return;

  const today = new Date();

  const filteredByCompetition = lastHomeGames.results.filter(
    (game) => game.idLeague === leagueId
  );

  const sortedByDate = filteredByCompetition.sort(
    (a, b) => new Date(a.dateEvent) - new Date(b.dateEvent)
  );

  let lastGame = sortedByDate[sortedByDate.length - 1];

  let nextGameId = sortedByDate.length >0 ? parseInt(lastGame.intRound) + 1 : 0;

  const pastAndNextGame = compareFetchedGames(leagueId, lastGame, nextGameId, today, sortedByDate)
}
