on({id: ID_SW_TV, change: 'ne'}, function(obj){
    
    
    if(getState(ID_SW_TV).val == "on" || getState(ID_SW_TV).val === true )
    {
         setState("javascript.0.Virtuelle_Schalter.Gigablue_X3",true);
         setState("javascript.0.VIS.radio_wz",false );
         console.log(getState(ID_CURRENT_WEATHER).val);
        
         var d = new Date();

         if(getState("daswetter.0.NextHours.Location_1.Day_1.Hour_"+d.getHours()+".clouds_value").val < 30)
         {//Rolläden runter fahren wenn die Sonne rein scheint
            var d = new Date();
            if(d.getHours() < 16)
                setState(ID_ROLLADEN_WZ_SUED+ ".Close",true);
            if(d.getHours() < 2)    
                setState(ID_ROLLADEN_WZ_OST_2+ ".Close",true);
         }
         
    }else
    {
        setState("javascript.0.Virtuelle_Schalter.Gigablue_X3",false);
        
        var d = new Date();
        if(isAstroDay() && d.getHours() < 20 && !getState(ID_KUEHLUNG_AKTIV).val)
         {
            setState(ID_ROLLADEN_WZ_SUED+ ".Open",true);
            setState(ID_ROLLADEN_WZ_OST_2+ ".Open",true);
         }
    
    }
   
});