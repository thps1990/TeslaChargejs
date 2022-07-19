
function setAnwesenheit()
{
    console.log("Trigger"); 
    if(getState("javascript.0.VIS.anwesenheitserkennung").val)
    {
     console.log("Anwesenheitserkennung ist an"); 
    
        if( (getState(ID_SMARTPHONE_LISA).val || getState(ID_SMARTPHONE_TORSTEN).val) && !getState(ID_ANWESENHEIT).val)
        {
            sendTo('telegram', "@Torsten Nach Hause gekommen!");
            setState( ID_ANWESENHEIT, true);
            setState("javascript.0.Globale_Variablen.bAnsage_gesprochen", false);
        }
        else if(!(getState(ID_SMARTPHONE_LISA).val || getState(ID_SMARTPHONE_TORSTEN).val))
        {
            console.log("Niemand da!, Timer läuft"); 

            //Verzögerung und erneute Prüfung nach 60 Sekunden 
            var Timer_PIR = setTimeout(function(){
                if(!(getState(ID_SMARTPHONE_LISA).val || getState(ID_SMARTPHONE_TORSTEN).val))
                {//Wenn tatsächlich niemand da ist Abwesenheit einschalten
                   console.log("Timer abgelaufen"); 
                   sendTo('telegram', "@Torsten Niemand mehr da !");
                    setState(ID_ANWESENHEIT, false);
                    //
                }
            },180000);
            
        }
    }
} 

function Ansage()
{
    var eventarr = [];
    var eventstring = "";
    var heute = new Date();
    if(!getState(ID_SCHLAFEN).val && heute.getHours() > 8)
    {

            
     //Begrüßungstext zusammen bauen
        if(getState(ID_SMARTPHONE_LISA).val && getState(ID_SMARTPHONE_TORSTEN).val)
        {
            eventarr.push("Herzlich Willkommen Zuhause ihr Zwei!");
        }else if(getState(ID_SMARTPHONE_LISA).val)
        {
            eventarr.push("Herzlich Willkommen Zuhause Lisa!");
        }
        else if(getState(ID_SMARTPHONE_TORSTEN).val)
        {
            eventarr.push("Herzlich Willkommen Zuhause Torsten!");
        }
        
        if(getState("javascript.0.Globale_Variablen.bBriefkasten_voll").val)
        {
            setState("javascript.0.Globale_Variablen.bBriefkasten_voll", false);
            eventarr.push("Vorhin hat jemand etwas in den Briefkasten geworfen, schau doch mal nach!");
        }
            
        if(getState("javascript.0.Globale_Variablen.bBumbeeVoll").val)
        {
            setState("javascript.0.Globale_Variablen.bBumbeeVoll", false);
            eventarr.push("Bambis Staubbehälter ist voll. Es wäre zu gütig wenn du Ihn reinigen würdest.");
        }
        if(getState("javascript.0.Globale_Variablen.bHeuteGereinigt").val == 11)
        {
            setState("javascript.0.Globale_Variablen.bHeuteGereinigt",12);
            eventarr.push("Bambi hat das Haus in deiner Abwesenheit für dich gesaugt.");
        }
        
        if(getState("javascript.0.Virtuelle_Schalter.bLowBattery").val)
        {
            eventarr.push("Ein Zigbee Gerät hat eine leere Batterie. Bitte Wechsel die bald mal aus.");
        }
            
        if(getState(ID_ALARMAKTIV).val)
        {
            
            eventarr.push("Das Sicherheitssystem habe ich für dich deaktiviert");
        }
            
            
        var i = 1
        eventarr.forEach(function(element) {//Sprachausgabe jedes Eintrags
            var add = " ach und nochwas ";
            if(i == eventarr.length)
            {
                add = " Over and Out! ";
            }
            eventstring += element + add + ";"
                
            i = i + 1;
        });

        setStateDelayed(ID_ALEXA_WZ_SPEAK,"40;"+eventstring,10000);
        setStateDelayed("javascript.0.VIS.radio_wz",true,40000); 
 } 
}

function Gehen()
{
    //Aktion beim Verlassen
    if(getState("javascript.0.VIS.anwesenheitserkennung").val)
    {
       if(getState(ID_ALARMPRESET).val || getState("javascript.0.VIS.Alarm_automatisch_aktiv").val)
       { // Wenn der Alarm-Preset gesetzt wurde, oder das System automatisch aktiviert wird

           setState(ID_ALARMAKTIV, true);
           setState(ID_ALEXA_WZ_SPEAK,"40; Es ist niemand mehr da. Das Sicherheitssystem aktiviert sich nun automatisch.");
       }
       Licht_aus();
       Geraete_aus();

       //Variablen setzen
       setState("javascript.0.Globale_Variablen.bBumbeeVoll",false);
       setState("javascript.0.Globale_Variablen.bBriefkasten_voll",false);
     }

// 
}
on({id: ID_SMARTPHONE_LISA, change: 'ne'}, setAnwesenheit);
on({id: ID_SMARTPHONE_TORSTEN, change: 'ne'}, setAnwesenheit);
on({id: ID_ANWESENHEIT, val: true}, function(obj){

    
});
on({id: ID_ANWESENHEIT, val: false}, Gehen);

on({id: GRP_PIR_FLUR,val: true}, function(obj){
    if(getState(ID_ANWESENHEIT).val && !getState("javascript.0.Globale_Variablen.bAnsage_gesprochen").val)
    { 
                    
        setState(ID_ALARMAKTIV, false);
        setState(ID_ALARMPRESET, false);
        setState(ID_ALARMAUSGELOEST, false);
        setState("javascript.0.Globale_Variablen.bAnsage_gesprochen",true);
        Ansage();
    }
});

on({id: "javascript.0.VIS.anwesenheitserkennung", val: false}, function(){
    setState(ID_ANWESENHEIT, true);
});




