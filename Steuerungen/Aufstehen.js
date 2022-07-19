
on({id:GRP_PIR_BAD ,val: true}, function(obj){
   var heute = new Date();

   if(  ((heute.getHours() >= 6 && heute.getMinutes() >=30)||heute.getHours() >= 7) && heute.getHours() < 10 && getState(ID_SCHLAFEN).val && !getState(ID_URLAUB).val ){
       console.log("Aufstehen getriggert");
       setStateDelayed(ID_SCHLAFEN, false,1000);
       setStateDelayed(ID_ALEXA_BAD_SPEAK,"Die Aussentemperatur beträgt "+ getState("javascript.0.NibeUplink.System_45464.Aussentemperatur").val +" Grad", 50000) ;
       setStateDelayed(ID_ALEXA_BAD_GOODMORNING,true,10000);
       setState("javascript.0.VIS.anwesenheitserkennung",true);

      
       if(!getState(ID_KUEHLUNG_AKTIV).val)
       {
           var i =0;
            GRP_ROLLADEN_ALLE.forEach(function(ID) {
                setStateDelayed(ID + ".Open", true,i*1000);
                i = i+1;
            }); 
       }else if(getState(ID_KUEHLUNG_AKTIV).val)
       {
            var i =0;
            GRP_ROLLADEN_KUEHLUNG.forEach(function(ID) {
                setStateDelayed(ID + ".Open", true,i*1000);
                i = i+1;
            }); 

            // Die Ostfenster nur wenig öffnen
            GRP_ROLLADEN_KUEHLUNG_2.forEach(function(ID) {
                setStateDelayed(ID + ".Open", true,i*1000);
                setStateDelayed(ID + ".Pause", true,5000 + (i*1000));
                i = i+1;
            }); 

       }
   }
});