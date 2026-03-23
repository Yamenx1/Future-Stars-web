/*
 * Future Stars - app.js
 * loads player data and renders cards + table
 * data is from the 2025-26 season, processed by our Java program
 * 96 players from 13+ leagues
 */

var players = [];
var sortCol = null;
var sortDir = "desc";

// player data (output from FutureStarPreprocessor.java - 96 players, all under 24)
var csvData = `Name,Age,Nationality,Club,League,Position,MinutesPlayed,Goals,Assists,ShotsOnTarget,DribblesCompleted,PassAccuracy,Tackles,Interceptions,GoalsPer90,AssistsPer90,FutureStarScore
Lamine Yamal,18,Spain,Barcelona,La Liga,RW,2900,20,24,82,92,84,20,12,0.62,0.74,19.75
Jude Bellingham,22,England,Real Madrid,La Liga,AM,2800,18,9,66,50,86,32,18,0.58,0.29,12.61
Florian Wirtz,22,Germany,Liverpool,Premier League,AM,2600,14,12,54,58,88,26,16,0.48,0.42,13.48
Jamal Musiala,22,Germany,Bayern Munich,Bundesliga,AM,2700,16,11,56,80,88,28,18,0.53,0.37,15.73
Cole Palmer,23,England,Chelsea,Premier League,RW,2900,22,14,86,48,85,22,12,0.68,0.43,12.47
Pedri,23,Spain,Barcelona,La Liga,CM,2500,9,10,28,32,92,34,24,0.32,0.36,9.99
Warren Zaire-Emery,20,France,PSG,Ligue 1,CM,2500,7,9,26,28,89,52,36,0.25,0.32,10.65
Bukayo Saka,24,England,Arsenal,Premier League,RW,2900,16,16,60,46,86,28,16,0.5,0.5,11.38
Xavi Simons,22,Netherlands,Barcelona,La Liga,AM,2600,13,15,50,58,84,30,22,0.45,0.52,13.39
Kobbie Mainoo,20,England,Man United,Premier League,CM,2400,5,6,18,22,86,48,32,0.19,0.23,9.51
Pau Cubarsi,18,Spain,Barcelona,La Liga,CB,2300,2,1,8,12,91,58,44,0.08,0.04,9.06
Endrick,19,Brazil,Real Madrid,La Liga,CF,1500,8,4,30,24,78,12,8,0.48,0.24,10.72
Gavi,21,Spain,Barcelona,La Liga,CM,2200,5,7,18,24,88,42,26,0.2,0.29,9.49
Eduardo Camavinga,23,France,Real Madrid,La Liga,CM,2400,4,6,14,26,90,52,36,0.15,0.23,8.5
Joao Neves,20,Portugal,PSG,Ligue 1,CM,2600,6,10,22,24,91,58,42,0.21,0.35,10.27
Mathys Tel,19,France,Bayern Munich,Bundesliga,CF,1800,9,5,32,34,80,16,10,0.45,0.25,11.75
Alejandro Garnacho,21,Argentina,Napoli,Serie A,LW,2400,11,7,42,60,77,20,14,0.41,0.26,13.11
Savinho,21,Brazil,Man City,Premier League,RW,2000,6,8,24,54,82,16,10,0.27,0.36,12.53
Nico Williams,24,Spain,Barcelona,La Liga,LW,2800,12,16,44,70,84,22,16,0.39,0.51,13.39
Benjamin Sesko,22,Slovenia,Arsenal,Premier League,CF,2600,22,6,68,28,80,20,14,0.76,0.21,10.5
Arda Guler,20,Turkey,Real Madrid,La Liga,AM,1800,10,6,32,28,87,14,10,0.5,0.3,11.25
Rasmus Hojlund,23,Denmark,Napoli,Serie A,CF,2300,11,4,42,20,79,16,10,0.43,0.16,8.05
Evan Ferguson,21,Ireland,Roma,Serie A,CF,1800,7,4,28,16,78,14,10,0.35,0.2,8.45
Johan Bakayoko,22,Belgium,PSV,Eredivisie,RW,2500,14,10,48,58,84,22,16,0.5,0.36,13.23
Antonio Nusa,20,Norway,RB Leipzig,Bundesliga,RW,1800,6,7,22,44,81,14,10,0.3,0.35,12.05
Desire Doue,20,France,PSG,Ligue 1,AM,2000,8,8,28,48,82,20,14,0.36,0.36,12.7
Kenan Yildiz,20,Turkey,Juventus,Serie A,LW,2300,9,6,30,42,83,18,12,0.35,0.23,11.88
Jorrel Hato,19,Netherlands,Ajax,Eredivisie,LB,2400,5,7,16,28,86,46,34,0.19,0.26,10.69
Oscar Gloukh,21,Israel,Sporting CP,Liga Portugal,AM,2200,12,11,40,46,85,24,18,0.49,0.45,12.72
Castello Lukeba,22,France,RB Leipzig,Bundesliga,CB,2400,2,2,8,10,89,58,44,0.08,0.08,6.83
Leny Yoro,19,France,Man United,Premier League,CB,1800,1,1,6,8,88,44,34,0.05,0.05,7.95
Kacper Urbanski,20,Poland,Bologna,Serie A,CM,1800,4,6,14,22,85,32,24,0.2,0.3,9.65
Jamie Bynoe-Gittens,21,England,Dortmund,Bundesliga,LW,1800,7,6,22,40,79,12,10,0.35,0.3,11.1
Karim Adeyemi,23,Germany,Dortmund,Bundesliga,LW,1800,8,6,34,44,79,18,12,0.4,0.3,10.65
Harvey Elliott,22,England,Liverpool,Premier League,AM,1800,5,7,18,26,86,22,16,0.25,0.35,9.35
Ansu Fati,22,Spain,Sevilla,La Liga,LW,1200,4,3,16,20,81,12,8,0.3,0.23,8.4
Youssoufa Moukoko,20,Germany,Nice,Ligue 1,CF,1400,5,3,20,20,76,10,6,0.32,0.19,9.15
Facundo Pellistri,24,Uruguay,Man United,Premier League,RW,1200,3,4,12,24,80,14,10,0.23,0.3,7.68
Adam Wharton,21,England,Crystal Palace,Premier League,CM,2200,4,5,12,16,90,50,34,0.16,0.2,8.5
Enzo Fernandez,24,Argentina,Chelsea,Premier League,CM,2700,6,9,20,22,90,50,36,0.2,0.3,7.9
Moises Caicedo,24,Ecuador,Chelsea,Premier League,DM,2600,5,4,16,14,88,62,44,0.17,0.14,6.6
Jeremy Doku,23,Belgium,Man City,Premier League,LW,1600,3,6,14,66,80,12,8,0.17,0.34,12.28
Estevao Willian,18,Brazil,Chelsea,Premier League,RW,1600,7,8,26,48,81,10,6,0.39,0.45,13.93
Nico Paz,21,Argentina,Como,Serie A,AM,2200,9,10,32,36,85,18,14,0.37,0.41,11.27
Roony Bardghji,18,Sweden,Barcelona,La Liga,RW,1200,4,3,16,22,80,8,6,0.3,0.23,10.55
Archie Gray,19,England,Tottenham,Premier League,CM,2000,3,4,10,14,87,46,32,0.14,0.18,9.02
Ousmane Diomande,21,Ivory Coast,Sporting CP,Liga Portugal,CB,2400,4,2,10,12,88,60,42,0.15,0.08,7.7
Ryan Gravenberch,23,Netherlands,Liverpool,Premier League,CM,2700,5,8,18,22,90,48,34,0.17,0.27,8.23
Michael Olise,24,France,Bayern Munich,Bundesliga,RW,2400,12,10,48,52,84,14,10,0.45,0.38,11.5
Lois Openda,24,Belgium,RB Leipzig,Bundesliga,CF,2700,24,8,82,34,78,22,14,0.8,0.27,10.23
Khvicha Kvaratskhelia,24,Georgia,PSG,Ligue 1,LW,2400,12,10,44,68,81,16,12,0.45,0.38,12.95
Milos Kerkez,21,Hungary,Bournemouth,Premier League,LB,2400,2,6,10,20,84,42,30,0.08,0.23,8.38
Rico Lewis,20,England,Man City,Premier League,RB,2000,3,5,10,18,89,38,28,0.14,0.23,9.11
Malo Gusto,22,France,Chelsea,Premier League,RB,2300,3,6,12,22,87,40,30,0.12,0.23,8.37
Tyler Dibling,18,England,Southampton,Premier League,RW,1800,5,4,20,38,79,14,10,0.25,0.2,11.9
Savio Moreira,21,Brazil,Girona,La Liga,RW,2200,8,10,28,54,82,16,12,0.33,0.41,12.8
Alejandro Baena,23,Spain,Villarreal,La Liga,AM,2400,8,10,30,32,87,26,18,0.3,0.38,9.7
Dario Osorio,21,Chile,Midtjylland,Danish SL,RW,2200,10,8,34,48,81,16,12,0.41,0.33,12.23
El Chadaille Bitshiabu,19,France,RB Leipzig,Bundesliga,CB,1600,1,1,6,8,87,40,30,0.06,0.06,7.93
Abdoullah Ba,21,France,Sunderland,Championship,AM,2000,6,7,22,36,82,18,14,0.27,0.32,10.64
Omari Kellyman,19,England,Chelsea,Premier League,AM,1000,2,3,8,16,80,10,6,0.18,0.27,9.18
Kendry Paez,17,Ecuador,Chelsea,Premier League,AM,800,3,3,10,14,81,8,6,0.34,0.34,10.64
Claudio Echeverri,18,Argentina,Man City,Premier League,AM,1000,3,4,12,20,83,10,6,0.27,0.36,10.68
Joao Pedro,23,Brazil,Brighton,Premier League,CF,2400,12,7,44,30,82,16,12,0.45,0.26,9.48
Morgan Rogers,22,England,Aston Villa,Premier League,AM,2200,8,8,30,40,82,22,14,0.33,0.33,10.74
Noni Madueke,22,England,Chelsea,Premier League,RW,2200,10,6,40,44,81,14,10,0.41,0.25,11.17
Luka Sucic,22,Croatia,Real Sociedad,La Liga,CM,2000,5,6,20,18,85,34,24,0.23,0.27,8.27
Takefusa Kubo,24,Japan,Real Sociedad,La Liga,RW,2400,10,8,38,50,83,16,12,0.38,0.3,10.88
Santiago Gimenez,23,Mexico,Feyenoord,Eredivisie,CF,2200,16,5,56,18,79,14,10,0.65,0.2,8.62
Yeremy Pino,22,Spain,Villarreal,La Liga,RW,2000,8,6,30,34,82,14,10,0.36,0.27,10.12
Adam Hlozek,23,Czech Republic,Leverkusen,Bundesliga,CF,1600,6,5,24,20,80,14,8,0.34,0.28,8.07
Micky van de Ven,24,Netherlands,Tottenham,Premier League,CB,2500,3,2,10,16,89,54,40,0.11,0.07,6.52
Amadou Onana,24,Belgium,Aston Villa,Premier League,DM,2400,5,4,16,14,86,58,40,0.19,0.15,6.56
Josko Gvardiol,24,Croatia,Man City,Premier League,CB,2600,4,3,14,12,88,50,38,0.14,0.1,6.22
Vitinha,24,Portugal,PSG,Ligue 1,CM,2700,7,10,24,30,91,44,30,0.23,0.33,8.92
Igor Paixao,24,Brazil,Feyenoord,Eredivisie,LW,2600,12,14,42,60,83,18,14,0.42,0.48,12.37
Iliman Ndiaye,24,Senegal,Everton,Premier League,AM,2100,8,5,30,44,81,18,14,0.34,0.21,9.91
Geovany Quenda,17,Portugal,Sporting CP,Liga Portugal,RW,1400,3,5,14,30,80,12,8,0.19,0.32,11.72
Yankuba Minteh,20,Gambia,Brighton,Premier League,RW,1600,5,4,18,36,78,10,8,0.28,0.23,10.79
Francisco Conceicao,22,Portugal,Juventus,Serie A,RW,1900,6,8,24,46,81,12,10,0.28,0.38,11.26
Gabri Veiga,23,Spain,Al-Ahli,Saudi Pro League,CM,2400,10,7,38,26,85,40,28,0.38,0.26,9.0
Amine Gouiri,24,France,Rennes,Ligue 1,AM,2200,9,7,34,28,83,18,14,0.37,0.29,8.63
Youssef En-Nesyri,24,Morocco,Fenerbahce,Super Lig,CF,2200,14,4,48,16,77,14,10,0.57,0.16,7.5
Cher Ndour,20,Spain,Besiktas,Super Lig,CM,1800,3,5,12,16,84,38,26,0.15,0.25,8.75
Brenden Aaronson,24,USA,Union Berlin,Bundesliga,AM,2000,6,7,22,24,82,20,14,0.27,0.32,7.94
Caden Clark,22,USA,New York Red Bulls,MLS,CM,1600,4,6,14,18,83,28,20,0.23,0.34,8.3
Thiago Almada,24,Argentina,Lyon,Ligue 1,AM,2100,7,9,28,38,84,16,12,0.3,0.39,9.67
Facundo Buonanotte,20,Argentina,Leicester City,Championship,AM,1800,6,5,22,32,82,14,10,0.3,0.25,10.7
James McAtee,23,England,Man City,Premier League,AM,1200,4,3,14,18,84,12,8,0.3,0.23,7.85
Gianluca Busio,22,USA,Venezia,Serie A,CM,2000,3,5,12,14,84,34,24,0.14,0.23,7.46
Andrey Santos,21,Brazil,Strasbourg,Ligue 1,CM,1800,4,4,14,16,83,36,26,0.2,0.2,8.25
Julio Enciso,20,Paraguay,Brighton,Premier League,AM,1400,5,4,18,26,79,10,6,0.32,0.26,10.03
Oscar Mingueza,24,Spain,Celta Vigo,La Liga,RB,2200,3,6,10,14,84,40,30,0.12,0.25,6.46
Cher Ndour,20,Italy,Besiktas,Super Lig,CM,1800,3,4,12,14,84,36,24,0.15,0.2,8.45
Ben Doak,19,Scotland,Middlesbrough,Championship,RW,1600,5,6,18,34,79,10,8,0.28,0.34,11.37
Mohamed Simakan,24,France,RB Leipzig,Bundesliga,CB,2200,1,1,6,6,87,52,38,0.04,0.04,5.15
Waheeb,22,Saudi Arabia,Al-Hilal,Saudi Pro League,RW,2100,8,6,30,28,83,20,14,0.34,0.26,9.45`;

