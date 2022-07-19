on({id:"javascript.0.Virtuelle_Schalter.Gigablue_X3" ,change:'ne'}, function(obj){

    if(getState("javascript.0.Virtuelle_Schalter.Gigablue_X3").val === getState("enigma2.0.enigma2.STANDBY").val )
    {
        setState("enigma2.0.command.STANDBY_TOGGLE",true); 
    }
    
})

on({id:ID_SW_TV ,change:'ne'}, function(obj){

    setState("javascript.0.Virtuelle_Schalter.Gigablue_X3", getState(ID_SW_TV).val);
    
});