/*
 * Future Stars - app.js
 * loads player data and renders cards + table
 * data is from the 2025-26 season, processed by our Java program
 * U22 prospects across 15 leagues, ranked by Future Star Score
 */

var players = [];
var playersByScore = [];
var playerPhotos = {"Lamine Yamal|Barcelona":"https://media.api-sports.io/football/players/386828.png","Gavi|Barcelona":"https://media.api-sports.io/football/players/296667.png","Marc Bernal|Barcelona":"https://media.api-sports.io/football/players/433396.png","Marc Casado|Barcelona":"https://media.api-sports.io/football/players/329728.png","Dani Rodriguez|Barcelona":"https://media.api-sports.io/football/players/371912.png","Endrick|Real Madrid":"https://media.api-sports.io/football/players/377122.png","Raul Asencio|Real Madrid":"https://media.api-sports.io/football/players/341640.png","Pau Cubarsi|Barcelona":"https://media.api-sports.io/football/players/396623.png","Rayane Bounida|Ajax":"https://media.api-sports.io/football/players/396202.png","Joao Simoes|Sporting CP":"https://media.api-sports.io/football/players/400509.png","Afonso Moreira|Sporting CP":"https://media.api-sports.io/football/players/345388.png","Santiago Castro|Bologna":"https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3c/Santiago_Castro.jpg/250px-Santiago_Castro.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Rico Lewis|Man City":"https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0f/ManCity20240722-027.jpg/250px-ManCity20240722-027.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Desire Doue|PSG":"https://thumb.wikimedia.org/wikipedia/commons/thumb/9/92/Desire_Doue_France_v_Senegal_16_June_2026-264.jpg/250px-Desire_Doue_France_v_Senegal_16_June_2026-264.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Noah Nartey|Brondby":"https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a6/Noah_Nartey_%282023%29.png/250px-Noah_Nartey_%282023%29.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Eliesse Ben Seghir|Monaco":"https://thumb.wikimedia.org/wikipedia/commons/thumb/7/70/Eliesse_Ben_Seghir_vs_Niger_%28cropped_2%29.jpg/250px-Eliesse_Ben_Seghir_vs_Niger_%28cropped_2%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Valentin Atangana|Reims":"https://thumb.wikimedia.org/wikipedia/commons/thumb/5/50/Atangana_asse_sr.png/250px-Atangana_asse_sr.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Ajay Matthews|Middlesbrough":"https://thumb.wikimedia.org/wikipedia/commons/thumb/0/07/Ajay_Matthews_12042025_%281%29.jpg/250px-Ajay_Matthews_12042025_%281%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Pablo Barrios|Atletico Madrid":"https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/Pablo_Barrios_mit_Con_Air%2C_CSIYH_1_Hamburg.JPG/250px-Pablo_Barrios_mit_Con_Air%2C_CSIYH_1_Hamburg.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Oghenetejiri Adejenughure|Salzburg":"https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8b/FC_Liefering_gegen_Floridsdorfer_AC_%282025-03-28_Zweite_Liga%29_11.jpg/250px-FC_Liefering_gegen_Floridsdorfer_AC_%282025-03-28_Zweite_Liga%29_11.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Mathys Tel|Bayern Munich":"https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a2/Mathys_Tel_en_2026.png/250px-Mathys_Tel_en_2026.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Noni Madueke|Chelsea":"https://thumb.wikimedia.org/wikipedia/commons/thumb/4/45/Noni_Madueke_England_v_Panama_27_June_26-054.jpg/250px-Noni_Madueke_England_v_Panama_27_June_26-054.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Adam Daghim|Salzburg":"https://thumb.wikimedia.org/wikipedia/commons/thumb/9/92/FC_Salzburg_vs._Atletico_Madrid_%282025-01-29_UEFA_Championsleague%29_43.jpg/250px-FC_Salzburg_vs._Atletico_Madrid_%282025-01-29_UEFA_Championsleague%29_43.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Ethan Nwaneri|Arsenal":"https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cd/Ethan_Nwaneri.png/250px-Ethan_Nwaneri.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Johan Bakayoko|PSV":"https://thumb.wikimedia.org/wikipedia/commons/thumb/2/25/Johan_Bakayoko_%282024%29.jpg/250px-Johan_Bakayoko_%282024%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Yankuba Minteh|Brighton":"https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bb/Yankuba_Minteh_24012026_%281%29.jpg/250px-Yankuba_Minteh_24012026_%281%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Lucas Hey|Nordsjaelland":"https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d3/Lucas_Hey_RSCA_2025.jpg/250px-Lucas_Hey_RSCA_2025.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Mikey Moore|Tottenham":"https://thumb.wikimedia.org/wikipedia/commons/thumb/2/24/Mikey_Moore_with_a_fan.jpg/250px-Mikey_Moore_with_a_fan.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Chemsdine Talbi|Club Brugge":"https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/Chemsdine_Talbi_Brazil_V_Morocco_13_June_2026-203.jpg/250px-Chemsdine_Talbi_Brazil_V_Morocco_13_June_2026-203.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Estevao Willian|Chelsea":"https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b3/Estevao-Palmeiras-Liverpool-abr24_%28cropped%29.jpg/250px-Estevao-Palmeiras-Liverpool-abr24_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Karim Konate|Salzburg":"https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5d/FC_Red_Bull_Salzburg_gegen_FC_Blau-Wei%C3%9F_Linz_%282024-08-10%29_33.jpg/250px-FC_Red_Bull_Salzburg_gegen_FC_Blau-Wei%C3%9F_Linz_%282024-08-10%29_33.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Jayden Meghoma|Chelsea":"https://thumb.wikimedia.org/wikipedia/commons/thumb/4/47/Jayden_Meghoma_02082025_%281%29.jpg/250px-Jayden_Meghoma_02082025_%281%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Oscar Gloukh|Sporting CP":"https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5a/Oscar_Gloukh_%28cropped%29.jpg/250px-Oscar_Gloukh_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Lewis Hall|Newcastle":"https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5f/Lewis_Hall_24052026_%282%29.jpg/250px-Lewis_Hall_24052026_%282%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Julian Hall|NY Red Bulls":"https://thumb.wikimedia.org/wikipedia/commons/thumb/d/df/Julian_Hall_Red_Bulls_Revolution-35_%28cropped%29.jpg/250px-Julian_Hall_Red_Bulls_Revolution-35_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Youssoufa Moukoko|Nice":"https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bf/Moukoko_asse_ogcn_2425.png/250px-Moukoko_asse_ogcn_2425.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Trey Nyoni|Liverpool":"https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9e/Trey_Nyoni_04012026_%281%29.jpg/250px-Trey_Nyoni_04012026_%281%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Daniel Jebbison|Sheffield United":"https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1e/Daniel_Jebbison_2024.jpg/250px-Daniel_Jebbison_2024.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Nico Paz|Como":"https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0e/Nico_Paz_Argentina_v_Spain_19_July_2026-057.jpg/250px-Nico_Paz_Argentina_v_Spain_19_July_2026-057.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Nathaniel Brown|Frankfurt":"https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0e/Nathaniel_Brown_Ecuador_v_Germany_25_June_2026-160.jpg/250px-Nathaniel_Brown_Ecuador_v_Germany_25_June_2026-160.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Roony Bardghji|Barcelona":"https://thumb.wikimedia.org/wikipedia/commons/thumb/9/96/Roony_Bardghji%2C_Vejle_Boldklub_-_FC_K%C3%B8benhavn%2C_29._July_2023_-_opvarmning_%28cropped%29.jpg/250px-Roony_Bardghji%2C_Vejle_Boldklub_-_FC_K%C3%B8benhavn%2C_29._July_2023_-_opvarmning_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Malo Gusto|Chelsea":"https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a2/Malo_Gusto_France_v_Senegal_16_June_2026-399.jpg/250px-Malo_Gusto_France_v_Senegal_16_June_2026-399.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Joao Neves|PSG":"https://thumb.wikimedia.org/wikipedia/commons/thumb/b/be/Joao_Neves_Croatia_v_Portugal_2_July_2026-102.jpg/250px-Joao_Neves_Croatia_v_Portugal_2_July_2026-102.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Xavi Simons|Barcelona":"https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b2/2023-10-04_Fu%C3%9Fball%2C_M%C3%A4nner%2C_UEFA_Champions_League%2C_RB_Leipzig_-_Manchester_City_FC_1DX_2672_%28Xavi_Simons%29.jpg/250px-2023-10-04_Fu%C3%9Fball%2C_M%C3%A4nner%2C_UEFA_Champions_League%2C_RB_Leipzig_-_Manchester_City_FC_1DX_2672_%28Xavi_Simons%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Kellen Fisher|Norwich":"https://thumb.wikimedia.org/wikipedia/commons/thumb/3/33/Kellen_Fisher.jpg/250px-Kellen_Fisher.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Bazoumana Toure|Hoffenheim":"https://thumb.wikimedia.org/wikipedia/commons/thumb/6/65/Bazoumana_Toure_Cote_D%27Ivoire_v_Ecuador_14_June_2026-50.jpg/250px-Bazoumana_Toure_Cote_D%27Ivoire_v_Ecuador_14_June_2026-50.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Rodrigo Mora|Porto":"https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7b/Rodrigo_Mora.jpg/250px-Rodrigo_Mora.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Ibrahim Mbaye|PSG":"https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6f/Ibrahim_Mbaye_France_v_Senegal_16_June_2026-256.jpg/250px-Ibrahim_Mbaye_France_v_Senegal_16_June_2026-256.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Leny Yoro|Man United":"https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a2/RC_Lens_-_Lille_OSC_%2808-10-2023%29_12_%28cropped1%29.jpg/250px-RC_Lens_-_Lille_OSC_%2808-10-2023%29_12_%28cropped1%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Jorrel Hato|Ajax":"https://thumb.wikimedia.org/wikipedia/commons/thumb/4/49/Jorrel_Hato_Chelsea_AC_Milan_warm_up.jpg/250px-Jorrel_Hato_Chelsea_AC_Milan_warm_up.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Kenan Yildiz|Juventus":"https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e0/Kenan_Y%C4%B1ld%C4%B1z_in_the_international_match_%28March_2025%29_%28cropped%29.jpg/250px-Kenan_Y%C4%B1ld%C4%B1z_in_the_international_match_%28March_2025%29_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Senny Mayulu|PSG":"https://thumb.wikimedia.org/wikipedia/commons/thumb/6/65/Match_Football_Paris_SG_x_AS_Saint_%C3%89tienne_Stade_Parc_Princes_-_Paris_XVI_%28FR75%29_-_2025-01-12_-_65.jpg/250px-Match_Football_Paris_SG_x_AS_Saint_%C3%89tienne_Stade_Parc_Princes_-_Paris_XVI_%28FR75%29_-_2025-01-12_-_65.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Givairo Read|Feyenoord":"https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8f/Givairo_read-1772634849_%28cropped%29.JPG/250px-Givairo_read-1772634849_%28cropped%29.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Jack Hinshelwood|Brighton":"https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9f/Jack_Hinshelwood_24012026_%282%29.jpg/250px-Jack_Hinshelwood_24012026_%282%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Chris Rigg|Sunderland":"https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e3/Chris_Rigg_05092026_%282%29.jpg/250px-Chris_Rigg_05092026_%282%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Julio Enciso|Brighton":"https://thumb.wikimedia.org/wikipedia/commons/thumb/d/df/Julio_Enciso_France_v_Paraguay_4_July_2026-039.jpg/250px-Julio_Enciso_France_v_Paraguay_4_July_2026-039.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Ziyad Al-Johani|Al-Ahli":"https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ec/Ziyad_Al-Johani.jpg/250px-Ziyad_Al-Johani.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Francisco Conceicao|Juventus":"https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a7/Francisco_Conceicao_Croatia_v_Portugal_2_July_2026-256.jpg/250px-Francisco_Conceicao_Croatia_v_Portugal_2_July_2026-256.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Bence Dardai|Wolfsburg":"https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b4/Dardaibtur2.jpg/250px-Dardaibtur2.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","George Ilenikhena|Monaco":"https://thumb.wikimedia.org/wikipedia/commons/thumb/5/53/Ilenikhena_asse_asm_2425.png/250px-Ilenikhena_asse_asm_2425.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Mads Hansen|Nordsjaelland":"https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bc/Mads_Andre_Hansen.jpg/250px-Mads_Andre_Hansen.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Kendry Paez|Chelsea":"https://thumb.wikimedia.org/wikipedia/commons/thumb/a/aa/Kendry_Paez_Cote_D%27Ivoire_v_Ecuador_14_June_2026-37_%28cropped%29.jpg/250px-Kendry_Paez_Cote_D%27Ivoire_v_Ecuador_14_June_2026-37_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Aymen Sliti|Feyenoord":"https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b6/Feyenoord_Rotterdam_U19_vs._FC_Salburg_U19_%28Uefa_Youth_League_2024-11-06_Vierte_Runde%29_38.jpg/250px-Feyenoord_Rotterdam_U19_vs._FC_Salburg_U19_%28Uefa_Youth_League_2024-11-06_Vierte_Runde%29_38.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Yeremy Pino|Villarreal":"https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7e/Yeremy_Pino_Argentina_v_Spain_19_July_2026-019.jpg/250px-Yeremy_Pino_Argentina_v_Spain_19_July_2026-019.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Valentin Sulzbacher|Salzburg":"https://thumb.wikimedia.org/wikipedia/commons/thumb/5/59/FC_Salzburg_U19_gegen_Celtic_FC_U19_%282025-02-12_UEFA_Youth_League_%29_63.jpg/250px-FC_Salzburg_U19_gegen_Celtic_FC_U19_%282025-02-12_UEFA_Youth_League_%29_63.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Jamal Musiala|Bayern Munich":"https://thumb.wikimedia.org/wikipedia/commons/thumb/4/44/Jamal_Musiala_Ecuador_v_Germany_25_June_2026-174_%28cropped%29.jpg/250px-Jamal_Musiala_Ecuador_v_Germany_25_June_2026-174_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Vitor Reis|Man City":"https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6f/Vitor-Reis-Palmeiras-Sao-Paulo-ago24-2_%28cropped%29.jpg/250px-Vitor-Reis-Palmeiras-Sao-Paulo-ago24-2_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Cavan Sullivan|Philadelphia":"https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1c/Cavan_Sullivan_Philadelphia_Union_New_York_City_FC_Nov_23_2025-016_%28cropped%29.jpg/250px-Cavan_Sullivan_Philadelphia_Union_New_York_City_FC_Nov_23_2025-016_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Noah Allen|Inter Miami":"https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b9/Noah_Allen_NYCFC_Miami_24_Sep_2025-115_%28cropped%29.jpg/250px-Noah_Allen_NYCFC_Miami_24_Sep_2025-115_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Samuel Rak-Sakyi|Chelsea":"https://thumb.wikimedia.org/wikipedia/commons/thumb/0/03/Sam_rak-sakyi_chelsea_noah_warm_up.jpg/250px-Sam_rak-sakyi_chelsea_noah_warm_up.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Dies Janse|Ajax":"https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/Dies_Janse.jpg/250px-Dies_Janse.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Djylian Nguessan|Nice":"https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ad/N%27Guessan_asse_sr_2425.png/250px-N%27Guessan_asse_sr_2425.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Franco Mastantuono|Real Madrid":"https://thumb.wikimedia.org/wikipedia/commons/thumb/0/00/Franco_Mastantuono_in_2025_%28cropped%29.jpg/250px-Franco_Mastantuono_in_2025_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Morgan Rogers|Aston Villa":"https://thumb.wikimedia.org/wikipedia/commons/thumb/2/28/Morgan_Rogers_England_v_Panama_27_June_26-144_%28cropped%29.jpg/250px-Morgan_Rogers_England_v_Panama_27_June_26-144_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Luka Sucic|Real Sociedad":"https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a0/Luka_Sucic_Croatia_v_Portugal_2_July_2026-062.jpg/250px-Luka_Sucic_Croatia_v_Portugal_2_July_2026-062.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Harvey Elliott|Liverpool":"https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ad/Harvey_Elliott_in_2022.jpg/250px-Harvey_Elliott_in_2022.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Savinho|Man City":"https://upload.wikimedia.org/wikipedia/commons/a/a0/Manchester_City_2025_06_26_Juventus_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled","Assan Ouedraogo|RB Leipzig":"https://thumb.wikimedia.org/wikipedia/commons/thumb/3/34/Assan_Ouedraogo_Ecuador_v_Germany_25_June_2026-155_%28cropped%29.jpg/250px-Assan_Ouedraogo_Ecuador_v_Germany_25_June_2026-155_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Kees Smit|AZ":"https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e9/Kees_Smit.jpg/250px-Kees_Smit.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Nico OReilly|Man City":"https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ad/Nico_O%27Reilly_England_v_Ghana_23_June_2026-043_%28cropped%29.jpg/250px-Nico_O%27Reilly_England_v_Ghana_23_June_2026-043_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Andrey Santos|Strasbourg":"https://thumb.wikimedia.org/wikipedia/commons/thumb/2/23/Santos_asse_rcsa_2425.jpg/250px-Santos_asse_rcsa_2425.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Evan Ferguson|Roma":"https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8f/Evan_Ferguson_YantsImages_-_Asatur_Yesayants_626_%28cropped%29.jpg/250px-Evan_Ferguson_YantsImages_-_Asatur_Yesayants_626_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Semih Kilicsoy|Besiktas":"https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f6/Semih_K%C4%B1l%C4%B1%C3%A7soy_20240803.jpg/250px-Semih_K%C4%B1l%C4%B1%C3%A7soy_20240803.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Ousmane Diomande|Sporting CP":"https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c9/Ousmane_Diomand%C3%A9_Cote_D%27Ivoire_v_Ecuador_14_June_2026-58.jpg/250px-Ousmane_Diomand%C3%A9_Cote_D%27Ivoire_v_Ecuador_14_June_2026-58.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Matthew Corcoran|Nashville":"https://thumb.wikimedia.org/wikipedia/commons/thumb/9/95/Matthew_Corcoran_Revolution_Nashville_6.25.25-045_%28cropped%29.jpg/250px-Matthew_Corcoran_Revolution_Nashville_6.25.25-045_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Clement Bischoff|Brondby":"https://thumb.wikimedia.org/wikipedia/commons/thumb/8/81/FC_RB_Salzburg_gegen_SK_Sturm_Graz_%282025-09-20_Bundesliga_Runde_sieben%29_26.jpg/250px-FC_RB_Salzburg_gegen_SK_Sturm_Graz_%282025-09-20_Bundesliga_Runde_sieben%29_26.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Castello Lukeba|RB Leipzig":"https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4d/Castello_Lukeba_in_2022.png/250px-Castello_Lukeba_in_2022.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Jorthy Mokio|Ajax":"https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6a/Jorthy_Mokio.JPG/250px-Jorthy_Mokio.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Tommy Watson|Sunderland":"https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2b/Tom_Watson_14032026_%281%29.jpg/250px-Tom_Watson_14032026_%281%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Antonio Nusa|RB Leipzig":"https://thumb.wikimedia.org/wikipedia/commons/thumb/8/80/Antonio_Nusa_Morocco_v_Norway_7_June_2026-110_%28cropped%29.jpg/250px-Antonio_Nusa_Morocco_v_Norway_7_June_2026-110_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Adam Wharton|Crystal Palace":"https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b6/Fredrikstad_Fotballklubb_v_Crystal_Palace_FC%2C_28_August_2025_B06_%28cropped%29.jpg/250px-Fredrikstad_Fotballklubb_v_Crystal_Palace_FC%2C_28_August_2025_B06_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Joel Ordonez|Club Brugge":"https://thumb.wikimedia.org/wikipedia/commons/thumb/4/42/Joel_Ordonez_Cote_D%27Ivoire_v_Ecuador_14_June_2026-154_%28cropped%29.jpg/250px-Joel_Ordonez_Cote_D%27Ivoire_v_Ecuador_14_June_2026-154_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Stephen Mfuni|Man City":"https://thumb.wikimedia.org/wikipedia/commons/thumb/8/81/ManCity20240722-044.jpg/250px-ManCity20240722-044.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Alejandro Garnacho|Napoli":"https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ab/Alejandro_Garnacho_7_August_2022_%28cropped%29.jpg/250px-Alejandro_Garnacho_7_August_2022_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Peyton Miller|New England":"https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ab/Peyton_Miller_Revolution_Nashville_6.25.25-208_%28cropped%29.jpg/250px-Peyton_Miller_Revolution_Nashville_6.25.25-208_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Simone Pafundi|Udinese":"https://thumb.wikimedia.org/wikipedia/commons/thumb/6/64/Uruguay_1_Italia_0_a_Italia_-_Uruguay_campe%C3%B3n_Mundial_Sub_20_2023_230611-4427-jikatu_%2852989760354%29_%28Simone_Pafundi%29.jpg/250px-Uruguay_1_Italia_0_a_Italia_-_Uruguay_campe%C3%B3n_Mundial_Sub_20_2023_230611-4427-jikatu_%2852989760354%29_%28Simone_Pafundi%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Florian Wirtz|Liverpool":"https://thumb.wikimedia.org/wikipedia/commons/thumb/7/70/Florian_Wirtz_Ecuador_v_Germany_25_June_2026-181_%28cropped%29.jpg/250px-Florian_Wirtz_Ecuador_v_Germany_25_June_2026-181_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Ansu Fati|Sevilla":"https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ef/%D0%9C%D0%B0%D1%82%D1%87_%C2%AB%D0%94%D0%B8%D0%BD%D0%B0%D0%BC%D0%BE%C2%BB_-_%C2%AB%D0%91%D0%B0%D1%80%D1%81%D0%B5%D0%BB%D0%BE%D0%BD%D0%B0%C2%BB_0-1._2_%D0%BB%D0%B8%D1%81%D1%82%D0%BE%D0%BF%D0%B0%D0%B4%D0%B0_2021_%D1%80%D0%BE%D0%BA%D1%83_%E2%80%94_1289339_%28cropped%29.jpg/250px-%D0%9C%D0%B0%D1%82%D1%87_%C2%AB%D0%94%D0%B8%D0%BD%D0%B0%D0%BC%D0%BE%C2%BB_-_%C2%AB%D0%91%D0%B0%D1%80%D1%81%D0%B5%D0%BB%D0%BE%D0%BD%D0%B0%C2%BB_0-1._2_%D0%BB%D0%B8%D1%81%D1%82%D0%BE%D0%BF%D0%B0%D0%B4%D0%B0_2021_%D1%80%D0%BE%D0%BA%D1%83_%E2%80%94_1289339_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Dario Osorio|Midtjylland":"https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a3/Dar%C3%ADo_Osorio_Universidad_de_Chile_v_O%27Higgins_20230807_02.jpg/250px-Dar%C3%ADo_Osorio_Universidad_de_Chile_v_O%27Higgins_20230807_02.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Ayyoub Bouaddi|Lille":"https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e8/Ayyoub_Bouaddi_Morocco_v_Norway_7_June_2026-71_%28cropped%29.jpg/250px-Ayyoub_Bouaddi_Morocco_v_Norway_7_June_2026-71_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Valentin Carboni|Genoa":"https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4c/Valentin_Carboni_%28cropped%29.jpg/250px-Valentin_Carboni_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Cher Ndour|Besiktas":"https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fc/Cher_Ndour.jpg/250px-Cher_Ndour.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Archie Gray|Tottenham":"https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a2/Rangers_v_Tottenham_Hotspur_-_54202663229_%28Archie_Gray%29.jpg/250px-Rangers_v_Tottenham_Hotspur_-_54202663229_%28Archie_Gray%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Aaron Anselmino|Bologna":"https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ed/Aaron_Anselmino_Chelsea_AC_Milan_warm_up.jpg/250px-Aaron_Anselmino_Chelsea_AC_Milan_warm_up.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Benjamin Cremaschi|Inter Miami":"https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5b/Benjamin_Cremaschi_NE_Revolution_Inter_Miami_7.9.25-014_%28cropped%29.jpg/250px-Benjamin_Cremaschi_NE_Revolution_Inter_Miami_7.9.25-014_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Law McCabe|Middlesbrough":"https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5e/Law_McCabe.png/250px-Law_McCabe.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Kobbie Mainoo|Man United":"https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1f/Kobbie_Mainoo_England_v_Ghana_23_June_2026-042.jpg/250px-Kobbie_Mainoo_England_v_Ghana_23_June_2026-042.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Mahamadou Doumbia|Antwerp":"https://thumb.wikimedia.org/wikipedia/commons/thumb/6/62/Mahamadou_Doumbia_%28cropped%29.png/250px-Mahamadou_Doumbia_%28cropped%29.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Guillaume Restes|Toulouse":"https://thumb.wikimedia.org/wikipedia/commons/thumb/7/79/RC_Lens_-_Toulouse_FC_%2824-09-2023%29_5.jpg/250px-RC_Lens_-_Toulouse_FC_%2824-09-2023%29_5.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Warren Zaire-Emery|PSG":"https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2b/Warren_Zaire-Emery_France_v_Senegal_16_June_2026-279.jpg/250px-Warren_Zaire-Emery_France_v_Senegal_16_June_2026-279.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Gianluca Busio|Venezia":"https://thumb.wikimedia.org/wikipedia/commons/thumb/6/66/Gianluca_Busio.jpg/250px-Gianluca_Busio.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Harry Amass|Man United":"https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b9/Harry_Amass_18102025_%284%29_%28cropped%29.jpg/250px-Harry_Amass_18102025_%284%29_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Myles Lewis-Skelly|Arsenal":"https://thumb.wikimedia.org/wikipedia/commons/thumb/7/70/Myles_Lewis-Skelly_2026_%28cropped%29.jpg/250px-Myles_Lewis-Skelly_2026_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Tyrique George|Chelsea":"https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7d/Tyrique_George_chelsea_gent_2024_warm_up.jpg/250px-Tyrique_George_chelsea_gent_2024_warm_up.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Arda Guler|Real Madrid":"https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9f/Arda_G%C3%BCler_2025.jpg/250px-Arda_G%C3%BCler_2025.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Benjamin Sesko|Arsenal":"https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e9/FC_RB_Salzburg_gegen_SK_Austria_Klagenfurt_%282023-05-28%29_38_%28cropped%29.jpg/250px-FC_RB_Salzburg_gegen_SK_Austria_Klagenfurt_%282023-05-28%29_38_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Milos Kerkez|Bournemouth":"https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e5/Milot_Kerkez_%28cropped%29.png/250px-Milot_Kerkez_%28cropped%29.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Lamine Camara|Monaco":"https://thumb.wikimedia.org/wikipedia/commons/thumb/5/53/Lamine_Camara_France_v_Senegal_16_June_2026-445.jpg/250px-Lamine_Camara_France_v_Senegal_16_June_2026-445.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Quim Junyent|Barcelona":"https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c9/Quim_Junyent_UEFA_U19_2026_vs_Germany.png/250px-Quim_Junyent_UEFA_U19_2026_vs_Germany.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Mika Godts|Ajax":"https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c8/Mika_Godts_USMNT_v_Belgium_Mar_28_2026-236.jpg/250px-Mika_Godts_USMNT_v_Belgium_Mar_28_2026-236.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Jude Bellingham|Real Madrid":"https://thumb.wikimedia.org/wikipedia/commons/thumb/2/23/Jude_Bellingham_England_v_Ghana_23_June_2026-061_%28cropped%29.jpg/250px-Jude_Bellingham_England_v_Ghana_23_June_2026-061_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Samson Baidoo|Salzburg":"https://thumb.wikimedia.org/wikipedia/commons/thumb/9/92/FC_Red_Bull_Salzburg_gegen_FC_Blau-Wei%C3%9F_Linz_%282025-04-06_%C3%96sterreichische_Bundesliga%29_11.jpg/250px-FC_Red_Bull_Salzburg_gegen_FC_Blau-Wei%C3%9F_Linz_%282025-04-06_%C3%96sterreichische_Bundesliga%29_11.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"};
var sortCol = "FutureStarScore";
var sortDir = "desc";