// parse csv
function parseData() {
    var lines = csvData.trim().split("\n");
    var headers = lines[0].split(",");
    players = [];
    for (var i = 1; i < lines.length; i++) {
        var vals = lines[i].split(",");
        var obj = {};
        for (var j = 0; j < headers.length; j++) {
            var v = vals[j].trim();
            obj[headers[j].trim()] = isNaN(v) ? v : parseFloat(v);
        }
        players.push(obj);
    }
    players.sort(function (a, b) { return b.FutureStarScore - a.FutureStarScore; });
}

function getPosCat(pos) {
    if (["CF", "RW", "LW", "ST"].indexOf(pos) !== -1) return "fw";
    if (["AM", "CM", "DM"].indexOf(pos) !== -1) return "mf";
    if (["CB", "LB", "RB"].indexOf(pos) !== -1) return "df";
    if (pos === "GK") return "gk";
    return "fw";
}

function getPosName(cat) {
    if (cat === "fw") return "forward";
    if (cat === "mf") return "midfielder";
    if (cat === "df") return "defender";
    return "";
}

// league flag emojis to make it feel more football-y
function getLeagueFlag(league) {
    var flags = {
        "Premier League": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        "La Liga": "🇪🇸",
        "Bundesliga": "🇩🇪",
        "Serie A": "🇮🇹",
        "Ligue 1": "🇫🇷",
        "Eredivisie": "🇳🇱",
        "Liga Portugal": "🇵🇹",
        "Super Lig": "🇹🇷",
        "MLS": "🇺🇸",
        "Championship": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        "Danish SL": "🇩🇰",
        "Saudi Pro League": "🇸🇦"
    };
    return flags[league] || "🌍";
}

