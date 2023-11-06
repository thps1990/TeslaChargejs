//=============================Tesla Ueberschussladen - TeslaChargejs==========================================
//V 1.9.3
//Stand:02.05.2023

//=============================Einstellungen/Konfiguration=====================================================
//Wo soll das Skript die neuen Objekte anlegen (Mit PV-Überschuss geladene Energy.... )

const ID_SKRIPT_OBJEKT_VERZEICHNIS = "0_userdata.0.TeslaChargejs";

//Entprell Zeit, damit nicht mit jeder Wolke die Ladung unterbrochen wird
const ENTPRELL_ZEIT                 = 0.2; //Minuten

// Welche Leistung muss mindestens eingespeist werden, bevor das Skript das Laden (wieder) startet
const MINDEST_EINSPEISE_LEISTUNG    = 1000; //Watt

// Wieiviel darf aus dem Netz bezogen werden, bevor die Ladung abgebrochen wird.
const MAXIMAL_NETZBEZUG             = 300; //Watt 

//Mit welcher Stromstärke soll das Laden begonnen werden
const START_STROMSTAERKE            = 5; // A

//Mit welcher Stromstärke soll maximal geladen werden (Wird auch zum entladen des Hausakkus verwendet)
const MAX_STROMSTAERKE              = 16; //A


//Soll Netzbezug im Rahmen der Stromstärkenregulierung vermieden werden?
//Wenn diese Option aktiviert ist wird die Stromstärke reduziert, sobald ein Strom aus dem Netz/AKku bezogen wird
const NETZBEZUG_VERMEIDEN           = false; //true oder false 

 //IOBroker Objekt ID der Einspeiseleistung PV 
let ID_EINSPEISE_LEISTUNG         = "OBJEKT.PV.EINSPEISUNG_LEISTUNG"; //Watt  

 //IObroker Objekt ID der Netzbezugsleistung PV
// Leer lassen falls es nur ein Objekt für Netzbezug und Einspeiseleistung gibt und in ID_Einspeiseleistung das Objekt eintragen
// Das Skript erzeugt automatisch 2 Status für Einspeiseleistung und Netzbezug
// Falls der Wert positiv ist, wird der Wert als Netzbezug gespeichert, falls negativ als Einspeisung
let ID_NETZBEZUG_LEISTUNG         = "" ; //Watt

//IOBroker Objekt ID zum Tesla, generiert vom Tesla-Adatper (Root)
const ID_TSL                        = "tesla-motors.0.123456789"; 

//Breitengrad Koordinaten der Heimatadresse, somit greift das Skript nur Zuhause
const ZUHAUSE_LATITUDE              = 52.392755120782226;

//Längengard Koordinaten der Heimatadresse
const ZUHAUSE_LONGITUDE             = 13.79022433645216; //Längengrad Koordinaten

//Maximale Entfernung des Autos von Zuhause; Umkreis in dem das Skript greift
const ZUHAUSE_MAX_ENTFERNUNG        = 0.5 ; //KM

//Loglevel des Scripts
const LOGLEVEL                      = "INFO" ; //INFO oder DEBUG

//Notifizierung per Telegramm aktivieren/deaktivieren <= Eine Telegram-Instanz muss in ioBroker eingerichtet sein
//Benachrichtigung über Start/Stopp der Ladung und Beendigung -> Wie viel Energy wurde per Überschuss geladen
const TELEGRAMM_NOTIFIZIERUNG       = false; // true oder false

//Telegramm Notifizierung nur an einen einzelnen Nutzer (Leer lassen alle mit dem Bot verbundene Nutzer)
const TELEGRAMM_NUTZER              = "Elon"; // Nutzernamen oder ""

//Ist ein PV-Akku vorhanden? Wenn nein, sind alle folgenden Angaben obsolet
const PV_AKKU_VORHANDEN             = false; //true oder false

//IOBroker ObjektID des Akkustands 
const ID_PV_AKKU_SOC                = "OBJEKT.PV.AKKUSTAND";

// Ab welchem Akkustand des PV Akkus soll der Ladevorgang starten?
const PV_AKKU_START_SOC             = 30; //%

// Ab welchem Akkustand des PV Akkus soll der Ladevorgang Stoppen?
const PV_AKKU_STOP_SOC             = 15; //%

