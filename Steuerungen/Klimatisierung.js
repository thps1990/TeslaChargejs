
//Feststellen ob die Räume zu warm sind
function zu_warm()
{ 
    var Wohnraum = false;    
    var Schlafraum = false;
    GRP_TEMP_WOHNRAUM.forEach(function(item) {
            if(getState(item).val > 23 )
            {
                Wohnraum = true;
            }
        }); 
        
    GRP_TEMP_SCHLAFRAUM.forEach(function(item) {
            if(getState(item).val > 21 )
            {
                Schlafraum = true;
            }
        }); 

    return Wohnraum || Schlafraum; // Wenn ein Wohnraum oder Schlafraum zu warm gibt die Funktion true zurück
}

//Feststellen ob geheizt oder gekühlt werden muss.

on({id:ID_AVG_AUSSENTEMPERATUR ,change: 'ne'}, function(obj){
    var avg_temp = getState(ID_AVG_AUSSENTEMPERATUR).val; 
    var Raumtemperatur = "javascript.0.NibeUplink.System_45464.Raumtemperatur"

    //======================Heizung=========================
    if(avg_temp < 15)
    {// Wenn avg_temperatur kleiner als 13 Grad ist --> einschalten 
        setState(ID_HEIZUNG_AKTIV,true);
    }
    if(avg_temp > 17)
    {// Wenn avg_temperatur größer als 14 Grad ist --> Auschalten 
        setState(ID_HEIZUNG_AKTIV,false);
    }

    //========================Kühlung=========================
    if(getState(ID_HEIZUNG_AKTIV).val)
    {// Wenn Heizung aktiv ist, muss Kühlung zwingend deaktiviert werden
        setState(ID_KUEHLUNG_AKTIV,false);
    }else
    {// WEnn Heizung nicht aktiv, kann man über Kühlung nachdenken
        setState(ID_KUEHLUNG_AKTIV,false);
        if(avg_temp > 20 && getState(Raumtemperatur).val > 22)
        {// Wenn avg Temperatur zu hoch auf jeden Fall Kühlung aktivieren
            setState(ID_KUEHLUNG_AKTIV,true);
        }else if(zu_warm())
        { // Wenn einer der Räume zu Warm ist -> Kühlung aktiv
            setState(ID_KUEHLUNG_AKTIV,true);
        }else
        {// Ansonsten Kühlung aus
            setState(ID_KUEHLUNG_AKTIV,false);
        }

    }


});