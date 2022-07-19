

function ChangeView(view)
{
    setState(ID_TABLET_WAND_LOADURL, "http://smarthome:8082/vis/index.html#"+view);
}

function sendImage(toAdmin=false) {
        exec("wget http://192.168.2.9:8765/picture/1/current/ -O /opt/iobroker/camsnap.jpg");
        if(!toAdmin)
        {
           setTimeout(function(){  sendTo('telegram.0', {text: '/opt/iobroker/camsnap.jpg', caption: 'Von MotionEye'});  },10000); 
        }else
        {
            setTimeout(function(){  sendTo('telegram.0', {text: '@Torsten /opt/iobroker/camsnap.jpg', caption: 'Von MotionEye'});},10000);
        }
}


function Licht_aus()
{//Licht Komplett aus
       setState(ID_SW_LICHT_TECHNIKRAUM,false); // Licht Technikraum
       setStateDelayed(ID_LIGTHML_FLUR_OG + ".off",true,1000); //Licht EZ
       setStateDelayed(ID_LIGHTML_KUECHE  + ".off",true,1100);//Licht Küche (Oberschrank )
       setStateDelayed(ID_LIGHTML_FLUR_EG + ".off",true,1200);//Licht Flur
       setStateDelayed(ID_LIGHTML_WZ + ".off",true,1300);//Licht WZ
       setStateDelayed(ID_LIGHTYL_BAD + ".power", false,  480000); // Licht Bad
       setState(ID_SW_AUSSENBELEUCHTUNG,false); //Licht Aussenbeleuchtung
       setState(ID_LIGHTSH_GARAGE,false);
       setState(ID_LIGHTSH_LICHT_LED_STRIPE,false); //Licht Mara
       setState(ID_LIGHTSH_LICHT_SPOTS,false); //Licht Mara 
       setState(ID_LIGHTYL_TESSA + ".power",false); // Licht Tessa
       setState(ID_SW_LICHT_ANKLEIDE,false); // Licht Ankleide
       setState(ID_LIGHTSH_KUECHE,false); //Licht Kueche
       setState(ID_LIGHTSH_ESSZIMMER,false); //Licht Esszimmer 
       setState(ID_LIGHT_TESSA_NACHTISCHLAMPE_POWER,false); //Licht Anna und Elsa Lampe 
       setState(ID_LIGHTSH_LICHT_SPOTS,false); //Mara Spots
       setState(ID_LIGHTSH_LICHT_LED_STRIPE,false);
       setState(ID_TABLET_WAND_SCREEN_OFF,true);
       setState(ID_LIGHT_MARA_WECKER_STRIPE_POWER,false);
       setState(ID_LIGHT_MARA_WECKER_SPITZE_LINKS,false);
       setState(ID_LIGHT_MARA_WECKER_SPITZE_RECHTS,false);
       setState(ID_LIGHT_MARA_WECKER_SPITZE_OBEN,false);
}

function Geraete_aus(exept=0)
{
    setState(ID_SW_TV,false); 
    setState("javascript.0.VIS.radio_wz",false); // Radio im Wohnzimmer aus
    setStateDelayed("javascript.0.VIS.radio_bad",false, 480000); // Radio im Bad aus

    
    if(exept != EXEPT_TV_SCHLAFZIMMER)
    {
        setState(ID_SW_TV_SCHLAFZIMMER,false);
    }  
}







function Alarm(deactivate=false, silent=true)
{
    if(!deactivate)
    {
        setState(ID_MIHOMEGATEWAY+".mid",1);
        setStateDelayed(ID_MIHOMEGATEWAY+".mid",100,60000);
        
        GRP_LIGHTML_ALLE.forEach(function(ID) {
            setState(ID + ".state", true);
            setState(ID + ".mode",2);
        });
        setState(ID_LIGHTYL_BAD,true);
        setState(ID_LIGHTSH_KUECHE,true);
        setState(ID_LIGHTSH_ESSZIMMER, true);

        if(!silent)
        {
            setState("shelly.0.SHRGBW2#6D2BB9#1.color.rgbw", "#FF000000"); // Farbe Shelly auf Rot
            setState("shelly.0.SHRGBW2#6D2BB9#1.color.gain",100); //Höchste Helligkeit
            setState("shelly.0.SHRGBW2#6D2BB9#1.color.effect",3); // Effekt auf flash
           /* while(getState(ID_ALARMAUSGELOEST).val)
            {
                setTimeout(function(){
                    setState(ID_SW_AUSSENBELEUCHTUNG, !getState(ID_SW_AUSSENBELEUCHTUNG).val);
                },500);
                
            }*/

        }
    }
    else
    {
        setState(ID_MIHOMEGATEWAY+".mid",100);
        GRP_LIGHTML_ALLE.forEach(function(ID) {
            setState(ID + ".whiteMode",true);
            setStateDelayed(ID + ".state", false,1000);
        });
        setState(ID_LIGHTYL_BAD,false);
        setState(ID_LIGHTSH_KUECHE,false);
        setState(ID_LIGHTSH_ESSZIMMER, false);
    }
}

function Tesla_at_home() {

	var lat1 = Deg2Rad(TESLA_ZUHAUSE_LATITUDE);
	var lat2 = Deg2Rad(getState(ID_TESLA_LATITUDE).val);
	var lon1 = Deg2Rad(TESLA_ZUHAUSE_LONGITUDE);
	var lon2 = Deg2Rad(getState(ID_TESLA_LONGITUDE).val);
    console.log("lat1="+lat1 + " lat2=" + lat2 + "lon1="+lon1 + "lon2=" + lon2 );
	var R = 6371; // km
	var x = (lon2-lon1) * Math.cos((lat1+lat2)/2);
	var y = (lat2-lat1);
	var d = Math.sqrt(x*x + y*y) * R;
    console.log(d);
    if(d <= TESLA_ZUHAUSE_MAX_ENTFERNUNG)
    {
        return true;
    }else
    {
        return false;
    }
}

function Deg2Rad( deg ) {
	return deg * Math.PI / 180;
}
