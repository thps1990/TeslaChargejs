        //Verbrauch
    var VERBRAUCH_Daily = parseFloat((getState("0_userdata.0.PV-Anlage.Energie_Garage_Daily").val + getState("0_userdata.0.PV-Anlage.Energie_Haus_Daily").val + getState("0_userdata.0.PV-Anlage.Energie_Netzbezug_Daily").val - getState("0_userdata.0.PV-Anlage.Energie_Einspeisung_Daily").val).toFixed(2));
    var VERBRAUCH_Monthly = parseFloat((getState("0_userdata.0.PV-Anlage.Energie_Garage_Monthly").val + getState("0_userdata.0.PV-Anlage.Energie_Haus_Monthly").val + getState("0_userdata.0.PV-Anlage.Energie_Netzbezug_Monthly").val - getState("0_userdata.0.PV-Anlage.Energie_Einspeisung_Monthly").val).toFixed(2));
    var VERBRAUCH_Yearly = parseFloat((getState("0_userdata.0.PV-Anlage.Energie_Garage_Yearly").val + getState("0_userdata.0.PV-Anlage.Energie_Haus_Yearly").val + getState("0_userdata.0.PV-Anlage.Energie_Netzbezug_Yearly").val - getState("0_userdata.0.PV-Anlage.Energie_Einspeisung_Yearly").val).toFixed(2));

    setState("0_userdata.0.PV-Anlage.Energie_Verbrauch_Daily",VERBRAUCH_Daily);   
    setState("0_userdata.0.PV-Anlage.Energie_Verbrauch_Monthly",VERBRAUCH_Monthly);  
    setState("0_userdata.0.PV-Anlage.Energie_Verbrauch_Yearly",VERBRAUCH_Yearly);  