//====================================NIbe Calc=====================
//Welches System soll verwendet werden?
const ID_SYSTEM =  ID_SYSTEM_OWN;
 

// HilfsIDs
const ID_WM_BW_INKL_ZH = "javascript.0.NibeUplink.System_"+ID_SYSTEM+"." + PARAM_WM_BW_INKL_ZH[1];
const ID_WM_HZ_INKL_ZH = "javascript.0.NibeUplink.System_"+ID_SYSTEM+"." + PARAM_wm_HZ_INKL_ZH[1];
const ID_WM_BW         = "javascript.0.NibeUplink.System_"+ID_SYSTEM+"." + PARAM_WM_BW[1];
const ID_WM_HZ         = "javascript.0.NibeUplink.System_"+ID_SYSTEM+"." + PARAM_WM_HZ[1];
const ID_VERDICHTER_START = "javascript.0.NibeUplink.System_"+ID_SYSTEM+"." + PARAM_VD_STARTS[1];
const ID_WM_HZ_ZH      = 'javascript.0.NibeUplink.System_'+ID_SYSTEM+'.'+'NibeCalc.' + PARAM_WM_HZ_ZH ;
const ID_WM_BW_ZH      = 'javascript.0.NibeUplink.System_'+ID_SYSTEM+'.'+'NibeCalc.' + PARAM_WM_BW_ZH ;
const ID_WM_ZH_GESAMT  = 'javascript.0.NibeUplink.System_'+ID_SYSTEM+'.'+'NibeCalc.' + PARAM_WM_ZH_GESAMT ;
const ID_WRG_TEMP      = 'javascript.0.NibeUplink.System_'+ID_SYSTEM+'.'+'NibeCalc.' + PARAM_WRG_TEMP;
const ID_KOLL_AUS      = 'javascript.0.NibeUplink.System_'+ID_SYSTEM+'.'+ PARAM_KOLL_AUS[1];
const ID_KOLL_EIN      = "javascript.0.NibeUplink.System_"+ID_SYSTEM+"." + PARAM_KOLL_EIN[1];
const ID_BTN_CLICK     = 'javascript.0.NibeUplink.System_'+ID_SYSTEM+'.'+'NibeCalc.' + BTN_CALC_CLICK ;
const ID_LAST_DATA_SET = 'javascript.0.NibeUplink.System_'+ID_SYSTEM+'.'+'NibeCalc.' + PARAM_LAST_DATA_SET ;
const ID_LAST_DATA_SET_DAYTIME = 'javascript.0.NibeUplink.System_'+ID_SYSTEM+'.'+'NibeCalc.' + PARAM_LAST_DATA_SET_DAYTIME ;
const ID_LAST_COUNT_WP = 'javascript.0.NibeUplink.System_'+ID_SYSTEM+'.'+'NibeCalc.' + PARAM_LAST_COUNT_WP ;
const ID_TEMP_COUNT_WP = 'javascript.0.NibeUplink.System_'+ID_SYSTEM+'.'+'NibeCalc.' + PARAM_TEMP_COUNT_WP ;
const ID_LAST_VERDICHTER_START = 'javascript.0.NibeUplink.System_'+ID_SYSTEM+'.'+'NibeCalc.' + PARAM_LAST_VERDICHTER_START ;
const ID_LAST_USAGE_VERDICHTER_START = 'javascript.0.NibeUplink.System_'+ID_SYSTEM+'.'+'NibeCalc.' + PARAM_LAST_USAGE_VERDICHTER_START ;
const ID_LAST_USAGE_VERDICHTER_START_ZE = 'javascript.0.NibeUplink.System_'+ID_SYSTEM+'.'+'NibeCalc.' + PARAM_LAST_USAGE_VERDICHTER_START_ZE ;
const ID_LAST_USAGE_WP = 'javascript.0.NibeUplink.System_'+ID_SYSTEM+'.'+'NibeCalc.' + PARAM_LAST_USAGE_WP ;
const ID_LAST_USAGE_WP_ZE = 'javascript.0.NibeUplink.System_'+ID_SYSTEM+'.'+'NibeCalc.' + PARAM_LAST_USAGE_WP_ZE ;
const ID_LAST_USAGE_WM_HZ = 'javascript.0.NibeUplink.System_'+ID_SYSTEM+'.'+'NibeCalc.' + PARAM_LAST_USAGE_WM_HZ ;
const ID_LAST_USAGE_WM_BW  = 'javascript.0.NibeUplink.System_'+ID_SYSTEM+'.'+'NibeCalc.' + PARAM_LAST_USAGE_WM_BW ;
const ID_LAST_USAGE_WM_HZ_ZE = 'javascript.0.NibeUplink.System_'+ID_SYSTEM+'.'+'NibeCalc.' + PARAM_LAST_USAGE_WM_HZ_ZE ;
const ID_LAST_USAGE_WM_BW_ZE = 'javascript.0.NibeUplink.System_'+ID_SYSTEM+'.'+'NibeCalc.' + PARAM_LAST_USAGE_WM_BW_ZE ;
const ID_LAST_WM_BW_INKL_ZH = 'javascript.0.NibeUplink.System_'+ID_SYSTEM+'.'+'NibeCalc.' + PARAM_LAST_WM_BW_INKL_ZH ;
const ID_LAST_WM_HZ_INKL_ZH = 'javascript.0.NibeUplink.System_'+ID_SYSTEM+'.'+'NibeCalc.' + PARAM_LAST_WM_HZ_INKL_ZH ;
const ID_LAST_AZ            = 'javascript.0.NibeUplink.System_'+ID_SYSTEM+'.'+'NibeCalc.' + PARAM_LAST_AZ;
const ID_MONTHLY_USAGE_WP   = 'javascript.0.NibeUplink.System_'+ID_SYSTEM+'.'+'NibeCalc.' + PARAM_MONTHLY_USAGE_WP;
const ID_YEARLY_AZ          = 'javascript.0.NibeUplink.System_'+ID_SYSTEM+'.'+'NibeCalc.' + PARAM_YEARLY_AZ ;
const ID_YEARLY_USAGE_WP    = 'javascript.0.NibeUplink.System_'+ID_SYSTEM+'.'+'NibeCalc.' + PARAM_YEARLY_USAGE_WP ;
const ID_YEARLY_COUNT_WM_HZ = 'javascript.0.NibeUplink.System_'+ID_SYSTEM+'.'+'NibeCalc.' + PARAM_YEARLY_COUNT_WM_HZ ;
const ID_YEARLY_COUNT_WM_BW = 'javascript.0.NibeUplink.System_'+ID_SYSTEM+'.'+'NibeCalc.' + PARAM_YEARLY_COUNT_WM_BW ;
const ID_YEARLY_COUNT_WP = 'javascript.0.NibeUplink.System_'+ID_SYSTEM+'.'+'NibeCalc.' + PARAM_YEARLY_COUNT_WP ;
const ID_TIMESPAN_DAY       = 'javascript.0.NibeUplink.System_'+ID_SYSTEM+'.'+'NibeCalc.' + PARAM_TIMESPAN_DAY;
const ID_LAST_AVG_TEMPERATURE = 'javascript.0.NibeUplink.System_'+ID_SYSTEM+'.'+'NibeCalc.' + PARAM_LAST_AVG_TEMPERATURE;
const ID_AVG_TEMPERATURE    =  "javascript.0.NibeUplink.System_"+ID_SYSTEM+"." + PARAM_MITT_AUSSENTEMPERATUR[1];

