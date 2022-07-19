//Ausführung bei Sonnenuntergang
schedule({astro: "sunset", shift:20}, function () {
    //Rolläden runter fahren
    if(!getState(ID_URLAUB).val)
    {
        var i=0;
        GRP_ROLLADEN_ALLE.forEach(function(ID) {
            setStateDelayed(ID + ".Close", true,i*1000);
            i = i+1;
        });
        
        if(getState(ID_ANWESENHEIT).val && !getState(ID_SCHLAFEN).val)
        {//Licht im Wohnzimmer an wenn jemand zuhause
            setState(ID_LIGHTML_WZ,true);
        }
    } 
});