function fillLeagues() {
    var leagues = [];
    for (var i = 0; i < players.length; i++) {
        if (leagues.indexOf(players[i].League) === -1) leagues.push(players[i].League);
    }
    leagues.sort();
    var sel = document.getElementById("leagueFilter");
    for (var i = 0; i < leagues.length; i++) {
        var opt = document.createElement("option");
        opt.value = leagues[i];
        opt.textContent = getLeagueFlag(leagues[i]) + " " + leagues[i];
        sel.appendChild(opt);
    }
}

function applyFilters() {
    var pos = document.getElementById("positionFilter").value;
    var league = document.getElementById("leagueFilter").value;
    var search = document.getElementById("searchBox").value.toLowerCase();

    var filtered = [];
    for (var i = 0; i < players.length; i++) {
        var p = players[i];
        if (pos !== "all" && getPosName(getPosCat(p.Position)) !== pos) continue;
        if (league !== "all" && p.League !== league) continue;
        if (search && p.Name.toLowerCase().indexOf(search) === -1 && p.Club.toLowerCase().indexOf(search) === -1) continue;
        filtered.push(p);
    }
    renderCards(filtered);
    renderTable(filtered);
}

function updateSummary() {
    document.getElementById("totalPlayers").textContent = players.length;
    var totalAge = 0;
    for (var i = 0; i < players.length; i++) totalAge += players[i].Age;
    document.getElementById("avgAge").textContent = (totalAge / players.length).toFixed(1);
    document.getElementById("topScore").textContent = players[0].FutureStarScore;
    var leagues = [];
    for (var i = 0; i < players.length; i++) {
        if (leagues.indexOf(players[i].League) === -1) leagues.push(players[i].League);
    }
    document.getElementById("leagueCount").textContent = leagues.length;
}

