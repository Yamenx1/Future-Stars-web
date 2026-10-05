/*
 * Future Stars - app.js
 * loads player data and renders cards + table
 * data is from the 2025-26 season, processed by our Java program
 * 150 players from 15 leagues, all aged 22 and under
 */

var players = [];
var playersByScore = [];
var sortCol = null;
var sortDir = "desc";

// player data (output from FutureStarPreprocessor.java - 150 players, all under 22)
var csvData = `
Name,Age,Nationality,Club,League,Position,MinutesPlayed,Goals,Assists,ShotsOnTarget,DribblesCompleted,PassAccuracy,Tackles,Interceptions,GoalsPer90,AssistsPer90,FutureStarScore
Lamine Yamal,18,Spain,Barcelona,La Liga,RW,2900,20,24,82,92,84,20,12,0.62,0.74,18.75
Jude Bellingham,22,England,Real Madrid,La Liga,AM,2800,18,9,66,50,86,32,18,0.58,0.29,11.61
Florian Wirtz,22,Germany,Liverpool,Premier League,AM,2600,14,12,54,58,88,26,16,0.48,0.42,12.48
Jamal Musiala,22,Germany,Bayern Munich,Bundesliga,AM,2700,16,11,56,80,88,28,18,0.53,0.37,14.73
Warren Zaire-Emery,20,France,PSG,Ligue 1,CM,2500,7,9,26,28,89,52,36,0.25,0.32,9.65
Xavi Simons,22,Netherlands,Barcelona,La Liga,AM,2600,13,15,50,58,84,30,22,0.45,0.52,12.39
Kobbie Mainoo,20,England,Man United,Premier League,CM,2400,5,6,18,22,86,48,32,0.19,0.23,8.51
Pau Cubarsi,18,Spain,Barcelona,La Liga,CB,2300,2,1,8,12,91,58,44,0.08,0.04,8.06
Endrick,19,Brazil,Real Madrid,La Liga,CF,1500,8,4,30,24,78,12,8,0.48,0.24,9.72
Gavi,21,Spain,Barcelona,La Liga,CM,2200,5,7,18,24,88,42,26,0.2,0.29,8.49
Joao Neves,20,Portugal,PSG,Ligue 1,CM,2600,6,10,22,24,91,58,42,0.21,0.35,9.27
Mathys Tel,19,France,Bayern Munich,Bundesliga,CF,1800,9,5,32,34,80,16,10,0.45,0.25,10.75
Alejandro Garnacho,21,Argentina,Napoli,Serie A,LW,2400,11,7,42,60,77,20,14,0.41,0.26,12.11
Savinho,21,Brazil,Man City,Premier League,RW,2000,6,8,24,54,82,16,10,0.27,0.36,11.53
Benjamin Sesko,22,Slovenia,Arsenal,Premier League,CF,2600,22,6,68,28,80,20,14,0.76,0.21,9.5
Arda Guler,20,Turkey,Real Madrid,La Liga,AM,1800,10,6,32,28,87,14,10,0.5,0.3,10.25
Evan Ferguson,21,Ireland,Roma,Serie A,CF,1800,7,4,28,16,78,14,10,0.35,0.2,7.45
Johan Bakayoko,22,Belgium,PSV,Eredivisie,RW,2500,14,10,48,58,84,22,16,0.5,0.36,12.23
Antonio Nusa,20,Norway,RB Leipzig,Bundesliga,RW,1800,6,7,22,44,81,14,10,0.3,0.35,11.05
Desire Doue,20,France,PSG,Ligue 1,AM,2000,8,8,28,48,82,20,14,0.36,0.36,11.7
Kenan Yildiz,20,Turkey,Juventus,Serie A,LW,2300,9,6,30,42,83,18,12,0.35,0.23,10.88
Jorrel Hato,19,Netherlands,Ajax,Eredivisie,LB,2400,5,7,16,28,86,46,34,0.19,0.26,9.69
Oscar Gloukh,21,Israel,Sporting CP,Liga Portugal,AM,2200,12,11,40,46,85,24,18,0.49,0.45,11.72
Castello Lukeba,22,France,RB Leipzig,Bundesliga,CB,2400,2,2,8,10,89,58,44,0.08,0.08,5.83
Leny Yoro,19,France,Man United,Premier League,CB,1800,1,1,6,8,88,44,34,0.05,0.05,6.95
Kacper Urbanski,20,Poland,Bologna,Serie A,CM,1800,4,6,14,22,85,32,24,0.2,0.3,8.65
Jamie Bynoe-Gittens,21,England,Dortmund,Bundesliga,LW,1800,7,6,22,40,79,12,10,0.35,0.3,10.1
Harvey Elliott,22,England,Liverpool,Premier League,AM,1800,5,7,18,26,86,22,16,0.25,0.35,8.35
Ansu Fati,22,Spain,Sevilla,La Liga,LW,1200,4,3,16,20,81,12,8,0.3,0.23,7.4
Youssoufa Moukoko,20,Germany,Nice,Ligue 1,CF,1400,5,3,20,20,76,10,6,0.32,0.19,8.15
Adam Wharton,21,England,Crystal Palace,Premier League,CM,2200,4,5,12,16,90,50,34,0.16,0.2,7.5
Estevao Willian,18,Brazil,Chelsea,Premier League,RW,1600,7,8,26,48,81,10,6,0.39,0.45,12.93
Nico Paz,21,Argentina,Como,Serie A,AM,2200,9,10,32,36,85,18,14,0.37,0.41,10.27
Roony Bardghji,18,Sweden,Barcelona,La Liga,RW,1200,4,3,16,22,80,8,6,0.3,0.23,9.55
Archie Gray,19,England,Tottenham,Premier League,CM,2000,3,4,10,14,87,46,32,0.14,0.18,8.02
Ousmane Diomande,21,Ivory Coast,Sporting CP,Liga Portugal,CB,2400,4,2,10,12,88,60,42,0.15,0.08,6.7
Milos Kerkez,21,Hungary,Bournemouth,Premier League,LB,2400,2,6,10,20,84,42,30,0.08,0.23,7.38
Rico Lewis,20,England,Man City,Premier League,RB,2000,3,5,10,18,89,38,28,0.14,0.23,8.11
Malo Gusto,22,France,Chelsea,Premier League,RB,2300,3,6,12,22,87,40,30,0.12,0.23,7.37
Tyler Dibling,18,England,Southampton,Premier League,RW,1800,5,4,20,38,79,14,10,0.25,0.2,10.9
Savio Moreira,21,Brazil,Girona,La Liga,RW,2200,8,10,28,54,82,16,12,0.33,0.41,11.8
Dario Osorio,21,Chile,Midtjylland,Danish SL,RW,2200,10,8,34,48,81,16,12,0.41,0.33,11.23
El Chadaille Bitshiabu,19,France,RB Leipzig,Bundesliga,CB,1600,1,1,6,8,87,40,30,0.06,0.06,6.93
Abdoullah Ba,21,France,Sunderland,Championship,AM,2000,6,7,22,36,82,18,14,0.27,0.32,9.64
Omari Kellyman,19,England,Chelsea,Premier League,AM,1000,2,3,8,16,80,10,6,0.18,0.27,8.18
Kendry Paez,17,Ecuador,Chelsea,Premier League,AM,800,3,3,10,14,81,8,6,0.34,0.34,9.64
Claudio Echeverri,18,Argentina,Man City,Premier League,AM,1000,3,4,12,20,83,10,6,0.27,0.36,9.68
Morgan Rogers,22,England,Aston Villa,Premier League,AM,2200,8,8,30,40,82,22,14,0.33,0.33,9.74
Noni Madueke,22,England,Chelsea,Premier League,RW,2200,10,6,40,44,81,14,10,0.41,0.25,10.17
Luka Sucic,22,Croatia,Real Sociedad,La Liga,CM,2000,5,6,20,18,85,34,24,0.23,0.27,7.27
Yeremy Pino,22,Spain,Villarreal,La Liga,RW,2000,8,6,30,34,82,14,10,0.36,0.27,9.12
Geovany Quenda,17,Portugal,Sporting CP,Liga Portugal,RW,1400,3,5,14,30,80,12,8,0.19,0.32,10.72
Yankuba Minteh,20,Gambia,Brighton,Premier League,RW,1600,5,4,18,36,78,10,8,0.28,0.23,9.79
Francisco Conceicao,22,Portugal,Juventus,Serie A,RW,1900,6,8,24,46,81,12,10,0.28,0.38,10.26
Caden Clark,22,USA,New York Red Bulls,MLS,CM,1600,4,6,14,18,83,28,20,0.23,0.34,7.3
Facundo Buonanotte,20,Argentina,Leicester City,Championship,AM,1800,6,5,22,32,82,14,10,0.3,0.25,9.7
Gianluca Busio,22,USA,Venezia,Serie A,CM,2000,3,5,12,14,84,34,24,0.14,0.23,6.46
Andrey Santos,21,Brazil,Strasbourg,Ligue 1,CM,1800,4,4,14,16,83,36,26,0.2,0.2,7.25
Julio Enciso,20,Paraguay,Brighton,Premier League,AM,1400,5,4,18,26,79,10,6,0.32,0.26,9.03
Cher Ndour,20,Italy,Besiktas,Super Lig,CM,1800,3,4,12,14,84,36,24,0.15,0.2,7.45
Ben Doak,19,Scotland,Middlesbrough,Championship,RW,1600,5,6,18,34,79,10,8,0.28,0.34,10.37
Waheeb,22,Saudi Arabia,Al-Hilal,Saudi Pro League,RW,2100,8,6,30,28,83,20,14,0.34,0.26,8.49
Ethan Nwaneri,18,England,Arsenal,Premier League,AM,1400,6,4,22,30,82,10,6,0.39,0.26,10.77
Myles Lewis-Skelly,19,England,Arsenal,Premier League,LB,1900,2,4,8,26,87,40,28,0.09,0.19,9.11
Vitor Reis,19,Brazil,Man City,Premier League,CB,1200,1,0,4,6,89,30,24,0.08,0.0,6.78
Jack Hinshelwood,20,England,Brighton,Premier League,CM,1800,3,3,12,16,86,38,26,0.15,0.15,7.65
Harry Amass,18,England,Man United,Premier League,LB,1100,0,2,2,14,84,28,20,0.0,0.16,7.93
Lewis Hall,21,England,Newcastle,Premier League,LB,2200,2,5,8,24,83,44,30,0.08,0.2,7.7
Nico OReilly,20,England,Man City,Premier League,CM,1300,2,3,10,16,85,28,20,0.14,0.21,7.68
Franco Mastantuono,18,Argentina,Real Madrid,La Liga,AM,1500,5,4,20,32,81,10,6,0.3,0.24,10.63
Marc Bernal,18,Spain,Barcelona,La Liga,DM,900,1,1,4,8,88,30,24,0.1,0.1,7.7
Marc Casado,22,Spain,Barcelona,La Liga,CM,2100,1,4,6,12,89,48,36,0.04,0.17,6.12
Raul Asencio,22,Spain,Real Madrid,La Liga,CB,2000,0,1,2,6,90,42,34,0.0,0.05,5.19
Pablo Barrios,22,Spain,Atletico Madrid,La Liga,CM,2300,2,5,10,18,87,46,32,0.08,0.2,6.78
Jesus Rodriguez,19,Spain,Real Betis,La Liga,LW,1400,4,3,16,30,78,10,6,0.26,0.19,9.56
Tom Bischof,20,Germany,Bayern Munich,Bundesliga,CM,1700,4,5,16,22,86,30,22,0.21,0.26,8.66
Assan Ouedraogo,19,Germany,RB Leipzig,Bundesliga,CM,1200,3,2,10,18,82,24,16,0.23,0.15,8.38
Can Uzun,19,Turkey,Frankfurt,Bundesliga,CF,1600,8,3,30,22,77,10,6,0.45,0.17,9.24
Bence Dardai,19,Hungary,Wolfsburg,Bundesliga,AM,1300,4,4,14,24,80,12,8,0.28,0.28,9.28
Nathaniel Brown,22,Germany,Frankfurt,Bundesliga,LB,2100,3,5,10,30,82,40,28,0.13,0.21,7.91
Valentin Carboni,20,Argentina,Genoa,Serie A,AM,1500,4,5,18,30,81,12,8,0.24,0.3,9.37
Aaron Anselmino,20,Argentina,Bologna,Serie A,CB,1400,1,0,4,8,87,36,28,0.06,0.0,6.34
Santiago Castro,21,Argentina,Bologna,Serie A,CF,2000,9,3,36,18,78,12,8,0.41,0.14,7.69
Niccolo Pisilli,20,Italy,Roma,Serie A,CM,1600,3,2,12,16,86,34,24,0.17,0.11,7.63
Eliesse Ben Seghir,20,Morocco,Monaco,Ligue 1,LW,2000,8,6,30,52,80,14,10,0.36,0.27,11.82
Lamine Camara,21,Senegal,Monaco,Ligue 1,CM,1900,3,4,12,20,85,42,30,0.14,0.19,7.56
Ayyoub Bouaddi,18,France,Lille,Ligue 1,CM,1500,1,3,6,16,88,36,26,0.06,0.18,8.54
Guillaume Restes,20,France,Toulouse,Ligue 1,GK,2700,0,1,0,2,76,1,2,0.0,0.03,5.07
Jorthy Mokio,17,Belgium,Ajax,Eredivisie,CB,1300,2,1,6,14,87,34,26,0.14,0.07,8.8
Rayane Bounida,19,Belgium,Ajax,Eredivisie,AM,1100,4,5,16,28,81,8,6,0.33,0.41,10.15
Mika Godts,20,Belgium,Ajax,Eredivisie,LW,1500,5,6,20,38,79,10,8,0.3,0.36,10.37
Rodrigo Mora,18,Portugal,Porto,Liga Portugal,AM,1600,6,5,22,36,82,12,8,0.34,0.28,11.27
Martim Fernandes,19,Portugal,Porto,Liga Portugal,RB,1700,1,5,6,20,84,38,26,0.05,0.26,8.39
Joao Simoes,18,Portugal,Sporting CP,Liga Portugal,CM,1200,2,3,8,16,87,30,22,0.15,0.23,8.85
Chris Rigg,18,England,Sunderland,Championship,CM,2000,4,4,16,24,83,36,26,0.18,0.18,9.45
Tommy Watson,19,England,Sunderland,Championship,LW,1700,6,4,22,34,78,12,8,0.32,0.21,10.18
Semih Kilicsoy,20,Turkey,Besiktas,Super Lig,CF,1700,8,3,30,26,76,10,6,0.42,0.16,8.99
Yusuf Akcicek,19,Turkey,Fenerbahce,Super Lig,CB,1500,1,1,4,8,86,38,30,0.06,0.06,6.9
Talal Haji,18,Saudi Arabia,Al-Riyadh,Saudi Pro League,CF,1200,5,2,18,16,74,8,6,0.38,0.15,8.73
Abbas Al-Hassan,21,Saudi Arabia,Al-Nassr,Saudi Pro League,CM,1400,2,3,8,12,84,32,24,0.13,0.19,6.67
Julian Hall,17,USA,NY Red Bulls,MLS,CF,900,4,2,14,18,75,6,4,0.4,0.2,9.65
Peyton Miller,17,USA,New England,MLS,LB,1300,1,4,6,22,81,30,22,0.07,0.28,9.51
Noah Allen,21,USA,Inter Miami,MLS,LB,1800,1,3,6,18,82,34,24,0.05,0.15,6.85
Mads Hansen,19,Denmark,Nordsjaelland,Danish SL,RW,1800,7,6,26,40,79,12,8,0.35,0.3,11.1
Lucas Hey,22,Denmark,Nordsjaelland,Danish SL,CB,2000,2,1,8,10,87,44,34,0.09,0.05,5.71
Konstantinos Karetsas,17,Greece,Genk,Belgian Pro League,AM,1500,5,6,20,34,81,10,8,0.3,0.36,11.57
Joel Ordonez,21,Ecuador,Club Brugge,Belgian Pro League,CB,2200,2,1,8,10,88,48,36,0.08,0.04,6.23
Chemsdine Talbi,20,Morocco,Club Brugge,Belgian Pro League,RW,1900,8,5,30,44,79,12,8,0.38,0.24,10.96
Lennon Miller,19,Scotland,Celtic,Scottish Premiership,CM,2100,4,6,18,22,84,40,28,0.17,0.26,8.93
James Wilson,18,Scotland,Hearts,Scottish Premiership,CF,1400,7,2,24,14,75,8,6,0.45,0.13,8.76
Karim Konate,21,Ivory Coast,Salzburg,Austrian Bundesliga,CF,1800,11,3,38,20,77,10,6,0.55,0.15,8.3
Samson Baidoo,21,Austria,Salzburg,Austrian Bundesliga,CB,1900,2,1,8,10,86,42,32,0.09,0.05,6.18
Lewis Miley,19,England,Newcastle,Premier League,CM,1500,2,3,8,14,86,32,24,0.12,0.18,7.92
Mikey Moore,18,England,Tottenham,Premier League,LW,900,2,2,8,20,79,6,4,0.2,0.2,8.95
Shea Lacey,18,England,Man United,Premier League,RW,700,1,2,6,18,80,6,4,0.13,0.26,8.7
Jahmai Simpson-Pusey,19,England,Man City,Premier League,CB,800,0,0,2,4,88,22,18,0.0,0.0,6.3
Harrison Armstrong,18,England,Everton,Premier League,CM,900,1,1,4,10,84,24,18,0.1,0.1,7.7
Jayden Meghoma,18,England,Chelsea,Premier League,LB,700,0,1,2,12,82,20,14,0.0,0.13,7.56
Samuel Rak-Sakyi,19,England,Chelsea,Premier League,CM,600,1,1,4,10,83,16,12,0.15,0.15,7.4
Dani Rodriguez,20,Spain,Barcelona,La Liga,LW,800,2,2,8,18,80,8,6,0.23,0.23,7.93
Jesus Fortea,18,Spain,Real Madrid,La Liga,RB,700,0,2,2,12,84,22,16,0.0,0.26,7.91
Thiago Pitarch,18,Spain,Valencia,La Liga,CM,900,1,2,4,12,83,24,18,0.1,0.2,8.05
Iker Bravo,20,Spain,Osasuna,La Liga,CF,1100,3,1,12,12,76,8,6,0.25,0.08,6.9
Pablo Garcia,19,Spain,Real Betis,La Liga,RW,800,2,3,8,20,78,8,6,0.23,0.34,8.75
Felipe Chavez,18,Germany,Bayern Munich,Bundesliga,AM,700,2,2,8,16,81,8,6,0.26,0.26,8.94
Bazoumana Toure,20,Ivory Coast,Hoffenheim,Bundesliga,LW,1200,3,3,12,28,78,10,8,0.23,0.23,8.82
Dzenan Pejcinovic,20,Germany,Wolfsburg,Bundesliga,CF,800,2,1,8,10,75,6,4,0.23,0.11,6.65
Arijon Ibrahimovic,19,Germany,Bayern Munich,Bundesliga,LW,700,1,2,6,16,79,8,6,0.13,0.26,7.95
Francesco Camarda,17,Italy,AC Milan,Serie A,CF,700,2,0,8,10,74,6,4,0.26,0.0,7.97
Jonas Rouhi,20,Sweden,Juventus,Serie A,LB,900,0,1,2,12,82,24,18,0.0,0.1,6.5
Christian Comotto,18,Italy,AC Milan,Serie A,CM,600,0,1,2,8,84,18,14,0.0,0.15,7.3
Simone Pafundi,19,Italy,Udinese,Serie A,AM,800,1,2,6,16,80,8,6,0.11,0.23,7.89
Senny Mayulu,19,France,PSG,Ligue 1,CM,1100,2,2,8,18,87,26,20,0.16,0.16,8.47
Ibrahim Mbaye,17,France,PSG,Ligue 1,RW,700,1,2,6,20,79,6,4,0.13,0.26,9.35
Djylian Nguessan,17,France,Nice,Ligue 1,CF,600,2,0,6,10,75,6,4,0.3,0.0,8.15
Valentin Atangana,20,France,Reims,Ligue 1,CM,1300,1,2,6,14,85,34,26,0.07,0.14,7.13
Kees Smit,19,Netherlands,AZ,Eredivisie,CM,1500,3,3,12,20,84,30,22,0.18,0.18,8.6
Ro-Zangelo Daal,17,Netherlands,AZ,Eredivisie,RW,700,2,2,8,18,78,6,4,0.26,0.26,9.49
Tiago Parente,18,Portugal,Benfica,Liga Portugal,LB,700,0,1,2,10,83,20,14,0.0,0.13,7.41
Afonso Moreira,20,Portugal,Sporting CP,Liga Portugal,LW,800,2,1,8,20,78,8,6,0.23,0.11,7.8
Law McCabe,19,England,Middlesbrough,Championship,CM,800,1,1,4,10,83,22,16,0.11,0.11,7.21
Ajay Matthews,19,England,Middlesbrough,Championship,CF,700,2,1,8,10,75,6,4,0.26,0.13,7.28
Arda Unyay,18,Turkey,Galatasaray,Super Lig,CB,800,0,0,2,6,86,26,20,0.0,0.0,6.9
Ziyad Al-Johani,21,Saudi Arabia,Al-Ahli,Saudi Pro League,CM,900,1,1,4,10,82,24,18,0.1,0.1,6.1
Benjamin Cremaschi,20,USA,Inter Miami,MLS,CM,1500,3,2,12,16,82,28,20,0.18,0.12,7.48
Obed Vargas,20,Mexico,Seattle,MLS,CM,1700,2,3,8,18,83,34,26,0.11,0.16,7.59
Noah Nartey,20,Denmark,Brondby,Danish SL,AM,1200,3,3,12,22,80,12,8,0.23,0.23,8.32
Mahamadou Doumbia,21,Mali,Antwerp,Belgian Pro League,CM,1300,2,2,8,14,83,30,22,0.14,0.14,6.74
Francis Turley,19,Northern Ireland,Celtic,Scottish Premiership,CM,700,0,1,2,8,84,18,14,0.0,0.13,6.76
Adam Daghim,19,Denmark,Salzburg,Austrian Bundesliga,RW,1300,4,3,16,24,78,10,8,0.28,0.21,9.05`;

