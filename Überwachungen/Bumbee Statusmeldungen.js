
on({id: "mihome-vacuum.0.consumable.filter", valLt: 5}, function(obj){
    sendTo('telegram', "Bumbees Filter möchte gewechselt werden");
    setState("mihome-vacuum.0.consumable.filter_reset",true);
});

on({id: "mihome-vacuum.0.consumable.main_brush", valLt: 5}, function(obj){
    sendTo('telegram', "Bumbees Hauptbürste möchte gewechselt werden");
    setState("mihome-vacuum.0.consumable.main_brush_reset",true);
});

on({id: "mihome-vacuum.0.consumable.sensors", valLt: 5}, function(obj){
    sendTo('telegram', "Bumbees Sensoren möchten gereinigt werden");
    setState("mihome-vacuum.0.consumable.sensors_reset",true);
});

on({id: "mihome-vacuum.0.consumable.side_brush", valLt: 5}, function(obj){
    sendTo('telegram', "Bumbees Seitenbürste möchte gewechselt werden");
    setState("mihome-vacuum.0.consumable.side_brush_reset",true);
});


//Fehlermeldungen
on({id: "mihome-vacuum.0.info.error", change:'ne'}, function(obj){
    
    var sMeldung;
    
    switch (getState("mihome-vacuum.0.info.error").val) {
        case 1:
            sMeldung = "Der LDS hat ein Problem";
        break;
        
        case 2:
            sMeldung = "Der Kollisionssensor hat ein Problem";
        break;
        
        case 3:
            sMeldung = "Die Räder hängen in der Luft";
        break;
        
        case 4:
            sMeldung = "Bitte Reinige die Absturzsensoren";
        break;

        
        case 5:
            sMeldung = "Bitte die Hauptbürste reinigen";
        break;

        
        case 6:
            sMeldung = "Bitte die Seitenbürste reinigen";
        break;

        
        case 7:
            sMeldung = "Die Räder hängen fest!";
        break;

        
        case 8:
            sMeldung = "Bumbee hängt fest -_- Bitte retten!";
        break;

        
        case 9:
            sMeldung = "Der Staubbehälter fehlt! Bitte suchen und einsetzen...";
        break;
        
        case 10:
            sMeldung = "Bitte den FIlter säubern!";
        break;
        
        case 11:
            sMeldung = "Bumbee hängt im Magnetband fest -_- Bitte retten!";
        break;
        
        case 12:
            sMeldung = "Der Akku ist leer!";
        break;
        
        case 13:
            sMeldung = "Ladefehler --> Nix gut!";
        break;
            
        case 14:
            sMeldung = "Batteriefehler --> Nix gut!";
        break;
        
        case 15:
            sMeldung = "Die Wandsensoren sind schmutzig. Bitte reinigen!";
        break;
        
        case 16:
            sMeldung = "Das ist mir hier zu hügelig. Setz mich doch mal auf einen flachen Untergrund!";
        break;
        
        case 17:
            sMeldung = "Ich habe ein Problem mit meiner Seitenbürste. Bitte neustarten!";
        break;
        
        case 18:
            sMeldung = "Ich habe ein Problem mit dem Sauger --> Nix gut!";
        break;
        
        case 19:
            sMeldung = "Der Stecker der Ladestation steckt nicht!!";
        break;
    }
    
    sendTo('telegram', 'Bumbee hat was zu melden: ' + sMeldung);
    
    
});
