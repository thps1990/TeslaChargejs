on({id: ID_DWS_TUER_TECHNIKRAUM , change: 'ne'}, function(obj){
  if(!isAstroDay() && !getState(ID_URLAUB).val )
  {
    setState(ID_SW_LICHT_TECHNIKRAUM,getState(ID_DWS_TUER_TECHNIKRAUM).val)  ;
  }
    
} );

on({id: ID_ALIVE_LICHT_TECHNIKRAUM  ,val: false}, function(obj){

    sendTo('telegram', "SonOff Technikraum kaputt ?!"); 

});