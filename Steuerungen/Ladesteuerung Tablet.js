


schedule('*/30 * * * *', function () {
    if(getState(ID_TABLET_WAND_BATTLVL).val < 40)
    {
        setState(ID_SW_CHARGE_TABLET, true);
    }
    else if(getState(ID_TABLET_WAND_BATTLVL).val > 60)
    {
        setState(ID_SW_CHARGE_TABLET, false);
    }
});

