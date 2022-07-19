//Pfeil-Netzbezug/Einspeisung

on({id: [ID_PV_NETZBEZUG_LEISTUNG,ID_PV_NETZEINSPEISUNG_LEISTUNG] , change: 'ne'}, function(obj){ 

    if(getState(ID_PV_NETZBEZUG_LEISTUNG).val > 0)
    {
        setState("javascript.0.VIS.PV_arrow_Netz", "/vis.0/main/img/pfeil.png");
        setState("javascript.0.VIS.PV_Netz_Leistung",getState(ID_PV_NETZBEZUG_LEISTUNG).val);
        if(getState("javascript.0.VIS.PV_arrow_netz_opac").val != 1)
        {
            setState("javascript.0.VIS.PV_arrow_netz_opac", 1);
            setState("javascript.0.VIS.PV_shape_netz_opac",0.6);
        }
    }else if(getState(ID_PV_NETZEINSPEISUNG_LEISTUNG).val>0)
    {
       setState("javascript.0.VIS.PV_arrow_Netz", "/vis.0/main/img/pfeil_gedreht.png"); 
        if(getState("javascript.0.VIS.PV_arrow_netz_opac").val != 1)
        {
            setState("javascript.0.VIS.PV_arrow_netz_opac", 1);
            setState("javascript.0.VIS.PV_shape_netz_opac",0.6);
        }
       setState("javascript.0.VIS.PV_Netz_Leistung",getState(ID_PV_NETZEINSPEISUNG_LEISTUNG).val);
    }else
    {
        setState("javascript.0.VIS.PV_arrow_netz_opac", 0);
        setState("javascript.0.VIS.PV_shape_netz_opac",0);

    }

});

//AKkuleistung
on({id: ID_PVMB_AKKU_STATUS, change: 'ne'}, function(obj){ 
//console.log("Akku-status="+getState(ID_PVMB_AKKU_STATUS).val )
    if(getState(ID_PVMB_AKKU_STATUS).val == 3 )
    { 
        if(getState("javascript.0.VIS.PV_arrow_to_batt").val !=1)
        {
            setState("javascript.0.VIS.PV_arrow_to_batt",1);
            setState("javascript.0.VIS.PV_shape_to_batt",0.6);
        }
    }else
    {
        setState("javascript.0.VIS.PV_arrow_to_batt",0);
        setState("javascript.0.VIS.PV_shape_to_batt",0);
    }

    if(getState(ID_PVMB_AKKU_STATUS).val == 4 )
    {
        if(getState("javascript.0.VIS.PV_arrow_batt_to_house").val !=1)
        {
            setState("javascript.0.VIS.PV_arrow_batt_to_house",1);
            setState("javascript.0.VIS.PV_shape_batt_to_house",0.6);
        }

    }else
    {
        setState("javascript.0.VIS.PV_arrow_batt_to_house",0);
        setState("javascript.0.VIS.PV_shape_batt_to_house",0);
    }
});

//2. PV 
on({id: ID_PW_PV_ANLAGE, change: 'ne'}, function(obj){ 

    if(getState(ID_PW_PV_ANLAGE).val > 0)
    {
        setState("0_userdata.0.VIS.PV2_arrow_to_house",1);
        setState("0_userdata.0.VIS.PV2_shape_to_batt",0.6);
    }else
    {
        setState("0_userdata.0.VIS.PV2_arrow_to_house",0);
        setState("0_userdata.0.VIS.PV2_shape_to_batt",0);
    }

});

//Eigenverbrauch
on({id: ID_PV_EIGENVERBRAUCH_AUS_PV, change: 'ne'}, function(obj){ 
    var EigenverbrauchPV = getState(ID_PV_EIGENVERBRAUCH_AUS_PV).val
    if(EigenverbrauchPV > 0)
    {

        setState("javascript.0.VIS.PV_arrow_to_house",1);
        setState("javascript.0.VIS.PV_shape_to_house",0.6)

    }
    else
    {
        setState("javascript.0.VIS.PV_arrow_to_house",0);
        setState("javascript.0.VIS.PV_shape_to_house",0)

    }
});

//Heizung
on({id: "javascript.0.NibeUplink.System_45464.aktuelle_Verdichter_Freqenz", change: 'ne'}, function(obj){ 
    var Verdichterfrequenz = getState("javascript.0.NibeUplink.System_45464.aktuelle_Verdichter_Freqenz").val
    if(Verdichterfrequenz > 0)
    {

            setState("javascript.0.VIS.PV_arrow_Nibe",1);
            setState("javascript.0.VIS.PV_shape_Nibe",0.6);

    }
    else
    {
            setState("javascript.0.VIS.PV_arrow_Nibe",0);
            setState("javascript.0.VIS.PV_shape_Nibe",0);

    }
});

//Tesla
on({id: ID_GOE_CHARGE_POWER, change: 'ne'}, function(obj){ 
    var charge_power = getState(ID_GOE_CHARGE_POWER).val;
    //console.log("Charge:" + charge_power);
    if(charge_power > 0)
    {

            setState("javascript.0.VIS.PV_arrow_Tesla",1);
            setState("javascript.0.VIS.PV_shape_Tesla",0.6);

    }
    else
    {
            setState("javascript.0.VIS.PV_arrow_Tesla",0);
            setState("javascript.0.VIS.PV_shape_Tesla",0);

    }
});

//Akkustand
on({id: ID_PV_AKKUSTAND , change: 'ne'}, function(obj){ 

    var akkustand = getState(ID_PV_AKKUSTAND).val;
    var color;
    if(akkustand > 70)
    {
        color = "#baf7ab";

    }else if( akkustand >50)
    {
        color = "#cce26a";
    }else if(akkustand > 30)
    {
        color ="#e2e44e";
    }else if(akkustand > 15)
    {
        color = "#e49d4e";
    }else
    {
        color = "#cd332d";
    }

    setState("javascript.0.VIS.color_Akkustand",color);
});

//==================Visualisierung Ueberschuss=======================================
var trigger= [ID_PV_UEBERSCHUSS, ID_PV_ABDECKUNG, ID_PV_AKKUSTAND];
on({id: trigger , change: 'ne'}, function(obj){ 

    if(getState(ID_PV_UEBERSCHUSS).val)
    {//Überschuss da = Menü grün
        if(getState("javascript.0.VIS.Menu_color").val != "#baf7ab")
        {
            setState("javascript.0.VIS.Menu_color","#baf7ab");
        }
    }
    else if(getState(ID_PV_ABDECKUNG).val)
    {//Kein Überschuss da
    //Menü Farbe Gelb
        setState("javascript.0.VIS.Menu_color","#ffea7a");
    }else if(getState("javascript.0.VIS.Menu_color").val != "#f33f3f")
    {//Ansonsten Rot
            setState("javascript.0.VIS.Menu_color","#f33f3f");
    }
});