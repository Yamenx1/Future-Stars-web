/*
 * Future Stars - app.js
 * loads player data and renders cards + table
 * data is from the 2026-27 season, processed by our Java program
 * U22 prospects across 18 leagues, ranked by Future Star Score
 */

var players = [];
var playersByScore = [];
var playerPhotos = {"Lamine Yamal|Barcelona":"https://media.api-sports.io/football/players/386828.png","Gavi|Barcelona":"https://media.api-sports.io/football/players/296667.png","Marc Bernal|Barcelona":"https://media.api-sports.io/football/players/433396.png","Marc Casado|Barcelona":"https://media.api-sports.io/football/players/329728.png","Dani Rodriguez|Barcelona":"https://media.api-sports.io/football/players/371912.png","Endrick|Real Madrid":"https://media.api-sports.io/football/players/377122.png","Raul Asencio|Real Madrid":"https://media.api-sports.io/football/players/341640.png","Pau Cubarsi|Barcelona":"https://media.api-sports.io/football/players/396623.png","Rayane Bounida|Ajax":"https://media.api-sports.io/football/players/396202.png","Joao Simoes|Sporting CP":"https://media.api-sports.io/football/players/400509.png","Afonso Moreira|Sporting CP":"https://media.api-sports.io/football/players/345388.png","Tyrique George|Chelsea":"https://media.api-sports.io/football/players/334037.png","Yeremy Pino|Villarreal":"https://media.api-sports.io/football/players/184226.png","Ajay Matthews|Middlesbrough":"https://media.api-sports.io/football/players/360202.png","Pablo Barrios|Atletico Madrid":"https://media.api-sports.io/football/players/336594.png","Jesus Rodriguez|Real Betis":"https://media.api-sports.io/football/players/443162.png","Pablo Garcia|Real Betis":"https://media.api-sports.io/football/players/443163.png","Andrey Santos|Chelsea":"https://media.api-sports.io/football/players/305834.png","Santiago Castro|Bologna":"https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3c/Santiago_Castro.jpg/250px-Santiago_Castro.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Rico Lewis|Man City":"https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0f/ManCity20240722-027.jpg/250px-ManCity20240722-027.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Desire Doue|PSG":"https://thumb.wikimedia.org/wikipedia/commons/thumb/9/92/Desire_Doue_France_v_Senegal_16_June_2026-264.jpg/250px-Desire_Doue_France_v_Senegal_16_June_2026-264.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Noah Nartey|Brondby":"https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a6/Noah_Nartey_%282023%29.png/250px-Noah_Nartey_%282023%29.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Valentin Atangana|Reims":"https://thumb.wikimedia.org/wikipedia/commons/thumb/5/50/Atangana_asse_sr.png/250px-Atangana_asse_sr.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Oghenetejiri Adejenughure|Salzburg":"https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8b/FC_Liefering_gegen_Floridsdorfer_AC_%282025-03-28_Zweite_Liga%29_11.jpg/250px-FC_Liefering_gegen_Floridsdorfer_AC_%282025-03-28_Zweite_Liga%29_11.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Adam Daghim|Salzburg":"https://thumb.wikimedia.org/wikipedia/commons/thumb/9/92/FC_Salzburg_vs._Atletico_Madrid_%282025-01-29_UEFA_Championsleague%29_43.jpg/250px-FC_Salzburg_vs._Atletico_Madrid_%282025-01-29_UEFA_Championsleague%29_43.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Ethan Nwaneri|Arsenal":"https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cd/Ethan_Nwaneri.png/250px-Ethan_Nwaneri.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Yankuba Minteh|Brighton":"https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bb/Yankuba_Minteh_24012026_%281%29.jpg/250px-Yankuba_Minteh_24012026_%281%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Mikey Moore|Tottenham":"https://thumb.wikimedia.org/wikipedia/commons/thumb/2/24/Mikey_Moore_with_a_fan.jpg/250px-Mikey_Moore_with_a_fan.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Chemsdine Talbi|Club Brugge":"https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/Chemsdine_Talbi_Brazil_V_Morocco_13_June_2026-203.jpg/250px-Chemsdine_Talbi_Brazil_V_Morocco_13_June_2026-203.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Estevao Willian|Chelsea":"https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b3/Estevao-Palmeiras-Liverpool-abr24_%28cropped%29.jpg/250px-Estevao-Palmeiras-Liverpool-abr24_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Karim Konate|Salzburg":"https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5d/FC_Red_Bull_Salzburg_gegen_FC_Blau-Wei%C3%9F_Linz_%282024-08-10%29_33.jpg/250px-FC_Red_Bull_Salzburg_gegen_FC_Blau-Wei%C3%9F_Linz_%282024-08-10%29_33.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Jayden Meghoma|Chelsea":"https://thumb.wikimedia.org/wikipedia/commons/thumb/4/47/Jayden_Meghoma_02082025_%281%29.jpg/250px-Jayden_Meghoma_02082025_%281%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Lewis Hall|Newcastle":"https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5f/Lewis_Hall_24052026_%282%29.jpg/250px-Lewis_Hall_24052026_%282%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Julian Hall|NY Red Bulls":"https://thumb.wikimedia.org/wikipedia/commons/thumb/d/df/Julian_Hall_Red_Bulls_Revolution-35_%28cropped%29.jpg/250px-Julian_Hall_Red_Bulls_Revolution-35_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Trey Nyoni|Liverpool":"https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9e/Trey_Nyoni_04012026_%281%29.jpg/250px-Trey_Nyoni_04012026_%281%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Daniel Jebbison|Sheffield United":"https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1e/Daniel_Jebbison_2024.jpg/250px-Daniel_Jebbison_2024.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Nico Paz|Como":"https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0e/Nico_Paz_Argentina_v_Spain_19_July_2026-057.jpg/250px-Nico_Paz_Argentina_v_Spain_19_July_2026-057.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Nathaniel Brown|Frankfurt":"https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0e/Nathaniel_Brown_Ecuador_v_Germany_25_June_2026-160.jpg/250px-Nathaniel_Brown_Ecuador_v_Germany_25_June_2026-160.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Roony Bardghji|Barcelona":"https://thumb.wikimedia.org/wikipedia/commons/thumb/9/96/Roony_Bardghji%2C_Vejle_Boldklub_-_FC_K%C3%B8benhavn%2C_29._July_2023_-_opvarmning_%28cropped%29.jpg/250px-Roony_Bardghji%2C_Vejle_Boldklub_-_FC_K%C3%B8benhavn%2C_29._July_2023_-_opvarmning_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Malo Gusto|Chelsea":"https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a2/Malo_Gusto_France_v_Senegal_16_June_2026-399.jpg/250px-Malo_Gusto_France_v_Senegal_16_June_2026-399.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Joao Neves|PSG":"https://thumb.wikimedia.org/wikipedia/commons/thumb/b/be/Joao_Neves_Croatia_v_Portugal_2_July_2026-102.jpg/250px-Joao_Neves_Croatia_v_Portugal_2_July_2026-102.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Kellen Fisher|Norwich":"https://thumb.wikimedia.org/wikipedia/commons/thumb/3/33/Kellen_Fisher.jpg/250px-Kellen_Fisher.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Bazoumana Toure|Hoffenheim":"https://thumb.wikimedia.org/wikipedia/commons/thumb/6/65/Bazoumana_Toure_Cote_D%27Ivoire_v_Ecuador_14_June_2026-50.jpg/250px-Bazoumana_Toure_Cote_D%27Ivoire_v_Ecuador_14_June_2026-50.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Rodrigo Mora|Porto":"https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7b/Rodrigo_Mora.jpg/250px-Rodrigo_Mora.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Ibrahim Mbaye|PSG":"https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6f/Ibrahim_Mbaye_France_v_Senegal_16_June_2026-256.jpg/250px-Ibrahim_Mbaye_France_v_Senegal_16_June_2026-256.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Leny Yoro|Man United":"https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a2/RC_Lens_-_Lille_OSC_%2808-10-2023%29_12_%28cropped1%29.jpg/250px-RC_Lens_-_Lille_OSC_%2808-10-2023%29_12_%28cropped1%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Kenan Yildiz|Juventus":"https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e0/Kenan_Y%C4%B1ld%C4%B1z_in_the_international_match_%28March_2025%29_%28cropped%29.jpg/250px-Kenan_Y%C4%B1ld%C4%B1z_in_the_international_match_%28March_2025%29_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Senny Mayulu|PSG":"https://thumb.wikimedia.org/wikipedia/commons/thumb/6/65/Match_Football_Paris_SG_x_AS_Saint_%C3%89tienne_Stade_Parc_Princes_-_Paris_XVI_%28FR75%29_-_2025-01-12_-_65.jpg/250px-Match_Football_Paris_SG_x_AS_Saint_%C3%89tienne_Stade_Parc_Princes_-_Paris_XVI_%28FR75%29_-_2025-01-12_-_65.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Givairo Read|Feyenoord":"https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8f/Givairo_read-1772634849_%28cropped%29.JPG/250px-Givairo_read-1772634849_%28cropped%29.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Jack Hinshelwood|Brighton":"https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9f/Jack_Hinshelwood_24012026_%282%29.jpg/250px-Jack_Hinshelwood_24012026_%282%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Chris Rigg|Sunderland":"https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e3/Chris_Rigg_05092026_%282%29.jpg/250px-Chris_Rigg_05092026_%282%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Julio Enciso|Brighton":"https://thumb.wikimedia.org/wikipedia/commons/thumb/d/df/Julio_Enciso_France_v_Paraguay_4_July_2026-039.jpg/250px-Julio_Enciso_France_v_Paraguay_4_July_2026-039.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Ziyad Al-Johani|Al-Ahli":"https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ec/Ziyad_Al-Johani.jpg/250px-Ziyad_Al-Johani.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Francisco Conceicao|Juventus":"https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a7/Francisco_Conceicao_Croatia_v_Portugal_2_July_2026-256.jpg/250px-Francisco_Conceicao_Croatia_v_Portugal_2_July_2026-256.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Bence Dardai|Wolfsburg":"https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b4/Dardaibtur2.jpg/250px-Dardaibtur2.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","George Ilenikhena|Monaco":"https://thumb.wikimedia.org/wikipedia/commons/thumb/5/53/Ilenikhena_asse_asm_2425.png/250px-Ilenikhena_asse_asm_2425.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Mads Hansen|Nordsjaelland":"https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bc/Mads_Andre_Hansen.jpg/250px-Mads_Andre_Hansen.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Aymen Sliti|Feyenoord":"https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b6/Feyenoord_Rotterdam_U19_vs._FC_Salburg_U19_%28Uefa_Youth_League_2024-11-06_Vierte_Runde%29_38.jpg/250px-Feyenoord_Rotterdam_U19_vs._FC_Salburg_U19_%28Uefa_Youth_League_2024-11-06_Vierte_Runde%29_38.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Valentin Sulzbacher|Salzburg":"https://thumb.wikimedia.org/wikipedia/commons/thumb/5/59/FC_Salzburg_U19_gegen_Celtic_FC_U19_%282025-02-12_UEFA_Youth_League_%29_63.jpg/250px-FC_Salzburg_U19_gegen_Celtic_FC_U19_%282025-02-12_UEFA_Youth_League_%29_63.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Jamal Musiala|Bayern Munich":"https://thumb.wikimedia.org/wikipedia/commons/thumb/4/44/Jamal_Musiala_Ecuador_v_Germany_25_June_2026-174_%28cropped%29.jpg/250px-Jamal_Musiala_Ecuador_v_Germany_25_June_2026-174_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Cavan Sullivan|Philadelphia":"https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1c/Cavan_Sullivan_Philadelphia_Union_New_York_City_FC_Nov_23_2025-016_%28cropped%29.jpg/250px-Cavan_Sullivan_Philadelphia_Union_New_York_City_FC_Nov_23_2025-016_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Noah Allen|Inter Miami":"https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b9/Noah_Allen_NYCFC_Miami_24_Sep_2025-115_%28cropped%29.jpg/250px-Noah_Allen_NYCFC_Miami_24_Sep_2025-115_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Samuel Rak-Sakyi|Chelsea":"https://thumb.wikimedia.org/wikipedia/commons/thumb/0/03/Sam_rak-sakyi_chelsea_noah_warm_up.jpg/250px-Sam_rak-sakyi_chelsea_noah_warm_up.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Dies Janse|Ajax":"https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/Dies_Janse.jpg/250px-Dies_Janse.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Franco Mastantuono|Real Madrid":"https://thumb.wikimedia.org/wikipedia/commons/thumb/0/00/Franco_Mastantuono_in_2025_%28cropped%29.jpg/250px-Franco_Mastantuono_in_2025_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Morgan Rogers|Aston Villa":"https://thumb.wikimedia.org/wikipedia/commons/thumb/2/28/Morgan_Rogers_England_v_Panama_27_June_26-144_%28cropped%29.jpg/250px-Morgan_Rogers_England_v_Panama_27_June_26-144_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Luka Sucic|Real Sociedad":"https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a0/Luka_Sucic_Croatia_v_Portugal_2_July_2026-062.jpg/250px-Luka_Sucic_Croatia_v_Portugal_2_July_2026-062.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Savinho|Man City":"https://upload.wikimedia.org/wikipedia/commons/a/a0/Manchester_City_2025_06_26_Juventus_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled","Assan Ouedraogo|RB Leipzig":"https://thumb.wikimedia.org/wikipedia/commons/thumb/3/34/Assan_Ouedraogo_Ecuador_v_Germany_25_June_2026-155_%28cropped%29.jpg/250px-Assan_Ouedraogo_Ecuador_v_Germany_25_June_2026-155_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Kees Smit|AZ":"https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e9/Kees_Smit.jpg/250px-Kees_Smit.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Nico OReilly|Man City":"https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ad/Nico_O%27Reilly_England_v_Ghana_23_June_2026-043_%28cropped%29.jpg/250px-Nico_O%27Reilly_England_v_Ghana_23_June_2026-043_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Evan Ferguson|Roma":"https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8f/Evan_Ferguson_YantsImages_-_Asatur_Yesayants_626_%28cropped%29.jpg/250px-Evan_Ferguson_YantsImages_-_Asatur_Yesayants_626_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Semih Kilicsoy|Besiktas":"https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f6/Semih_K%C4%B1l%C4%B1%C3%A7soy_20240803.jpg/250px-Semih_K%C4%B1l%C4%B1%C3%A7soy_20240803.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Ousmane Diomande|Sporting CP":"https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c9/Ousmane_Diomand%C3%A9_Cote_D%27Ivoire_v_Ecuador_14_June_2026-58.jpg/250px-Ousmane_Diomand%C3%A9_Cote_D%27Ivoire_v_Ecuador_14_June_2026-58.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Matthew Corcoran|Nashville":"https://thumb.wikimedia.org/wikipedia/commons/thumb/9/95/Matthew_Corcoran_Revolution_Nashville_6.25.25-045_%28cropped%29.jpg/250px-Matthew_Corcoran_Revolution_Nashville_6.25.25-045_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Castello Lukeba|RB Leipzig":"https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4d/Castello_Lukeba_in_2022.png/250px-Castello_Lukeba_in_2022.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Jorthy Mokio|Ajax":"https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6a/Jorthy_Mokio.JPG/250px-Jorthy_Mokio.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Antonio Nusa|RB Leipzig":"https://thumb.wikimedia.org/wikipedia/commons/thumb/8/80/Antonio_Nusa_Morocco_v_Norway_7_June_2026-110_%28cropped%29.jpg/250px-Antonio_Nusa_Morocco_v_Norway_7_June_2026-110_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Adam Wharton|Crystal Palace":"https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b6/Fredrikstad_Fotballklubb_v_Crystal_Palace_FC%2C_28_August_2025_B06_%28cropped%29.jpg/250px-Fredrikstad_Fotballklubb_v_Crystal_Palace_FC%2C_28_August_2025_B06_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Joel Ordonez|Club Brugge":"https://thumb.wikimedia.org/wikipedia/commons/thumb/4/42/Joel_Ordonez_Cote_D%27Ivoire_v_Ecuador_14_June_2026-154_%28cropped%29.jpg/250px-Joel_Ordonez_Cote_D%27Ivoire_v_Ecuador_14_June_2026-154_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Stephen Mfuni|Man City":"https://thumb.wikimedia.org/wikipedia/commons/thumb/8/81/ManCity20240722-044.jpg/250px-ManCity20240722-044.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Peyton Miller|New England":"https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ab/Peyton_Miller_Revolution_Nashville_6.25.25-208_%28cropped%29.jpg/250px-Peyton_Miller_Revolution_Nashville_6.25.25-208_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Simone Pafundi|Udinese":"https://thumb.wikimedia.org/wikipedia/commons/thumb/6/64/Uruguay_1_Italia_0_a_Italia_-_Uruguay_campe%C3%B3n_Mundial_Sub_20_2023_230611-4427-jikatu_%2852989760354%29_%28Simone_Pafundi%29.jpg/250px-Uruguay_1_Italia_0_a_Italia_-_Uruguay_campe%C3%B3n_Mundial_Sub_20_2023_230611-4427-jikatu_%2852989760354%29_%28Simone_Pafundi%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Florian Wirtz|Liverpool":"https://thumb.wikimedia.org/wikipedia/commons/thumb/7/70/Florian_Wirtz_Ecuador_v_Germany_25_June_2026-181_%28cropped%29.jpg/250px-Florian_Wirtz_Ecuador_v_Germany_25_June_2026-181_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Dario Osorio|Midtjylland":"https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a3/Dar%C3%ADo_Osorio_Universidad_de_Chile_v_O%27Higgins_20230807_02.jpg/250px-Dar%C3%ADo_Osorio_Universidad_de_Chile_v_O%27Higgins_20230807_02.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Ayyoub Bouaddi|Lille":"https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e8/Ayyoub_Bouaddi_Morocco_v_Norway_7_June_2026-71_%28cropped%29.jpg/250px-Ayyoub_Bouaddi_Morocco_v_Norway_7_June_2026-71_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Valentin Carboni|Genoa":"https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4c/Valentin_Carboni_%28cropped%29.jpg/250px-Valentin_Carboni_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Cher Ndour|Besiktas":"https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fc/Cher_Ndour.jpg/250px-Cher_Ndour.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Archie Gray|Tottenham":"https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a2/Rangers_v_Tottenham_Hotspur_-_54202663229_%28Archie_Gray%29.jpg/250px-Rangers_v_Tottenham_Hotspur_-_54202663229_%28Archie_Gray%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Benjamin Cremaschi|Inter Miami":"https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5b/Benjamin_Cremaschi_NE_Revolution_Inter_Miami_7.9.25-014_%28cropped%29.jpg/250px-Benjamin_Cremaschi_NE_Revolution_Inter_Miami_7.9.25-014_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Law McCabe|Middlesbrough":"https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5e/Law_McCabe.png/250px-Law_McCabe.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Kobbie Mainoo|Man United":"https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1f/Kobbie_Mainoo_England_v_Ghana_23_June_2026-042.jpg/250px-Kobbie_Mainoo_England_v_Ghana_23_June_2026-042.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Mahamadou Doumbia|Antwerp":"https://thumb.wikimedia.org/wikipedia/commons/thumb/6/62/Mahamadou_Doumbia_%28cropped%29.png/250px-Mahamadou_Doumbia_%28cropped%29.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Guillaume Restes|Toulouse":"https://thumb.wikimedia.org/wikipedia/commons/thumb/7/79/RC_Lens_-_Toulouse_FC_%2824-09-2023%29_5.jpg/250px-RC_Lens_-_Toulouse_FC_%2824-09-2023%29_5.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Warren Zaire-Emery|PSG":"https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2b/Warren_Zaire-Emery_France_v_Senegal_16_June_2026-279.jpg/250px-Warren_Zaire-Emery_France_v_Senegal_16_June_2026-279.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Gianluca Busio|Venezia":"https://thumb.wikimedia.org/wikipedia/commons/thumb/6/66/Gianluca_Busio.jpg/250px-Gianluca_Busio.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Harry Amass|Man United":"https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b9/Harry_Amass_18102025_%284%29_%28cropped%29.jpg/250px-Harry_Amass_18102025_%284%29_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Myles Lewis-Skelly|Arsenal":"https://thumb.wikimedia.org/wikipedia/commons/thumb/7/70/Myles_Lewis-Skelly_2026_%28cropped%29.jpg/250px-Myles_Lewis-Skelly_2026_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Arda Guler|Real Madrid":"https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9f/Arda_G%C3%BCler_2025.jpg/250px-Arda_G%C3%BCler_2025.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Benjamin Sesko|Arsenal":"https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e9/FC_RB_Salzburg_gegen_SK_Austria_Klagenfurt_%282023-05-28%29_38_%28cropped%29.jpg/250px-FC_RB_Salzburg_gegen_SK_Austria_Klagenfurt_%282023-05-28%29_38_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Lamine Camara|Monaco":"https://thumb.wikimedia.org/wikipedia/commons/thumb/5/53/Lamine_Camara_France_v_Senegal_16_June_2026-445.jpg/250px-Lamine_Camara_France_v_Senegal_16_June_2026-445.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Quim Junyent|Barcelona":"https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c9/Quim_Junyent_UEFA_U19_2026_vs_Germany.png/250px-Quim_Junyent_UEFA_U19_2026_vs_Germany.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Mika Godts|Ajax":"https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c8/Mika_Godts_USMNT_v_Belgium_Mar_28_2026-236.jpg/250px-Mika_Godts_USMNT_v_Belgium_Mar_28_2026-236.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Jude Bellingham|Real Madrid":"https://thumb.wikimedia.org/wikipedia/commons/thumb/2/23/Jude_Bellingham_England_v_Ghana_23_June_2026-061_%28cropped%29.jpg/250px-Jude_Bellingham_England_v_Ghana_23_June_2026-061_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Samson Baidoo|Salzburg":"https://thumb.wikimedia.org/wikipedia/commons/thumb/9/92/FC_Red_Bull_Salzburg_gegen_FC_Blau-Wei%C3%9F_Linz_%282025-04-06_%C3%96sterreichische_Bundesliga%29_11.jpg/250px-FC_Red_Bull_Salzburg_gegen_FC_Blau-Wei%C3%9F_Linz_%282025-04-06_%C3%96sterreichische_Bundesliga%29_11.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Xavi Simons|Tottenham":"https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b2/2023-10-04_Fu%C3%9Fball%2C_M%C3%A4nner%2C_UEFA_Champions_League%2C_RB_Leipzig_-_Manchester_City_FC_1DX_2672_%28Xavi_Simons%29.jpg/250px-2023-10-04_Fu%C3%9Fball%2C_M%C3%A4nner%2C_UEFA_Champions_League%2C_RB_Leipzig_-_Manchester_City_FC_1DX_2672_%28Xavi_Simons%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Jorrel Hato|Chelsea":"https://thumb.wikimedia.org/wikipedia/commons/thumb/4/49/Jorrel_Hato_Chelsea_AC_Milan_warm_up.jpg/250px-Jorrel_Hato_Chelsea_AC_Milan_warm_up.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Alejandro Garnacho|Chelsea":"https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ab/Alejandro_Garnacho_7_August_2022_%28cropped%29.jpg/250px-Alejandro_Garnacho_7_August_2022_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Mathys Tel|Tottenham":"https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a2/Mathys_Tel_en_2026.png/250px-Mathys_Tel_en_2026.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Milos Kerkez|Liverpool":"https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e5/Milot_Kerkez_%28cropped%29.png/250px-Milot_Kerkez_%28cropped%29.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Harvey Elliott|Aston Villa":"https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ad/Harvey_Elliott_in_2022.jpg/250px-Harvey_Elliott_in_2022.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Ansu Fati|Monaco":"https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ef/%D0%9C%D0%B0%D1%82%D1%87_%C2%AB%D0%94%D0%B8%D0%BD%D0%B0%D0%BC%D0%BE%C2%BB_-_%C2%AB%D0%91%D0%B0%D1%80%D1%81%D0%B5%D0%BB%D0%BE%D0%BD%D0%B0%C2%BB_0-1._2_%D0%BB%D0%B8%D1%81%D1%82%D0%BE%D0%BF%D0%B0%D0%B4%D0%B0_2021_%D1%80%D0%BE%D0%BA%D1%83_%E2%80%94_1289339_%28cropped%29.jpg/250px-%D0%9C%D0%B0%D1%82%D1%87_%C2%AB%D0%94%D0%B8%D0%BD%D0%B0%D0%BC%D0%BE%C2%BB_-_%C2%AB%D0%91%D0%B0%D1%80%D1%81%D0%B5%D0%BB%D0%BE%D0%BD%D0%B0%C2%BB_0-1._2_%D0%BB%D0%B8%D1%81%D1%82%D0%BE%D0%BF%D0%B0%D0%B4%D0%B0_2021_%D1%80%D0%BE%D0%BA%D1%83_%E2%80%94_1289339_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Oscar Gloukh|Ajax":"https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5a/Oscar_Gloukh_%28cropped%29.jpg/250px-Oscar_Gloukh_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Aaron Anselmino|Dortmund":"https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ed/Aaron_Anselmino_Chelsea_AC_Milan_warm_up.jpg/250px-Aaron_Anselmino_Chelsea_AC_Milan_warm_up.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Lucas Hey|Anderlecht":"https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d3/Lucas_Hey_RSCA_2025.jpg/250px-Lucas_Hey_RSCA_2025.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Clement Bischoff|Salzburg":"https://thumb.wikimedia.org/wikipedia/commons/thumb/8/81/FC_RB_Salzburg_gegen_SK_Sturm_Graz_%282025-09-20_Bundesliga_Runde_sieben%29_26.jpg/250px-FC_RB_Salzburg_gegen_SK_Sturm_Graz_%282025-09-20_Bundesliga_Runde_sieben%29_26.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Djylian Nguessan|Saint-Etienne":"https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ad/N%27Guessan_asse_sr_2425.png/250px-N%27Guessan_asse_sr_2425.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Youssoufa Moukoko|FC Copenhagen":"https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bf/Moukoko_asse_ogcn_2425.png/250px-Moukoko_asse_ogcn_2425.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Vitor Reis|Girona":"https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6f/Vitor-Reis-Palmeiras-Sao-Paulo-ago24-2_%28cropped%29.jpg/250px-Vitor-Reis-Palmeiras-Sao-Paulo-ago24-2_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Tommy Watson|Brighton":"https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2b/Tom_Watson_14032026_%281%29.jpg/250px-Tom_Watson_14032026_%281%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Kendry Paez|Strasbourg":"https://thumb.wikimedia.org/wikipedia/commons/thumb/a/aa/Kendry_Paez_Cote_D%27Ivoire_v_Ecuador_14_June_2026-37_%28cropped%29.jpg/250px-Kendry_Paez_Cote_D%27Ivoire_v_Ecuador_14_June_2026-37_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Johan Bakayoko|RB Leipzig":"https://thumb.wikimedia.org/wikipedia/commons/thumb/2/25/Johan_Bakayoko_%282024%29.jpg/250px-Johan_Bakayoko_%282024%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail","Eliesse Ben Seghir|Leverkusen":"https://thumb.wikimedia.org/wikipedia/commons/thumb/7/70/Eliesse_Ben_Seghir_vs_Niger_%28cropped_2%29.jpg/250px-Eliesse_Ben_Seghir_vs_Niger_%28cropped_2%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"};
var sortCol = "FutureStarScore";
var sortDir = "desc";