//Gibt es 2 getrennte Objekte für Akku laden und entladen? Wenn ja, diesen Wert auf false setzen und die Objekte
//für Laden und Entladen des Akkus als ID_EINSPEISE_LEISTUNG (Laden) und ID_NETZBEZUG_LEISTUNG(Entladen) setzen

const PV_AKKU_LEISTUNG_EINSTATUS = true; // true oder false

// Alles folgende ist nur notwendig, falls PV_AKKU_LEISTUNG_EINSTATUS = true
//IOBroker ObjektID PV-Akku Status
const ID_PV_AKKU_STAT = "OBJEKT.PV.AKKU_STATUS";

//Welchen Wert hat das Objekt ID_PV_AKKU_STATUS wenn der Akku entladen wird?
const PV_AKKU_STAT_ENTLADEN = "Entladen";

//=============================Skript-Start=======================================
//=============================Konstanten=========================================
const ID_UEBERSCHUSSLADUNG_AKTIV =ID_SKRIPT_OBJEKT_VERZEICHNIS+".Ueberschussladung_aktiv";
const ID_HAUSAKKU_ENTLADEN = ID_SKRIPT_OBJEKT_VERZEICHNIS +".Hausakku_entladen";
const ID_ENERGY_ADDED_DAILY = ID_SKRIPT_OBJEKT_VERZEICHNIS+".energy_added_daily";
const ID_ENERGY_ADDED_MONTHLY = ID_SKRIPT_OBJEKT_VERZEICHNIS+".energy_added_monthly";
const ID_ENERGY_ADDED_YEARLY = ID_SKRIPT_OBJEKT_VERZEICHNIS+".energy_added_yearly";
const ID_CHARGING_PHASES = ID_SKRIPT_OBJEKT_VERZEICHNIS+".charging_phases";
const ID_CAR_STATE = ID_SKRIPT_OBJEKT_VERZEICHNIS+".car_state";
const ID_TSL_MIN_SOC =ID_SKRIPT_OBJEKT_VERZEICHNIS +".tesla_min_soc" ; 
const ID_NETZBEZUG_DYNAMISCH = ID_SKRIPT_OBJEKT_VERZEICHNIS+".Netzbezug_dynamisch";
const ID_EINSPEISUNG_DYNAMISCH = ID_SKRIPT_OBJEKT_VERZEICHNIS+".Einspeisung_dynamisch";
const ID_TSL_STATE = ID_TSL + ".state";
const ID_TSL_SOC = ID_TSL + ".charge_state.battery_level";
const ID_TSL_LATITUDE = ID_TSL + ".drive_state.latitude";
const ID_TSL_LONGITUDE = ID_TSL + ".drive_state.longitude";
const ID_TSL_CHARGING_STATE= ID_TSL + ".charge_state.charging_state";
const ID_TSL_CMD_WAKEUP = ID_TSL + ".remote.wake_up";
const ID_TSL_CMD_SET_AMPS = ID_TSL + ".remote.set_charging_amps-charging_amps";
const ID_TSL_GET_AMPS = ID_TSL + ".charge_state.charge_amps";
const ID_TSL_CMD_CHARGE_START = ID_TSL + ".remote.charge_start";
const ID_TSL_CMD_CHARGE_STOP = ID_TSL + ".remote.charge_stop";
const ID_TSL_CHARGING_PHASES = ID_TSL + ".charge_state.charger_phases"; 
const ID_TSL_ADDED_ENERGY   = ID_TSL + ".charge_state.charge_energy_added";

//==============================letiablen=========================================
let timeout_running = false;
let Einspeiseleistung = 0;
let Netzbezug = 0;

let chargedsofar=0;

let added_energy_without_excess = 0;
//==============================Initialisierung===================================
//Erstellen von Status, sofern nicht vorhanden

//Mit Überschuss geladene Energy -> täglich, monatlich, jährlich
createState(ID_ENERGY_ADDED_DAILY,0, {unit: "kWh" , read: true, write: true});
createState(ID_ENERGY_ADDED_MONTHLY,0, {unit: "kWh" , read: true, write: true});
createState(ID_ENERGY_ADDED_YEARLY,0, {unit: "kWh" , read: true, write: true});

