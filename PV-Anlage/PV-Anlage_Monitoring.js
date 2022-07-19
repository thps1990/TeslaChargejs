
//=======================Übertrag Akkustand========================
on({id: ID_PVMB_AKKUSTAND , change: 'ne'}, function(obj){ 
    setState(ID_PV_AKKUSTAND, getState(ID_PVMB_AKKUSTAND).val);
});

//========================Übertrag Akkuleistung====================
on({id: ID_PVMB_AKKU_LEISTUNG , change: 'ne'}, function(obj){ 
    var Leistung= getState(ID_PVMB_AKKU_LEISTUNG).val;

    if(Leistung < 0)
    {
        Leistung = Leistung * -1;
    }

    setState(ID_PV_AKKU_LEISTUNG,Leistung);
});

//========================Übertrag Akku-Status
on({id: ID_PVMB_AKKU_STATUS , change: 'ne'}, function(obj){ 
    var Status= getState(ID_PVMB_AKKU_STATUS).val;

    if(Status == 1)
    {
        setState(ID_PV_AKKU_STATUS,"Standby2");
    }else if(Status == 3)
    {
        setState(ID_PV_AKKU_STATUS,"Laden");
    }else if(Status == 4)
    {
        setState(ID_PV_AKKU_STATUS,"Entladen");
    }else if(Status == 6)
    {
        setState(ID_PV_AKKU_STATUS,"Standby");
    }
});

//========================Berechnung PV Eigenproduktionsleistung=======
on({id: ID_PVMB_EP_LEISTUNG , change: 'ne'}, function(obj){ 
   var timer=setTimeout(function(){
       var Leistung_Eigenproduktion = Math.floor(getState(ID_PVMB_EP_LEISTUNG).val/Math.pow(10,getState(ID_PVMB_EP_LEISTUNG_SF).val*-1));
        if(getState(ID_PVMB_EP_LEISTUNG).val >= 0)
        {
                setState(ID_PV_EIGENVERBRAUCH_LEISTUNG,Leistung_Eigenproduktion + getState(ID_PV_GARAGE_LEISTUNG).val);
        }   
        else
        {
            setState(ID_PV_EIGENVERBRAUCH_LEISTUNG,Math.floor(getState(ID_PW_PV_ANLAGE).val));
        }
   },1000);
});

 
//========================Berechnung Netzbezug====================

on({id: ID_PVMB_EINSPEISUNG_LEISTUNG , change: 'ne'}, function(obj){ 
   var timer=setTimeout(function(){
        if(getState(ID_PVMB_EINSPEISUNG_LEISTUNG).val < 0)
        {//
            setState(ID_PV_NETZEINSPEISUNG_LEISTUNG,0);
            setState(ID_PV_NETZBEZUG_LEISTUNG,(-1)* (getState(ID_PVMB_EINSPEISUNG_LEISTUNG).val/Math.pow(10,getState(ID_PVMB_EINSPEISUNG_LEISTUNG_SF).val*(-1))));  
        }  
        else
        {
            setState(ID_PV_NETZBEZUG_LEISTUNG,0);
            setState(ID_PV_NETZEINSPEISUNG_LEISTUNG,(getState(ID_PVMB_EINSPEISUNG_LEISTUNG).val/Math.pow(10,getState(ID_PVMB_EINSPEISUNG_LEISTUNG_SF).val*(-1))));
        }
   },1000);
});

//======================Berechnung Hausverbrauch und PV-Leistung====================
var trigger = [ID_PV_NETZBEZUG_LEISTUNG,ID_PV_EIGENVERBRAUCH_LEISTUNG,ID_PV_AKKU_LEISTUNG];

