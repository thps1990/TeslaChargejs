
on({id: ID_BTN_SCHLAFZIMMER_1 + ".long_press" , val: true}, function(obj){
   var heute = new Date();

   if(heute.getHours() > 19){
        setState(ID_SCHLAFEN,true);
        Licht_aus(); 
      
        Geraete_aus(EXEPT_TV_SCHLAFZIMMER);
  
        
        setStateDelayed("javascript.0.VIS.anwesenheitserkennung",false,1000); 
   }
     
});