on({id:ID_TESLA_BATTERY_HEATER,change: 'ne'}, function(obj){
    if(getState(ID_TESLA_BATTERY_HEATER).val)
    {
      setState("javascript.0.Tesla.battery_heater",1);
    }
    else
    {
       setState("javascript.0.Tesla.battery_heater",0);
    }
});

on({id:ID_TESLA_IS_AUTOCONDITIONING,change: 'ne'}, function(obj){
    if(getState(ID_TESLA_IS_AUTOCONDITIONING).val)
    {
      setState("0_userdata.0.Tesla.isAutoConditionOn",1);
    }
    else
    {
       setState("0_userdata.0.Tesla.isAutoConditionOn",0);
    }
});


on({id:ID_TESLA_POWER,change: 'ne'}, function(obj){
    var power= getState(ID_TESLA_POWER).val;

    if(power > 0) 
    {
        if(power > getState("0_userdata.0.Tesla.MaxDischarge").val)
        {
            setState("0_userdata.0.Tesla.MaxDischarge",power);
        }
    }else
    {
        if((power*-1) > getState("0_userdata.0.Tesla.MaxCharge").val)
        {
            setState("0_userdata.0.Tesla.MaxCharge",power*-1);
        }
    }
});

on({id:ID_TESLA_SPEED,change: 'ne'}, function(obj){
    var speed= getState(ID_TESLA_SPEED).val;

    if(speed > 0) 
    {
        if(speed > getState("0_userdata.0.Tesla.MaxSpeed").val)
        {
            setState("0_userdata.0.Tesla.MaxSpeed",speed);
        }
    }
});


on({id:ID_TESLA_EST_RANGE,change: 'ne'}, function(obj){
    //Berechnung Maximale erwartete Reichweite
    var estRange= getState(ID_TESLA_EST_RANGE).val;
    var soc= getState(ID_TESLA_SOC).val;
    setState("0_userdata.0.Tesla.EstimatedMaxRange", ((estRange / soc)*100).toFixed(0));
    setState("0_userdata.0.Tesla.AvgConsumption", (((soc*77.8)/estRange)*10).toFixed(0) );
});

on({id:ID_TESLA_MINUTES_TO_FULL,change: 'ne'}, function(obj){
    //Stunden und Minuten bis Volle Ladung
    var minutestofull= getState(ID_TESLA_MINUTES_TO_FULL).val;
    var hourstofull = (minutestofull / 60).toFixed(1);

    //console.log(minutestofull+ " - " + hourstofull);
    setState("0_userdata.0.Tesla.HoursToFullCharge", hourstofull);
});