// player data (output from FutureStarPreprocessor.java - 223 players, all under 22)
var csvData = `
Name,Age,Nationality,Club,League,Position,MinutesPlayed,Goals,Assists,ShotsOnTarget,DribblesCompleted,PassAccuracy,Tackles,Interceptions,GoalsPer90,AssistsPer90,FutureStarScore
Lamine Yamal,19,Spain,Barcelona,La Liga,RW,2771,9,13,47,144,84,42,16,0.29,0.42,21.82
Warren Zaire-Emery,21,France,PSG,Ligue 1,CM,2500,7,9,26,28,89,52,36,0.25,0.32,11.29
Kobbie Mainoo,21,England,Man United,Premier League,CM,2400,5,6,18,22,86,48,32,0.19,0.23,10.05
Pau Cubarsi,19,Spain,Barcelona,La Liga,CB,2620,2,3,8,5,69,33,17,0.07,0.1,8.42
Gavi,22,Spain,Barcelona,La Liga,CM,1014,1,1,1,6,88,30,10,0.09,0.09,6.79
Joao Neves,21,Portugal,PSG,Ligue 1,CM,2600,6,10,22,24,91,58,42,0.21,0.35,11.34
Mathys Tel,20,France,Tottenham,Premier League,CF,1800,9,5,32,34,80,16,10,0.45,0.25,10.25
Alejandro Garnacho,22,Argentina,Aston Villa,Premier League,LW,2400,11,7,42,60,77,20,14,0.41,0.26,11.61
Savinho,22,Brazil,Man City,Premier League,RW,2000,6,8,24,54,82,16,10,0.27,0.36,11.03
Arda Guler,21,Turkey,Real Madrid,La Liga,AM,1800,10,6,32,28,87,14,10,0.5,0.3,10.02
Evan Ferguson,22,Ireland,Roma,Serie A,CF,1800,7,4,28,16,78,14,10,0.35,0.2,6.95
Antonio Nusa,21,Norway,RB Leipzig,Bundesliga,RW,1800,6,7,22,44,81,14,10,0.3,0.35,10.55
Desire Doue,21,France,PSG,Ligue 1,AM,2000,8,8,28,48,82,20,14,0.36,0.36,11.53
Kenan Yildiz,21,Turkey,Juventus,Serie A,LW,2300,9,6,30,42,83,18,12,0.35,0.23,10.38
Jorrel Hato,20,Netherlands,Chelsea,Premier League,LB,2400,5,7,16,28,86,46,34,0.19,0.26,11.2
Oscar Gloukh,22,Israel,Ajax,Eredivisie,AM,2200,12,11,40,46,85,24,18,0.49,0.45,11.71
Leny Yoro,20,France,Man United,Premier League,CB,1800,1,1,6,8,88,44,34,0.05,0.05,10.48
Kacper Urbanski,21,Poland,Bologna,Serie A,CM,1800,4,6,14,22,85,32,24,0.2,0.3,9.61
Jamie Bynoe-Gittens,22,England,Chelsea,Premier League,LW,1800,7,6,22,40,79,12,10,0.35,0.3,9.6
Youssoufa Moukoko,21,Germany,FC Copenhagen,Danish SL,CF,1400,5,3,20,20,76,10,6,0.32,0.19,7.65
Adam Wharton,22,England,Crystal Palace,Premier League,CM,2200,4,5,12,16,90,50,34,0.16,0.2,9.27
Estevao Willian,19,Brazil,Chelsea,Premier League,RW,1600,7,8,26,48,81,10,6,0.39,0.45,12.43
Nico Paz,22,Argentina,Como,Serie A,AM,2200,9,10,32,36,85,18,14,0.37,0.41,10.28
Roony Bardghji,19,Sweden,Barcelona,La Liga,RW,1200,4,3,16,22,80,8,6,0.3,0.23,9.05
Archie Gray,20,England,Tottenham,Premier League,CM,2000,3,4,10,14,87,46,32,0.14,0.18,9.67
Ousmane Diomande,22,Ivory Coast,Sporting CP,Liga Portugal,CB,2400,4,2,10,12,88,60,42,0.15,0.08,11.23
Milos Kerkez,22,Hungary,Liverpool,Premier League,LB,2400,2,6,10,20,84,42,30,0.08,0.23,9.3
Rico Lewis,21,England,Man City,Premier League,RB,2000,3,5,10,18,89,38,28,0.14,0.23,9.8
Tyler Dibling,19,England,Everton,Premier League,RW,1800,5,4,20,38,79,14,10,0.25,0.2,10.4
Dario Osorio,22,Chile,Midtjylland,Danish SL,RW,2200,10,8,34,48,81,16,12,0.41,0.33,10.73
El Chadaille Bitshiabu,20,France,RB Leipzig,Bundesliga,CB,1600,1,1,6,8,87,40,30,0.06,0.06,9.95
Abdoullah Ba,22,France,Sunderland,Championship,AM,2000,6,7,22,36,82,18,14,0.27,0.32,9.68
Omari Kellyman,20,England,Chelsea,Premier League,AM,1000,2,3,8,16,80,10,6,0.18,0.27,8.21
Kendry Paez,18,Ecuador,Strasbourg,Ligue 1,AM,800,3,3,10,14,81,8,6,0.34,0.34,9.54
Claudio Echeverri,19,Argentina,Leverkusen,Bundesliga,AM,1000,3,4,12,20,83,10,6,0.27,0.36,9.62
Geovany Quenda,18,Portugal,Sporting CP,Liga Portugal,RW,1400,3,5,14,30,80,12,8,0.19,0.32,10.22
Yankuba Minteh,21,Gambia,Brighton,Premier League,RW,1600,5,4,18,36,78,10,8,0.28,0.23,9.29
Facundo Buonanotte,21,Argentina,Chelsea,Premier League,AM,1800,6,5,22,32,82,14,10,0.3,0.25,9.55
Andrey Santos,22,Brazil,Chelsea,Premier League,CM,2857,10,3,16,18,83,110,32,0.32,0.09,10.53
Julio Enciso,21,Paraguay,Brighton,Premier League,AM,1400,5,4,18,26,79,10,6,0.32,0.26,8.74
Cher Ndour,21,Italy,Besiktas,Super Lig,CM,1800,3,4,12,14,84,36,24,0.15,0.2,8.63
Ben Doak,20,Scotland,Middlesbrough,Championship,RW,1600,5,6,18,34,79,10,8,0.28,0.34,9.87
Ethan Nwaneri,19,England,Dortmund,Bundesliga,AM,1400,6,4,22,30,82,10,6,0.39,0.26,10.37
Myles Lewis-Skelly,20,England,Arsenal,Premier League,LB,1900,2,4,8,26,87,40,28,0.09,0.19,10.17
Vitor Reis,20,Brazil,Girona,La Liga,CB,1200,1,0,4,6,89,30,24,0.08,0.0,8.98
Jack Hinshelwood,21,England,Brighton,Premier League,CM,1800,3,3,12,16,86,38,26,0.15,0.15,8.89
Harry Amass,19,England,Man United,Premier League,LB,1100,0,2,2,14,84,28,20,0.0,0.16,9.03
Lewis Hall,22,England,Newcastle,Premier League,LB,2200,2,5,8,24,83,44,30,0.08,0.2,9.35
Nico OReilly,21,England,Man City,Premier League,CM,1300,2,3,10,16,85,28,20,0.14,0.21,8.55
Franco Mastantuono,19,Argentina,Real Madrid,La Liga,AM,1500,5,4,20,32,81,10,6,0.3,0.24,10.27
Jesus Rodriguez,20,Spain,Real Betis,La Liga,LW,1128,2,0,8,30,78,17,6,0.16,0.0,8.38
Tom Bischof,21,Germany,Bayern Munich,Bundesliga,CM,1700,4,5,16,22,86,30,22,0.21,0.26,9.5
Assan Ouedraogo,20,Germany,RB Leipzig,Bundesliga,CM,1200,3,2,10,18,82,24,16,0.23,0.15,8.88
Can Uzun,20,Turkey,Frankfurt,Bundesliga,CF,1600,8,3,30,22,77,10,6,0.45,0.17,8.74
Bence Dardai,20,Hungary,Wolfsburg,Bundesliga,AM,1300,4,4,14,24,80,12,8,0.28,0.28,9.19
Valentin Carboni,21,Argentina,Genoa,Serie A,AM,1500,4,5,18,30,81,12,8,0.24,0.3,9.23
Aaron Anselmino,21,Argentina,Dortmund,Bundesliga,CB,1400,1,0,4,8,87,36,28,0.06,0.0,8.98
Santiago Castro,22,Argentina,Bologna,Serie A,CF,2000,9,3,36,18,78,12,8,0.41,0.14,7.19
Niccolo Pisilli,21,Italy,Roma,Serie A,CM,1600,3,2,12,16,86,34,24,0.17,0.11,8.68
Eliesse Ben Seghir,21,Morocco,Leverkusen,Bundesliga,LW,2000,8,6,30,52,80,14,10,0.36,0.27,11.32
Lamine Camara,22,Senegal,Monaco,Ligue 1,CM,1900,3,4,12,20,85,42,30,0.14,0.19,8.95
Ayyoub Bouaddi,19,France,Lille,Ligue 1,CM,1500,1,3,6,16,88,36,26,0.06,0.18,9.84
Guillaume Restes,21,France,Toulouse,Ligue 1,GK,2700,0,1,0,2,76,1,2,0.0,0.03,5.62
Jorthy Mokio,18,Belgium,Ajax,Eredivisie,CB,1300,2,1,6,14,87,34,26,0.14,0.07,10.52
Mika Godts,21,Belgium,Ajax,Eredivisie,LW,1500,5,6,20,38,79,10,8,0.3,0.36,9.87
Rodrigo Mora,19,Portugal,Porto,Liga Portugal,AM,1600,6,5,22,36,82,12,8,0.34,0.28,10.93
Martim Fernandes,20,Portugal,Porto,Liga Portugal,RB,1700,1,5,6,20,84,38,26,0.05,0.26,9.84
Chris Rigg,19,England,Sunderland,Premier League,CM,2000,4,4,16,24,83,36,26,0.18,0.18,10.47
Tommy Watson,20,England,Brighton,Premier League,LW,1700,6,4,22,34,78,12,8,0.32,0.21,9.68
Semih Kilicsoy,21,Turkey,Besiktas,Super Lig,CF,1700,8,3,30,26,76,10,6,0.42,0.16,8.49
Yusuf Akcicek,20,Turkey,Fenerbahce,Super Lig,CB,1500,1,1,4,8,86,38,30,0.06,0.06,9.79
Talal Haji,19,Saudi Arabia,Al-Riyadh,Saudi Pro League,CF,1200,5,2,18,16,74,8,6,0.38,0.15,8.23
Abbas Al-Hassan,22,Saudi Arabia,Al-Nassr,Saudi Pro League,CM,1400,2,3,8,12,84,32,24,0.13,0.19,7.81
Julian Hall,18,USA,NY Red Bulls,MLS,CF,900,4,2,14,18,75,6,4,0.4,0.2,9.15
Peyton Miller,18,USA,New England,MLS,LB,1300,1,4,6,22,81,30,22,0.07,0.28,9.99
Noah Allen,22,USA,Inter Miami,MLS,LB,1800,1,3,6,18,82,34,24,0.05,0.15,8.13
Mads Hansen,20,Denmark,Nordsjaelland,Danish SL,RW,1800,7,6,26,40,79,12,8,0.35,0.3,10.6
Konstantinos Karetsas,18,Greece,Dortmund,Bundesliga,AM,1500,5,6,20,34,81,10,8,0.3,0.36,11.28
Joel Ordonez,22,Ecuador,Club Brugge,Belgian Pro League,CB,2200,2,1,8,10,88,48,36,0.08,0.04,9.9
Chemsdine Talbi,21,Morocco,Club Brugge,Belgian Pro League,RW,1900,8,5,30,44,79,12,8,0.38,0.24,10.46
Lennon Miller,20,Scotland,Celtic,Scottish Premiership,CM,2100,4,6,18,22,84,40,28,0.17,0.26,10.19
James Wilson,19,Scotland,Hearts,Scottish Premiership,CF,1400,7,2,24,14,75,8,6,0.45,0.13,8.26
Karim Konate,22,Ivory Coast,Salzburg,Austrian Bundesliga,CF,1800,11,3,38,20,77,10,6,0.55,0.15,7.8
Samson Baidoo,22,Austria,Salzburg,Austrian Bundesliga,CB,1900,2,1,8,10,86,42,32,0.09,0.05,9.21
Ethan Wheatley,20,England,Man United,Premier League,CF,700,2,1,8,10,74,6,4,0.26,0.13,6.73
Godwill Kukonki,18,England,Man United,Premier League,CB,600,0,0,2,4,85,18,14,0.0,0.0,8.25
Trey Nyoni,19,England,Liverpool,Premier League,CM,700,0,1,2,8,86,18,14,0.0,0.13,8.07
Amara Nallo,19,England,Liverpool,Premier League,CB,600,0,0,2,4,87,20,16,0.0,0.0,8.1
Stephen Mfuni,18,England,Man City,Premier League,LB,500,0,1,2,8,82,16,12,0.0,0.18,8.21
Jan Virgili,20,Spain,Barcelona,La Liga,LW,600,1,1,4,12,78,6,4,0.15,0.15,6.85
Quim Junyent,19,Spain,Barcelona,La Liga,CM,500,0,1,2,8,85,14,10,0.0,0.18,7.94
Joan Martinez,19,Spain,Real Madrid,La Liga,CB,500,0,0,2,4,86,16,12,0.0,0.0,7.55
Chema Andres,21,Spain,Real Madrid,La Liga,CM,600,0,1,2,10,87,20,14,0.0,0.15,7.39
Hugo Alba,19,Spain,Real Betis,La Liga,AM,500,1,1,4,10,79,6,4,0.18,0.18,7.78
Wisdom Mike,18,Germany,Bayern Munich,Bundesliga,RW,500,1,1,4,12,77,4,2,0.18,0.18,7.95
Cassiano Kiala,18,Germany,Leverkusen,Bundesliga,CB,500,0,0,2,4,85,16,12,0.0,0.0,8
Montrell Culbreath,19,Germany,Leverkusen,Bundesliga,LW,500,1,0,4,10,76,4,2,0.18,0.0,6.84
Diego Sia,19,Italy,AC Milan,Serie A,RW,500,1,0,4,10,76,4,2,0.18,0.0,6.84
Emanuele Sala,19,Italy,AC Milan,Serie A,CM,500,0,1,2,8,84,14,10,0.0,0.18,7.88
Lorenzo Venturino,20,Italy,Genoa,Serie A,RW,600,1,1,4,12,77,6,4,0.15,0.15,6.8
Lucas Michal,21,France,Monaco,Ligue 1,CF,700,2,1,8,12,75,6,4,0.26,0.13,6.48
Bradel Kiwa,19,France,Monaco,Ligue 1,CB,500,0,0,2,4,85,18,14,0.0,0.0,7.75
Ayman Aiki,21,France,Lille,Ligue 1,RW,600,1,1,4,14,78,6,4,0.15,0.15,6.55
Kayden Wolff,19,Netherlands,Ajax,Eredivisie,RW,600,1,1,4,14,78,6,4,0.15,0.15,7.55
Dies Janse,20,Netherlands,Ajax,Eredivisie,CB,600,0,0,2,6,86,20,16,0.0,0.0,7.55
Rafael Luis,21,Portugal,Benfica,Liga Portugal,CM,600,0,1,2,8,84,18,14,0.0,0.15,7.01
Goncalo Oliveira,20,Portugal,Porto,Liga Portugal,CF,600,2,0,8,10,74,6,4,0.3,0.0,6.6
Oliver Arblaster,22,England,Sheffield United,Championship,CM,1400,2,2,8,14,83,32,24,0.13,0.13,7.76
Efe Akman,20,Turkey,Galatasaray,Super Lig,CM,700,1,1,4,10,83,20,14,0.13,0.13,7.87
Kristian Fletcher,21,USA,DC United,MLS,RW,1100,3,2,12,20,77,8,6,0.25,0.16,7.41
Villads Nielsen,21,Denmark,Nordsjaelland,Danish SL,CB,1200,1,0,4,8,86,30,22,0.08,0.0,8.2
Kaye Furo,19,Belgium,Club Brugge,Belgian Pro League,CF,600,2,0,8,10,74,6,4,0.3,0.0,7.1
Daniel Cummings,21,Scotland,Celtic,Scottish Premiership,CF,700,2,1,8,8,74,6,4,0.26,0.13,6.03
Oghenetejiri Adejenughure,19,Austria,Salzburg,Austrian Bundesliga,CF,600,2,0,8,10,73,6,4,0.3,0.0,7.05
Josh Acheampong,20,England,Chelsea,Premier League,RB,800,0,1,2,10,84,22,16,0.0,0.11,7.8
Chido Obi,18,Denmark,Man United,Premier League,CF,500,1,0,4,8,73,4,2,0.18,0.0,6.99
Bendito Mantato,19,England,Man United,Premier League,RW,500,1,0,4,10,77,4,2,0.18,0.0,6.89
Toni Fernandez,19,Spain,Barcelona,La Liga,RW,500,1,1,4,12,78,4,2,0.18,0.18,7.5
Andres Cuenca,19,Spain,Barcelona,La Liga,CB,500,0,0,2,4,86,16,12,0.0,0.0,7.55
David Jimenez,21,Spain,Real Madrid,La Liga,RB,500,0,1,2,8,83,16,10,0.0,0.18,6.64
Diego Aguado,19,Spain,Real Madrid,La Liga,CB,500,0,0,2,4,86,14,10,0.0,0.0,7.3
Said El Mala,20,Germany,Koln,Bundesliga,LW,900,3,2,12,20,76,8,6,0.3,0.2,8.1
Jaka Cuber Potocnik,21,Slovenia,Koln,Bundesliga,CF,600,1,0,6,8,73,4,2,0.15,0.0,5.4
Noel Aseko,21,Germany,Bayern Munich,Bundesliga,CM,500,0,1,2,8,85,14,10,0.0,0.18,6.94
Mattia Liberali,19,Italy,AC Milan,Serie A,AM,500,0,1,2,10,81,6,4,0.0,0.18,7.53
Andrea Natali,18,Italy,AC Milan,Serie A,CB,500,0,0,2,4,85,14,10,0.0,0.0,7.75
Giacomo De Pieri,20,Italy,Inter,Serie A,RW,500,1,0,4,10,76,4,2,0.18,0.0,6.34
Matteo Cocchi,19,Italy,Inter,Serie A,LB,500,0,1,2,8,82,14,10,0.0,0.18,7.46
George Ilenikhena,20,Nigeria,Monaco,Ligue 1,CF,800,2,1,10,12,74,6,4,0.23,0.11,6.8
Axel Tape,19,France,PSG,Ligue 1,CB,500,0,0,2,4,86,14,10,0.0,0.0,7.3
Quentin Ndjantou,19,France,PSG,Ligue 1,RW,500,1,0,4,10,77,4,2,0.18,0.0,6.89
Givairo Read,20,Netherlands,Feyenoord,Eredivisie,RB,900,1,2,4,14,82,22,14,0.1,0.2,7.95
Aymen Sliti,20,Tunisia,Feyenoord,Eredivisie,LW,600,1,1,4,14,77,6,4,0.15,0.15,7
Joao Rego,21,Portugal,Benfica,Liga Portugal,AM,600,1,1,4,12,80,6,4,0.15,0.15,6.87
Eduardo Fernandes,19,Portugal,Sporting CP,Liga Portugal,RW,500,1,0,4,10,77,4,2,0.18,0.0,6.89
Kellen Fisher,22,England,Norwich,Championship,RB,1200,1,3,6,16,82,30,20,0.08,0.23,7.82
Elliot Myles,19,Wales,Norwich,Championship,LW,600,1,1,4,12,77,6,4,0.15,0.15,7.3
Mustafa Hekimoglu,19,Turkey,Besiktas,Super Lig,CF,600,2,0,8,10,73,6,4,0.3,0.0,7.05
Ali Al-Masoud,20,Saudi Arabia,Al-Nassr,Saudi Pro League,LW,600,1,1,4,12,77,6,4,0.15,0.15,6.8
Cavan Sullivan,17,USA,Philadelphia,MLS,AM,500,1,1,4,12,78,4,2,0.18,0.18,8.79
Matthew Corcoran,20,USA,Nashville,MLS,CM,900,1,1,4,10,82,22,16,0.1,0.1,7.79
Clement Bischoff,20,Denmark,Salzburg,Austrian Bundesliga,LW,900,2,2,10,16,78,8,6,0.2,0.2,7.5
Jorne Spileers,21,Belgium,Club Brugge,Belgian Pro League,CB,800,0,0,2,6,87,24,18,0.0,0.0,7.48
Bailey Dall,20,Scotland,Hearts,Scottish Premiership,CM,600,0,1,2,8,82,16,12,0.0,0.15,7.3
Valentin Sulzbacher,21,Austria,Salzburg,Austrian Bundesliga,CM,700,1,1,4,10,83,20,14,0.13,0.13,7.37
Dennis Seimen,20,Germany,Stuttgart,Bundesliga,GK,1800,0,0,0,1,82,2,1,0.0,0.0,6.46
Aron Yaakobishvili,20,Hungary,Barcelona,La Liga,GK,500,0,0,0,0,80,0,0,0.0,0.0,5.44
Tommy Simkin,21,England,Stoke,Championship,GK,1200,0,0,0,0,75,1,1,0.0,0.0,5.27
Lewis Miley,20,England,Newcastle,Premier League,CM,1500,2,3,8,14,86,32,24,0.12,0.18,9.03
Mikey Moore,19,England,Tottenham,Premier League,LW,900,2,2,8,20,79,6,4,0.2,0.2,8.45
Shea Lacey,19,England,Man United,Premier League,RW,700,1,2,6,18,80,6,4,0.13,0.26,8.2
Jahmai Simpson-Pusey,20,England,Man City,Premier League,CB,800,0,0,2,4,88,22,18,0.0,0.0,7.9
Harrison Armstrong,19,England,Everton,Premier League,CM,900,1,1,4,10,84,24,18,0.1,0.1,8.5
Jayden Meghoma,19,England,Chelsea,Premier League,LB,700,0,1,2,12,82,20,14,0.0,0.13,7.98
Samuel Rak-Sakyi,20,England,Chelsea,Premier League,CM,600,1,1,4,10,83,16,12,0.15,0.15,7.82
Jesus Fortea,19,Spain,Real Madrid,La Liga,RB,700,0,2,2,12,84,22,16,0.0,0.26,8.59
Thiago Pitarch,19,Spain,Valencia,La Liga,CM,900,1,2,4,12,83,24,18,0.1,0.2,8.86
Iker Bravo,21,Spain,Osasuna,La Liga,CF,1100,3,1,12,12,76,8,6,0.25,0.08,6.4
Felipe Chavez,19,Germany,Bayern Munich,Bundesliga,AM,700,2,2,8,16,81,8,6,0.26,0.26,8.84
Bazoumana Toure,21,Ivory Coast,Hoffenheim,Bundesliga,LW,1200,3,3,12,28,78,10,8,0.23,0.23,8.32
Dzenan Pejcinovic,21,Germany,Wolfsburg,Bundesliga,CF,800,2,1,8,10,75,6,4,0.23,0.11,6.15
Arijon Ibrahimovic,20,Germany,Bayern Munich,Bundesliga,LW,700,1,2,6,16,79,8,6,0.13,0.26,7.45
Francesco Camarda,18,Italy,AC Milan,Serie A,CF,700,2,0,8,10,74,6,4,0.26,0.0,7.47
Jonas Rouhi,21,Sweden,Juventus,Serie A,LB,900,0,1,2,12,82,24,18,0.0,0.1,7.43
Christian Comotto,19,Italy,AC Milan,Serie A,CM,600,0,1,2,8,84,18,14,0.0,0.15,8.01
Simone Pafundi,20,Italy,Udinese,Serie A,AM,800,1,2,6,16,80,8,6,0.11,0.23,7.92
Senny Mayulu,20,France,PSG,Ligue 1,CM,1100,2,2,8,18,87,26,20,0.16,0.16,9.22
Ibrahim Mbaye,18,France,PSG,Ligue 1,RW,700,1,2,6,20,79,6,4,0.13,0.26,8.85
Djylian Nguessan,18,France,Saint-Etienne,Ligue 2,CF,600,2,0,6,10,75,6,4,0.3,0.0,7.65
Valentin Atangana,21,France,Reims,Ligue 1,CM,1300,1,2,6,14,85,34,26,0.07,0.14,8.37
Kees Smit,20,Netherlands,AZ,Eredivisie,CM,1500,3,3,12,20,84,30,22,0.18,0.18,9.44
Ro-Zangelo Daal,18,Netherlands,AZ,Eredivisie,RW,700,2,2,8,18,78,6,4,0.26,0.26,8.99
Tiago Parente,19,Portugal,Benfica,Liga Portugal,LB,700,0,1,2,10,83,20,14,0.0,0.13,8.03
Law McCabe,20,England,Middlesbrough,Championship,CM,800,1,1,4,10,83,22,16,0.11,0.11,7.9
Arda Unyay,19,Turkey,Galatasaray,Super Lig,CB,800,0,0,2,6,86,26,20,0.0,0.0,8.68
Ziyad Al-Johani,22,Saudi Arabia,Al-Ahli,Saudi Pro League,CM,900,1,1,4,10,82,24,18,0.1,0.1,6.89
Benjamin Cremaschi,21,USA,Inter Miami,MLS,CM,1500,3,2,12,16,82,28,20,0.18,0.12,8.25
Obed Vargas,21,Mexico,Seattle,MLS,CM,1700,2,3,8,18,83,34,26,0.11,0.16,8.72
Noah Nartey,21,Denmark,Brondby,Danish SL,AM,1200,3,3,12,22,80,12,8,0.23,0.23,8.29
Mahamadou Doumbia,22,Mali,Antwerp,Belgian Pro League,CM,1300,2,2,8,14,83,30,22,0.14,0.14,7.7
Francis Turley,20,Northern Ireland,Celtic,Scottish Premiership,CM,700,0,1,2,8,84,18,14,0.0,0.13,7.45
Adam Daghim,20,Denmark,Salzburg,Austrian Bundesliga,RW,1300,4,3,16,24,78,10,8,0.28,0.21,8.55
Rio Ngumoha,17,England,Liverpool,Premier League,LW,560,2,1,6,6,78,2,3,0.32,0.16,8.29
Sverre Nypan,19,Norway,Lommel,Belgian Pro League,AM,624,0,0,1,9,82,10,3,0.0,0.0,7.13
Jeremy Jacquet,21,France,Liverpool,Premier League,CB,1671,0,0,2,5,86,22,15,0.0,0.0,7.11
Oscar Perea,20,Colombia,America,Liga MX,AM,1254,2,0,11,19,82,6,15,0.14,0.0,7.95
Gilberto Mora,17,Mexico,Tijuana,Liga MX,AM,1131,4,1,11,17,82,7,5,0.32,0.08,9.61
Allen Obando,20,Ecuador,Nacional,Primeira Liga,CF,157,1,0,1,1,75,1,0,0.57,0.0,6.57
Rio Ngumoha,17,England,Liverpool,Premier League,LW,560,2,1,6,6,78,2,3,0.32,0.16,8.29
Sverre Nypan,19,Norway,Lommel,Belgian Pro League,AM,624,0,0,1,7,81,10,3,0,0,6.91
Jeremy Jacquet,21,France,Liverpool,Premier League,CB,1671,0,0,2,5,86,22,15,0,0,7.11
Oscar Perea,20,Colombia,America,Liga MX,AM,1254,2,0,11,15,81,6,15,0.14,0,7.56
Gilberto Mora,17,Mexico,Tijuana,Liga MX,AM,1131,4,1,8,14,81,6,3,0.32,0.08,9.23
Allen Obando,20,Ecuador,Nacional,Primeira Liga,CF,157,1,0,1,1,75,1,0,0.57,0,6.57
Samuel Amo-Ameyaw,20,England,Strasbourg,Ligue 1,RW,1043,2,2,6,10,78,4,3,0.17,0.17,6.76
Mahamadou Nagida,21,Cameroon,Paris SG,Ligue 1,LB,815,0,0,2,7,83,12,9,0,0,5.96
Divine Mukasa,19,England,West Ham,Championship,AM,851,2,3,6,10,81,4,3,0.21,0.32,8.22
Ayden Heaven,19,England,Man United,Premier League,CB,924,0,1,1,3,86,12,8,0,0.1,7.24
Jack Fletcher,19,England,Man United,Premier League,CM,108,0,0,0,1,84,1,1,0,0,6.3
Gonzalo Garcia,22,Spain,Fulham,Premier League,CF,952,6,1,11,3,85,11,3,0.57,0.09,6.44
Davide Bartesaghi,20,Italy,Milan,Serie A,LB,2441,2,0,7,22,83,37,27,0.07,0,9.3
Jan Faberski,20,Poland,Zwolle,Eredivisie,RW,477,0,2,1,5,78,2,1,0,0.38,6.15
Don-Angelo Konadu,19,Netherlands,Lommel,Belgian Pro League,CF,168,0,0,1,1,75,1,0,0,0,5.35
Sean Steur,18,Netherlands,Newcastle,Premier League,AM,1125,1,0,8,14,81,6,3,0.08,0,8.05
Oliver Scarles,20,England,West Ham,Championship,LB,845,0,0,3,8,83,13,9,0,0,6.53
Damion Downs,22,USA,St. Louis City,MLS,CF,536,0,0,4,3,75,2,1,0,0,4.05
Gessime Yassine,20,Morocco,Strasbourg,Ligue 1,RW,805,0,1,5,8,78,3,2,0,0.11,5.92
Abdoul Ouattara,20,France,Strasbourg,Ligue 1,LB,1768,0,0,5,16,83,27,19,0,0,8.03
Lucas Hogsberg,20,Denmark,Strasbourg,Ligue 1,CB,1792,0,0,2,5,86,23,16,0,0,7.74
Mathis Amougou,20,France,Strasbourg,Ligue 1,CM,797,0,0,3,6,84,12,9,0,0,6.69
Lennart Karl,18,Germany,Bayern,Bundesliga,AM,1281,5,5,9,15,81,6,4,0.35,0.35,9.58
Max Dowman,16,England,Arsenal,Premier League,AM,300,1,0,2,4,81,2,1,0.3,0,8.51
Will Lankshear,21,England,Middlesbrough,Championship,CF,2800,11,4,11,17,75,8,6,0.35,0.13,7.27
Pietro Comuzzo,21,Italy,Torino,Serie A,CB,1696,1,0,2,5,86,22,15,0.05,0,7.22
Conrad Harder,21,Denmark,Strasbourg,Ligue 1,CF,919,3,3,4,6,75,3,2,0.29,0.29,6.32
Victor Froholdt,20,Denmark,Porto,Liga Portugal,CM,2875,6,6,11,30,85,49,33,0.19,0.19,11.12
Yael Padilla,20,Mexico,Tijuana,Liga MX,LW,150,1,0,1,2,78,1,0,0.6,0,6.9
Dean Huijsen,21,Spain,Real Madrid,La Liga,CB,2034,2,2,5,6,86,32,18,0.09,0.09,8.28
Ethan Mbappe,19,France,Lille,Ligue 1,AM,567,3,1,7,6,83,14,3,0.48,0.16,8.39
Darryl Bakola,18,France,Sassuolo,Serie A,CM,318,0,2,1,2,84,5,3,0,0.57,8.45
Lucas Bergvall,20,Sweden,Tottenham,Premier League,CM,1175,1,3,5,8,84,18,13,0.08,0.23,7.84
Isaac Babadi,21,Netherlands,Antwerp,Belgian Pro League,AM,479,0,0,3,6,81,2,1,0,0,5.58
Heriberto Jurado,21,Mexico,Cercle Brugge,Belgian Pro League,AM,161,0,0,1,2,81,1,0,0,0,5.19
`;

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
    if (cat === "gk") return "goalkeeper";
    return "";
}

