/*
Estos 24 equipos se agrupan en 6 grupos de 4 equipos cada uno. Aunque en realidad hay reglas
sobre cómo los equipos se distribuyen en los grupos, para esta práctica se ignorarán (será de
forma aleatoria)
Los grupos se nombran por letras en orden alfabético, desde la A hasta la F.s
*/
function start(){
var total_equipos = ['Spain', 'Portugal', 'Italy', 'France', 'Belgium', 'San Marino', 'Bulgaria', 'Croatia', 'Denmark', 'Estonia', 'Germany', 'Grece', 'Hungary', 'Iceland', 'Malta', 'Montenegro', 'Norway', 'Poland','Russia', 'Scotland', 'Sweden', 'Switzerland', 'Ukraine', 'Austria'];
var grupos = ['A', 'B', 'C', 'D', 'E', 'F'];
var liga_grupos = {}
var teamforgroup = 4;
var rondas = []
let team_object = ""
let Group_structure = ""
console.log(`generando ${grupos.length} grupos de ${teamforgroup} equipos, de un total de ${total_equipos.length}`)
for (let i in grupos){
    var new_group = [];
    for (var z = 1; z <= teamforgroup; z++){
        var demo = Math.floor(Math.random()*(total_equipos.length));
        team_object = new Team(total_equipos[demo]);
        //console.log(total_equipos[demo])
        new_group.push(team_object)
        total_equipos.splice(demo, 1)
    }
    liga_grupos[grupos[i]]=new_group
    //console.log("chivato", new_group)
    //console.log(grupos[i])
    Group_structure = new Group(grupos[i], new_group);
   
}

liga = new League();

}
let terceros = []
let clasificatorias = []

let old_number = 7
class Team{
    constructor(j){
        this.name = j;
        this.goals = "";
        this.points = "";
        this.bydefault()
        //console.log(this)
    }
    
    bydefault(){
        this.goals = 0;
        this.points = 0;
    }
}

class Group {
    constructor(Group_name, info){
        this.NameGroup = Group_name;
        this.team1 = info[0];
        this.team2 = info[1];
        this.team3 = info[2];
        this.team4 = info[3];
        this.primero = "",
        this.segundo = "",
        this.Aleatorio();
        this.CreateRound();
        this.Winner_per_round()
        this.FinalWinners()
    }

    Aleatorio(){
        // Generar número del 0 al 5 incluidos
        function generateRandomInteger(max) {
            return Math.floor(Math.random() * max) ;
        }

        let numero_final = generateRandomInteger(6);
        return numero_final;
    }

    CreateMatch(t1, t2){
        /*let obj = this.team1;
        obj["goals"] = 1
        console.log(this)*/
        //console.log(t1, t2)
        let rand_t1 = this.Aleatorio();
        let rand_t2 = this.Aleatorio();
        t1["goals"] =  t1["goals"] + rand_t1;
        t2["goals"] = t2["goals"] + rand_t2;

        //console.log(t1, t1["goals"], rand, t2, t2["goals"], rand)

        if (t1["goals"] > t2["goals"]){
            t1["points"] = t1["points"] +3;
            t2["points"] = t2["points"] +0;
        }
        else if (t2["goals"] > t1["goals"]){
            t2["points"] = t2["points"] +3;
            t1["points"] = t1["points"] +0;
        }
        else if (t1["goals"] == t2["goals"]){
            t1["points"] = t1["points"] +1;
            t2["points"] = t2["points"] +1;
        }
        console.log("PARTIDO ", t1["name"], ":", rand_t1, "-", t2["name"], ":", rand_t2)
        console.log("GOLES TOTALES ", t1["name"], ":", t1["goals"], "-", t2["name"], ":", t2["goals"])
        console.table(this)
        
    }
    
    CreateRound(){
        console.log("------ RONDA GRUPO " + this.NameGroup + "-------")
        let round_1 = []
        let round_2 = []
        let round_3 = []
        let First_match = this.CreateMatch(this.team1, this.team4) 
        let Second_match = this.CreateMatch(this.team2, this.team3)
        let Third_match = this.CreateMatch(this.team4, this.team3) 
        let Fourth_match = this.CreateMatch(this.team1, this.team2)
        let Fifth_match = this.CreateMatch(this.team2, this.team4) 
        let Sixth_match = this.CreateMatch(this.team3, this.team1)
        round_1.push(First_match, Second_match)
        round_2.push(Third_match, Fourth_match)
        round_3.push(Fifth_match, Sixth_match)
    }