//Prüfen ob es getrennte Objekte für Einspeisung und Netzbezug gibt
if(ID_NETZBEZUG_LEISTUNG=="")
{// nur ein objekt für Einspeisung und Netzbezug)
  createState(ID_NETZBEZUG_DYNAMISCH,0, {unit: "W" , read: true, write: true});
  createState(ID_EINSPEISUNG_DYNAMISCH,0, {unit: "W" , read: true, write: true});
  let id_einspeiseleistung_org =  ID_EINSPEISE_LEISTUNG;
 
  ID_EINSPEISE_LEISTUNG = ID_EINSPEISUNG_DYNAMISCH;
  ID_NETZBEZUG_LEISTUNG = ID_NETZBEZUG_DYNAMISCH;

  on({id: id_einspeiseleistung_org,change: 'ne'}, function(obj){
    if(obj.state.val > 0 )
    {//Netzbezug
      setState(ID_NETZBEZUG_LEISTUNG,obj.state.val);
      setState(ID_EINSPEISE_LEISTUNG,0);    
    }else if(obj.state.val < 0)
    {
      setState(ID_NETZBEZUG_LEISTUNG,0);
      setState(ID_EINSPEISE_LEISTUNG,obj.state.val * -1);   
    }else
    {
        setState(ID_NETZBEZUG_LEISTUNG,0);
        setState(ID_EINSPEISE_LEISTUNG,0);      
    }
  });
}

//Phasen-Korrektur
createState(ID_CHARGING_PHASES,0, {read: true, write: true});

//Tesla Mindest SOC
createState(ID_TSL_MIN_SOC,5,{unit: "%" , read: true, write: true});

//Fahrzeug Status
createState(ID_CAR_STATE, {read: true, write: true});


//Ein/Ausschalten der Ueberschussladung 
createState(ID_UEBERSCHUSSLADUNG_AKTIV,true, {read: true, write: true});


//Ein/Ausschalten der Hausakku-Entladen Funktion.  
createState(ID_HAUSAKKU_ENTLADEN,false, {read: true, write: true});

let trigger = [ID_EINSPEISE_LEISTUNG,ID_NETZBEZUG_LEISTUNG];


//====================Events=======================================