// short league codes shown as badges (no emojis)
function getLeagueCode(league) {
    var codes = {
        "Premier League": "ENG",
        "La Liga": "ESP",
        "Bundesliga": "GER",
        "Serie A": "ITA",
        "Ligue 1": "FRA",
        "Eredivisie": "NED",
        "Liga Portugal": "POR",
        "Super Lig": "TUR",
        "MLS": "USA",
        "Championship": "ENG2",
        "Danish SL": "DEN",
        "Saudi Pro League": "KSA",
        "Belgian Pro League": "BEL",
        "Scottish Premiership": "SCO",
        "Liga MX": "MX",
        "Primeira Liga": "POR",
        "Austrian Bundesliga": "AUT",
        "Ligue 2": "FRA2",
        "Serie B": "ITA2"
    };
    return codes[league] || "U22";
}
function getLeagueBadge(league) {
    return '<span class="lg-code">' + getLeagueCode(league) + '</span>';
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
    var sil = '<svg class="sil" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5"/></svg>';
    if (url) {
        return '<div class="avatar">' + esc(initials(name)) + '<img src="' + url + '" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove()"></div>';
    }
    return '<div class="avatar">' + sil + '<span style="position:relative">' + esc(initials(name)) + '</span></div>';
}

// ---------- watchlist (localStorage) ----------
var watchOnly = false;
function getWatch() {
    try { return JSON.parse(localStorage.getItem("fs_watch") || "[]"); } catch (e) { return []; }
}
function inWatch(key) { return getWatch().indexOf(key) !== -1; }
function toggleFav(key) {
    var w = getWatch();
    var i = w.indexOf(key);
    if (i === -1) w.push(key); else w.splice(i, 1);
    try { localStorage.setItem("fs_watch", JSON.stringify(w)); } catch (e) {}
    renderCards(lastFiltered);
}
function toggleWatch() {
    watchOnly = !watchOnly;
    var b = document.getElementById("watchBtn");
    if (b) b.setAttribute("aria-pressed", watchOnly ? "true" : "false");
    applyFilters();
}

