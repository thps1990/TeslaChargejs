//===================Ventilatorsteuerung===========================================
//===================Vorgeschaltene VIS-Steuerung==================================

//Lüftung manuell auf Normal
on({id: "javascript.0.VIS.Lueftung_normal" , val: true}, function(obj){
    setStateDelayed("javascript.0.VIS.Lueftung_normal",false,200);
    setState("javascript.0.NibeUplink.System_45464.NibeControl.Fan_normal",true); 
    setState("javascript.0.VIS.Lueftung_manuel_control" , true); //Manuelles Eingreifen --> Automat darf nicht mehr eingreifen

    if(getState("javascript.0.VIS.Nibe_Ventilatorrueckstellzeit").val > 0)
    {//Manuelles Eingreifen zurücksetzen nach Rückstellzeit
       setTimeout(function(){
            setState("javascript.0.VIS.Lueftung_manuel_control",false);     
       },getState("javascript.0.VIS.Nibe_Ventilatorrueckstellzeit").val * 3600000);
    }
});

//Lüftung manuell auf Hoch
on({id: "javascript.0.VIS.Lueftung_high" , val: true}, function(obj){
    setStateDelayed("javascript.0.VIS.Lueftung_high",false,200); //Button Zurücksetzen
    setState("javascript.0.NibeUplink.System_45464.NibeControl.Output03",true);
    setState("javascript.0.VIS.Lueftung_manuel_control" , true); //Manuelles Eingreifen --> Automat darf nicht mehr eingreifen
    console.log("Manuel auf Hoch ,Ventilatordrehzahl ist auf " + getState("javascript.0.VIS.Nibe_Ventilatorrueckstellzeit").val );
    if(getState("javascript.0.VIS.Nibe_Ventilatorrueckstellzeit").val > 0)
    {//Manuelles Eingreifen zurücksetzen nach Rückstellzeit und Lüftung zurück auf Normal
    console.log("Timeut läuft");
       setTimeout(function(){
            setState("javascript.0.VIS.Lueftung_manuel_control",false);   
            setState("javascript.0.NibeUplink.System_45464.NibeControl.Fan_normal",true);  
       },getState("javascript.0.VIS.Nibe_Ventilatorrueckstellzeit").val * 3600000); 
    }
});

//Lüftung manuell auf low
on({id: "javascript.0.VIS.Lueftung_low" , val: true}, function(obj){
    setStateDelayed("javascript.0.VIS.Lueftung_low",false,200);
    setState("javascript.0.NibeUplink.System_45464.NibeControl.Output04",true);
    setState("javascript.0.VIS.Lueftung_manuel_control" , true); //Manuelles Eingreifen --> Automat darf nicht mehr eingreifen
    if(getState("javascript.0.VIS.Nibe_Ventilatorrueckstellzeit").val > 0)
    {//Manuelles Eingreifen zurücksetzen nach Rückstellzeit und Lüftung zurück auf Normal
       setTimeout(function(){
            setState("javascript.0.VIS.Lueftung_manuel_control",false);   
            setState("javascript.0.NibeUplink.System_45464.NibeControl.Fan_normal",true);  
       },getState("javascript.0.VIS.Nibe_Ventilatorrueckstellzeit").val * 3600000);
    }
});

on({id: "javascript.0.NibeUplink.System_45464.NibeControl.Fan_normal" , val: true}, function(obj){
    setState("javascript.0.NibeUplink.System_45464.Ventilatordrehzahl",30);
    setState("javascript.0.NibeUplink.System_45464.NibeControl.Output03",false);
    setState("javascript.0.NibeUplink.System_45464.NibeControl.Output04",false);
});

on({id: "javascript.0.NibeUplink.System_45464.NibeControl.Output03" , val: true}, function(obj){
    setState("javascript.0.NibeUplink.System_45464.Ventilatordrehzahl",65);
    setState("javascript.0.NibeUplink.System_45464.NibeControl.Fan_normal",false);
    setState("javascript.0.NibeUplink.System_45464.NibeControl.Output04",false);
});

on({id: "javascript.0.NibeUplink.System_45464.NibeControl.Output04" , val: true}, function(obj){
    setState("javascript.0.NibeUplink.System_45464.Ventilatordrehzahl",10);
    setState("javascript.0.NibeUplink.System_45464.NibeControl.Fan_normal",false);
    setState("javascript.0.NibeUplink.System_45464.NibeControl.Output03",false);
});

on({id: "javascript.0.VIS.Nibe_Ventilatorrueckstellzeit", change: 'ne'}, function(obj){
    if(getState("javascript.0.NibeUplink.System_45464.NibeControl.Output03").val || getState("javascript.0.NibeUplink.System_45464.NibeControl.Output04").val )
    {
        if(getState("javascript.0.VIS.Nibe_Ventilatorrueckstellzeit").val > 0 && getState("javascript.0.VIS.Lueftung_manuel_control").val)
        {//Ventilator zurückstellen
        setTimeout(function(){
                setState("javascript.0.NibeUplink.System_45464.NibeControl.Fan_normal",true);     
        },getState("javascript.0.VIS.Nibe_Ventilatorrueckstellzeit").val * 3600000);
        }
    }
});

