console.log("Script gestartet"); 

var Hausakku_Ziel_SOC = 70;
var loaded_energy_preexcess =0;

schedule("*/30 * * * * *", function () {
    //console.log("Timetrigger, Überschussladung Excess-Load:" +getState(ID_GOE_EXCESS_LOAD).val );
    if( getState(ID_GOE_EXCESS_LOAD).val  )
    {// überschussladung aktiviert
        if(getState(ID_GOE_STATE).val == 2)
        {// Auto lädt bereits
            if(getState(ID_PV_AKKUSTAND).val < 15 && getState(ID_PV_AKKU_STATUS).val =="Entladen")
            { // Wenn Akkustad Hausakku unter 15 % und weiter entladen wird.... Ladung stoppen
                setStateDelayed(ID_GOE_ACCESS_STATE,2,100);
            }
            if(getState(ID_PV_NETZEINSPEISUNG_LEISTUNG).val > 250 || (((getState(ID_PV_AKKU_LEISTUNG).val > 100 && getState(ID_PV_AKKUSTAND).val > Hausakku_Ziel_SOC) || (getState(ID_PV_AKKU_LEISTUNG).val > 700 && getState(ID_PV_AKKUSTAND).val < Hausakku_Ziel_SOC))  && getState(ID_PV_AKKU_STATUS).val =="Laden"))
            {//Zu viel Strom da, Ladeleistung erhöhen
                if(getState(ID_GOE_CURRENT).val < 16)
                {
                    console.log("Überschussladung: Stromstärke erhöhen von " + parseInt(getState(ID_GOE_CURRENT).val) + " A auf "+  (parseInt(getState(ID_GOE_CURRENT).val) + 1 ) + " A");
                    setStateDelayed(ID_GOE_CURRENTPV, parseInt(getState(ID_GOE_CURRENT).val) +1,1000);
                }
            }
            else if(getState(ID_PV_NETZBEZUG_LEISTUNG).val > 150 || (((getState(ID_PV_AKKU_LEISTUNG).val > 500 && getState(ID_PV_AKKUSTAND).val > Hausakku_Ziel_SOC) || (getState(ID_PV_AKKU_LEISTUNG).val > 150 && getState(ID_PV_AKKUSTAND).val < Hausakku_Ziel_SOC))  && getState(ID_PV_AKKU_STATUS).val =="Entladen"))
            {// Wenn mehr als 150W aus dem Netz gezogen wird, Stromstärke verringern
                if(getState(ID_GOE_CURRENT).val > 6)
                {
                    console.log("Überschussladung: Stromstärke reduzieren von " + getState(ID_GOE_CURRENT).val + " A auf "+  (getState(ID_GOE_CURRENT).val - 1 ) + " A");
                    setStateDelayed(ID_GOE_CURRENTPV, getState(ID_GOE_CURRENT).val - 1,1000);
                }else if (getState(ID_PV_NETZBEZUG_LEISTUNG).val > 500 || getState(ID_PV_AKKUSTAND).val < 15 )
                {// Ladung beenden
                    if(Tesla_at_home() && getState(ID_TESLA_CHARGEPORT_OPEN).val)
                    {//Tesla ist angeschlossen, Laden auch am Auto beenden
                        setState(ID_TESLA_CMD_CHARGE_STOP,true);
                    }
                    setStateDelayed(ID_GOE_ACCESS_STATE,2,100);
                }
            }
        }
        else if(getState(ID_PV_AKKUSTAND).val > 25 && getState(ID_GOE_ACCESS_STATE).val != 0) 
        {// Auto lädt noch nicht
            console.log ("Laden startet nun....")
            if(Tesla_at_home() && getState(ID_TESLA_CHARGEPORT_OPEN).val)
            {//Tesla ist angeschlossen, Laden auch am Auto starten
                setState(ID_TESLA_CMD_WAKEUP,true);
                setStateDelayed(ID_TESLA_CMD_CHARGE_START,true,20000);
            }
            setStateDelayed(ID_GOE_ACCESS_STATE,0,100);
            setStateDelayed
            setState(ID_GOE_CURRENTPV, 6);
        }
    }else
    {// Überschussladung nicht aktiviert
        if(getState(ID_GOE_ACCESS_STATE).val != 0)
            {// Wenn ACC Status nicht offen ist --> offen
                setStateDelayed(ID_GOE_ACCESS_STATE,0,100);
            }         
    }
});


on({id:ID_GOE_STATE ,change: 'ne'}, function(obj){
    //Nach beendidung der Überschussladung Die geladene Energy sichern
    if(getState(ID_GOE_STATE).val == 1 && getState(ID_GOE_EXCESS_LOAD).val)
    {// Laden beendet mit Überschuss
        setState("0_userdata.0.Tesla.PV_energy_added_daily", getState("0_userdata.0.Tesla.PV_energy_added_daily").val + getState("ID_GOE_LOADED_ENERGY").val - loaded_energy_preexcess); 
        loaded_energy_preexcess = 0;
    }
});

on({id:ID_GOE_EXCESS_LOAD ,change: 'ne'}, function(obj){
//Überschussladen wird deaktiviert/aktiviert
    if(getState(ID_GOE_EXCESS_LOAD).val && getState(ID_GOE_STATE).val == 2)
    { // Überschussladen wurde aktiviert /War also deaktiviert
        loaded_energy_preexcess =getState("ID_GOE_LOADED_ENERGY").val;
    }else if (getState(ID_GOE_STATE).val == 2)
    {
        setState("0_userdata.0.Tesla.PV_energy_added_daily", getState("0_userdata.0.Tesla.PV_energy_added_daily").val + getState("ID_GOE_LOADED_ENERGY").val - loaded_energy_preexcess); 
        loaded_energy_preexcess = 0;

    }
});