// ---------- compare (pick 2) ----------
var compareSel = [];
function toggleCompare(key) {
    var i = compareSel.indexOf(key);
    if (i !== -1) compareSel.splice(i, 1);
    else {
        compareSel.push(key);
        if (compareSel.length > 2) compareSel.shift();
    }
    updateTray();
    renderCards(lastFiltered);
}
function clearCompare() { compareSel = []; updateTray(); renderCards(lastFiltered); }
function findByKey(key) {
    for (var i = 0; i < players.length; i++) {
        if (players[i].Name + "|" + players[i].Club === key) return players[i];
    }
    return null;
}
function updateTray() {
    var tray = document.getElementById("compareTray");
    var label = document.getElementById("compareLabel");
    if (!tray) return;
    if (!compareSel.length) { tray.hidden = true; return; }
    tray.hidden = false;
    var names = compareSel.map(function (k) { var p = findByKey(k); return p ? p.Name : k; });
    if (label) label.textContent = names.join("  vs  ") + (names.length === 1 ? "  (+ pick one more)" : "");
}
function openCompare() {
    if (compareSel.length !== 2) return;
    var a = findByKey(compareSel[0]), b = findByKey(compareSel[1]);
    if (!a || !b) return;
    var rows = [
        ["Club", a.Club, b.Club, false], ["League", a.League, b.League, false],
        ["Position", a.Position, b.Position, false], ["Age", a.Age, b.Age, true],
        ["Minutes", a.MinutesPlayed, b.MinutesPlayed, true], ["Goals", a.Goals, b.Goals, true],
        ["Assists", a.Assists, b.Assists, true], ["G/90", a.GoalsPer90, b.GoalsPer90, true],
        ["A/90", a.AssistsPer90, b.AssistsPer90, true], ["Dribbles", a.DribblesCompleted, b.DribblesCompleted, true],
        ["Pass %", a.PassAccuracy, b.PassAccuracy, true], ["Star Score", a.FutureStarScore, b.FutureStarScore, true]
    ];
    function numOf(p, i) { return parseFloat([p.Club, p.League, p.Position, p.Age, p.MinutesPlayed, p.Goals, p.Assists, p.GoalsPer90, p.AssistsPer90, p.DribblesCompleted, p.PassAccuracy, p.FutureStarScore][i]) || 0; }
    var html = '<div class="cmp-head">' + avatarHtml(a.Name, a.Club) + avatarHtml(b.Name, b.Club) + "</div>";
    html += '<div class="modal-kicker">Head to head</div><h3 id="modalName" style="font-family:var(--font-display);font-size:1.6rem;text-transform:uppercase">' + esc(a.Name) + " vs " + esc(b.Name) + "</h3>";
    html += '<table class="cmp-table"><tbody>';
    for (var i = 0; i < rows.length; i++) {
        var wa = rows[i][3] && numOf(a, i) > numOf(b, i);
        var wb = rows[i][3] && numOf(b, i) > numOf(a, i);
        html += "<tr><td>" + rows[i][0] + "</td><td class=\"" + (wa ? "win" : "") + "\">" + esc(String(rows[i][1])) + "</td><td class=\"" + (wb ? "win" : "") + "\">" + esc(String(rows[i][2])) + "</td></tr>";
    }
    html += "</tbody></table>";
    html += '<div style="margin-top:12px;display:flex;gap:8px;align-items:center"><button type="button" class="btn btn-ghost btn-sm" id="cmpShare">Copy compare link</button><span class="share-note" id="cmpNote" aria-live="polite"></span></div>';
    document.getElementById("modalBody").innerHTML = html;
    var shareBtn = document.getElementById("cmpShare");
    if (shareBtn) shareBtn.addEventListener("click", function () {
        var link = location.protocol + "//" + location.host + location.pathname + "?compare=" + compareSel.map(function (k) { return encodeURIComponent(k); }).join("~");
        var ok = function () { var n = document.getElementById("cmpNote"); if (n) n.textContent = "Link copied!"; };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(link).then(ok, ok); else ok();
        try { if (history.replaceState) history.replaceState(null, "", "?compare=" + compareSel.map(function (k) { return encodeURIComponent(k); }).join("~")); } catch (e) {}
    });
    var modal = document.getElementById("playerModal");
    modal.hidden = false;
    if (document.body && document.body.style) document.body.style.overflow = "hidden";
}