//Implementierung/Regelkreis
on({id: trigger,change: 'ne'}, function(obj){ //Wenn sich die Einspeiseleistung oder Netzbezug ändert....
    let charging_state= getState(ID_TSL_CHARGING_STATE).val;
    refresh_data();
    log("Zuhause=" +at_home() + " timeout_runinng=" + timeout_running + " Überschussladungaktiv = " +getState(ID_UEBERSCHUSSLADUNG_AKTIV).val +" chargingstate=" +charging_state,true); 
    
    if( isAstroDay() && charging_state != "Disconnected" && !timeout_running && !(getState(ID_UEBERSCHUSSLADUNG_AKTIV).val==false || getState(ID_UEBERSCHUSSLADUNG_AKTIV).val==0) &&  at_home())
    {// Nur etwas tun, wenn das Auto mit Kabel verbunden, Ueberschussladen aktiv, Auto zuhause steht und gerade nicht auf eine Aktion gewartet wird
        if(getState(ID_TSL_SOC).val < getState(ID_TSL_MIN_SOC).val)
        {// SoC des Autos ist unter Minimum, Vollgas laden
            if(charging_state != "Charging")
            {// Auto lädt noch nicht
                setState(ID_TSL_CMD_CHARGE_START,true);//Laden starten
                setStateDelayed(ID_TSL_CMD_SET_AMPS,MAX_STROMSTAERKE,2000); // Maximale Stromstärke
            } 
            else if(getState(ID_TSL_GET_AMPS).val < MAX_STROMSTAERKE )
            {// Noch nicht die maximale Stromstärke eingestellt
                setStateDelayed(ID_TSL_CMD_SET_AMPS,MAX_STROMSTAERKE,2000); // Maximale Stromstärke
            }
        }
        else
        {
            let ampborder = 700 ;//Watt <-- Geht immer von 3 phasigen laden aus
        
            if(getState(ID_TSL_CHARGING_PHASES).val == 1)
            {//Wenn nur eine Phase, dann reduzieren
                ampborder = 250;//Watt
            }

            if(charging_state == "Stopped")
            { //Auto ist angeschlossen, lädt aber nicht
                if(Einspeiseleistung > MINDEST_EINSPEISE_LEISTUNG && is_startsoc_reached())
                {//Mindesteinspeiseleistung erreich ; Laden starten
                    timeout_running = true;
                    setTimeout(function(){
                        timeout_running = false;
                        refresh_data();
                        if(Einspeiseleistung > MINDEST_EINSPEISE_LEISTUNG && is_startsoc_reached())
                        { //prüfen ob Einspeiseleistung noch ausreichend
                            //Laden tatsächlich starten
    
                            if(getState(ID_TSL_STATE).val =="asleep")
                            { // Wenn das Auto schläft, dann vorher aufwecken und nach 30 Sekunden Ladung starten
                                setState(ID_TSL_CMD_WAKEUP,true);
                                setStateDelayed(ID_TSL_CMD_CHARGE_START,true,30000);
                                setStateDelayed(ID_TSL_CMD_SET_AMPS,START_STROMSTAERKE,30000); 
                                log("Laden gestartet (verzögert)");
                            }else
                            {
                                setState(ID_TSL_CMD_CHARGE_START,true);
                                setStateDelayed(ID_TSL_CMD_SET_AMPS,START_STROMSTAERKE,2000);
                                log("Laden gestartet",false,true);
                            }
                        }
                    },ENTPRELL_ZEIT * 60000);
                }
    
            }else if (charging_state == "Charging")
            {//Auto ist angeschlossen und lädt
            log("IsCharging",true);
            log("Einspeisung="+Einspeiseleistung + " Netzbezug="+Netzbezug,true);
                if(is_stopsoc_reached())
                {// Wenn PV-Akku ist unter Mindestschwelle
                    setState(ID_TSL_CMD_CHARGE_STOP,true);
                    log("Laden gestoppt, Akkustand PV zu niedrig",false,true);
                }else if(Einspeiseleistung > ampborder)
                { // Mehr als 250/700 Watt werden eingespeist
                    if(getState(ID_TSL_GET_AMPS).val < MAX_STROMSTAERKE)
                    {
                        timeout_running = true;
                        setTimeout(function(){
                            timeout_running = false;
                            refresh_data();
                            if(Einspeiseleistung > ampborder)
                            {// Stromstärke erhöhen
                                log("Stromstärke wird von " + getState(ID_TSL_GET_AMPS).val + " A auf " + (getState(ID_TSL_GET_AMPS).val + 1) +" A erhöht.");
                                setState(ID_TSL_CMD_SET_AMPS, getState(ID_TSL_GET_AMPS).val + 1);
                            }
                        },ENTPRELL_ZEIT * 60000);   
                    }
                }
                else if(!(getState(ID_HAUSAKKU_ENTLADEN).val==true || getState(ID_HAUSAKKU_ENTLADEN).val==1))
                {// Die Funktion Hausakku_entladen ist nicht aktiv
                    if(getState(ID_TSL_GET_AMPS).val > START_STROMSTAERKE)
                    { //Stromstärke kann noch verringert werden
                        if(Netzbezug > ampborder  || (NETZBEZUG_VERMEIDEN && Netzbezug > 0))
                        { //Mehr als 250/700 Watt werden aus dem Netz bezogen oder Netzbezug vermeiden ist aktiviert und Netzbezug > 0
                            timeout_running = true;
                            setTimeout(function(){
                                timeout_running = false;
                                refresh_data();
                                if(Netzbezug > ampborder  || (NETZBEZUG_VERMEIDEN && Netzbezug > 0))
                                {// Stromstärke verringern
                                    log("Stromstärke wird von " + getState(ID_TSL_GET_AMPS).val + " A auf " + (getState(ID_TSL_GET_AMPS).val - 1) +" A verringert.");
                                    setState(ID_TSL_CMD_SET_AMPS, getState(ID_TSL_GET_AMPS).val - 1);
                                }
                            },ENTPRELL_ZEIT * 60000);   
                        }
                    }else
                    { //Laden muss evtl gestoppt werden
                        if(Netzbezug > MAXIMAL_NETZBEZUG)
                        { // Zu VielNetzbezug --> Laden abbrechen
                            timeout_running = true;
                            setTimeout(function(){
                                timeout_running = false;
                                refresh_data();
                                if(Netzbezug > MAXIMAL_NETZBEZUG)
                                {// Laden Stoppen 
                                    setState(ID_TSL_CMD_CHARGE_STOP,true);
                                    log("Laden gestoppt, zu wenig PV-Leistung vorhanden",false,true);
                                }
                            },ENTPRELL_ZEIT * 60000);
                        }
                    }
                }
                else if ((getState(ID_HAUSAKKU_ENTLADEN).val==true || getState(ID_HAUSAKKU_ENTLADEN).val==1))
                {// Hausakku entladen ist aktiv
                    if(getState(ID_PV_AKKU_SOC).val < PV_AKKU_STOP_SOC + 3)
                    {// 3 % vor Stop SoC wird Hausakku entladen wieder deaktiviert, damit die Ladung nicht gänzlich stoppt
                        setState(ID_HAUSAKKU_ENTLADEN,false);
                        log("Der Mindest SoC des Hausakku ist gleich erreicht. Hausakku-Entladen wird deaktiviert");
                    }

                }
            }
        }
    }
});
 