    Winner_per_round(){
        let nombre = this.NameGroup;
        let numbers = []
        let control = ""
        //console.log(nombre, this["team1"]["points"])
        for(let i = 1; i <= 4; i++ ){
            numbers.push(Object.values(this)[i])

            numbers.sort(function (a, b) {
                if (a.points > b.points) {
                  return -1;
                }
                if (a.points < b.points) {
                  return 1;
                }
                // a must be equal to b
                else {
                    
                if (a.goals > b.goals) {
                    return -1;
                  }
                  if (a.goals < b.goals) {
                    return 1;
                }

                else {
                    if (a.name > b.name) {
                        return 1;
                      }
                      if (a.name < b.name) {
                        return -1;
                    }
                }
            }
            });
        }
        terceros.push(numbers[2]);
        terceros.push(numbers[3])
        for(let i = 2; i <= 4; i++ ){

            terceros.sort(function (a, b) {
                if (a.points > b.points) {
                  return -1;
                }
                if (a.points < b.points) {
                  return 1;
                }
                // a must be equal to b
                else {
                    
                if (a.goals > b.goals) {
                    return -1;
                  }
                  if (a.goals < b.goals) {
                    return 1;
                }

                else {
                    if (a.name > b.name) {
                        return 1;
                      }
                      if (a.name < b.name) {
                        return -1;
                    }
                }
            }
            });
        }
        this.primero = numbers[0]["name"];
        this.segundo = numbers[1]["name"];
        console.log("ronda:", nombre," ganador:", numbers[0]["name"], "segundo:", numbers[1]["name"])

    }

    FinalWinners(){
        clasificatorias.push(this.primero)
        clasificatorias.push(this.segundo)
    }
}


class Round_match{
    constructor(coso){
        this.team_1 = coso[0];
        this.team_2 = coso[1];
        this.team_3 = coso[2];
        this.team_4 = coso[3];
        this.Aleatorio();
    }

    chivato(){
        let round_1 = {
                Partido_1 : {
                    "Local": this.team_1,
                    "Visitante": this.team_4,
                    "Goles_local": this.Aleatorio(),
                    "Goles_visitante": this.Aleatorio(),
                },
                Partido_2 : {
                    "Local": this.team_2,
                    "Visitante": this.team_3,
                    "Goles_local": this.Aleatorio(),
                    "Goles_visitante": this.Aleatorio(),
                },
                Partido_3 : {
                    "Local": this.team_4,
                    "Visitante": this.team_3,
                    "Goles_local": this.Aleatorio(),
                    "Goles_visitante": this.Aleatorio(),
                },
                Partido_4 : {
                    "Local": this.team_1,
                    "Visitante": this.team_2,
                    "Goles_local": this.Aleatorio(),
                    "Goles_visitante": this.Aleatorio(),
                },
                Partido_5 : {
                    "Local": this.team_2,
                    "Visitante": this.team_4,
                    "Goles_local": this.Aleatorio(),
                    "Goles_visitante": this.Aleatorio(),
                },
                Partido_6 : {
                    "Local": this.team_3,
                    "Visitante": this.team_1,
                    "Goles_local": this.Aleatorio(),
                    "Goles_visitante": this.Aleatorio(),
                }
            }
            round_1['Partido_6'][`${round_1['Partido_6']['Local']}`] = 44 // añado el valor de local y le añado el numero 
            let dem =  Object.values(round_1);
            //console.log(dem, Object.values(dem)[3])
    }

    Aleatorio(){
        // Generar número del 0 al 5 incluidos
        function generateRandomInteger(max) {
            return Math.floor(Math.random() * max) ;
        }

        let numero_final = generateRandomInteger(6);
        return numero_final;
    }

   

}

let round = []


class League{
    constructor(){
       this.primeros = [],
       this.segundos = [],
       this.terceros = [],
       this.locales = [],
       this.visitantes = [],
       this.cuartos = [],
       this.semifinales = [],
       this.finales = []
       this.ganadorLiga = []
       this.SetupTeams();
       this.SetLocal();
       this.SetVisit()
       this.SetupMatch();
       this.Cuartos();
       this.Finales()
       this.Final()
    }

    SetupTeams(){
        //console.log("terceros", terceros, terceros[0])
        for(var i = 0; i <= 3; i++){
            this.terceros.push(terceros[i]["name"])
        }
        for(var i = 0; i <= 11; i++){
            if (i % 2 == 0){ //si es impar
                this.primeros.push(clasificatorias[i])
            } else {
                this.segundos.push(clasificatorias[i])
            }
        }
        console.log("los playoffs", clasificatorias, this)
    }