// ---------- score chart (top 20 of current view) ----------
function drawChart(list) {
    var cv = document.getElementById("scoreChart");
    if (!cv || !cv.getContext) return;
    var top = list.slice(0, 20);
    var dpr = window.devicePixelRatio || 1;
    var W = cv.clientWidth || 600, rowH = 24, padL = 150, padR = 44, padT = 8;
    var H = top.length * rowH + padT + 8;
    cv.style.height = H + "px";
    cv.width = W * dpr; cv.height = H * dpr;
    var c = cv.getContext("2d");
    c.scale(dpr, dpr);
    c.clearRect(0, 0, W, H);
    if (!top.length) return;
    var max = 0, i;
    for (i = 0; i < top.length; i++) max = Math.max(max, parseFloat(top[i].FutureStarScore) || 0);
    c.font = "12px Inter, system-ui, sans-serif";
    for (i = 0; i < top.length; i++) {
        var p = top[i], y = padT + i * rowH;
        var v = parseFloat(p.FutureStarScore) || 0;
        var bw = max > 0 ? ((W - padL - padR) * v / max) : 0;
        c.fillStyle = "#9fb09a";
        var label = (i + 1) + ". " + p.Name;
        if (label.length > 24) label = label.slice(0, 23) + "…";
        c.fillText(label, 0, y + 15);
        var g = c.createLinearGradient(padL, 0, padL + bw, 0);
        g.addColorStop(0, "#d7f542"); g.addColorStop(1, "#9dc22e");
        c.fillStyle = g;
        c.beginPath();
        if (c.roundRect) c.roundRect(padL, y + 4, Math.max(bw, 2), 14, 4); else c.rect(padL, y + 4, Math.max(bw, 2), 14);
        c.fill();
        c.fillStyle = "#f2f5ec";
        c.fillText(String(p.FutureStarScore), padL + bw + 6, y + 15);
    }
}

