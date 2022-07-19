var Aussentemperatur = "javascript.0.NibeUplink.System_45464.Aussentemperatur";
var Raumtemperatur = "javascript.0.NibeUplink.System_45464.Raumtemperatur"

var IDS = [Aussentemperatur,Raumtemperatur]
on({id:ID_KUEHLUNG_AKTIV, val:false}, function(obj){
   if(getState("javascript.0.VIS.Lueftung_manuel_control").val == false)
   {
        setState(ID_LUEFTUNG_NORMAL,true);
   }
})

on({id:IDS ,change: 'ne'}, function(obj){
   if(getState(ID_KUEHLUNG_AKTIV).val && getState("javascript.0.VIS.Lueftung_manuel_control").val == false )
   {
       
        var diff = getState(Raumtemperatur).val - getState(Aussentemperatur).val;

        if(diff > 2 && !getState(ID_LUEFTUNG_HOCH).val)
        {//Voll lüften
        console.log("Voll Lüften");
                setState(ID_LUEFTUNG_HOCH, true);
        }else if(diff < -1 && !getState(ID_LUEFTUNG_AUS).val )
        { //Lüftung aus
            setState(ID_LUEFTUNG_AUS,true);

        }else if(!getState(ID_LUEFTUNG_NORMAL).val && diff <=2 && diff >=-1)
        {

            setState(ID_LUEFTUNG_NORMAL,true);
        }
  }
});