    SetupMatch(){
        console.log("============== COMIENZO DE LA FASE DE ELIMINATORIAS =================")
        console.log("============= OCTAVOS DE FINAL =================")
        let octavo = {"PARTIDO" : "", "local" : "", "local_goals" : "", "visitante": "", "visit_goals": "", "ganador": ""}
        //let octavos = ["PARTIDO" + name_match, local_team, local_team_goals, "-", visit_team, visit_team_goals, "El ganador es" + ganador]
        for (var i = 0; i <= 7; i++){
            octavo.PARTIDO = "Q" + (i + 1);
            octavo.local = this.locales[i]
            octavo.visitante = this.visitantes[i]
            octavo.visit_goals = this.Random()
            octavo.local_goals = this.Random()
            
        if (octavo.visit_goals > octavo.local_goals){
            octavo.ganador = octavo.visitante
        }
        else{
            octavo.ganador = octavo.local
            
        }
    
        console.log(octavo)
        this.cuartos.push(octavo.ganador)
              }
       this.SetCuartosOrder()
        
            
    }

    Cuartos(){
        console.log("==================CUARTOS DE FINAL=================")
        let cuartos = {"PARTIDO" : "", "local" : "", "local_goals" : "", "visitante": "", "visit_goals": "", "ganador": ""}
        //let octavos = ["PARTIDO" + name_match, local_team, local_team_goals, "-", visit_team, visit_team_goals, "El ganador es" + ganador]

        for (var i = 0; i <= 7; i++){
            cuartos.local = this.cuartos[i]
            cuartos.visitante = this.cuartos[i+1]
            cuartos.visit_goals = this.Random()
            cuartos.local_goals = this.Random()
            i++
        if (cuartos.visit_goals > cuartos.local_goals){
            cuartos.ganador = cuartos.visitante
        }
        else{
            cuartos.ganador = cuartos.local
        }
    
        this.semifinales.push(cuartos.ganador)
        console.log(cuartos)
        }
        console.log("GANADORES DE LOS CUARTOS ", this.semifinales)
    }

    Finales(){
        let finales = {"PARTIDO" : "", "local" : "", "local_goals" : "", "visitante": "", "visit_goals": "", "ganador": ""}
        //let octavos = ["PARTIDO" + name_match, local_team, local_team_goals, "-", visit_team, visit_team_goals, "El ganador es" + ganador]

        for (var i = 0; i <= 3; i++){
            finales.PARTIDO = "CUARTOS " + (i);
            finales.local = this.cuartos[i]
            finales.visitante = this.cuartos[i+1]
            finales.visit_goals = this.Random()
            finales.local_goals = this.Random()
            i++
        if (finales.visit_goals > finales.local_goals){
            finales.ganador = finales.visitante
        }
        else{
            finales.ganador = finales.local
        }
    
        console.log(finales)
        this.finales.push(finales.ganador)
              }
        console.log("GANADORES DE LAS FINALES ", this.finales)
        
    }

    Final(){
        let final = {"PARTIDO" : "", "local" : "", "local_goals" : "", "visitante": "", "visit_goals": "", "ganador": ""}
        final.PARTIDO = "PARTIDO FINAL"
        final.local = this.finales[0]
        final.visitante =  this.finales[1]
        final.visit_goals = this.Random()
        final.local_goals = this.Random()
        if (final.visit_goals > final.local_goals){
            final.ganador = final.visitante
        }
        else{
            final.ganador = final.local
        }
        console.log(final)
    }

    SetLocal(){
        this.locales.push(this.segundos[0], this.segundos[1]);
        this.primeros.forEach(element => {
            this.locales.push(element); 
        });
        this.locales.reverse()
        this.segundos.splice(this.segundos[0], 2)
    }
    SetVisit(){
        this.segundos.forEach(element => {
            this.visitantes.push(element); 
        });
        this.terceros.forEach(element => {
            this.visitantes.push(element); 
        });
        this.segundos.splice(this.segundos[0], 4)
    }

    SetCuartosOrder(){
        let oct = this.cuartos;
        let neworder = [oct[0], oct[7], oct[2], oct[5], oct[6], oct[1], oct[4], oct[3]]
        this.cuartos = neworder
        console.log("=================GANADORES DE LOS OCTAVOS =================== ", this.cuartos, "===========================")
    }

    Random(){
        // Generar número del 0 al 5 incluidos
        function generateRandomInteger(max) {
            return Math.floor(Math.random() * max) ;
        }

        let numero_final = generateRandomInteger(6);

        if (numero_final == old_number){
            let new_numer = generateRandomInteger(6);
            
            //console.log ("old", old_number, "nuevo", numero_final, "repe", new_numer)
            old_number = new_numer;
            return new_numer;
        } else {
            //console.log ("old", old_number, "nuevo", numero_final)
            
            old_number = numero_final;
            return numero_final;
        }
    }


}

start();