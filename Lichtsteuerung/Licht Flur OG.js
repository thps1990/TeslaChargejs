
on({id: ID_PIR_FLUR_OG ,change: 'ne'}, function(obj){
    if((!isAstroDay() || getState(ID_LUX_FLUR_OG).val < 13 )&& getState("javascript.0.VIS.bewegungsmelder_flur_og").val && !getState(ID_URLAUB).val)
    {
        if(getState(ID_SCHLAFEN).val)
        {
            setState(ID_LIGTHML_FLUR_OG + ".brightness", 15 );
        }else
        {
            setState(ID_LIGTHML_FLUR_OG + ".brightness", 70 );
        }
        setState(ID_LIGTHML_FLUR_OG + ".state",getState(ID_PIR_FLUR_OG).val);
    }else if(!getState(ID_PIR_FLUR_OG).val)
    {
        setState(ID_LIGTHML_FLUR_OG + ".state",false);
    }
    
});