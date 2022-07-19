on({id: ID_ANWESENHEIT, val: true}, Kommen);
on({id: ID_ANWESENHEIT, val: false}, Gehen);
/*on({id: ID_LUX_KUECHE, valLt:1}, function(){
    if(!getState("javascript.0.VIS.RolladenWZ").val)
    {//Wenn wirklich dunkel, Rolläden im WZ runter
    
        //Verzögerung und erneute Prüfung nach 30 Minuten 
        var Timer_PIR = setTimeout(function(){
                if(!getState("javascript.0.VIS.RolladenWZ").val && getState(ID_LUX_KUECHE) < 1)
                {//Wenn es nach 30 minuten immernoch dunkel ist.
                     setState("javascript.0.VIS.RolladenWZ",true);
                }
            },1800000); 
    }
} );*/


on({id:ID_VIS_ROLLADEN_WZ, change:'any'}, function()
{
    //sendTo('telegram', "@Torsten RolladenID ist= "+getState(ID_VIS_ROLLADEN_WZ).val);
    
    var i = 0;
    if(getState(ID_VIS_ROLLADEN_WZ).val)
    {
        
        GRP_ROLLADEN_EG.forEach(function(ID) {
            setStateDelayed(ID + ".Close", true,i*1000);
            i = i+1;
        }); 
        
    }else
    {
        GRP_ROLLADEN_EG.forEach(function(ID) {
            setStateDelayed(ID + ".Open", true,i*1000);
            i = i+1;
        }); 
    }
});


schedule('0 12 * * *', function () {
//Dachfenster West herunterfahren wenn Kühlmodus an.
    if(getState(ID_KUEHLUNG_AKTIV).val && !getState(ID_URLAUB).val && getState("daswetter.0.NextHours.Location_1.Day_1.current.clouds_value").val < 70 && getState("javascript.0.NibeUplink.System_45464.Aussentemperatur").val > 20)
    {
        setState(ID_ROLLADEN_DF_WEST_1 +".Close",true);
        setState(ID_ROLLADEN_DF_WEST_2 +".Close",true);
    }
});

schedule('30 9 * * *', function () {
//Südfenster Rolladen Zu wenn Kühlmodus an
    if(getState(ID_KUEHLUNG_AKTIV).val && !getState(ID_URLAUB).val && getState("daswetter.0.NextHours.Location_1.Day_1.current.clouds_value").val < 70 && getState("javascript.0.NibeUplink.System_45464.Aussentemperatur").val > 15)
    {
        setState(ID_ROLLADEN_WZ_SUED +".Close",true);
    }
});


function Kommen()
{
    if(isAstroDay())
    {//Tag
        if(!getState(ID_HEIZUNG_AKTIV).val)
        {//Sommermodus
  
        }
        else
        {//Wintermodus am Tag die Rolläden immer hochfahren
            //setState(ID_VIS_ROLLADEN_WZ,false);
        }
    }
}


function Gehen()
{
    if(isAstroDay())
    {
        if(!getState(ID_HEIZUNG_AKTIV).val)
        {//Sommermodus
            
        }
        else
        {//Wintermodus

        }
        
        if(getState(ID_ALARMAKTIV).val)
        {//Alarmanalge ist aktiv
            
            
        }
    
    } 
    else
    {
        
        var heute = new Date();

        if(heute.getHours() >10 && isAstroDay()){
            setState(ID_VIS_ROLLADEN_WZ,false);
        }
    }
}



