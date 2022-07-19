on({id:"mihome-vacuum.0.info.state",change: 'ne'}, function(obj){
    if(getState("mihome-vacuum.0.info.state").val  == 8)
    {
        setState("javascript.0.Globale_Variablen.iBumbeeGereinigteFlaeche", getState("javascript.0.Globale_Variablen.iBumbeeGereinigteFlaeche").val + getState("mihome-vacuum.0.info.cleanedarea").val );
        if( getState("javascript.0.Globale_Variablen.iBumbeeGereinigteFlaeche").val > 200)
        {//Behälter muss geleert werden
            setState("javascript.0.Globale_Variablen.bBumbeeVoll", true);
            sendTo('telegram', "Bumbees Staubbehälter ist voll!");
                setState("javascript.0.Globale_Variablen.iBumbeeGereinigteFlaeche",0);
        }
    }
});

    