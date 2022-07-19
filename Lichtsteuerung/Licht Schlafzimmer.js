

on({id:ID_DWS_TUER_SCHLAFZIMMER ,val: true}, function(obj){
   var heute = new Date();
   
    if(getState(ID_ANWESENHEIT).val === true && !getState(ID_SCHLAFEN).val && !isAstroDay() && heute.getHours() >= 10 && getState("javascript.0.VIS.Licht_Schlafzimmer").val && !getState(ID_URLAUB).val)
    {
            setState(ID_SW_LICHT_ANKLEIDE,true); 
            setStateDelayed(ID_SW_LICHT_ANKLEIDE,false,120000);
    }
}    
);


var ibuttons = [ID_BTN_SCHLAFZIMMER_1 + ".click"];

on({id: ibuttons , val: true}, function(obj){
    setState(ID_SW_LICHT_ANKLEIDE,!getState(ID_SW_LICHT_ANKLEIDE).val); 
});

on({id:ID_ALIVE_LICHT_ANKLEIDE  ,val: false}, function(obj){

    sendTo('telegram', "SonOff Schlafzimmer kaputt ?!"); 

});
