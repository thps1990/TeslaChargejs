
on({id: "javascript.0.VIS.volume_wz", change:'ne'}, function(obj){
 setState(ID_ALEXA_WZ_VOLUME, getState("javascript.0.VIS.volume_wz").val);
});

on({id: "javascript.0.VIS.volume_bad", change:'ne'}, function(obj){
 setState(ID_ALEXA_BAD_VOLUME, getState("javascript.0.VIS.volume_bad").val);
});

on({id: "javascript.0.VIS.radio_bad", val:true}, function(obj){
 setState(ID_ALEXA_BAD_VOLUME, getState("javascript.0.VIS.volume_bad").val);
});

on({id: "javascript.0.VIS.radio_wz", val:true}, function(obj){
 setState(ID_ALEXA_WZ_VOLUME, getState("javascript.0.VIS.volume_wz").val);
});