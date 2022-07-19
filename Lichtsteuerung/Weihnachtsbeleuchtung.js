var trigger = [ID_ANWESENHEIT,ID_SCHLAFEN];

on({id: trigger ,change: 'ne'}, function(obj){
    if(getState(ID_ANWESENHEIT).val && !getState(ID_SCHLAFEN).val && !isAstroDay())
    {// Beleuchtung an
        setState(ID_AUSSENBELEUCHTUNG_GARTENHAUS,true);  
        setState(ID_SW_AUSSENBELEUCHTUNG_BAUM,true);
        setState(ID_SW_STERN,true);   
        //setState(ID_WEIHNACHTSBAUM,true);      
    }else
    {
        setState(ID_AUSSENBELEUCHTUNG_GARTENHAUS,false);
        setState(ID_SW_AUSSENBELEUCHTUNG_BAUM ,false);
        setState(ID_SW_STERN,false);   
        setState(ID_WEIHNACHTSBAUM,false); 
        setState(ID_LICHTERKETTE_TESSA,false);
    }
});

on({id: ID_BTN_TESSA +  ".long" , val:true}, function(obj){

            setState(ID_LICHTERKETTE_TESSA,!getState(ID_LICHTERKETTE_TESSA).val) ;
});  

schedule({astro: "sunrise", shift:20}, function () {


    setState(ID_AUSSENBELEUCHTUNG_GARTENHAUS,false);  
    setState(ID_SW_AUSSENBELEUCHTUNG_BAUM,false);
    setState(ID_SW_STERN,false);  
    setState(ID_WEIHNACHTSBAUM,false); 
    setState(ID_LICHTERKETTE_TESSA,false); 
     

});

schedule({astro: "sunset"}, function () {
        setState(ID_AUSSENBELEUCHTUNG_GARTENHAUS,true);  
        setState(ID_SW_AUSSENBELEUCHTUNG_BAUM,true);
        setState(ID_SW_STERN,true);   
        setState(ID_WEIHNACHTSBAUM,true); 
});