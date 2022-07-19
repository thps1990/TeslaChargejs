var Timer;//Button/ Türschalter Timer bis Warnung
var Timer2; //Timer Tür aus
var Timer_PIR; //Timer für PIR bis Warnung
var Timer_PIR_OFF; //Timer für PIR bis Aus
var IDBadewannenmodus = "0_userdata.0.Virtuelle_Schalter.bBadewannenmodus";
var iTimeout = 1800000;
var iTimeout_PIR = 60000;


function setTimerLight(bClick=false)
{//Türschalter und Button --> 30 Minuten Timeout
    if(bClick)
    {
        clearTimeout(Timer_PIR);  
        setState("javascript.0.VIS.bewegungsmelder_bad"/*bewegungsmelder_bad*/, false);
        setStateDelayed("javascript.0.VIS.bewegungsmelder_bad"/*bewegungsmelder_bad*/, true, iTimeout);
    }
    
    if((!getState(ID_LIGHTYL_BAD + ".power").val || getState(ID_LIGHTYL_BAD + ".ct").val == 6500  ) && (getState(ID_LUX_Bad).val < 50 || !isAstroDay() || bClick ||  getState(ID_LIGHTYL_BAD + ".power").val))
    {
       // console.writeline("bluubb");
        setState(ID_LIGHTYL_BAD + ".power",true);
        setState("javascript.0.VIS.radio_bad", true);
        if(getState(ID_LIGHTYL_BAD + ".active_bright").val != 5)
        {
            setState(ID_LIGHTYL_BAD + ".active_bright",2);
        }
        if(getState(ID_LIGHTYL_BAD + ".ct").val != 4000)
        {
            setState(ID_LIGHTYL_BAD + ".ct",4000);
        }
        
        
        Timer= setTimeout(function(){
                setState(ID_LIGHTYL_BAD + ".ct",6500);
                //log("Licht Bad Warnung");
                setState(ID_ALEXA_BAD_SPEAK,"Das Licht geht gleich aus. Einmal winken bitte.");
            
                Timer2 = setTimeout(function(){
                    setState(ID_LIGHTYL_BAD + ".power",false);
                    setState("javascript.0.VIS.radio_bad", false);
                    
                    //log("Licht Bad aus durch Timer");

                },30000);

        }, iTimeout-30000);
        
    }
    
}
on({id: ID_BTN_BAD + ".long_click",val: true}, function(obj){
    if(!getState(IDBadewannenmodus).val )
    {
        sendTo('telegram', "@Torsten Badewannenmodus aktiviert");
        setState(ID_ALEXA_BAD_SPEAK,"Badewannenmodus für 2 Stunden aktiviert");
        setState(IDBadewannenmodus,true);
        setStateDelayed(IDBadewannenmodus,false,3600000);
        setState(ID_LIGHTYL_BAD + ".power",true); 
        setState(ID_LIGHTYL_BAD + ".active_bright",1);
        setState(ID_LIGHTYL_BAD + ".ct",2700);
    }
    else
    {
        sendTo('telegram', "@Torsten Badewannenmodus deaktiviert");
        setState(ID_ALEXA_BAD_SPEAK,"Badewannenmodus deaktiviert");
        setState(IDBadewannenmodus,false);
    }
});

on({id: ID_BTN_BAD + ".click"/*Simple click*/,val: true}, function(obj){
    
    if(getState(ID_LIGHTYL_BAD + ".power").val)
    {
    
        if(getState(ID_LIGHTYL_BAD + ".ct").val == 6500 )
        {
            clearTimeout(Timer2);  
            setTimerLight(true);
        }
        else
        {
            setState(ID_LIGHTYL_BAD + ".power",false);
            setState("javascript.0.VIS.radio_bad", false);
            log("Licht Bad aus durch Button");
            clearTimeout(Timer);
        }
    }
    else
    {
        setTimerLight(true);
    }
});




on({id: GRP_PIR_BAD,change: 'ne'}, function(obj){

    if(getState("javascript.0.VIS.bewegungsmelder_bad").val && !getState(ID_URLAUB).val && !getState(IDBadewannenmodus).val)
    { 

        if((getState(ID_PIR_BAD_1).val || getState(ID_PIR_BAD_2).val || getState(ID_PIR_BAD_3).val) && (getState(ID_LUX_Bad).val < 50 || !isAstroDay()))   
        {
            clearTimeout(Timer2); 
            clearTimeout(Timer_PIR_OFF); 
            clearTimeout(Timer_PIR); 
            

            if(!getState(ID_LIGHTYL_BAD + ".power").val)
            {
                setState(ID_LIGHTYL_BAD + ".power",true);
                setState("javascript.0.VIS.radio_bad", true);
            }
            
            if(getState(ID_LIGHTYL_BAD + ".ct").val != 4000)
            {
                //log("Set CT to 4000")
                setState(ID_LIGHTYL_BAD + ".ct",4000);
            }
        }
        
        if(!getState(ID_PIR_BAD_1).val && !getState(ID_PIR_BAD_2).val && !getState(ID_PIR_BAD_3).val)
        {
            if(getState(ID_LIGHTYL_BAD + ".power").val)
            {
                Timer_PIR = setTimeout(function(){
                    setState(ID_LIGHTYL_BAD + ".ct",6500);
                    setState(ID_ALEXA_BAD_SPEAK,"Das Licht geht gleich aus. Einmal winken bitte.");
                    Timer_PIR_OFF = setTimeout(function(){
                        setState(ID_LIGHTYL_BAD + ".ct",4000);
                        setStateDelayed(ID_LIGHTYL_BAD + ".power",false,1000);
                        setState("javascript.0.VIS.radio_bad", false);
                        

                    },10000);
                },iTimeout_PIR);
            } 
        }
    }
});