function renderTop3() {
    var medals = ["🥇", "🥈", "🥉"];
    var html = "";
    for (var i = 0; i < 3 && i < players.length; i++) {
        var p = players[i];
        var flag = getLeagueFlag(p.League);
        html += '<div class="top-card">';
        html += '<div class="medal">' + medals[i] + '</div>';
        html += '<div class="top-name">' + p.Name + '</div>';
        html += '<div class="top-club">' + flag + ' ' + p.Club + ' | ' + p.Position + ' | Age ' + p.Age + '</div>';
        html += '<div class="top-score">' + p.FutureStarScore + '</div>';
        html += '<div class="top-score-label">Future Star Score</div>';
        html += '<div class="top-stats">';
        html += '<span>⚽ ' + p.Goals + '</span>';
        html += '<span>🎯 ' + p.Assists + '</span>';
        html += '<span>📊 ' + p.GoalsPer90 + '/90</span>';
        html += '</div></div>';
    }
    document.getElementById("top3Area").innerHTML = html;
}

function renderCards(list) {
    var html = "";
    if (list.length === 0) {
        html = '<div class="no-results">No players found ⚽</div>';
    }
    for (var i = 0; i < list.length; i++) {
        var p = list[i];
        var cat = getPosCat(p.Position);
        var flag = getLeagueFlag(p.League);
        var rank = 0;
        for (var j = 0; j < players.length; j++) {
            if (players[j].Name === p.Name) { rank = j + 1; break; }
        }
        html += '<div class="card">';
        html += '<div class="card-top"><span class="card-rank">' + rank + '</span>';
        html += '<span class="card-pos ' + cat + '">' + p.Position + '</span></div>';
        html += '<div class="card-name">' + p.Name + '</div>';
        html += '<div class="card-meta">' + flag + ' ' + p.Club + ' · ' + p.League + ' · Age ' + p.Age + '</div>';
        html += '<div class="card-score-row"><span class="card-score-label">⭐ Star Score</span>';
        html += '<span class="card-score-num">' + p.FutureStarScore + '</span></div>';
        html += '<div class="card-stats">';
        html += '<div><strong>' + p.Goals + '</strong><span>Goals</span></div>';
        html += '<div><strong>' + p.Assists + '</strong><span>Assists</span></div>';
        html += '<div><strong>' + p.GoalsPer90 + '</strong><span>G/90</span></div>';
        html += '<div><strong>' + p.DribblesCompleted + '</strong><span>Dribbles</span></div>';
        html += '</div></div>';
    }
    document.getElementById("cardsArea").innerHTML = html;
}

