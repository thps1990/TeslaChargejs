


on({id: ID_BTN_LADESTATION +  ".click" , val:true}, function(obj){
    if(getState("javascript.0.Go-E.State").val == 0) //Auto nicht dran
    {// Kein Kabel angeschlossen, Chargeport öffnen
        if(getState(ID_TESLA_CHARGEPORT_OPEN).val)
        {
            setState(ID_TESLA_CMD_CHARGEPORT_CLOSE,true);
        }else
        {
            setState(ID_TESLA_CMD_CHARGEPORT_OPEN,true);
            setStateDelayed(ID_TESLA_CMD_CHARGE_START, true, 10000);
        }
    }else
    {// Ladung abbrechen, chargeport freigeben
        if (getState(ID_TESLA_STATE).val ="asleep" )
        {//Auto schläft; vorher wecken
            setState(ID_TESLA_CMD_WAKEUP,true);
            setStateDelayed(ID_TESLA_CMD_CHARGE_STOP, false,5000);
            setStateDelayed(ID_TESLA_CMD_CHARGEPORT_OPEN, true,7000);   
        }
        else
        {
            setStateDelayed(ID_TESLA_CMD_CHARGEPORT_OPEN, true);
        }
            

        


    }
});  