on({id: trigger , change: 'ne'}, function(obj){ 
    var Netzbezug= getState(ID_PV_NETZBEZUG_LEISTUNG).val;
    var Akkuleistung = getState(ID_PV_AKKU_LEISTUNG).val;
    var Eigenverbrauch = getState(ID_PV_EIGENVERBRAUCH_LEISTUNG).val;
    var Netzeinspeisung = getState(ID_PV_NETZEINSPEISUNG_LEISTUNG).val;
    var Akkustatus= getState(ID_PVMB_AKKU_STATUS).val;
       
    
    //=====================Berechnung PV-Leistung===========================
    var Leistung_PVProduktion;
    if(Akkustatus == 4)
    {//Entladen
        Leistung_PVProduktion=  Eigenverbrauch - getState(ID_PV_GARAGE_LEISTUNG).val - Akkuleistung ;
    }
    else if(Eigenverbrauch > 0)
    {//Laden
        Leistung_PVProduktion=  Eigenverbrauch - getState(ID_PV_GARAGE_LEISTUNG).val + Akkuleistung ;
    }else
    {
        Leistung_PVProduktion =0;
    }
    
    if(Leistung_PVProduktion < 0)
    {
        Leistung_PVProduktion = 0;
    }

   //================Berechnung Hausverbrauch
    var Leistung_Hausverbrauch 

    if(Eigenverbrauch != 0 )
    {
        if(Leistung_PVProduktion == 0)
        {
            Leistung_Hausverbrauch = Akkuleistung + Netzbezug + getState(ID_PW_PV_ANLAGE).val - Netzeinspeisung;
        }else
        {
            Leistung_Hausverbrauch = Netzbezug + Eigenverbrauch  - Netzeinspeisung;
        }
        

    }else
    {
        Leistung_Hausverbrauch = Netzbezug -  Netzeinspeisung + Akkuleistung + getState(ID_PW_PV_ANLAGE).val ;
    }
    
    setState(ID_PV_PRODUKTION_LEISTUNG, parseInt(Leistung_PVProduktion));
    setState(ID_PV_HAUSVERBRAUCH_LEISTUNG,Leistung_Hausverbrauch.toFixed(0));
});

//Berechnung PV-Eigenverbrauch
on({id: ID_PV_PRODUKTION_LEISTUNG , change: 'ne'}, function(obj){ 
    var PVProduktion = getState(ID_PV_PRODUKTION_LEISTUNG).val;
    var Akkuleistung = getState(ID_PV_AKKU_LEISTUNG).val;
    var Akkustatus  = getState(ID_PVMB_AKKU_STATUS).val;
    //var Netzeinspeisung = getState(ID_PV_NETZEINSPEISUNG_LEISTUNG).val;
    var EigenverbrauchPV ;

    if(Akkustatus  != 3)
    {
        Akkuleistung = 0;
    }  
    EigenverbrauchPV= PVProduktion - Akkuleistung + getState(ID_PV_GARAGE_LEISTUNG).val;

    setState(ID_PV_EIGENVERBRAUCH_AUS_PV,parseInt(EigenverbrauchPV));
});

//Leistung Garage
on({id: ID_PW_PV_ANLAGE , change: 'ne'}, function(obj){
    setState(ID_PV_GARAGE_LEISTUNG,Math.floor(getState(ID_PW_PV_ANLAGE).val));
}); 

//Gesamtleistung
on({id: ID_PV_PRODUKTION_LEISTUNG , change: 'ne'}, function(obj){ 
    setState(ID_PV_GESAMT_LEISTUNG,getState(ID_PV_PRODUKTION_LEISTUNG).val + getState(ID_PV_GARAGE_LEISTUNG).val);
});

