
on({id: GRP_PIR_FLUR ,change:'ne'}, function(obj){
    if((getState(ID_PIR_FLUR_TUER).val || getState(ID_PIR_FLUR_BANK).val) && getState(ID_ANWESENHEIT).val && !getState(ID_URLAUB).val)
    {
        setState(ID_TABLET_WAND_SCREEN_ON,true);
    }
    else
    {
        setState(ID_TABLET_WAND_SCREEN_OFF,true);
    }
});

schedule("0 23 * * *", function () {//Ein mal am Tag wird das VIS aktualisiert.
    setState(ID_TABLET_WAND_LOADSTARTURL,true);
    setStateDelayed(ID_TABLET_WAND_SCREEN_OFF,true,20000);

});