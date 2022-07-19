on({id:"javascript.0.Virtuelle_Schalter.bReinigungTisch",val:true}, function(obj){
    setState("javascript.0.Virtuelle_Schalter.bReinigungTisch", false);
    setState(ID_ALEXA_WZ_SPEAK, "Sehr gern! Ich reinige den Bereich um den Esstisch.");
    setState("mihome-vacuum.0.control.zoneClean",getState("javascript.0.Globale_Variablen.cBereichTisch"));
});

on({id:"javascript.0.Virtuelle_Schalter.bReinigungEingang",val:true}, function(obj){
    setState("javascript.0.Virtuelle_Schalter.bReinigungEingang", false);
    setState(ID_ALEXA_WZ_SPEAK, "Sehr gern! Ich reinige den Eingangsbereich.");
    setState("mihome-vacuum.0.control.zoneClean",getState("javascript.0.Globale_Variablen.cBereichEingang"));
});

on({id:"javascript.0.Virtuelle_Schalter.bReinigungKueche",val:true}, function(obj){
    setState("javascript.0.Virtuelle_Schalter.bReinigungKueche", false);
    setState(ID_ALEXA_WZ_SPEAK, "Sehr gern! Ich reinige die Küche.");
    setState("mihome-vacuum.0.control.zoneClean",getState("javascript.0.Globale_Variablen.cBereichKueche"));
});

on({id:"javascript.0.Virtuelle_Schalter.bReinigungWZ",val:true}, function(obj){
    setState("javascript.0.Virtuelle_Schalter.bReinigungWZ", false);
    setState(ID_ALEXA_WZ_SPEAK, "Sehr gern! Ich reinige das Wohnzimmer.");
    setState("mihome-vacuum.0.control.zoneClean",getState("javascript.0.Globale_Variablen.cBereichWZ"));
});