// parse csv
function parseData() {
    var lines = csvData.trim().split("\n");
    var headers = lines[0].split(",");
    players = [];
    for (var i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        var vals = lines[i].split(",");
        var obj = {};
        for (var j = 0; j < headers.length; j++) {
            var raw = (vals[j] || "").trim();
            var num = Number(raw);
            obj[headers[j].trim()] = (raw !== "" && !isNaN(num)) ? num : raw;
        }
        players.push(obj);
    }
    players.sort(function (a, b) { return b.FutureStarScore - a.FutureStarScore; });
    playersByScore = players.slice();
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
        "Saudi Pro League": "🇸🇦",
        "Belgian Pro League": "🇧🇪",
        "Scottish Premiership": "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
        "Austrian Bundesliga": "🇦🇹"
    };
    return flags[league] || "🌍";
}

function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function initials(name) {
    var parts = String(name).split(" ");
    var out = "";
    for (var i = 0; i < parts.length && out.length < 2; i++) {
        if (parts[i].length) out += parts[i][0].toUpperCase();
    }
    return out || "•";
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
    var search = document.getElementById("searchBox").value.toLowerCase().trim();

    var filtered = [];
    for (var i = 0; i < players.length; i++) {
        var p = players[i];
        if (pos !== "all" && getPosName(getPosCat(p.Position)) !== pos) continue;
        if (league !== "all" && p.League !== league) continue;
        if (search) {
            var hay = (p.Name + " " + p.Club + " " + p.League).toLowerCase();
            if (hay.indexOf(search) === -1) continue;
        }
        filtered.push(p);
    }
    renderCards(filtered);
    renderTable(filtered);
    var rc = document.getElementById("resultCount");
    if (rc) {
        rc.textContent = "Showing " + filtered.length + " of " + players.length + " players";
    }
}

