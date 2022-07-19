//abcdef
on({id:"javascript.0.VIS.radio_wz",val:true}, function(obj){
   setState(ID_ALEXA_WZ_SPEAK, "Es spielt " + getState("javascript.0.VIS.default_radio").val);
   setState(ID_ALEXA_WZ_TUNEIN ,getState("javascript.0.VIS.default_radio").val) ;
});

on({id:"javascript.0.VIS.radio_wz",val:false}, function(obj){
   setState(ID_ALEXA_WZ_PAUSE,true) ;
   setState(ID_ALEXA_WZ_TUNEIN ,"") ;
});

on({id:"javascript.0.VIS.radio_bad",val: true}, function(obj){
   setStateDelayed(ID_ALEXA_BAD_TUNEIN ,getState("javascript.0.VIS.default_radio").val,3000) ;
   setState(ID_ALEXA_BAD_SPEAK, "Es spielt " + getState("javascript.0.VIS.default_radio").val);
  
});
on({id:"javascript.0.VIS.radio_bad",val: false}, function(obj){
   setState(ID_ALEXA_BAD_PAUSE,true) ;
   setStateDelayed(ID_ALEXA_BAD_TUNEIN ,"") ;
});

on({id:"javascript.0.VIS.default_radio",change: 'ne'}, function(obj){
    
   if(getState("javascript.0.VIS.radio_wz").val)
   {
       setState(ID_ALEXA_WZ_PAUSE,true) ;
        setState(ID_ALEXA_WZ_SPEAK, "Es spielt " + getState("javascript.0.VIS.default_radio").val);
       setState(ID_ALEXA_WZ_TUNEIN,getState("javascript.0.VIS.default_radio").val);
       
       
   }
   
 if(getState("javascript.0.VIS.radio_bad").val)
   {   
       setState(ID_ALEXA_BAD_PAUSE,true) ;
       setState(ID_ALEXA_BAD_SPEAK, "Es spielt " + getState("javascript.0.VIS.default_radio").val);
       setStateDelayed(ID_ALEXA_BAD_TUNEIN,getState("javascript.0.VIS.default_radio").val,3000);
  
   }
});