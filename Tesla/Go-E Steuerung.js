



// Maximale Leistung Berechnen
var trigger = ["go-e.0.reboot_timer",ID_GOE_CURRENT]
on({id:trigger,change: 'ne'}, function(obj){
    if((getState(ID_GOE_Voltage_L1).val+ getState(ID_GOE_Voltage_L2).val + getState(ID_GOE_Voltage_L3).val)> 400 ){
        setState(ID_GOE_THREE_PHASE, true);  
        setState(ID_GOE_CHARGE_POWER_MAX,(getState(ID_GOE_CURRENT).val*690)/1000);   
    }
    else{
                    setState(ID_GOE_THREE_PHASE, false);
                    setState(ID_GOE_CHARGE_POWER_MAX,(getState(ID_GOE_CURRENT).val*230)/1000); 
    }
});


// Überschussladung erkennen, Phasenerkennung
var trigger= [ID_GOE_EXCESS_LOAD,ID_GOE_THREE_PHASE ];
on({id:trigger ,change: 'ne'}, function(obj){

    if(getState(ID_GOE_THREE_PHASE).val && getState(ID_GOE_EXCESS_LOAD).val )
    {// Wenn die Wallbox mit 3 Phasen angeschlossen ist, keine Überschussladung möglich
        setStateDelayed(ID_GOE_EXCESS_LOAD,false,500);
        setState("javascript.0.VIS.GOE_Error", 0.8);
        setStateDelayed("javascript.0.VIS.GOE_Error",0,5000);
    }

    if(!getState(ID_GOE_EXCESS_LOAD).val)
    {// Wenn Überschussladung deaktiviert wurde mit voller Leistung laden
        setStateDelayed(ID_GOE_ACCESS_STATE,0,100);
        setState(ID_GOE_CURRENTPV,16);
    }
});


