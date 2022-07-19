//=======================Nibe Monitoring=======================
const ID_SYSTEM =  ID_SYSTEM_OWN;
const ID_WM_ZH_GESAMT  = 'javascript.0.NibeUplink.System_'+ID_SYSTEM+'.'+'NibeCalc.' + PARAM_WM_ZH_GESAMT ;




// Benachrichtigung wenn die Zusatzheizung in Betrieb ist
on({id: ID_WM_ZH_GESAMT ,change:'gt'}, function(obj){
    sendTo('telegram', "Die Zusatzheizung ist in Betrieb!");
});