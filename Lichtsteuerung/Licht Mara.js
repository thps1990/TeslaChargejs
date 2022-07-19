on({id: ID_BTN_MARA + ".click" , val:true}, function(obj){

    setState("javascript.0.VIS.lichtschalter_mara", false);
    setStateDelayed("javascript.0.VIS.lichtschalter_mara", true,1000);
    
    setState(ID_LIGHTSH_LICHT_LED_STRIPE, !getState(ID_LIGHTSH_LICHT_LED_STRIPE).val) ;

} );

on({id: ID_BTN_MARA + ".double_click" , val:true}, function(obj){

    setState("javascript.0.VIS.lichtschalter_mara", false);
    setStateDelayed("javascript.0.VIS.lichtschalter_mara", true,1000);
    
    setState(ID_LIGHTSH_LICHT_SPOTS, !getState(ID_LIGHTSH_LICHT_SPOTS).val) ;

} );