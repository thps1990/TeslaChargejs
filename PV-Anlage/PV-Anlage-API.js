on({id: "parser.0.CurrentPowerFlow" , change: 'ne'}, function(obj){ 
 var RawString = getState("parser.0.CurrentPowerFlow").val;


  //============Battery Charge Status================
  var startPointSpan = RawString.search("chargeLevel") + 13;    
  var data = RawString.substring(startPointSpan, startPointSpan+ 3);
  data = data.replace(",","");
  setState(ID_PV_AKKUSTAND,parseInt(data));

  //=============Status Batterie ====================
    startPointSpan = RawString.search('STORAGE":{"status":"') + 20;
    data = RawString.substring(startPointSpan, startPointSpan+ 11);

    data = data.replace('","',"");
    data = data.replace('",',"");
    data = data.replace('"',"");
    data = data.replace('curr',"");
    setState(ID_PV_AKKU_STATUS,data);
     
  //=============Leistungsabgabe/Aufnahme Batterie  
startPointSpan = RawString.search('STORAGE":{"status":"') + 20;
    data = startPointSpan = RawString.search("chargeLevel") - 6;  
    data = RawString.substring(startPointSpan, startPointSpan+ 4);
    
    data = data.replace(':',"");
    data = parseFloat(data);
    if(getState(ID_PV_AKKU_STATUS).val== "Discharging")
    {
        data = data * (-1);
    }
 
    setState(ID_PV_AKKU_LEISTUNG,parseInt(data * 1000));

});