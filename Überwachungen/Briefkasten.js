
on({id:ID_DWS_BRIEFKASTEN,change: 'ne'}, function(obj){
    if(getState(ID_DWS_BRIEFKASTEN).val)
    {
        if(!getState("javascript.0.Globale_Variablen.bBriefkasten_voll").val || !getState(ID_ANWESENHEIT).val)
        {
            setState("javascript.0.Globale_Variablen.bBriefkasten_voll", true);
            setState("javascript.0.Globale_Variablen.tBriefkasten_lastchanged",Date.now());

            sendTo('telegram', "Jemand hat etwas in den Briefkasten geworfen!");
        }
        
        if(getState(ID_ANWESENHEIT).val && !getState(ID_SCHLAFEN).val && !getState("javascript.0.Globale_Variablen.bBriefkasten_voll").val){
            setState(ID_ALEXA_WZ_SPEAK,"Hurra Hurra die Post ist da!");
            setState("javascript.0.Globale_Variablen.bBriefkasten_voll", true);
        }
    }
});
