import React, { useEffect, useState } from "react";
import Hero from "../../components/Hero/Hero";
import styles from "./Home.module.css";

export default function Home() {
  const [ligaRankings, setLigaRankings] = useState([]);

  const firstLeagueStandings = JSON.parse(
    localStorage.getItem("LigaPortugal_Tabelle")
  );
  const firstLeagueTable = firstLeagueStandings.table;

  const portugueseLeagues = JSON.parse(localStorage.getItem("PortugalLeagues"));

  useEffect(() => {
    let nextToBenfica = [];
    const benficaLeaguePlace = firstLeagueTable.find(
      (team) => team.idTeam === "134108"
    );

    const betterThanBenfica = firstLeagueTable.filter(
      (team) =>
        parseInt(team.intRank) < parseInt(benficaLeaguePlace.intRank) &&
        parseInt(team.intRank) > parseInt(benficaLeaguePlace.intRank) - 6
    );

    const worserThanBenfica = firstLeagueTable.filter(
      (team) =>
        parseInt(team.intRank) > parseInt(benficaLeaguePlace.intRank) &&
        parseInt(team.intRank) < parseInt(benficaLeaguePlace.intRank) + 6
    );

    nextToBenfica.push(...betterThanBenfica);
    nextToBenfica.push(...worserThanBenfica);
    nextToBenfica.push(benficaLeaguePlace);

    nextToBenfica.sort((a, b) => parseInt(a.intRank) - parseInt(b.intRank));
    // console.log("höher in der liga", nextToBenfica);

    setLigaRankings(nextToBenfica);
  }, []);

  return (
    <div className={styles.home}>
      <Hero />
      <div className={styles.mainContent}>
        <div className={styles.introduction}>
          <h2>Willkommen auf Michael's Benfica-Fanpage</h2>
          <p>
            {" "}
            Hier ist noch nicht viel und das was da ist, ist ziemlich broken.
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            architecto laborum eos ipsam, sit culpa provident suscipit dolorum!
            Fuga, illum. Error ipsum reiciendis voluptas, distinctio sequi dolor
            voluptatem sit quidem repellendus! Dolorem commodi culpa, id
            similique quod minima vitae aliquam, obcaecati tempora impedit
            voluptate ad provident facere iusto deleniti consequatur natus
            doloremque in odit dolor tenetur! Doloremque, hic reiciendis!
            Eveniet in unde officia, atque, nisi quisquam incidunt enim magni
            reiciendis aliquid maiores fugit. Aut odio adipisci reiciendis illo
            voluptatem error quod eligendi nisi qui deleniti vero ipsam, unde
            sint dicta fuga. Quas in eius sapiente enim! Expedita in nobis, vero
            aperiam aut mollitia est quisquam iure, sequi minima nisi. Quaerat
            alias tempore quod possimus voluptas accusamus sapiente libero quasi
            numquam quisquam velit atque at itaque deleniti inventore
            perspiciatis perferendis molestias ea quia, modi delectus enim
            ipsum! Consectetur, distinctio! Culpa voluptates, optio magnam fuga
            ipsum explicabo, sit cumque neque non impedit doloribus ullam?
            Cupiditate vitae unde quidem commodi error mollitia at laborum.
            Inventore obcaecati maxime voluptas. A doloremque ipsa quasi vel
            praesentium neque minus ab? Maxime dolores consequatur blanditiis in
            porro, eum facilis voluptatum cumque quidem at dolor ratione
            laudantium minima, commodi, ipsum magnam error rerum! Asperiores,
            cum ut debitis nulla deleniti eligendi nobis, id aperiam reiciendis
            at, ducimus sit corrupti a praesentium commodi. Repellendus
            repudiandae deserunt consequuntur voluptas vitae ea dolore a. Nulla
            ipsum expedita dolorem in distinctio repudiandae molestias quo
            cupiditate quia, quas eaque explicabo velit repellendus modi sed eum
            consequuntur odio, ab ullam nesciunt tempore pariatur eveniet illum
            tempora. Dicta mollitia, eveniet sint atque architecto temporibus.
            Ipsam adipisci sint ratione! Alias saepe, perferendis repudiandae
            quod, fuga totam deleniti ut quaerat optio asperiores ab corrupti,
            necessitatibus maiores quo tempore praesentium veritatis suscipit
            aspernatur nemo vero sunt! Ipsam, necessitatibus impedit? Accusamus
            aliquid id sequi illo eveniet, excepturi necessitatibus laudantium
            aspernatur ea? Doloremque aliquid maxime nihil tenetur.
            Necessitatibus nihil tempore praesentium debitis ullam minus
            molestias sapiente ut quo voluptatibus accusantium corporis
            reprehenderit excepturi quaerat voluptate cum fuga, rerum qui sed
            iste odit quia. Consectetur nemo sed ut dicta voluptatibus,
            pariatur, dolore officiis quibusdam suscipit itaque odit nihil iusto
            ipsam libero sapiente perspiciatis corrupti ullam provident repellat
            explicabo ea delectus. Facilis tenetur quibusdam reiciendis, ipsum
            quasi consequuntur. Harum autem velit totam repudiandae id earum
            repellendus molestiae eveniet maiores obcaecati neque eligendi, a
            iusto animi perferendis labore ut nulla cumque! Nihil culpa at in
            laboriosam itaque quia repellat tempore. Nulla possimus sunt laborum
            nam inventore rem, in commodi, molestias quasi facilis corporis
            quaerat atque, nemo totam tempore corrupti minus modi? Esse deleniti
            fuga incidunt possimus modi optio et rerum, quos vero officiis. Eius
            veritatis totam sed nihil qui magnam asperiores omnis at. Iusto
            velit labore numquam saepe error accusamus alias similique,
            distinctio cum ipsum nulla itaque inventore eius minus, rem atque
            neque, aliquam odio dolorem? Esse explicabo magni tempore ullam,
            sequi earum provident praesentium odio doloremque itaque modi
            veritatis cumque maiores perspiciatis. Sed sapiente similique ipsum
            mollitia velit. Non libero adipisci assumenda eum error neque
            nostrum veritatis cupiditate quidem quas? Quae, velit autem?
          </p>
        </div>
        {/* ---------- */}
        <div className={styles.standings}>
          {firstLeagueStandings && firstLeagueStandings.table ? (
            <div className={styles.firstLeague}>
              <div className={styles.table}>
                <div className={styles.innerTable}>
                  <div className={styles.row}>
                    <div className={styles.rank}>Pos.</div>
                    <div className={styles.team}>Team</div>
                    <div className={styles.gamesPlayed}>Sp</div>
                    <div className={styles.win}>S</div>
                    <div className={styles.draw}>U</div>
                    <div className={styles.loss}>N</div>
                    <div className={styles.points}>Punkte</div>
                  </div>
                  {ligaRankings.map((pos) => (
                    <div
                      className={`${styles.row} ${
                        pos.idTeam === "134108" ? styles.benfica : ""
                      }
                      ${
                        pos.intRank === "4"
                          ? styles.conferenceLeague
                          : pos.intRank === "3"
                          ? styles.europaLeague
                          : pos.intRank === "2"
                          ? styles.championsLeague
                          : pos.intRank === "1"
                          ? styles.champion
                          : ""
                      }
                      ${
                        pos.intRank === "16"
                          ? styles.relegationPlayoff
                          : pos.intRank === "17" || pos.intRank === "18"
                          ? styles.relegation
                          : ""
                      }`}
                      key={pos.idStanding}
                    >
                      <div className={styles.rank}>{pos.intRank}</div>
                      <div className={styles.team}>{pos.strTeam}</div>
                      <div className={styles.gamesPlayed}>{pos.intPlayed}</div>
                      <div className={styles.win}>{pos.intWin}</div>
                      <div className={styles.draw}>{pos.intDraw}</div>
                      <div className={styles.loss}>{pos.intLoss}</div>
                      <div className={styles.points}>{pos.intPoints}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p>Keine Daten vorhanden :P</p>
          )}
        </div>
      </div>
    </div>
  );
}