// Wenn überschussladung deaktiviert wird, dann Stromstärke wieder auf 16A setzen
on({id: ID_UEBERSCHUSSLADUNG_AKTIV, change: 'ne'}, function(obj){
    if(getState(ID_UEBERSCHUSSLADUNG_AKTIV).val == false || getState(ID_UEBERSCHUSSLADUNG_AKTIV).val == 0 )
    {
        setState( ID_TSL_CMD_SET_AMPS,MAX_STROMSTAERKE); 
    }
});


//Ladung beendet
on({id: ID_TSL_CHARGING_STATE, change: 'ne'}, function(obj){
    if((getState(ID_TSL_CHARGING_STATE).val=="Disconnected") &&  at_home())
    {// Wenn Laden gestoppt wurde, oder Kabel Disconnected --> Ladung addieren
        if(getState(ID_UEBERSCHUSSLADUNG_AKTIV).val==false || getState(ID_UEBERSCHUSSLADUNG_AKTIV).val==0)
        {// Wenn gerade keine Überschussladung aktiv --> Evtl vorher geladene Energy sichern
            added_energy_without_excess = getState(ID_TSL_ADDED_ENERGY).val;
            log("added_energy_without_excess save="+added_energy_without_excess,true);
        }
            log("CALC",true);
            calc_added_energy();
        // Hausakku entladen, deaktivieren
        setState(ID_HAUSAKKU_ENTLADEN,false);
    }
});

//Ladung startet
on({id: ID_TSL_CHARGING_STATE, oldVal: 'Disconnected'}, function(obj){ // Kabel wurde gerade erst verbunden
    if(getState(ID_TSL_CHARGING_STATE).val != "Disconnected" && !timeout_running && !(getState(ID_UEBERSCHUSSLADUNG_AKTIV).val==false || getState(ID_UEBERSCHUSSLADUNG_AKTIV).val==0) &&  at_home())
    {// Kabel wurde gerade angeschlossen und Überschussladung wird getriggert
        setStateDelayed(ID_TSL_CMD_SET_AMPS,START_STROMSTAERKE,30000); //Start Stromstärke einstellen
    }
});

on({id: ID_UEBERSCHUSSLADUNG_AKTIV, change: 'ne'}, function(obj){
    if((getState(ID_UEBERSCHUSSLADUNG_AKTIV).val == 1 || getState(ID_UEBERSCHUSSLADUNG_AKTIV).val ==true) && at_home() )
    {// Überschussladen wurde gerade aktiviert...
        if(getState(ID_TSL_CHARGING_STATE).val!="Disconnected" )
        {//Und das Auto schon lädt
        //geladene kWh ohne Überschussladung sichern
            added_energy_without_excess = getState(ID_TSL_ADDED_ENERGY).val-chargedsofar;
            log("added_energy_without_excess="+added_energy_without_excess,true);
        }
    }else if(at_home() && getState(ID_TSL_CHARGING_STATE).val!="Disconnected")
    {// Wurde gerade deaktiviert 
        chargedsofar = getState(ID_TSL_ADDED_ENERGY).val - added_energy_without_excess;
        log("chargedsofar="+chargedsofar,true);
    }
});


