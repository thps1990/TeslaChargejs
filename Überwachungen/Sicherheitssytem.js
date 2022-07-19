
on({id: ID_BTN_TECHNIKRAUM + ".double", val:true}, function(obj){
   // Alarmanlage Aktivieren
   console.log("Das sicherheitssystem wurde aktiviert?");
   setState(ID_ALARMPRESET,true);
   setState(ID_ALEXA_WZ_SPEAK, "Das Sicherheitssystem aktiviert sich bei dem nächsten Verlassen des Hauses automatisch");
});

on({id: ID_BTN_TECHNIKRAUM + ".long", change:'ne'}, function(obj){
    setState(ID_ALARMAKTIV,false);
    setState(ID_ALARMPRESET,false);
    setState(ID_ALARMAUSGELOEST,false);
    setState(ID_ALEXA_WZ_SPEAK, "Das Sicherheitssystem wurde deaktiviert");
}); // Alarm deaktivieren


//EVENTS, PIR
on({id:GRP_PIR_KUECHE , val:true}, function(obj){ event_erkannt("der Küche(BWM)"); });
on({id:GRP_PIR_FLUR  , val:true}, function(obj){ event_erkannt("dem Flur(BWM)"); });
on({id:GRP_PIR_BAD , val:true}, function(obj){ event_erkannt("dem Bad(BWM)"); });

//EVENTS Türsensoren
on({id:ID_DWS_TUER_HAUSTUER , change:'ne'}, function(obj){event_erkannt("dem Flur(Haustür)"); });
on({id:ID_DWS_TUER_TECHNIKRAUM , change:'ne'},function(obj){ event_erkannt("dem Technikraum(Tür)"); });
on({id:ID_DWS_TUER_SCHLAFZIMMER , change:'ne'},function(obj){ event_erkannt("dem Schlafzimmer(Tür)"); });
on({id:ID_DWS_TUER_TESSA , change:'ne'}, function(obj){event_erkannt("dem Kinderzimmer(Tessa,Tür)");} );
on({id:ID_DWS_TUER_TECHNIKRAUM , change:'ne'},function(obj){ event_erkannt("dem Technikraum(Tür)");} );

    



function event_erkannt(ort)
{ 
    
    if(getState(ID_ALARMAKTIV).val)
    {
        sendTo('telegram', "@Torsten Eine Bewegung wurde in " + ort + " erkannt!");
        setState(ID_ALEXA_WZ_SPEAK, "MöpMöpMöpMöp Achtung! Hau lieber ab!");
        setTimeout(function(){
            if(getState(ID_ALARMAKTIV).val)
            {//Wenn alarm nicht ausgeschalten wurde, dann Bewegungsmelder Prüfen

                var PIR_aktiv = false;
                GRP_PIR_ALLE.forEach(function(ID) {
                    if(getState(ID).val)
                    {//Wenn einer der PIR noch aktiv ist...
                        PIR_aktiv = true;
                    }
                });
            }
         setState(ID_ALEXA_WZ_SPEAK, "Der Timeout ist rumPIR ist:" + PIR_aktiv);
            if(PIR_aktiv)
            {// Wirklich Alarm...
                sendTo('telegram', "@Torsten Alarm! Eine Bewegung wurde in " + ort + " erkannt!"); 
                
                setState(ID_ALARMAUSGELOEST,true);
            }
        },150000);      
    }
}

on({id:ID_ALARMAUSGELOEST , change:'ne'}, function(obj){
 // Alarm wurde ausgelöst...
    if(getState(ID_ALARMAUSGELOEST).val)
    {//Alarm wurde ausgelöst
       
        Alarm(false,false);//Alarm auslösen
    }
    else
    {
        Alarm(true);//deaktivieren
    }
    
    
});