function clearFilters() {
    document.getElementById("positionFilter").value = "all";
    document.getElementById("leagueFilter").value = "all";
    document.getElementById("searchBox").value = "";
    sortCol = null;
    sortDir = "desc";
    applyFilters();
}

function updateSummary() {
    document.getElementById("totalPlayers").textContent = players.length;
    var totalAge = 0;
    for (var i = 0; i < players.length; i++) totalAge += players[i].Age;
    document.getElementById("avgAge").textContent = (totalAge / players.length).toFixed(1);
    document.getElementById("topScore").textContent = playersByScore.length ? playersByScore[0].FutureStarScore : 0;
    var leagues = [];
    for (var i = 0; i < players.length; i++) {
        if (leagues.indexOf(players[i].League) === -1) leagues.push(players[i].League);
    }
    document.getElementById("leagueCount").textContent = leagues.length;
    var nav = document.getElementById("navCount");
    if (nav) nav.textContent = players.length + " prospects";
}

function renderTop3() {
    var ribbons = ["No. 1", "No. 2", "No. 3"];
    var html = "";
    var top = playersByScore.length ? playersByScore : players;
    for (var i = 0; i < 3 && i < top.length; i++) {
        var p = top[i];
        var flag = getLeagueFlag(p.League);
        html += '<div class="top-card rank-' + (i + 1) + '">';
        html += '<span class="rank-ribbon">' + ribbons[i] + '</span>';
        html += '<div class="avatar">' + esc(initials(p.Name)) + '</div>';
        html += '<div class="top-name">' + esc(p.Name) + '</div>';
        html += '<div class="top-club">' + flag + ' ' + esc(p.Club) + ' &middot; ' + esc(p.Position) + ' &middot; Age ' + p.Age + '</div>';
        html += '<div class="top-score">' + p.FutureStarScore + '</div>';
        html += '<div class="top-score-label">Future Star Score</div>';
        html += '<div class="top-stats">';
        html += '<span>' + p.Goals + '<small>Goals</small></span>';
        html += '<span>' + p.Assists + '<small>Assists</small></span>';
        html += '<span>' + p.GoalsPer90 + '<small>G/90</small></span>';
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
        for (var j = 0; j < playersByScore.length; j++) {
            if (playersByScore[j].Name === p.Name && playersByScore[j].Club === p.Club) { rank = j + 1; break; }
        }
        html += '<div class="card pos-' + cat + '">';
        html += '<div class="card-top"><span class="card-rank">#' + rank + '</span>';
        html += '<span class="card-pos ' + cat + '">' + esc(p.Position) + '</span></div>';
        html += '<div class="card-id"><div class="avatar">' + esc(initials(p.Name)) + '</div>';
        html += '<div><div class="card-name">' + esc(p.Name) + '</div>';
        html += '<div class="card-meta">' + flag + ' ' + esc(p.Club) + ' &middot; Age ' + p.Age + '<br>' + esc(p.League) + '</div></div></div>';
        html += '<div class="card-score-row"><span class="card-score-label">Star Score</span>';
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
        var aria = sortCol === cols[i] ? (sortDir === "asc" ? "ascending" : "descending") : "none";
        headHtml += '<th class="' + cls + '" tabindex="0" role="columnheader" aria-sort="' + aria + '" data-col="' + cols[i] + '" onclick="doSort(\'' + cols[i] + '\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();doSort(\'' + cols[i] + '\')}">' + labels[i] + '</th>';
    }
    document.getElementById("tHead").innerHTML = headHtml;

    var bodyHtml = "";
    for (var i = 0; i < list.length; i++) {
        bodyHtml += "<tr>";
        for (var j = 0; j < cols.length; j++) {
            var val = list[i][cols[j]];
            if (cols[j] === "FutureStarScore") {
                bodyHtml += '<td class="score">' + val + '</td>';
            } else if (cols[j] === "League") {
                bodyHtml += '<td>' + getLeagueFlag(val) + ' ' + esc(val) + '</td>';
            } else if (cols[j] === "Name" || cols[j] === "Club" || cols[j] === "Nationality") {
                bodyHtml += "<td>" + esc(val) + "</td>";
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
    var rc = document.getElementById("resultCount");
    if (rc) rc.textContent = "Showing " + players.length + " of " + players.length + " players";
    var yr = document.getElementById("year");
    if (yr) yr.textContent = new Date().getFullYear() + " Season";
};
