var Trigger = [ID_DWS_TUER_HAUSTUER , ID_ANWESENHEIT];

on({id: Trigger ,val: true}, function(obj){
    if((!isAstroDay() && !getState(ID_URLAUB).val && !getState(ID_SCHLAFEN).val) || (!isAstroDay() && getState(ID_DWS_TUER_HAUSTUER).val))
    {// Wenn nacht  und nicht schlafen oder Nacht und Tür auf!
        setState(ID_SW_AUSSENBELEUCHTUNG,true);
        setState(ID_LIGHTSH_GARAGE,true);
        
        if(getState("javascript.0.VIS.timeout_aussenbeleuchtung").val > 0)
        {
            setStateDelayed(ID_SW_AUSSENBELEUCHTUNG,false,getState("javascript.0.VIS.timeout_aussenbeleuchtung").val*60000);
            setStateDelayed(ID_LIGHTSH_GARAGE,false,getState("javascript.0.VIS.timeout_aussenbeleuchtung").val*60000);            
        }
    }
});
 
on({id: ID_PIR_AUSSEN ,change: 'ne'}, function(obj){
    if(getState(ID_PIR_AUSSEN).val && !getState(ID_URLAUB).val && getState("javascript.0.VIS.bewegungsmelder_aussen").val)
    {
         //sendTo('telegram', "@Torsten Aussenlicht wäre an...");
        if(!isAstroDay() && !getState(ID_SW_AUSSENBELEUCHTUNG).val && !getState(ID_SCHLAFEN).val)
        {
            setState(ID_SW_AUSSENBELEUCHTUNG,true);
            setState(ID_LIGHTSH_GARAGE,true);
        }
    }else if(getState("javascript.0.VIS.bewegungsmelder_aussen").val)
    {
        if(getState(ID_SW_AUSSENBELEUCHTUNG).val)
        {
            setState(ID_SW_AUSSENBELEUCHTUNG,false);
            setState(ID_LIGHTSH_GARAGE,false);
        }
    }

});

on({id:ID_ALIVE_AUSSENBELEUCHTUNG  ,val: false}, function(obj){

    sendTo('telegram', "SonOff Aussenbeleuchtung kaputt ?!"); 

});
