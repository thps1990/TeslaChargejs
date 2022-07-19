on({id: "radar.0.UWZ_Warning"/*UWZ_Warning*/, change: 'ne'}, function(obj){
    sendTo('telegram', 'Eine neue Unwetterwarnung liegt vor: ' + getState( "radar.0.UWZ_Warnings.warning0").val);
});