//Berechnung Energie Garagen-PV + Haus
//========================================
schedule('30,59 * * * *', function () 
{//jede Stunde; Energy berechnen PV Garage
    // Garage
    var Differenz_PVGARAGE = parseFloat(((getState(ID_EN_PV_ANLAGE).val - getState("0_userdata.0.PV-Anlage.Energie_Garage_alt").val)/1000).toFixed(2)); 
    console.log("Differenz PV-Garage= " +Differenz_PVGARAGE );
    setState("0_userdata.0.PV-Anlage.Energie_Garage_Daily",parseFloat((getState("0_userdata.0.PV-Anlage.Energie_Garage_Daily").val + Differenz_PVGARAGE).toFixed(2)));   
    setState("0_userdata.0.PV-Anlage.Energie_Garage_Monthly",parseFloat((getState("0_userdata.0.PV-Anlage.Energie_Garage_Monthly").val + Differenz_PVGARAGE).toFixed(2)));  
    setState("0_userdata.0.PV-Anlage.Energie_Garage_Yearly",parseFloat((getState("0_userdata.0.PV-Anlage.Energie_Garage_Yearly").val + Differenz_PVGARAGE).toFixed(2)));    
    setStateDelayed("0_userdata.0.PV-Anlage.Energie_Garage_alt",  getState(ID_EN_PV_ANLAGE).val,1000 ); 

    //Haus
    var Differenz_PVHAUS = parseFloat((getState(ID_PVMB_ENERGIE_TOTAL).val - getState("0_userdata.0.PV-Anlage.Energie_Haus_alt").val).toFixed(2));

    setState("0_userdata.0.PV-Anlage.Energie_Haus_Daily",parseFloat((getState("0_userdata.0.PV-Anlage.Energie_Haus_Daily").val + Differenz_PVHAUS).toFixed(2)));   
    setState("0_userdata.0.PV-Anlage.Energie_Haus_Monthly",parseFloat((getState("0_userdata.0.PV-Anlage.Energie_Haus_Monthly").val + Differenz_PVHAUS).toFixed(2)));  
    setState("0_userdata.0.PV-Anlage.Energie_Haus_Yearly",parseFloat((getState("0_userdata.0.PV-Anlage.Energie_Haus_Yearly").val + Differenz_PVHAUS).toFixed(2)));    
    setStateDelayed("0_userdata.0.PV-Anlage.Energie_Haus_alt",  getState(ID_PVMB_ENERGIE_TOTAL).val,1000 ); 

    //Netzbezug
    var Differenz_NETZBEZUG = parseFloat((getState(ID_PVMB_NETZBEZUG_TOTAL).val - getState("0_userdata.0.PV-Anlage.Energie_Netzbezug_alt").val).toFixed(2));

    setState("0_userdata.0.PV-Anlage.Energie_Netzbezug_Daily",parseFloat((getState("0_userdata.0.PV-Anlage.Energie_Netzbezug_Daily").val + Differenz_NETZBEZUG).toFixed(2)));   
    setState("0_userdata.0.PV-Anlage.Energie_Netzbezug_Monthly",parseFloat((getState("0_userdata.0.PV-Anlage.Energie_Netzbezug_Monthly").val + Differenz_NETZBEZUG).toFixed(2)));  
    setState("0_userdata.0.PV-Anlage.Energie_Netzbezug_Yearly",parseFloat((getState("0_userdata.0.PV-Anlage.Energie_Netzbezug_Yearly").val + Differenz_NETZBEZUG).toFixed(2)));    
    setStateDelayed("0_userdata.0.PV-Anlage.Energie_Netzbezug_alt",  getState(ID_PVMB_NETZBEZUG_TOTAL).val,1000 ); 

    //Einspeisung
    var Differenz_EINSPEISUNG = parseFloat((getState(ID_PVMB_EINSPEISUNG_TOTAL).val - getState("0_userdata.0.PV-Anlage.Energie_Einspeisung_alt").val).toFixed(2));


    setState("0_userdata.0.PV-Anlage.Energie_Einspeisung_Daily",parseFloat((getState("0_userdata.0.PV-Anlage.Energie_Einspeisung_Daily").val + Differenz_EINSPEISUNG).toFixed(2)));   
    setState("0_userdata.0.PV-Anlage.Energie_Einspeisung_Monthly",parseFloat((getState("0_userdata.0.PV-Anlage.Energie_Einspeisung_Monthly").val + Differenz_EINSPEISUNG).toFixed(2)));  
    setState("0_userdata.0.PV-Anlage.Energie_Einspeisung_Yearly",parseFloat((getState("0_userdata.0.PV-Anlage.Energie_Einspeisung_Yearly").val + Differenz_EINSPEISUNG).toFixed(2)));    
    setStateDelayed("0_userdata.0.PV-Anlage.Energie_Einspeisung_alt",  getState(ID_PVMB_EINSPEISUNG_TOTAL).val,1000 ); 

    //Reine Berechnungen verzögern
     setTimeout(function(){
        //Verbrauch
        var VERBRAUCH_Daily = parseFloat((getState("0_userdata.0.PV-Anlage.Energie_Garage_Daily").val + getState("0_userdata.0.PV-Anlage.Energie_Haus_Daily").val + getState("0_userdata.0.PV-Anlage.Energie_Netzbezug_Daily").val - getState("0_userdata.0.PV-Anlage.Energie_Einspeisung_Daily").val).toFixed(2));
        var VERBRAUCH_Monthly = parseFloat((getState("0_userdata.0.PV-Anlage.Energie_Garage_Monthly").val + getState("0_userdata.0.PV-Anlage.Energie_Haus_Monthly").val + getState("0_userdata.0.PV-Anlage.Energie_Netzbezug_Monthly").val - getState("0_userdata.0.PV-Anlage.Energie_Einspeisung_Monthly").val).toFixed(2));
        var VERBRAUCH_Yearly = parseFloat((getState("0_userdata.0.PV-Anlage.Energie_Garage_Yearly").val + getState("0_userdata.0.PV-Anlage.Energie_Haus_Yearly").val + getState("0_userdata.0.PV-Anlage.Energie_Netzbezug_Yearly").val - getState("0_userdata.0.PV-Anlage.Energie_Einspeisung_Yearly").val).toFixed(2));

        setState("0_userdata.0.PV-Anlage.Energie_Verbrauch_Daily",VERBRAUCH_Daily);   
        setState("0_userdata.0.PV-Anlage.Energie_Verbrauch_Monthly",VERBRAUCH_Monthly);  
        setState("0_userdata.0.PV-Anlage.Energie_Verbrauch_Yearly",VERBRAUCH_Yearly);  

        //Eigenverbrauch
        var EIGENVERBRAUCH_Daily = parseFloat((getState("0_userdata.0.PV-Anlage.Energie_Garage_Daily").val + getState("0_userdata.0.PV-Anlage.Energie_Haus_Daily").val  - getState("0_userdata.0.PV-Anlage.Energie_Einspeisung_Daily").val).toFixed(2));
        var EIGENVERBRAUCH_Monthly = parseFloat((getState("0_userdata.0.PV-Anlage.Energie_Garage_Monthly").val + getState("0_userdata.0.PV-Anlage.Energie_Haus_Monthly").val - getState("0_userdata.0.PV-Anlage.Energie_Einspeisung_Monthly").val).toFixed(2));
        var EIGENVERBRAUCH_Yearly = parseFloat((getState("0_userdata.0.PV-Anlage.Energie_Garage_Yearly").val + getState("0_userdata.0.PV-Anlage.Energie_Haus_Yearly").val - getState("0_userdata.0.PV-Anlage.Energie_Einspeisung_Yearly").val).toFixed(2));

        setState("0_userdata.0.PV-Anlage.Energie_Eigenverbrauch_Daily",EIGENVERBRAUCH_Daily);   
        setState("0_userdata.0.PV-Anlage.Energie_Eigenverbrauch_Monthly",EIGENVERBRAUCH_Monthly);  
        setState("0_userdata.0.PV-Anlage.Energie_Eigenverbrauch_Yearly",EIGENVERBRAUCH_Yearly);  

        //Gesamtproduktion
        setState("0_userdata.0.PV-Anlage.Energie_Gesamt_Daily",parseFloat((getState("0_userdata.0.PV-Anlage.Energie_Haus_Daily").val + getState("0_userdata.0.PV-Anlage.Energie_Garage_Daily").val)));   
        setState("0_userdata.0.PV-Anlage.Energie_Gesamt_Monthly",parseFloat((getState("0_userdata.0.PV-Anlage.Energie_Haus_Monthly").val + getState("0_userdata.0.PV-Anlage.Energie_Garage_Monthly").val)));
        setState("0_userdata.0.PV-Anlage.Energie_Gesamt_Yearly",parseFloat((getState("0_userdata.0.PV-Anlage.Energie_Haus_Yearly").val + getState("0_userdata.0.PV-Anlage.Energie_Garage_Yearly").val)));

        //Eigenverbrauch relativ
        setState("0_userdata.0.PV-Anlage.Energie_Eigenverbrauch_relativ_Daily",parseInt(((EIGENVERBRAUCH_Daily/VERBRAUCH_Daily)*100).toFixed(0)));   
        setState("0_userdata.0.PV-Anlage.Energie_Eigenverbrauch_relativ_Monthly",parseInt(((EIGENVERBRAUCH_Monthly/VERBRAUCH_Monthly)*100).toFixed(0)));  
        setState("0_userdata.0.PV-Anlage.Energie_Eigenverbrauch_relativ_Yearly",parseInt(((EIGENVERBRAUCH_Yearly/VERBRAUCH_Yearly)*100).toFixed(0)));

        //PV Garage relativ
        setState("0_userdata.0.PV-Anlage.Energie_Garage_relativ_Daily",  parseInt(((getState("0_userdata.0.PV-Anlage.Energie_Garage_Daily").val/(getState("0_userdata.0.PV-Anlage.Energie_Garage_Daily").val+getState("0_userdata.0.PV-Anlage.Energie_Haus_Daily").val))*100).toFixed(0)));   
        setState("0_userdata.0.PV-Anlage.Energie_Garage_relativ_Monthly",parseInt(((getState("0_userdata.0.PV-Anlage.Energie_Garage_Monthly").val/(getState("0_userdata.0.PV-Anlage.Energie_Garage_Monthly").val+getState("0_userdata.0.PV-Anlage.Energie_Haus_Monthly").val))*100).toFixed(0)));    
        setState("0_userdata.0.PV-Anlage.Energie_Garage_relativ_Yearly", parseInt(((getState("0_userdata.0.PV-Anlage.Energie_Garage_Yearly").val/(getState("0_userdata.0.PV-Anlage.Energie_Garage_Yearly").val+getState("0_userdata.0.PV-Anlage.Energie_Haus_Yearly").val))*100).toFixed(0)));  ;  

        //Einspeisung relative
        setState("0_userdata.0.PV-Anlage.Energie_Einspeisung_relativ_Daily",  parseInt(((getState("0_userdata.0.PV-Anlage.Energie_Einspeisung_Daily").val/(getState("0_userdata.0.PV-Anlage.Energie_Gesamt_Daily").val))*100).toFixed(0)));   
        setState("0_userdata.0.PV-Anlage.Energie_Einspeisung_relativ_Monthly",  parseInt(((getState("0_userdata.0.PV-Anlage.Energie_Einspeisung_Monthly").val/(getState("0_userdata.0.PV-Anlage.Energie_Gesamt_Monthly").val))*100).toFixed(0)));
        setState("0_userdata.0.PV-Anlage.Energie_Einspeisung_relativ_Yearly",  parseInt(((getState("0_userdata.0.PV-Anlage.Energie_Einspeisung_Yearly").val/(getState("0_userdata.0.PV-Anlage.Energie_Gesamt_Yearly").val))*100).toFixed(0)));   
    },10000);
});


