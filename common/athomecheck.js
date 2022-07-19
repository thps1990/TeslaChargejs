
const ZUHAUSE_LATITUDE              = 50.976446; //Breitengrad Koordinaten
const ZUHAUSE_LONGITUDE             = 11.264414; //Längengrad Koordinaten , 
const ZUHAUSE_MAX_ENTFERNUNG        = 0.5 ; //KM  - Entfernung des Autos von Zuhause
const ID_TSL ="tesla-motors.0.1493042252935160";
const ID_TSL_LATITUDE = ID_TSL + ".drive_state.latitude";
const ID_TSL_LONGITUDE = ID_TSL + ".drive_state.longitude";
console.log(getState(ID_TSL_LONGITUDE))

var entprell = false;

on({id: ID_TSL_LATITUDE,change: 'ne'}, function(obj){
    if(!entprell)
    {
        entprell= true;
        setTimeout(function(){entprell = false},60000);
        sendTo('telegram', "@Torsten Home=" +at_home() );
    }
});


function at_home() {

	var lat1 = Deg2Rad(ZUHAUSE_LATITUDE);
	var lat2 = Deg2Rad(getState(ID_TSL_LATITUDE).val);
	var lon1 = Deg2Rad(ZUHAUSE_LONGITUDE);
	var lon2 = Deg2Rad(getState(ID_TSL_LONGITUDE).val);
    //console.log("lat1="+lat1 + " lat2=" + lat2 + "lon1="+lon1 + "lon2=" + lon2 );
	var R = 6371; // km
	var x = (lon2-lon1) * Math.cos((lat1+lat2)/2);
	var y = (lat2-lat1);
	var d = Math.sqrt(x*x + y*y) * R;
    //console.log(d);
    if(d <= ZUHAUSE_MAX_ENTFERNUNG)
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