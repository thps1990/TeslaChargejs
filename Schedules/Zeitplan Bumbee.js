var bHeuteGereinigt = getState("javascript.0.Globale_Variablen.bHeuteGereinigt"/*bHeuteGereinigt*/).val;
var bAnwesenheit = getState("javascript.0.Globale_Variablen.bAnwesenheit"/*bAnwesenheit*/).val;
//dfsd

 



schedule("*/10 7-16 * * *", function () {

    if(!getState(ID_ANWESENHEIT).val && getState("javascript.0.Globale_Variablen.bHeuteGereinigt").val < 10 && getState("javascript.0.VIS.clean_today").val && !getState(ID_URLAUB).val)
    {
        setState("mihome-vacuum.0.control.clean_home"/*Start/Home*/, true);
        setState("javascript.0.Globale_Variablen.bHeuteGereinigt"/*bHeuteGereinigt*/, "10");
    }
});
  
on({id: "mihome-vacuum.0.info.state", change: 'ne'}, function(obj){
    
    if(getState("javascript.0.Globale_Variablen.bHeuteGereinigt").val == 10 && (getState("mihome-vacuum.0.info.state").val == 6 || getState("mihome-vacuum.0.info.state").val == 8))
    {
        setState("javascript.0.Globale_Variablen.bHeuteGereinigt"/*bHeuteGereinigt*/, "11");
         setState("javascript.0.VIS.clean_today",false);
        sendTo('telegram', 'Bumbee hat ' + getState("mihome-vacuum.0.info.cleanedarea").val + ' m² in ' + getState("mihome-vacuum.0.info.cleanedtime").val  + ' Minuten gereinigt und fährt mit ' + getState("mihome-vacuum.0.info.battery").val +'% Akku zurück zum Dock' );
        
    }

});