//Zeitpläne zum Berechnen der geladenen Energy, Rücksetzen der Werte
schedule("1 0 * * *", function () 
{//PV-Überschuss Tageswert zurücksetzen jeden Tag um 00:01
    setState("0_userdata.0.PV-Anlage.Energie_Garage_Daily",0);
    setState("0_userdata.0.PV-Anlage.Energie_Haus_Daily",0);
    setState("0_userdata.0.PV-Anlage.Energie_Netzbezug_Daily",0);
    setState("0_userdata.0.PV-Anlage.Energie_Einspeisung_Daily",0);
});

schedule('1 0 1 * *', function () 
{//PV-Überschuss Monatswert zurücksetzen , Immer am 1. des Monats um 00:01
    setState("0_userdata.0.PV-Anlage.Energie_Garage_Monthly",0);
    setState("0_userdata.0.PV-Anlage.Energie_Haus_Monthly",0);
    setState("0_userdata.0.PV-Anlage.Energie_Netzbezug_Monthly",0);
    setState("0_userdata.0.PV-Anlage.Energie_Einspeisung_Monthly",0);
});

schedule('1 0 1 1 *', function () 
{//PV Jahreswert zurücksetzen Immer am 1.1. um 00:01    
    setState("0_userdata.0.PV-Anlage.Energie_Garage_Yearly",0);
    setState("0_userdata.0.PV-Anlage.Energie_Haus_Yearly",0);
    setState("0_userdata.0.PV-Anlage.Energie_Netzbezug_Yearly",0);
    setState("0_userdata.0.PV-Anlage.Energie_Einspeisung_Yearly",0);
});



