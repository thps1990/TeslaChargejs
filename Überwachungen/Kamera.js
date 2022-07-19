var entprell=false;




on({id:ID_CAM_GARTENHAUS_MOTION_DETECTED,val: true}, function(obj){
    if( getState(ID_ANWESENHEIT).val && !getState(ID_SCHLAFEN).val) 
    {
            setState(ID_TABLET_WAND_SCREEN_ON, true);
            ChangeView("Kamera");
            setTimeout(function(){
                ChangeView("Home");
                if(!(getState(ID_PIR_FLUR_TUER).val || getState(ID_PIR_FLUR_BANK).val))
                {
                    setState(ID_TABLET_WAND_SCREEN_OFF, true);
                }
            },120000);
    }
    else if(!entprell)
    {
        entprell=true;
        setTimeout(function(){entprell = false},300000); //Maximal 1 Benachrichtigung pro 5 MInuten

        sendImage();
        sendTo('telegram', "Bewegung erkannt");
    }
});
