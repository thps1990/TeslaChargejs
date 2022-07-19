
//Heute Gereinigt Variable zurücksetzen
schedule("0 23 * * *", function () {
    setState("javascript.0.Globale_Variablen.bHeuteGereinigt"/*bHeuteGereinigt*/,0);
    setState("javascript.0.VIS.clean_today",true);
    setState("javascript.0.Globale_Variablen.bBumbeeVoll",false);
    
    setState("javascript.0.Globale_Variablen.bBriefkasten_voll",false);
    setState("0_userdata.0.Virtuelle_Schalter.bTessaNachtischlampeSteuerung", true);
    setState("javascript.0.Virtuelle_Schalter.bLowBattery",false);

    //PVÜberschuss Werte täglich zurücksetzen
    setState("0_userdata.0.Tesla.PV_energy_added_monthly",getState("0_userdata.0.Tesla.PV_energy_added_monthly").val + getState("0_userdata.0.Tesla.PV_energy_added_daily").val);
    setState("0_userdata.0.Tesla.PV_energy_added_daily",0);
});

//Schlafen-Variable zurücksetzen

schedule("0 9 * * *", function () {
    setState(ID_SCHLAFEN,false);
    setState("javascript.0.VIS.anwesenheitserkennung",true); //Anwesenheitserkennung wieder einschalten
    
});


schedule('0 0 1 * *', function () {

    //PV-Überschuss Monatswert und Jahreswert addieren zurücksetzen
    setState("0_userdata.0.Tesla.PV_energy_added_yearly", getState("0_userdata.0.Tesla.PV_energy_added_yearly").val + getState("0_userdata.0.Tesla.PV_energy_added_monthly").val);
    setState("0_userdata.0.Tesla.PV_energy_added_monthly",0);
    //Monatlichen Verbrauchswert der WP zurücksetzen
    setState(ID_MONTHLY_USAGE_WP, 0);
});

schedule('0 8 1 1 *', function () {
    //Jährlichen Verbrauchswert der WP + Hausstrom am 27.01. zurücksetzen
    setState(ID_YEARLY_COUNT_WM_BW, getState(ID_WM_BW).val);
    setState(ID_YEARLY_COUNT_WM_HZ, getState(ID_WM_HZ).val);
    setState(ID_YEARLY_USAGE_WP, 0);

    //PV Jahreswert zurücksetzen
    setState("0_userdata.0.Tesla.PV_energy_added_yearly",0);
});