// ---------- deep links: ?player= ?compare= ?league= ?pos= ?q= ?club= ----------
function readParam(name) {
    try {
        var m = new RegExp("[?&]" + name + "=([^&]*)").exec(location.search);
        return m ? decodeURIComponent(m[1].replace(/\+/g, " ")) : "";
    } catch (e) { return ""; }
}
function syncFilterUrl() {
    try {
        if (!history.replaceState) return;
        var pos = document.getElementById("positionFilter").value;
        var league = document.getElementById("leagueFilter").value;
        var q = document.getElementById("searchBox").value.trim();
        var parts = [];
        if (pos && pos !== "all") parts.push("pos=" + encodeURIComponent(pos));
        if (league && league !== "all") parts.push("league=" + encodeURIComponent(league));
        if (q) parts.push("q=" + encodeURIComponent(q));
        var base = location.protocol + "//" + location.host + location.pathname;
        history.replaceState(null, "", parts.length ? base + "?" + parts.join("&") : base);
    } catch (e) {}
}
function applyDeepLinks() {
    var cmp = readParam("compare");
    if (cmp) {
        var keys = cmp.split("~").map(function (k) { try { return decodeURIComponent(k); } catch (e) { return k; } });
        compareSel = keys.filter(function (k) { return findByKey(k); }).slice(0, 2);
        if (compareSel.length === 2) { updateTray(); openCompare(); return true; }
    }
    var player = readParam("player");
    var club = readParam("club");
    var q = club || readParam("q");
    var pos = readParam("pos"), league = readParam("league");
    var touched = false;
    if (pos && document.getElementById("positionFilter")) { document.getElementById("positionFilter").value = pos; touched = true; }
    if (league && document.getElementById("leagueFilter")) { document.getElementById("leagueFilter").value = league; touched = true; }
    if (player || q) { document.getElementById("searchBox").value = player || q; touched = true; }
    if (touched) {
        applyFilters();
        var sec = document.getElementById("players");
        if (sec && sec.scrollIntoView) sec.scrollIntoView();
    }
    return touched;
}

