/*on({id: ID_DWS_TUER_TESSA , change: 'ne'}, function(obj){
  if(!isAstroDay())
  {
    setState(ID_LIGHTYL_TESSA + ".power",getState(ID_DWS_TUER_TESSA).val)  ;
  }
    
} );*/
 

on({id: ID_BTN_TESSA +  ".click" , val:true}, function(obj){
            setState(ID_LIGHTYL_TESSA + ".power",!getState(ID_LIGHTYL_TESSA + ".power").val) ;
});  