function renderTable(list) {
    var cols = ["Name", "Age", "Nationality", "Club", "League", "Position", "Goals", "Assists", "GoalsPer90", "PassAccuracy", "FutureStarScore"];
    var labels = ["Name", "Age", "Nat.", "Club", "League", "Pos", "⚽", "🎯", "G/90", "Pass%", "Score"];

    var headHtml = "";
    for (var i = 0; i < cols.length; i++) {
        var cls = sortCol === cols[i] ? sortDir : "";
        headHtml += '<th class="' + cls + '" onclick="doSort(\'' + cols[i] + '\')">' + labels[i] + '</th>';
    }
    document.getElementById("tHead").innerHTML = headHtml;

    var bodyHtml = "";
    for (var i = 0; i < list.length; i++) {
        bodyHtml += "<tr>";
        for (var j = 0; j < cols.length; j++) {
            var val = list[i][cols[j]];
            if (cols[j] === "FutureStarScore") {
                bodyHtml += '<td style="font-weight:700;color:#4caf50">' + val + '</td>';
            } else if (cols[j] === "League") {
                bodyHtml += '<td>' + getLeagueFlag(val) + ' ' + val + '</td>';
            } else {
                bodyHtml += "<td>" + val + "</td>";
            }
        }
        bodyHtml += "</tr>";
    }
    document.getElementById("tBody").innerHTML = bodyHtml;
}

function doSort(col) {
    if (sortCol === col) {
        sortDir = (sortDir === "asc") ? "desc" : "asc";
    } else {
        sortCol = col;
        sortDir = "desc";
    }
    players.sort(function (a, b) {
        if (typeof a[col] === "number") return sortDir === "asc" ? a[col] - b[col] : b[col] - a[col];
        return sortDir === "asc" ? String(a[col]).localeCompare(String(b[col])) : String(b[col]).localeCompare(String(a[col]));
    });
    applyFilters();
}

window.onload = function () {
    parseData();
    fillLeagues();
    updateSummary();
    renderTop3();
    renderCards(players);
    renderTable(players);
};