// ---------- search autocomplete ----------
function initAutocomplete() {
    var box = document.getElementById("searchBox");
    var list = document.getElementById("acList");
    if (!box || !list) return;
    box.addEventListener("input", function () {
        var s = box.value.toLowerCase().trim();
        if (s.length < 2) { list.hidden = true; list.innerHTML = ""; return; }
        var hits = [];
        for (var i = 0; i < players.length && hits.length < 6; i++) {
            var p = players[i];
            if (p.Name.toLowerCase().indexOf(s) !== -1 || p.Club.toLowerCase().indexOf(s) !== -1) hits.push(p);
        }
        if (!hits.length) { list.hidden = true; list.innerHTML = ""; return; }
        list.innerHTML = hits.map(function (p) {
            return '<button type="button" class="ac-item" data-name="' + esc(p.Name) + '"><span>' + esc(p.Name) + "</span><small>" + esc(p.Club) + "</small></button>";
        }).join("");
        list.hidden = false;
    });
    list.addEventListener("click", function (e) {
        var b = e.target.closest ? e.target.closest("[data-name]") : null;
        if (b) { box.value = b.getAttribute("data-name"); list.hidden = true; applyFilters(); box.focus(); }
    });
    box.addEventListener("keydown", function (e) { if (e.key === "Escape") { list.hidden = true; } });
    box.addEventListener("blur", function () { setTimeout(function () { list.hidden = true; }, 150); });
}
function renderSpotlight() {
    var el = document.getElementById("spotlight");
    if (!el || !playersByScore.length) return;
    var pool = playersByScore.slice(0, 10);
    var week = Math.floor(Date.now() / (7 * 86400000));
    var p = pool[week % pool.length];
    var key = p.Name + "|" + p.Club;
    el.innerHTML = '<button type="button" class="spot-card" data-key="' + esc(key) + '">'
        + avatarHtml(p.Name, p.Club)
        + '<span><span class="spot-kicker">Spotlight prospect</span>'
        + '<span class="spot-name" style="display:block">' + esc(p.Name) + "</span>"
        + '<span class="spot-meta" style="display:block">' + getLeagueBadge(p.League) + " " + esc(p.Club) + " &middot; " + esc(p.Position) + " &middot; Age " + p.Age + "</span>"
        + '<span class="spot-score">Star Score ' + p.FutureStarScore + " — open full file</span></span></button>";
    el.querySelector(".spot-card").addEventListener("click", function () { openModal(key); });
}

// ---------- transfer watch ----------
function renderMovers() {
    var area = document.getElementById("moversArea");
    if (!area) return;
    if (typeof scoreMovers === "undefined") { area.innerHTML = '<div class="leader-card">No transfer data yet.</div>'; return; }
    function row(m, badge, deltaTxt, deltaCls) {
        var key = m.key || (m.name + "|" + m.club);
        return '<div class="mover-row" data-key="' + esc(key) + '" tabindex="0" role="button">'
            + avatarHtml(m.name, m.club)
            + '<div><div class="mover-name">' + esc(m.name) + '</div><div class="mover-sub">' + esc(m.club) + " &middot; " + esc(m.pos) + " &middot; Age " + esc(String(m.age)) + "</div></div>"
            + '<span class="mover-delta ' + deltaCls + '">' + badge + (deltaTxt ? " " + deltaTxt : "") + "</span></div>";
    }
    var html = "";
    try {
        var deadline = new Date(2027, 0, 31, 23, 59, 59);
        var days = Math.ceil((deadline - Date.now()) / 86400000);
        if (days > 0) html += '<div class="ticker" style="margin-bottom:10px">Winter window shuts in ' + days + ' days — new faces land here after each sync.</div>';
    } catch (e) {}
    if (scoreMovers.fresh && scoreMovers.fresh.length) {
        html += '<div class="mover-group"><h3>Summer arrivals</h3>' + scoreMovers.fresh.map(function (m) {
            return row(m, "NEW", m.now, "new");
        }).join("") + "</div>";
    }
    if (scoreMovers.climbers && scoreMovers.climbers.length) {
        html += '<div class="mover-group"><h3>Biggest score revisions</h3>' + scoreMovers.climbers.map(function (m) {
            return row(m, "+" + m.delta, "#" + m.rankTo, "up");
        }).join("") + "</div>";
    }
    area.innerHTML = html || '<div class="leader-card">No transfer data yet.</div>';
    function open(e) {
        var t = e.target;
        while (t && t !== area && !(t.getAttribute && t.getAttribute("data-key"))) t = t.parentNode;
        if (t && t !== area) openModal(t.getAttribute("data-key"));
    }
    area.addEventListener("click", open);
    area.addEventListener("keydown", function (e) {
        if ((e.key === "Enter" || e.key === " ") && e.target && e.target.getAttribute && e.target.getAttribute("data-key")) {
            e.preventDefault(); openModal(e.target.getAttribute("data-key"));
        }
    });
}

// ---------- export current view as CSV ----------
function exportCsv() {
    var cols = ["Name", "Age", "Nationality", "Club", "League", "Position", "MinutesPlayed", "Goals", "Assists", "FutureStarScore"];
    function q(v) { v = String(v == null ? "" : v); return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; }
    var out = cols.join(",") + "\n" + lastFiltered.map(function (p) {
        return cols.map(function (c) { return q(p[c]); }).join(",");
    }).join("\n");
    var blob = new Blob([out], { type: "text/csv" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "future-stars.csv";
    document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
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
        opt.textContent = getLeagueCode(leagues[i]) + " · " + leagues[i];
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
        if (watchOnly && !inWatch(p.Name + "|" + p.Club)) continue;
        filtered.push(p);
    }
    visibleCount = 48;
    renderCards(filtered);
    renderTable(filtered);
    drawChart(filtered);
    syncFilterUrl();
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
    if (watchOnly) toggleWatch();
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

function bestBy(stat, tiebreak) {
    var best = null;
    for (var i = 0; i < players.length; i++) {
        var p = players[i];
        if (!best || p[stat] > best[stat] || (p[stat] === best[stat] && p[tiebreak] > best[tiebreak])) best = p;
    }
    return best;
}

function youngestStar() {
    var best = null;
    for (var i = 0; i < players.length; i++) {
        var p = players[i];
        if (!best || p.Age < best.Age || (p.Age === best.Age && p.FutureStarScore > best.FutureStarScore)) best = p;
    }
    return best;
}

function renderLeaders() {
    var defs = [
        { label: "Top scorer", stat: "Goals", suffix: " goals", pick: function () { return bestBy("Goals", "FutureStarScore"); } },
        { label: "Top assister", stat: "Assists", suffix: " assists", pick: function () { return bestBy("Assists", "FutureStarScore"); } },
        { label: "Top dribbler", stat: "DribblesCompleted", suffix: " dribbles", pick: function () { return bestBy("DribblesCompleted", "FutureStarScore"); } },
        { label: "Youngest star", stat: "Age", suffix: " yrs old", pick: youngestStar }
    ];
    var html = "";
    for (var i = 0; i < defs.length; i++) {
        var p = defs[i].pick();
        if (!p) continue;
        var flag = getLeagueBadge(p.League);
        html += '<div class="leader-card">';
        html += '<span class="leader-label">' + defs[i].label + '</span>';
        html += '<div class="leader-id">' + avatarHtml(p.Name, p.Club);
        html += '<div><div class="leader-name">' + esc(p.Name) + '</div>';
        html += '<div class="leader-meta">' + flag + ' ' + esc(p.Club) + '</div></div></div>';
        html += '<div class="leader-value">' + p[defs[i].stat] + '<small>' + defs[i].suffix + '</small></div>';
        html += '</div>';
    }
    document.getElementById("leadersArea").innerHTML = html;
}

function scoreParts(p) {
    // Must match the site formula per unit (FW/MF/DF/GK). Returns { parts, max }.
    var cat = getPosCat(p.Position);
    var mp90 = parseFloat(p.MinutesPlayed) / 90;
    var g90 = parseFloat(p.Goals) / mp90, a90 = parseFloat(p.Assists) / mp90;
    var drb = parseFloat(p.DribblesCompleted), pass = parseFloat(p.PassAccuracy);
    var tkl = parseFloat(p.Tackles), inter = parseFloat(p.Interceptions);
    var yb = { label: "Youth bonus (age " + p.Age + ")", value: (22 - parseFloat(p.Age)) * 0.5 };
    var parts;
    if (cat === "mf") {
        parts = [
            { label: "Goals", value: g90 * 2 },
            { label: "Assists", value: a90 * 2.5 },
            { label: "Dribbles", value: drb / 12 },
            { label: "Work rate", value: (tkl + inter) / 40 },
            { label: "Passing", value: pass / 18 }
        ];
    } else if (cat === "df") {
        parts = [
            { label: "Defending", value: Math.min((tkl + inter) / 16, 7.5) },
            { label: "Passing", value: pass / 20 },
            { label: "Attack", value: ((parseFloat(p.Goals) + parseFloat(p.Assists)) / mp90) * 2 }
        ];
    } else if (cat === "gk") {
        parts = [
            { label: "Distribution", value: pass / 18 },
            { label: "Activity", value: (tkl + inter) * 0.3 }
        ];
    } else {
        parts = [
            { label: "Goals", value: g90 * 3 },
            { label: "Assists", value: a90 * 2 },
            { label: "Dribbles", value: drb / 10 },
            { label: "Passing", value: pass / 20 }
        ];
    }
    parts.push(yb);
    var max = 0, i;
    for (i = 0; i < parts.length; i++) {
        parts[i].value = Math.round(parts[i].value * 100) / 100;
        if (parts[i].value > max) max = parts[i].value;
    }
    return { parts: parts, max: max };
}

function scoreBreakdown(p) {
    return scoreParts(p);
}

var lastFocus = null;

function openModal(key) {
    var p = null;
    for (var i = 0; i < players.length; i++) {
        if (players[i].Name + "|" + players[i].Club === key) { p = players[i]; break; }
    }
    if (!p) return;
    lastFocus = (typeof document !== "undefined" && document.activeElement) ? document.activeElement : null;
    var bd = scoreBreakdown(p);
    var flag = getLeagueBadge(p.League);
    var html = '<div class="modal-id">' + avatarHtml(p.Name, p.Club);
    html += '<div><div class="modal-kicker">' + esc(p.Position) + ' &middot; Age ' + p.Age + ' &middot; ' + esc(p.Nationality) + '</div>';
    html += '<h3 id="modalName">' + esc(p.Name) + '</h3>';
    html += '<div class="modal-club">' + flag + ' <span data-club="' + esc(p.Club) + '" style="cursor:pointer;text-decoration:underline dotted">' + esc(p.Club) + '</span> &middot; ' + esc(p.League) + '</div></div></div>';
    html += '<div class="modal-score"><span>' + p.FutureStarScore + '</span><small>Future Star Score</small></div>';
    html += '<div class="bd">';
    for (var j = 0; j < bd.parts.length; j++) {
        var pct = bd.max > 0 ? Math.round((bd.parts[j].value / bd.max) * 100) : 0;
        html += '<div class="bd-row"><span class="bd-label">' + bd.parts[j].label + '</span>';
        html += '<span class="bd-track"><span class="bd-fill" data-w="' + pct + '"></span></span>';
        html += '<span class="bd-val">+' + bd.parts[j].value.toFixed(2) + '</span></div>';
    }
    html += '</div><p class="bd-note">Score = goals/90&times;3 + assists/90&times;2 + dribbles/10 + pass%/20 + youth bonus.</p>';
    html += '<div class="modal-facts">';
    html += '<div><strong>' + p.MinutesPlayed + '</strong><span>Minutes</span></div>';
    html += '<div><strong>' + p.Goals + '</strong><span>Goals</span></div>';
    html += '<div><strong>' + p.Assists + '</strong><span>Assists</span></div>';
    html += '<div><strong>' + p.ShotsOnTarget + '</strong><span>On target</span></div>';
    html += '<div><strong>' + p.Tackles + '</strong><span>Tackles</span></div>';
    html += '<div><strong>' + p.Interceptions + '</strong><span>Interc.</span></div>';
    html += '</div>';
    html += '<button type="button" class="btn btn-ghost btn-sm" onclick="sharePlayer(\'' + esc(p.Name).replace(/'/g, "\\'") + '\')">Copy link to player</button> ';
    html += '<span class="share-note" id="shareNote" aria-live="polite"></span>';
    document.getElementById("modalBody").innerHTML = html;
    // animate score bars after paint
    var fills = document.querySelectorAll("#modalBody .bd-fill");
    var paint = window.requestAnimationFrame || function (fn) { setTimeout(fn, 30); };
    paint(function () {
        paint(function () {
            for (var f = 0; f < fills.length; f++) fills[f].style.width = fills[f].getAttribute("data-w") + "%";
        });
    });
    var modal = document.getElementById("playerModal");
    modal.setAttribute("data-cur", key);
    modal.hidden = false;
    if (document.body && document.body.style) document.body.style.overflow = "hidden";
    var close = modal.querySelector ? modal.querySelector(".modal-close") : null;
    if (close && close.focus) close.focus();
}

function closeModal() {
    var modal = document.getElementById("playerModal");
    if (modal) modal.hidden = true;
    if (document.body && document.body.style) document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
}

function sharePlayer(name) {
    var url = location.protocol + "//" + location.host + location.pathname + "?player=" + encodeURIComponent(name);
    var done = function () {
        var n = document.getElementById("shareNote");
        if (n) n.textContent = "Link copied!";
    };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done, done);
    else done();
    try {
        if (history.replaceState) history.replaceState(null, "", "?player=" + encodeURIComponent(name));
    } catch (e) { /* file:// or old browser */ }
}

if (typeof document !== "undefined" && document.addEventListener) {
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") { closeModal(); closeNav(); return; }
        var modal = document.getElementById("playerModal");
        var open = modal && !modal.hidden;
        if (!open) return;
        // arrow-key browsing through last filtered list
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
            var cur = modal.getAttribute("data-cur") || "";
            var list = (lastFiltered && lastFiltered.length ? lastFiltered : playersByScore);
            var idx = -1;
            for (var i = 0; i < list.length; i++) {
                if (list[i].Name + "|" + list[i].Club === cur) { idx = i; break; }
            }
            if (idx !== -1) {
                var n = e.key === "ArrowRight" ? (idx + 1) % list.length : (idx - 1 + list.length) % list.length;
                openModal(list[n].Name + "|" + list[n].Club);
            }
        }
        // focus trap
        if (e.key === "Tab") {
            var f = modal.querySelectorAll("button, [href], input, select, [tabindex]");
            f = Array.prototype.filter.call(f, function (el) { return !el.disabled && el.offsetParent !== null; });
            if (!f.length) return;
            var first = f[0], last = f[f.length - 1];
            if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
            else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
    });
    // club click anywhere -> squad view
    document.addEventListener("click", function (e) {
        var nav = document.querySelector(".nav");
        if (nav && nav.classList.contains("open") && !nav.contains(e.target)) closeNav();
        var t = e.target.closest ? e.target.closest("[data-club]") : null;
        if (!t) return;
        var club = t.getAttribute("data-club");
        var box = document.getElementById("searchBox");
        if (box && club) {
            box.value = club;
            applyFilters();
            var sec = document.getElementById("players");
            if (sec && sec.scrollIntoView) sec.scrollIntoView();
        }
    });
}