// Phasen korrigieren (API bringt nur 1 oder 2)
on({id: ID_TSL_CHARGING_PHASES, change: 'ne'}, function(obj){
    if(getState(ID_TSL_CHARGING_PHASES).val == 1)
    {
        setState(ID_CHARGING_PHASES,1);
    }else if(getState(ID_TSL_CHARGING_PHASES).val == 2)
    {
        setState(ID_CHARGING_PHASES,3);
    }else
    {
        setState(ID_CHARGING_PHASES,0);    
    }
});


//Auto-Status bestimmen
on({id: [ID_TSL_STATE,ID_TSL_CHARGING_STATE], change: 'ne'}, function(obj){
    if(getState(ID_TSL_CHARGING_STATE).val == "Charging")
    {
        setState(ID_CAR_STATE,"Lädt");
    }else if(getState(ID_TSL_STATE).val == "online")
    {
        setState(ID_CAR_STATE,"Online");
    }else if(getState(ID_TSL_STATE).val == "asleep")
    {
        setState(ID_CAR_STATE,"Schläft");
    }else
    {
        setState(ID_CAR_STATE,"Unbekannt");    
    }
});


// Hausakku Entladen wird eingschalten
on({id: ID_HAUSAKKU_ENTLADEN, change: 'ne'}, function(obj){
    if(getState(ID_HAUSAKKU_ENTLADEN).val==true || getState(ID_HAUSAKKU_ENTLADEN).val==1)
    {//wurde eingeschalten; Maximale Stromstärke setzen und evtl Ladung starten
        if(getState(ID_TSL_CHARGING_STATE).val == "Stopped")
        {
            setState(ID_TSL_CMD_CHARGE_START,true);

        }
        setStateDelayed(ID_TSL_CMD_SET_AMPS,MAX_STROMSTAERKE,2000);   
    }
});


// Das Laden Stoppen, falls Nach Sonnenuntergang das Laden gestartet wurde und die Überschussladung aktiv ist
on({id:ID_TSL_CHARGING_STATE, change: 'ne'}, function(obj){
    if(getState(ID_TSL_CHARGING_STATE).val== "Charging" && !isAstroDay() && at_home() && !(getState(ID_UEBERSCHUSSLADUNG_AKTIV).val==false || getState(ID_UEBERSCHUSSLADUNG_AKTIV).val==0) )
    {
        setState(ID_TSL_CMD_CHARGE_STOP,true);
        log("Das Laden wurde automatisch gestoppt - Es ist nach Sonnenuntergang und vor Sonnenaufgang",false,true);
    }
});



//Zeitpläne zum Berechnen der geladenen Energy, Rücksetzen der Werte
schedule("1 0 * * *", function () 
{//PV-Überschuss Tageswert zurücksetzen jeden Tag um 00:01
    setState(ID_ENERGY_ADDED_DAILY,0);
});

schedule('1 0 1 * *', function () 
{//PV-Überschuss Monatswert zurücksetzen , Immer am 1. des Monats um 00:01
    setState(ID_ENERGY_ADDED_MONTHLY,0);
});

schedule('1 0 1 1 *', function () 
{//PV Jahreswert zurücksetzen Immer am 1.1. um 00:01    
    setState(ID_ENERGY_ADDED_YEARLY,0);
});
 

//=====================Hilfsfunktionen============================== 
function Deg2Rad( deg ) 
{//Umrechnung Grad in Radiat
    return deg * Math.PI / 180;
}
 
function is_startsoc_reached()
{
    if(PV_AKKU_VORHANDEN)
    {
        if(getState(ID_PV_AKKU_SOC).val >= PV_AKKU_START_SOC)
        {
            return true;
        }
        else
        {
            return false;
        }

    }else
    {
        return true; //Wenn kein Akku vorhanden, immer true zurückliefern
    }
}

function is_stopsoc_reached()
{
    if(PV_AKKU_VORHANDEN)
    {
        if(getState(ID_PV_AKKU_SOC).val <= PV_AKKU_STOP_SOC)
        {
            return true;
        }
        else
        {
            return false;
        }

    }else
    {
        return false; //Wenn kein Akku vorhanden, immer false zurückliefern
    }

}

