//Globals
var timer_running = false;

//==================Wetterprognose=======================================
function Wetterprognose()
{
    var d = new Date(); 
    if(d.getHours() > 6 && d.getHours() < 21 )
    {
        var Stunde1= "daswetter.0.NextHours.Location_1.Day_1.Hour_"+(d.getHours()+1)+".clouds_value";
        var Stunde2= "daswetter.0.NextHours.Location_1.Day_1.Hour_"+(d.getHours()+2)+".clouds_value";
        if(getState(Stunde1).val < 70 && getState(Stunde2).val < 70 )
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    else
    {
        return false;
    }
}

function SoC_Time_check(Akkustand)
{//Prüfen ob Akkustand zur Uhrzeit passt
   var d = new Date(); 
    if(d.getHours() < 11 && Akkustand >35)
    {
        return true;
    }else if(d.getHours() < 12 && Akkustand > 50 )
    {
        return true;
    }else if(d.getHours() < 15 && Akkustand > 70)
    {
        return true;
    }
    else if(d.getHours() < 18 && Akkustand > 85)
    {
        return true;
    }else if(Akkustand > 70)
    {
        return true;
    }else
    {
        return false;
    }

}
//===================Abdeckungsprüfung==================================
function PV_Abdeckung()
{
    
    var Akkustand = getState(ID_PV_AKKUSTAND).val;
    var PV_Leistung = getState(ID_PV_GESAMT_LEISTUNG).val;
    
    if(getState(ID_URLAUB).val)
        return false;

    if((Akkustand > 15 && PV_Leistung > 550 ) || Akkustand >  90)
    {
        return true;
    }else
    {
       
        return false;
    }
    


}
//====================Ueberschussprüfung================================
function Ueberschuss()
{// Funktion zum Ermitteln ob Überschuss vorhanden
    var Akkustand = getState(ID_PV_AKKUSTAND).val;
    var PV_Status = getState(ID_PV_AKKU_STATUS).val ;
    var d = new Date(); 
    var PV_Leistung = getState(ID_PV_GESAMT_LEISTUNG).val;

    if(getState(ID_URLAUB).val)
        return false;

    // console.log("Überschuss?");
    if((d.getHours() >= 8 && d.getMinutes() >= 30) || d.getHours() > 8 )
    {
      
        if(PV_Leistung > 1400  || Akkustand > 70)
        {
            
            if((PV_Status == "Laden" && d.getHours() < getAstroDate("sunset").getHours() && getState(ID_PV_AKKU_LEISTUNG).val > 300 && Wetterprognose())|| (PV_Status == "Entladen" && d.getHours() < getAstroDate("sunset").getHours() && getState(ID_PV_AKKU_LEISTUNG).val < 500 && Wetterprognose()) || (Akkustand > 94 && d.getHours() < getAstroDate("sunset").getHours()) )
            {// Überschuss könnte da sein
               // console.log("Überschussda!: " +SoC_Time_check(Akkustand));
                return SoC_Time_check(Akkustand);
            }else
            {//Kein Überschuss
                return false;
            }
        }
        else
        {
            return false;
        }
    }
    else
    {
        return false;
    }
}


//=========================Steuerung Überschus-Schaltsteckdose=================================
var trigger= [ID_PV_UEBERSCHUSS,ID_ALIVE_UEBERSCHUSS];

/*on({id: trigger , change: 'ne'}, function(obj){ 
    var Timer = setTimeout(function(){
        if(getState(ID_PV_UEBERSCHUSS).val &&getState(ID_ALIVE_UEBERSCHUSS).val )
        { 
            setState(ID_SW_UEBERSCHUSS,true);
        }else if(!getState(ID_PV_UEBERSCHUSS).val &&getState(ID_ALIVE_UEBERSCHUSS).val )
        {
            setState(ID_SW_UEBERSCHUSS,false);
        }
    },2000);
});*/

//================Überschusstrigger=======================================
trigger= [ID_PV_AKKUSTAND,ID_PV_HAUSVERBRAUCH_LEISTUNG,ID_PV_GESAMT_LEISTUNG]
on({id: trigger, change:'ne'},function(obj){ 
    var Akkustand = getState(ID_PV_AKKUSTAND).val;
   //console.log(PV_Abdeckung());    
   if(PV_Abdeckung())
   {

        if(Ueberschuss() && !timer_running)
        {
            
            timer_running = true;
            var timer = setTimeout(function(){
                timer_running = false;
                // Nach 5 Minuten prüfen ob immernoch ÜBerschuss da
                if(Ueberschuss())
                {
                    setState(ID_PV_ABDECKUNG,false)
                    setStateDelayed(ID_PV_UEBERSCHUSS,true,5000);
                }
            },300000);
        }else if(!timer_running)
        {
            timer_running = true;
            var Akkustand_old= Akkustand;
            var timer = setTimeout(function(){
                timer_running = false;
                
                
                // Nach 5 Minuten prüfen ob immernoch kein ÜBerschuss da
                if(!Ueberschuss())
                {
                    setState(ID_PV_UEBERSCHUSS,false);
                    if(PV_Abdeckung())
                    {
                        setStateDelayed(ID_PV_ABDECKUNG,true,5000);
                    }
                }
            },600000);
            
        }
    }
   else if(!timer_running)
   {
        timer_running = true;
        var timer = setTimeout(function(){
        // Nach 3 Minuten prüfen ob PV-Abdeckung immernoch weg...
            if(!PV_Abdeckung())
            {
                setState(ID_PV_ABDECKUNG,false);
            }
            timer_running = false;
        },300000);
   }
});

on({id:ID_PV_ABDECKUNG,change:'ne'},function(){
    if(getState(ID_PV_ABDECKUNG).val)
    {
        //setState(ID_SW_POOLPUMPE,true);
        setState("javascript.0.VIS.Nibe_SmartGridRueckstellzeit",0);
        setState("javascript.0.NibeUplink.System_45464.NibeControl.Ueberschuss_01",true);
    }
    else
    {
        setState("javascript.0.NibeUplink.System_45464.NibeControl.Ueberschuss_01",false);
    }
    sendTo('telegram', "@Torsten PV-Abdeckung =" + getState(ID_PV_ABDECKUNG).val);
});

trigger= [ID_PV_AKKUSTAND,ID_PV_UEBERSCHUSS]; 

on({id:trigger,change:'ne'},function(){

    if(getState(ID_PV_UEBERSCHUSS).val)
    {
        if(getState(ID_PV_AKKUSTAND).val > 90)
        {
            setState("javascript.0.VIS.Nibe_SmartGridRueckstellzeit",0);
            setState("javascript.0.NibeUplink.System_45464.NibeControl.Ueberschuss_02",true);
        }
    }
    else
    {
        setState("javascript.0.NibeUplink.System_45464.NibeControl.Ueberschuss_02",false);
    }
    //sendTo('telegram', "@Torsten PV-Überschuss =" + getState(ID_PV_UEBERSCHUSS).val);
});