function closeNav() {
    var nav = document.querySelector(".nav");
    var toggle = document.getElementById("navToggle");
    if (nav) nav.classList.remove("open");
    if (toggle) { toggle.setAttribute("aria-expanded", "false"); toggle.setAttribute("aria-label", "Open menu"); }
}

function initNav() {
    var toggle = document.getElementById("navToggle");
    var nav = document.querySelector(".nav");
    if (toggle && nav) {
        toggle.addEventListener("click", function () {
            var open = nav.classList.toggle("open");
            toggle.setAttribute("aria-expanded", open ? "true" : "false");
            toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
        });
        var links = nav.querySelectorAll(".nav-links a");
        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener("click", closeNav);
        }
    }
    // shadow once scrolled (rAF-throttled)
    var ticking = false;
    function onScroll() {
        if (ticking) return;
        ticking = true;
        var raf = window.requestAnimationFrame || function (fn) { setTimeout(fn, 50); };
        raf(function () {
            var n = document.querySelector(".nav");
            if (n) n.classList.toggle("scrolled", window.scrollY > 8);
            ticking = false;
        });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    // active section highlight
    var map = {};
    var navLinks = document.querySelectorAll(".nav-links a");
    for (var j = 0; j < navLinks.length; j++) {
        var href = navLinks[j].getAttribute("href");
        if (href && href.charAt(0) === "#") map[href.slice(1)] = navLinks[j];
    }
    if ("IntersectionObserver" in window) {
        var active = null;
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) {
                if (en.isIntersecting) active = en.target.id;
            });
            Object.keys(map).forEach(function (id) {
                map[id].classList.toggle("active", id === active);
            });
        }, { rootMargin: "-40% 0px -55% 0px" });
        ["top3", "players", "leagues", "data"].forEach(function (id) {
            var sec = document.getElementById(id);
            if (sec) io.observe(sec);
        });
        // reveal-on-scroll (class added by JS so no-JS still shows content)
        var rio = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) {
                if (en.isIntersecting) { en.target.classList.add("in"); rio.unobserve(en.target); }
            });
        }, { threshold: 0.08 });
        var blocks = document.querySelectorAll("main section, .hero-cta, .stat-grid");
        for (var k = 0; k < blocks.length; k++) {
            blocks[k].classList.add("reveal");
            rio.observe(blocks[k]);
        }
    }
}

function renderLeagueTable() {
    var groups = {};
    for (var i = 0; i < players.length; i++) {
        var p = players[i];
        if (!groups[p.League]) groups[p.League] = { total: 0, age: 0, n: 0, top: null };
        var g = groups[p.League];
        g.total += p.FutureStarScore;
        g.age += p.Age;
        g.n++;
        if (!g.top || p.FutureStarScore > g.top.FutureStarScore) g.top = p;
    }
    var rows = [];
    for (var lg in groups) {
        if (Object.prototype.hasOwnProperty.call(groups, lg)) rows.push({ league: lg, g: groups[lg] });
    }
    rows.sort(function (a, b) { return (b.g.total / b.g.n) - (a.g.total / a.g.n); });
    var html = "";
    for (var k = 0; k < rows.length; k++) {
        var avg = Math.round((rows[k].g.total / rows[k].g.n) * 100) / 100;
        var avgAge = Math.round((rows[k].g.age / rows[k].g.n) * 10) / 10;
        html += "<tr><td>" + (k + 1) + "</td>";
        html += "<td>" + getLeagueBadge(rows[k].league) + " " + esc(rows[k].league) + "</td>";
        html += "<td>" + rows[k].g.n + "</td>";
        html += "<td>" + avgAge + "</td>";
        html += '<td class="score">' + avg + "</td>";
        html += "<td>" + esc(rows[k].g.top.Name) + " (" + rows[k].g.top.FutureStarScore + ")</td></tr>";
    }
    document.getElementById("leagueBody").innerHTML = html;
}

function renderTop3() {
    var ribbons = ["1st", "2nd", "3rd"];
    var html = "";
    var top = playersByScore.length ? playersByScore : players;
    for (var i = 0; i < 3 && i < top.length; i++) {
        var p = top[i];
        var flag = getLeagueBadge(p.League);
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
    lastFiltered = list;
    var shown = list.slice(0, visibleCount);
    var html = "";
    if (list.length === 0) {
        html = '<div class="no-results">No players found</div>';
    }
    for (var i = 0; i < shown.length; i++) {
        var p = shown[i];
        var cat = getPosCat(p.Position);
        var flag = getLeagueBadge(p.League);
        var rank = 0;
        for (var j = 0; j < playersByScore.length; j++) {
            if (playersByScore[j].Name === p.Name && playersByScore[j].Club === p.Club) { rank = j + 1; break; }
        }
        html += '<div class="card pos-' + cat + '" style="--d:' + Math.min(i, 24) * 22 + 'ms" data-key="' + esc(p.Name + "|" + p.Club) + '" tabindex="0" role="button" aria-label="Open profile for ' + esc(p.Name) + '">';
        var key = p.Name + "|" + p.Club;
        var favOn = inWatch(key) ? " on" : "";
        var vsOn = compareSel.indexOf(key) !== -1 ? " on" : "";
        var heart = '<svg viewBox="0 0 24 24" fill="' + (inWatch(key) ? "currentColor" : "none") + '" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
        html += '<div class="card-top"><span class="card-rank">#' + rank + '</span>';
        html += '<span class="card-pos ' + cat + '">' + esc(p.Position) + '</span>';
        html += '<span class="card-actions"><button type="button" class="icon-btn fav' + favOn + '" data-fav="' + esc(key) + '" aria-pressed="' + (inWatch(key) ? "true" : "false") + '" aria-label="Save ' + esc(p.Name) + ' to watchlist" title="Watchlist">' + heart + '</button>';
        html += '<button type="button" class="icon-btn vsbtn' + vsOn + '" data-vs="' + esc(key) + '" aria-pressed="' + (compareSel.indexOf(key) !== -1 ? "true" : "false") + '" aria-label="Select ' + esc(p.Name) + ' to compare" title="Compare"><span style="font-family:var(--font-display);font-weight:700;font-size:0.7rem;letter-spacing:1px">VS</span></button></span></div>';
        html += '<div class="card-id">' + avatarHtml(p.Name, p.Club);
        html += '<div><div class="card-name">' + esc(p.Name) + '</div>';
        html += '<div class="card-meta">' + flag + ' <span data-club="' + esc(p.Club) + '" style="cursor:pointer;text-decoration:underline dotted">' + esc(p.Club) + '</span> &middot; Age ' + p.Age + '<br>' + esc(p.League) + '</div></div></div>';
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
    var remaining = list.length - shown.length;
    var wrap = document.getElementById("loadMoreWrap");
    if (wrap) {
        wrap.style.display = remaining > 0 ? "" : "none";
        var rc2 = document.getElementById("remainingCount");
        if (rc2) rc2.textContent = remaining;
    }
}

var visibleCount = 48;
var lastFiltered = [];

function loadMore() {
    visibleCount += 48;
    renderCards(lastFiltered);
}

function renderTable(list) {
    var cols = ["Name", "Age", "Nationality", "Club", "League", "Position", "Goals", "Assists", "GoalsPer90", "PassAccuracy", "FutureStarScore"];
    var labels = ["Name", "Age", "Nat.", "Club", "League", "Pos", "Goals", "Assists", "G/90", "Pass%", "Score"];

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
                bodyHtml += '<td>' + getLeagueBadge(val) + ' ' + esc(val) + '</td>';
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
    if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
        try { navigator.serviceWorker.register("sw.js").catch(function () {}); } catch (e) {}
    }
    parseData();
    fillLeagues();
    initNav();
    updateSummary();
    renderTop3();
    renderLeaders();
    renderLeagueTable();
    renderCards(players);
    renderTable(players);
    renderSpotlight();
    renderMovers();
    updateTray();
    initAutocomplete();
    drawChart(players);
    try {
        if (typeof location !== "undefined" && location.search) {
            applyDeepLinks();
        }
    } catch (e) { /* ignore bad deep links */ }
    var cards = document.getElementById("cardsArea");
    if (cards && cards.addEventListener) {
        cards.addEventListener("click", function (e) {
            var t = e.target;
            var fav = t.closest ? t.closest("[data-fav]") : null;
            if (fav && cards.contains(fav)) { toggleFav(fav.getAttribute("data-fav")); return; }
            var vs = t.closest ? t.closest("[data-vs]") : null;
            if (vs && cards.contains(vs)) { toggleCompare(vs.getAttribute("data-vs")); return; }
            while (t && t !== cards && !(t.getAttribute && t.getAttribute("data-key"))) t = t.parentNode;
            if (t && t !== cards) openModal(t.getAttribute("data-key"));
        });
        cards.addEventListener("keydown", function (e) {
            if ((e.key === "Enter" || e.key === " ") && e.target && e.target.getAttribute && e.target.getAttribute("data-key")) {
                e.preventDefault();
                openModal(e.target.getAttribute("data-key"));
            }
        });
    }
    var modal = document.getElementById("playerModal");
    if (modal && modal.addEventListener) {
        modal.addEventListener("click", function (e) {
            if (e.target === modal) closeModal();
        });
    }
    var rc = document.getElementById("resultCount");
    if (rc) rc.textContent = "Showing " + players.length + " of " + players.length + " players";
    var yr = document.getElementById("year");
    if (yr) {
        var nowY = new Date().getFullYear();
        var startY = new Date().getMonth() >= 7 ? nowY : nowY - 1;
        yr.textContent = startY + "-" + String(startY + 1).slice(2) + " Season";
    }
};