// player data (output from FutureStarPreprocessor.java - 150 players, all under 22)
var csvData = `
Name,Age,Nationality,Club,League,Position,MinutesPlayed,Goals,Assists,ShotsOnTarget,DribblesCompleted,PassAccuracy,Tackles,Interceptions,GoalsPer90,AssistsPer90,FutureStarScore
Lamine Yamal,18,Spain,Barcelona,La Liga,RW,2771,9,13,47,144,84,42,16,0.29,0.42,22.32
Jude Bellingham,22,England,Real Madrid,La Liga,AM,2800,18,9,66,50,86,32,18,0.58,0.29,11.61
Florian Wirtz,22,Germany,Liverpool,Premier League,AM,2600,14,12,54,58,88,26,16,0.48,0.42,12.48
Jamal Musiala,22,Germany,Bayern Munich,Bundesliga,AM,2700,16,11,56,80,88,28,18,0.53,0.37,14.73
Warren Zaire-Emery,20,France,PSG,Ligue 1,CM,2500,7,9,26,28,89,52,36,0.25,0.32,9.65
Xavi Simons,22,Netherlands,Barcelona,La Liga,AM,2600,13,15,50,58,84,30,22,0.45,0.52,12.39
Kobbie Mainoo,20,England,Man United,Premier League,CM,2400,5,6,18,22,86,48,32,0.19,0.23,8.51
Pau Cubarsi,18,Spain,Barcelona,La Liga,CB,2620,2,3,8,5,69,33,17,0.07,0.1,6.36
Gavi,21,Spain,Barcelona,La Liga,CM,1014,1,1,1,6,88,30,10,0.09,0.09,5.94
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
Marc Casado,22,Spain,Barcelona,La Liga,CM,1623,1,3,1,4,52,46,24,0.06,0.17,3.5
Raul Asencio,22,Spain,Real Madrid,La Liga,CB,1671,0,1,1,6,90,22,16,0.0,0.05,5.21
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
Mika Godts,20,Belgium,Ajax,Eredivisie,LW,1500,5,6,20,38,79,10,8,0.3,0.36,10.37
Rodrigo Mora,18,Portugal,Porto,Liga Portugal,AM,1600,6,5,22,36,82,12,8,0.34,0.28,11.27
Martim Fernandes,19,Portugal,Porto,Liga Portugal,RB,1700,1,5,6,20,84,38,26,0.05,0.26,8.39
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
Ethan Wheatley,19,England,Man United,Premier League,CF,700,2,1,8,10,74,6,4,0.26,0.13,7.23
Godwill Kukonki,17,England,Man United,Premier League,CB,600,0,0,2,4,85,18,14,0.0,0.0,7.15
Trey Nyoni,18,England,Liverpool,Premier League,CM,700,0,1,2,8,86,18,14,0.0,0.13,7.36
Amara Nallo,18,England,Liverpool,Premier League,CB,600,0,0,2,4,87,20,16,0.0,0.0,6.75
Stephen Mfuni,17,England,Man City,Premier League,LB,500,0,1,2,8,82,16,12,0.0,0.18,7.76
Jan Virgili,19,Spain,Barcelona,La Liga,LW,600,1,1,4,12,78,6,4,0.15,0.15,7.35
Quim Junyent,18,Spain,Barcelona,La Liga,CM,500,0,1,2,8,85,14,10,0.0,0.18,7.41
Joan Martinez,18,Spain,Real Madrid,La Liga,CB,500,0,0,2,4,86,16,12,0.0,0.0,6.7
Chema Andres,20,Spain,Real Madrid,La Liga,CM,600,0,1,2,10,87,20,14,0.0,0.15,6.65
Hugo Alba,18,Spain,Real Betis,La Liga,AM,500,1,1,4,10,79,6,4,0.18,0.18,7.85
Wisdom Mike,17,Germany,Bayern Munich,Bundesliga,RW,500,1,1,4,12,77,4,2,0.18,0.18,8.45
Cassiano Kiala,17,Germany,Leverkusen,Bundesliga,CB,500,0,0,2,4,85,16,12,0.0,0.0,7.15
Montrell Culbreath,18,Germany,Leverkusen,Bundesliga,LW,500,1,0,4,10,76,4,2,0.18,0.0,7.34
Diego Sia,18,Italy,AC Milan,Serie A,RW,500,1,0,4,10,76,4,2,0.18,0.0,7.34
Emanuele Sala,18,Italy,AC Milan,Serie A,CM,500,0,1,2,8,84,14,10,0.0,0.18,7.36
Lorenzo Venturino,19,Italy,Genoa,Serie A,RW,600,1,1,4,12,77,6,4,0.15,0.15,7.3
Lucas Michal,20,France,Monaco,Ligue 1,CF,700,2,1,8,12,75,6,4,0.26,0.13,6.98
Bradel Kiwa,18,France,Monaco,Ligue 1,CB,500,0,0,2,4,85,18,14,0.0,0.0,6.65
Ayman Aiki,20,France,Lille,Ligue 1,RW,600,1,1,4,14,78,6,4,0.15,0.15,7.05
Kayden Wolff,18,Netherlands,Ajax,Eredivisie,RW,600,1,1,4,14,78,6,4,0.15,0.15,8.05
Dies Janse,19,Netherlands,Ajax,Eredivisie,CB,600,0,0,2,6,86,20,16,0.0,0.0,6.4
Rafael Luis,20,Portugal,Benfica,Liga Portugal,CM,600,0,1,2,8,84,18,14,0.0,0.15,6.3
Goncalo Oliveira,19,Portugal,Porto,Liga Portugal,CF,600,2,0,8,10,74,6,4,0.3,0.0,7.1
Oliver Arblaster,21,England,Sheffield United,Championship,CM,1400,2,2,8,14,83,32,24,0.13,0.13,6.69
Daniel Jebbison,22,England,Sheffield United,Championship,CF,900,3,1,12,12,75,8,6,0.3,0.1,6.05
Efe Akman,19,Turkey,Galatasaray,Super Lig,CM,700,1,1,4,10,83,20,14,0.13,0.13,7.29
Musab Al-Juwayr,22,Saudi Arabia,Al-Hilal,Saudi Pro League,CM,1200,2,4,10,14,84,28,20,0.15,0.3,6.65
Kristian Fletcher,20,USA,DC United,MLS,RW,1100,3,2,12,20,77,8,6,0.25,0.16,7.91
Villads Nielsen,20,Denmark,Nordsjaelland,Danish SL,CB,1200,1,0,4,8,86,30,22,0.08,0.0,6.33
Kaye Furo,18,Belgium,Club Brugge,Belgian Pro League,CF,600,2,0,8,10,74,6,4,0.3,0.0,7.6
Daniel Cummings,20,Scotland,Celtic,Scottish Premiership,CF,700,2,1,8,8,74,6,4,0.26,0.13,6.53
Oghenetejiri Adejenughure,18,Austria,Salzburg,Austrian Bundesliga,CF,600,2,0,8,10,73,6,4,0.3,0.0,7.55
Josh Acheampong,19,England,Chelsea,Premier League,RB,800,0,1,2,10,84,22,16,0.0,0.11,6.93
Tyrique George,19,England,Chelsea,Premier League,LW,700,1,2,6,16,78,6,4,0.13,0.26,7.9
Chido Obi,17,Denmark,Man United,Premier League,CF,500,1,0,4,8,73,4,2,0.18,0.0,7.49
Bendito Mantato,18,England,Man United,Premier League,RW,500,1,0,4,10,77,4,2,0.18,0.0,7.39
Toni Fernandez,18,Spain,Barcelona,La Liga,RW,500,1,1,4,12,78,4,2,0.18,0.18,8.0
Andres Cuenca,18,Spain,Barcelona,La Liga,CB,500,0,0,2,4,86,16,12,0.0,0.0,6.7
David Jimenez,20,Spain,Real Madrid,La Liga,RB,500,0,1,2,8,83,16,10,0.0,0.18,6.31
Diego Aguado,18,Spain,Real Madrid,La Liga,CB,500,0,0,2,4,86,14,10,0.0,0.0,6.7
Said El Mala,19,Germany,Koln,Bundesliga,LW,900,3,2,12,20,76,8,6,0.3,0.2,8.6
Jaka Cuber Potocnik,20,Slovenia,Koln,Bundesliga,CF,600,1,0,6,8,73,4,2,0.15,0.0,5.9
Noel Aseko,20,Germany,Bayern Munich,Bundesliga,CM,500,0,1,2,8,85,14,10,0.0,0.18,6.41
Mattia Liberali,18,Italy,AC Milan,Serie A,AM,500,0,1,2,10,81,6,4,0.0,0.18,7.41
Andrea Natali,17,Italy,AC Milan,Serie A,CB,500,0,0,2,4,85,14,10,0.0,0.0,7.15
Giacomo De Pieri,19,Italy,Inter,Serie A,RW,500,1,0,4,10,76,4,2,0.18,0.0,6.84
Matteo Cocchi,18,Italy,Inter,Serie A,LB,500,0,1,2,8,82,14,10,0.0,0.18,7.26
George Ilenikhena,19,Nigeria,Monaco,Ligue 1,CF,800,2,1,10,12,74,6,4,0.23,0.11,7.3
Axel Tape,18,France,PSG,Ligue 1,CB,500,0,0,2,4,86,14,10,0.0,0.0,6.7
Quentin Ndjantou,18,France,PSG,Ligue 1,RW,500,1,0,4,10,77,4,2,0.18,0.0,7.39
Givairo Read,19,Netherlands,Feyenoord,Eredivisie,RB,900,1,2,4,14,82,22,14,0.1,0.2,7.7
Aymen Sliti,19,Tunisia,Feyenoord,Eredivisie,LW,600,1,1,4,14,77,6,4,0.15,0.15,7.5
Joao Rego,20,Portugal,Benfica,Liga Portugal,AM,600,1,1,4,12,80,6,4,0.15,0.15,6.95
Eduardo Fernandes,18,Portugal,Sporting CP,Liga Portugal,RW,500,1,0,4,10,77,4,2,0.18,0.0,7.39
Kellen Fisher,21,England,Norwich,Championship,RB,1200,1,3,6,16,82,30,20,0.08,0.23,6.88
Elliot Myles,18,Wales,Norwich,Championship,LW,600,1,1,4,12,77,6,4,0.15,0.15,7.8
Mustafa Hekimoglu,18,Turkey,Besiktas,Super Lig,CF,600,2,0,8,10,73,6,4,0.3,0.0,7.55
Ali Al-Masoud,19,Saudi Arabia,Al-Nassr,Saudi Pro League,LW,600,1,1,4,12,77,6,4,0.15,0.15,7.3
Cavan Sullivan,16,USA,Philadelphia,MLS,AM,500,1,1,4,12,78,4,2,0.18,0.18,9.0
Matthew Corcoran,19,USA,Nashville,MLS,CM,900,1,1,4,10,82,22,16,0.1,0.1,7.1
Clement Bischoff,19,Denmark,Brondby,Danish SL,LW,900,2,2,10,16,78,8,6,0.2,0.2,8.0
Jorne Spileers,20,Belgium,Club Brugge,Belgian Pro League,CB,800,0,0,2,6,87,24,18,0.0,0.0,5.95
Bailey Dall,19,Scotland,Hearts,Scottish Premiership,CM,600,0,1,2,8,82,16,12,0.0,0.15,6.7
Valentin Sulzbacher,20,Austria,Salzburg,Austrian Bundesliga,CM,700,1,1,4,10,83,20,14,0.13,0.13,6.79
Lewis Miley,19,England,Newcastle,Premier League,CM,1500,2,3,8,14,86,32,24,0.12,0.18,7.92
Mikey Moore,18,England,Tottenham,Premier League,LW,900,2,2,8,20,79,6,4,0.2,0.2,8.95
Shea Lacey,18,England,Man United,Premier League,RW,700,1,2,6,18,80,6,4,0.13,0.26,8.7
Jahmai Simpson-Pusey,19,England,Man City,Premier League,CB,800,0,0,2,4,88,22,18,0.0,0.0,6.3
Harrison Armstrong,18,England,Everton,Premier League,CM,900,1,1,4,10,84,24,18,0.1,0.1,7.7
Jayden Meghoma,18,England,Chelsea,Premier League,LB,700,0,1,2,12,82,20,14,0.0,0.13,7.56
Samuel Rak-Sakyi,19,England,Chelsea,Premier League,CM,600,1,1,4,10,83,16,12,0.15,0.15,7.4
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

function photoUrl(name, club) {
    var url = playerPhotos[name + "|" + club];
    return url || null;
}

function avatarHtml(name, club) {
    var url = photoUrl(name, club);
    var img = url ? '<img src="' + url + '" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove()">' : "";
    return '<div class="avatar">' + esc(initials(name)) + img + '</div>';
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
            var hay = (p.Name + " " + p.Club + " " + p.League + " " + p.Nationality).toLowerCase();
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
    sortCol = "FutureStarScore";
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
    var ribbons = ["1st", "2nd", "3rd"];
    var html = "";
    var top = playersByScore.length ? playersByScore : players;
    for (var i = 0; i < 3 && i < top.length; i++) {
        var p = top[i];
        var flag = getLeagueFlag(p.League);
        html += '<div class="top-card rank-' + (i + 1) + '">';
        html += '<span class="rank-ribbon">' + ribbons[i] + '</span>';
        html += avatarHtml(p.Name, p.Club);
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
        html += '<div class="card-id">' + avatarHtml(p.Name, p.Club);
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

    var headHtml = '<th class="rank-col" title="Overall rank by Future Star Score">#</th>';
    for (var i = 0; i < cols.length; i++) {
        var cls = sortCol === cols[i] ? sortDir : "";
        var aria = sortCol === cols[i] ? (sortDir === "asc" ? "ascending" : "descending") : "none";
        headHtml += '<th class="' + cls + '" tabindex="0" role="columnheader" aria-sort="' + aria + '" data-col="' + cols[i] + '" onclick="doSort(\'' + cols[i] + '\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();doSort(\'' + cols[i] + '\')}">' + labels[i] + '</th>';
    }
    document.getElementById("tHead").innerHTML = headHtml;

    var bodyHtml = "";
    if (list.length === 0) {
        bodyHtml = '<tr><td colspan="' + (cols.length + 1) + '" class="empty-cell">No players match these filters.</td></tr>';
    }
    for (var i = 0; i < list.length; i++) {
        var rank = 0;
        for (var k = 0; k < playersByScore.length; k++) {
            if (playersByScore[k].Name === list[i].Name && playersByScore[k].Club === list[i].Club) { rank = k + 1; break; }
        }
        bodyHtml += "<tr>";
        bodyHtml += '<td class="rank">' + rank + '</td>';
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
