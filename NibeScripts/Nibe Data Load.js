//==========Nibe-DataLoad=========================

//==========Welche Parameter sollen ausgelesen werden?=============
//Vor dem ersten Start hier Parameter raus nehmen, sonst werden die Datenpunkte dazu mit angelegt

const items = [   
    PARAM_AUSSENTEMPERATUR,
    PARAM_BW_OBEN,
    PARAM_BRAUCHWASSERBEREITUNG, 
    PARAM_MITT_AUSSENTEMPERATUR, 
    PARAM_STROM_L1,
    PARAM_STROM_L2, 
    PARAM_STROM_L3,
    PARAM_GRADMINUTEN,
    PARAM_VD_BLOCKIERT, 
    PARAM_VD_STARTS,
    PARAM_DZ_WQ_Pumpe, 
    PARAM_PG_WARMETRAEGER, 
    PARAM_FLUESSIGKEITSLEITUNG, 
    PARAM_HEISSGAS, 
    PARAM_KT_EIN,
    PARAM_KOND_VORLAUF, 
    PARAM_KT_AUS,
    PARAM_RUECKLAUF, 
    PARAM_SAUGGAS,
    PARAM_VORLAUF, 
    PARAM_BT_VERDICHTER, 
    PARAM_BT_Verdichter_BW, 
    PARAM_AKT_VERDICHTER_FREQUENZ, 
    PARAM_MIN_VERDICHTER_FREQUENZ,
    PARAM_BODENTROCKNUNG, 
    PARAM_EXT_JUSTIERUNG, 
    PARAM_BER_VORLAUFTEMPERATUR, 
    PARAM_EXT_VORLAUFTEMPERATUR,
    PARAM_RAUMTEMPERATUR, 
    PARAM_ZH_BLOCKIERT,
    PARAM_ZH_SICHERUNGSGROESSE,
    PARAM_ZH_ZEITFAKTOR,
    PARAM_ZH_LEISTUNG, 
    PARAM_ZH_MAX_LEISTUNG, 
    PARAM_WM_BW_INKL_ZH, 
    PARAM_WM_BW, 
    PARAM_WM_HZ, 
    PARAM_WM_POOL, 
    PARAM_WM_POOL2, 
    PARAM_wm_HZ_INKL_ZH, 
    PARAM_VOLUMENSTROM, 
    PARAM_VENTILATORDREHZAHL, 
    PARAM_ABLUFT, 
    PARAM_FORTLUFT, 
    PARAM_KOLL_AUS, 
    PARAM_KOLL_EIN];

//=============== Welches System soll ausgelesen werden?=======================
const ID_SYSTEM =  ID_SYSTEM_OWN;
//log(ID_SYSTEM);
//=============== In welchem Abstand (Minuten) sollen Daten gelesen werden?====
const ID_TIMESPAN = 10; 
//=============================================================================

//Datenpunke Anlegen, insofern nch nicht vorhanden:
//===============================================================================
items.forEach(function(ID) { // Alle Parameter aus  Nibe_Uplink anlegen
    createState('NibeUplink.System_'+ID_SYSTEM+'.'+ID[1], {name: ID[1],  unit: ID[2]  , read: true, write: true});
});
 
PARAM_ARR_CALC_KWH.forEach(function(ID) { // Alle Parameter für NibeCalc mit Einheit kWh anlegen
    createState('NibeUplink.System_'+ID_SYSTEM+'.'+'NibeCalc.'+ID, {  unit: "kWh"  , read: true, write: true});
});

PARAM_ARR_CALC_TEMP.forEach(function(ID) { // Alle Parameter für NibeCalc mit Einheit C° anlegen
    createState('NibeUplink.System_'+ID_SYSTEM+'.'+'NibeCalc.'+ID, {  unit: "C°"  , read: true, write: true});
});

PARAM_ARR_CALC_OTHER.forEach(function(ID) { // Alle Parameter für NibeCalc ohne EInheit anlegen
    createState('NibeUplink.System_'+ID_SYSTEM+'.'+'NibeCalc.'+ID, {unit: ""  , read: true, write: true});
});



//Zeitgesteuerte Ausführung der Data-Load Jobs
schedule("*/"+ID_TIMESPAN+" * * * *", function () {

    //Alte Load Datein dieses Systems vom Server löschen
    exec("rm /opt/iobroker/iobroker-data/files/javascript.0/nibe_load_68085*");
    
     
    //Timestamp setzen
    var act_time= Date.now();

    //Daten von Nibe Uplink auf den Server laden    
    exec('/opt/iobroker/nibe/get_data.sh ' +act_time + ' 68085');  

     
    var parseTimer = setTimeout(function(){// Start des Parsings 30 Sekunden später

        var fs = require('fs');
        
        fs.readFile('/opt/iobroker/iobroker-data/files/javascript.0/nibe_load_68085_'+act_time+'.data','utf8', function (error, data) { //
            /*if(error!=null)
            {
                    sendTo('telegram', '@Torsten Die Nibe-Daten konnten nicht aktualisiert werden. Fehler:'+ error);
            }*/
            
            items.forEach(function(ID) {
                getValues(data,ID);
            });  
        log("NIBE: Das System "+ID_SYSTEM +" hat neue Daten von Nibe Uplink bekommen" );
        }); 
    },60000);
});

     


function getValues(RawData,DataID)
{
    var dataSearchstring = DataID[0] + '">';
    var lengthDataID = dataSearchstring.length;
    var startPointSpan = RawData.search(dataSearchstring) + lengthDataID;
    
    var data = RawData.substring(startPointSpan, startPointSpan + 7);
    
    
    //Sinnlose Daten aus den Werten löschen
    data = data.replace(DataID[2],""); // Einheit raus löschen
    data = data.replace("k","");
    
    data = data.replace("</span>","");
    data = data.replace("</span",""); 
    data = data.replace("</spa",""); 
    data = data.replace("</sp",""); 
    data = data.replace("</s","");
    data = data.replace("</",""); 
    data = data.replace("<","");
    data = data.replace("nej","nein"); 
    data = data.replace("från","aus"); 
    
    //Status des Objekts wird gesetzt
    setState('NibeUplink.System_'+ID_SYSTEM+'.'+DataID[1],data );
}







