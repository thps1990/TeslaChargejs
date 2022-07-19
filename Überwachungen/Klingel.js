var entprell = false;

on({id:ID_DWS_KLINGEL,change:'ne'}, function(obj){
    if (!entprell)
    {
        entprell=true;
        setTimeout(function(){entprell = false},2000);
        setState(ID_TABLET_WAND_SCREEN_ON, true);
        ChangeView("Kamera");
        setTimeout(function(){
            ChangeView("Home");
            if(!(getState(ID_PIR_FLUR_TUER).val || getState(ID_PIR_FLUR_BANK).val))
            {
                setState(ID_TABLET_WAND_SCREEN_OFF, true);
            }
        },120000);
        sendTo('telegram', "Jemand hat geklingelt!");
        sendImage();
    }
});