//====================SmartGrid-Steuerung====================================

//Heizung blockieren
on({id: "javascript.0.NibeUplink.System_45464.NibeControl.Heizung_blockiert", change:'ne'}, function(obj){
    if(getState("javascript.0.NibeUplink.System_45464.NibeControl.Heizung_blockiert").val) 
    {
        setState("javascript.0.NibeUplink.System_45464.NibeControl.Ueberschuss_00",false);
        setState("javascript.0.NibeUplink.System_45464.NibeControl.Ueberschuss_01",false);
        setState("javascript.0.NibeUplink.System_45464.NibeControl.Ueberschuss_02",false);

        setState("javascript.0.NibeUplink.System_45464.NibeControl.Output01",true);
        setState("javascript.0.NibeUplink.System_45464.NibeControl.Output02",false);
    }

});

//Überschuss 00 - Normalmodus
on({id: "javascript.0.NibeUplink.System_45464.NibeControl.Ueberschuss_00" , change:'ne'}, function(obj){
    if(getState("javascript.0.NibeUplink.System_45464.NibeControl.Ueberschuss_00").val) 
    {
        setState("javascript.0.NibeUplink.System_45464.NibeControl.Heizung_blockiert",false);
        setState("javascript.0.NibeUplink.System_45464.NibeControl.Ueberschuss_01",false);
        setState("javascript.0.NibeUplink.System_45464.NibeControl.Ueberschuss_02",false);
        setState("javascript.0.NibeUplink.System_45464.NibeControl.Output01",false);
        setState("javascript.0.NibeUplink.System_45464.NibeControl.Output02",false);
    }
});

//Überschuss 01 - Niedrigtarifsteuerung
on({id: "javascript.0.NibeUplink.System_45464.NibeControl.Ueberschuss_01" , change:'ne'}, function(obj){
    
    if(getState("javascript.0.VIS.Nibe_SmartGridRueckstellzeit").val > 0)
    {//Smartgridrückstellzeit
        
        setTimeout(function(){
                setState("javascript.0.NibeUplink.System_45464.NibeControl.Ueberschuss_00",true);     
        },getState("javascript.0.VIS.Nibe_SmartGridRueckstellzeit").val * 3600000);
    }
    
    if(getState("javascript.0.NibeUplink.System_45464.NibeControl.Ueberschuss_01").val) 
    {//Überschuss01 true
        setState("javascript.0.NibeUplink.System_45464.NibeControl.Heizung_blockiert",false);
        setState("javascript.0.NibeUplink.System_45464.NibeControl.Ueberschuss_02",false);
        setState("javascript.0.NibeUplink.System_45464.NibeControl.Ueberschuss_00",false);
        setState("javascript.0.NibeUplink.System_45464.NibeControl.Output01",false);
        setState("javascript.0.NibeUplink.System_45464.NibeControl.Output02",true);
    }else if(!getState("javascript.0.NibeUplink.System_45464.NibeControl.Ueberschuss_02").val && !getState("javascript.0.NibeUplink.System_45464.NibeControl.Heizung_blockiert").val)
    {
        setState("javascript.0.NibeUplink.System_45464.NibeControl.Ueberschuss_00",true);
    }
});

//Überschuss 02 - Maximale Leistung
on({id: "javascript.0.NibeUplink.System_45464.NibeControl.Ueberschuss_02" , change:'ne'}, function(obj){
    
    if(getState("javascript.0.VIS.Nibe_SmartGridRueckstellzeit").val > 0)
    {//Smartgridrückstellzeit
        setTimeout(function(){
                setState("javascript.0.NibeUplink.System_45464.NibeControl.Ueberschuss_00",true);     
        },getState("javascript.0.VIS.Nibe_SmartGridRueckstellzeit").val * 3600000);
    }
    if(getState("javascript.0.NibeUplink.System_45464.NibeControl.Ueberschuss_02").val) 
    {//Überschuss01 true
        setState("javascript.0.NibeUplink.System_45464.NibeControl.Heizung_blockiert",false);
        setState("javascript.0.NibeUplink.System_45464.NibeControl.Ueberschuss_01",false);
        setState("javascript.0.NibeUplink.System_45464.NibeControl.Ueberschuss_00",false);
        setState("javascript.0.NibeUplink.System_45464.NibeControl.Output01",true);
        setState("javascript.0.NibeUplink.System_45464.NibeControl.Output02",true);
    }else if(!getState("javascript.0.NibeUplink.System_45464.NibeControl.Ueberschuss_01").val && !getState("javascript.0.NibeUplink.System_45464.NibeControl.Heizung_blockiert").val)
    {
        setState("javascript.0.NibeUplink.System_45464.NibeControl.Ueberschuss_00",true);
    }
});

on({id: "javascript.0.NibeUplink.System_45464.Brauchwasser_oben" , change:'ne'}, function(obj){
    if(getState("javascript.0.NibeUplink.System_45464.Brauchwasser_oben").val >= getState("0_userdata.0.Nibe.Max_BW_Temp").val && getState("javascript.0.NibeUplink.System_45464.NibeControl.Ueberschuss_02").val)
    {
        setState("javascript.0.NibeUplink.System_45464.NibeControl.Ueberschuss_02",false);
    }


});