//==================Berechung Zusatzheizungsnutzung Nutzung=============================
var trigger_zh = [ID_WM_BW_INKL_ZH,ID_WM_HZ_INKL_ZH,ID_WM_BW,ID_WM_HZ];
     

on({id: trigger_zh ,change:'ne'}, function(obj){
    setState(ID_WM_HZ_ZH, getState(ID_WM_HZ_INKL_ZH).val - getState(ID_WM_HZ).val);
    setState(ID_WM_BW_ZH, getState(ID_WM_BW_INKL_ZH).val - getState(ID_WM_BW).val);
    setState(ID_WM_ZH_GESAMT,(getState(ID_WM_HZ_ZH).val + getState(ID_WM_BW_ZH).val));
});


//================Berechnung der Soletemperaturerhöhung durch die Nibe FLM===============
var trigger_wrg = [ID_KOLL_AUS,ID_KOLL_EIN];


on({id: trigger_wrg ,change:'ne'}, function(obj){

    setState(ID_WRG_TEMP,getState(ID_KOLL_AUS).val - getState(ID_KOLL_EIN).val);
});

//=====================Auswertung Berechnung der Arbeitszahlen=========================================

on({id: ID_BTN_CLICK ,change:'ne'}, function(obj){

    //Verbrauch der WP vorab Ermitteln
    var Verbrauch_WP = (getState(ID_TEMP_COUNT_WP).val - getState(ID_LAST_COUNT_WP).val) ;
    console.log( "Verbrauch WP="+getState(ID_TEMP_COUNT_WP).val +"-"+ getState(ID_LAST_COUNT_WP).val +"= " +Verbrauch_WP);
    

    if(Verbrauch_WP > 0.5)
    {//Nur rechnen wenn der Verbrauch > 0,5 kWh ist

        //Zeitbereich seit letzter Auswertung bestimmen:
        var timespan = Date.now() - getState(ID_LAST_DATA_SET).val;

        //Neuer Timestamp = alter Timestamp
        setState(ID_LAST_DATA_SET,Date.now());

        //Zeitpunkt der letzten Ablesung (lesbar)
        const heute = new Date();
        setState(ID_LAST_DATA_SET_DAYTIME,heute.toLocaleString());

        //Zeitspanne in Minuten
        timespan = timespan/60000;
 
        // Zeitraum in Tagen für die Anzeige
        setState(ID_TIMESPAN_DAY,(timespan/1440).toFixed(2));

        //Mittlere Aussentemperatur sichern
        setState(ID_LAST_AVG_TEMPERATURE,getState(ID_AVG_TEMPERATURE).val);


        //----------------Berechnung Verbrauch--------------------------------
        
        // Neuer Wert = Alter Wert! (Zählerstände)
        var lastcount = 
        setState(ID_LAST_COUNT_WP,getState(ID_TEMP_COUNT_WP).val);

        // Verbrauch / Zeiteinheit loggen
        setState(ID_LAST_USAGE_WP_ZE, Verbrauch_WP.toFixed(2));

        //Aufrechnung des Jahresverbrauchs;
        var Jahresverbrauch= (parseFloat(getState(ID_TEMP_COUNT_WP).val) - parseFloat(getState(ID_YEARLY_COUNT_WP).val)).toFixed(2);
        setState(ID_YEARLY_USAGE_WP, (parseFloat(getState(ID_TEMP_COUNT_WP).val) - parseFloat(getState(ID_YEARLY_COUNT_WP).val)).toFixed(2)); 
        console.log("Jahresverbrauch: " + parseFloat(getState(ID_TEMP_COUNT_WP).val) + " - " + parseFloat(getState(ID_YEARLY_COUNT_WP).val));
        // Aufrechnung Monatsverbrauch
        setState(ID_MONTHLY_USAGE_WP, (parseFloat(getState(ID_MONTHLY_USAGE_WP).val) + parseFloat(Verbrauch_WP)).toFixed(2)); 

        //Aufrechnung auf den ganzen Tag:
        var Verbrauch_WP_day = ((Verbrauch_WP/timespan)* 1440).toFixed(2);
        setState(ID_LAST_USAGE_WP, Verbrauch_WP_day);

        //----------------Berechnung Wärmemengen:------------------------------
        // Wärmeemenge Heizung berechnen
        var WM_HZ = (getState(ID_WM_HZ_INKL_ZH).val - getState(ID_LAST_WM_HZ_INKL_ZH).val).toFixed(2); 

        //Wärmemenge Brauchwasser berechnen
        var WM_BW = (getState(ID_WM_BW_INKL_ZH).val - getState(ID_LAST_WM_BW_INKL_ZH).val).toFixed(2); 

        //Neue Werte = letzte Werte
        setState(ID_LAST_WM_HZ_INKL_ZH,getState(ID_WM_HZ_INKL_ZH).val);
        setState(ID_LAST_WM_BW_INKL_ZH,getState(ID_WM_BW_INKL_ZH).val);

        //Pro ZE-Werte sichern
        setState(ID_LAST_USAGE_WM_HZ_ZE,WM_HZ);
        setState(ID_LAST_USAGE_WM_BW_ZE,WM_BW);

        //Auf einen Tag umrechnen und sichern
        var WM_HZ_day = ((WM_HZ/timespan)* 1440).toFixed(2);
        var WM_BW_day = ((WM_BW/timespan)* 1440).toFixed(2);

        setState(ID_LAST_USAGE_WM_HZ,WM_HZ_day);
        setState(ID_LAST_USAGE_WM_BW,WM_BW_day);

        //-----------------Berechnung Arbeitszahl:---------------------------------
        //Gesamtwärmemenge errechnen
        var WM_Gesamt =  parseFloat(WM_HZ) + parseFloat(WM_BW) ;
        console.log("HZ="+WM_HZ+";BW="+WM_BW );
        
        //Gesamtwärmemenge im Jahr berechnen
        var yearly_WB_HZ = parseFloat(getState(ID_WM_HZ).val) - parseFloat(getState(ID_YEARLY_COUNT_WM_HZ).val);
        console.log("Jahreswärme HZ="+getState(ID_WM_HZ).val+"-" + getState(ID_YEARLY_COUNT_WM_HZ).val );
        var yearly_WB_BW = parseFloat(getState(ID_WM_BW).val) - parseFloat(getState(ID_YEARLY_COUNT_WM_BW).val);
        console.log("Jahreswärme BW="+getState(ID_WM_BW).val+"-" + getState(ID_YEARLY_COUNT_WM_BW).val );
        var WM_yearly_gesamt = yearly_WB_HZ + yearly_WB_BW ;
        console.log("Gesamtwärmemenge:" + WM_yearly_gesamt);
        
        //Areitszahl berechnen
        var AZ =  WM_Gesamt/Verbrauch_WP;
        setState(ID_LAST_AZ,AZ.toFixed(2));

        //JAZ berechnen
        setState(ID_YEARLY_AZ, (parseFloat(WM_yearly_gesamt) / parseFloat(Jahresverbrauch)).toFixed(2));

        console.log ("AZ="+parseFloat(WM_yearly_gesamt) + "/" +parseFloat(Jahresverbrauch)+"="+AZ);


        //----------------Berechnung Verdichterstarts:------------------------------
        // Verdichterstarts berechnen
        var VD_start = (getState(ID_VERDICHTER_START).val - getState(ID_LAST_VERDICHTER_START).val); 

        console.log("Verdichterstarts:" + getState(ID_VERDICHTER_START).val + "-" + getState(ID_LAST_VERDICHTER_START).val + "=" +VD_start  );

        //Neuer Wert = letzter Wert
        setState(ID_LAST_VERDICHTER_START,getState(ID_VERDICHTER_START).val);
    

        //Pro ZE-Werte sichern
        setState(ID_LAST_USAGE_VERDICHTER_START_ZE,VD_start);
 



        //Auf einen Tag umrechnen und sichern
        var VD_Start_day = ((VD_start/timespan)* 1440).toFixed(2);


        setState(ID_LAST_USAGE_VERDICHTER_START,VD_Start_day);


    }
});



