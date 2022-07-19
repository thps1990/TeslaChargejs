var bTimeout = false;



on({id: ID_BTN_SCHLAFZIMMER_1 + ".double_click" , val: true}, function(obj){
 if(getState(ID_SW_TV_SCHLAFZIMMER).val)
 {
     if(!bTimeout)
     {
        setState(ID_SW_TV_SCHLAFZIMMER,false);
     }
 }
 else
 {
   
   setState(ID_SW_TV_SCHLAFZIMMER, true); //Steckdose an
   
    var Timer = setTimeout(function(){
        setState(ID_SW_TV_SCHLAFZIMMER,false);
                },2700000);
                
    bTimeout = true;
    
    setTimeout(function(){
        bTimeout = false;
                },3000);
 }
    
});