schedule("* * * * *", function () {
    var d = new Date(); 

    var minuten = d.getMinutes().toString() ;
    var stunden = d.getHours().toString() ;

    if (d.getMinutes() < 10)
    {
        minuten = "0" + minuten; 
    }
    
    if (d.getHours() < 10)
    {
        stunden = "0" + stunden; 
    }


    setState("javascript.0.Globale_Variablen.Stunden", stunden);
    setState("javascript.0.Globale_Variablen.Minuten", minuten);
});