function at_home() 
{//Entfernung des Autos vom Heimstandort ermitteln
    let lat1 = Deg2Rad(ZUHAUSE_LATITUDE);
    let lat2 = Deg2Rad(getState(ID_TSL_LATITUDE).val);
    let lon1 = Deg2Rad(ZUHAUSE_LONGITUDE);
    let lon2 = Deg2Rad(getState(ID_TSL_LONGITUDE).val);
    let R = 6371; // km
    let x = (lon2-lon1) * Math.cos((lat1+lat2)/2);
    let y = (lat2-lat1);
    let d = Math.sqrt(x*x + y*y) * R;

    if(d <= ZUHAUSE_MAX_ENTFERNUNG)
    {
        return true;
    }else
    {
        return false;
    }
}

function calc_added_energy()
{
    let energyadd=0;
    
    if(!(getState(ID_UEBERSCHUSSLADUNG_AKTIV).val == 1 || getState(ID_UEBERSCHUSSLADUNG_AKTIV).val ==true))
    {//Überschussladung gerade nicht aktiv
        energyadd = parseFloat(getState(ID_TSL_ADDED_ENERGY).val) - added_energy_without_excess + chargedsofar;
    }else
    {
        energyadd = parseFloat(getState(ID_TSL_ADDED_ENERGY).val) - added_energy_without_excess;    
    }
    log("Chargedsofar="+chargedsofar+ " ; added_energy_without excess="+ added_energy_without_excess, true);
    log("Energyadd="+energyadd,true); 
    log("New Daily="+(parseFloat(getState(ID_ENERGY_ADDED_DAILY).val) + energyadd).toFixed(2),true);
    log("New Monthly="+(parseFloat(getState(ID_ENERGY_ADDED_MONTHLY).val) + energyadd).toFixed(2),true);
    log("New Yearly="+(parseFloat(getState(ID_ENERGY_ADDED_YEARLY).val) + energyadd).toFixed(2),true);
    if(energyadd > 0)
    {
        log("Ladung beendet, es wurden " + energyadd + " kWh mit Überschuss geladen",false,true);
    }
    
    setState(ID_ENERGY_ADDED_DAILY,(parseFloat(getState(ID_ENERGY_ADDED_DAILY).val) + energyadd).toFixed(2));
    setStateDelayed(ID_ENERGY_ADDED_MONTHLY,(parseFloat(getState(ID_ENERGY_ADDED_MONTHLY).val) + energyadd).toFixed(2) ,500);
    setStateDelayed(ID_ENERGY_ADDED_YEARLY,(parseFloat(getState(ID_ENERGY_ADDED_YEARLY).val) + energyadd).toFixed(2), 1000);
    added_energy_without_excess = 0;
    chargedsofar = 0;
}

function refresh_data()
{

    if(PV_AKKU_VORHANDEN && PV_AKKU_LEISTUNG_EINSTATUS)
    { // Wenn es nur ein Objekt für Laden + Entladen gibt
        if(getState(ID_PV_AKKU_STAT).val !=PV_AKKU_STAT_ENTLADEN)
        {
            Einspeiseleistung = getState(ID_EINSPEISE_LEISTUNG).val;
            Netzbezug=0;
        }
        else
        {
            Netzbezug= getState(ID_EINSPEISE_LEISTUNG).val;
            Einspeiseleistung=0;
        }
    }
    else
    {// kein Akku vorhanden, Einspeiseleistung normal setzen
        Einspeiseleistung = getState(ID_EINSPEISE_LEISTUNG).val;
        Netzbezug = getState(ID_NETZBEZUG_LEISTUNG).val;   
    }
  
}



function log(logtext,debug=false,Telegramm=false)
{
    if(!debug || (debug && LOGLEVEL=="DEBUG"))
    {
        console.log(logtext);    
        if(Telegramm && TELEGRAMM_NOTIFIZIERUNG)
        {
            if(TELEGRAMM_NUTZER != "")
            {// Wenn Nutzer angegeben, nur an diesen Nutzer senden
                sendTo('telegram',"@" + TELEGRAMM_NUTZER + " TeslaChargejs: " +logtext);
            }else
            {//Sonst an alle
                sendTo('telegram',"TeslaChargejs: " + logtext);
            }

        }
    }
}
