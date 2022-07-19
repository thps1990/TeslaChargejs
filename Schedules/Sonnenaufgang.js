

schedule({astro: "sunrise", shift:20}, function () {


    Licht_aus();

});

schedule("0 23 * * *", function () {
    Licht_aus();
});

schedule({astro: "sunrise", shift:-15}, function () {

    if(!getState(ID_SCHLAFEN).val && !getState(ID_KUEHLUNG_AKTIV).val && !getState(ID_URLAUB).val )
    {

           var i =0;
            GRP_ROLLADEN_ALLE.forEach(function(ID) {
                setStateDelayed(ID + ".Open", true,i*1000);
                i = i+1;
            });
    } 
});
