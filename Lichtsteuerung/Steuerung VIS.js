
on({id: "javascript.0.VIS.brightness", change: 'ne'}, function(){
    var iBrightness = getState("javascript.0.VIS.brightness").val;
    

    
    if(getState("javascript.0.VIS.control_wz").val)
    {
        setState(ID_LIGHTML_WZ + ".brightness",iBrightness );
    }
    
    if(getState("javascript.0.VIS.control_flur").val)
    {
        setState(ID_LIGHTML_FLUR_EG + ".brightness",iBrightness );
    }
    
    if(getState("javascript.0.VIS.control_kueche").val)
    {
        setState(ID_LIGHTML_KUECHE + ".brightness",iBrightness );
    }
});

on({id: "javascript.0.VIS.set_white", val: true}, function(){


    
    if(getState("javascript.0.VIS.control_wz").val)
    {
        setStateDelayed(ID_LIGHTML_WZ + ".whiteMode",false,400 );
        setState(ID_LIGHTML_WZ + ".on",true);
    }
    
    if(getState("javascript.0.VIS.control_flur").val)
    {
        setStateDelayed(ID_LIGHTML_FLUR_EG + ".whiteMode",false,600 );
        setState(ID_LIGHTML_FLUR_EG + ".on",true);
    }
    
    if(getState("javascript.0.VIS.control_kueche").val)
    {
        setStateDelayed(ID_LIGHTML_KUECHE + ".whiteMode",false,800 );
        setState(ID_LIGHTML_KUECHE + ".on",true);
    }
    
});

on({id: "javascript.0.VIS.color", change: 'ne'}, function(){
    var iColor = getState("javascript.0.VIS.color").val;
    setState("javascript.0.VIS.set_white",false);
    

    
    if(getState("javascript.0.VIS.control_wz").val)
    {
        setState(ID_LIGHTML_WZ + ".rgb",iColor );
    }
    
    if(getState("javascript.0.VIS.control_flur").val)
    {
        setState(ID_LIGHTML_FLUR_EG + ".rgb",iColor );
    }
    
    if(getState("javascript.0.VIS.control_kueche").val)
    {
        setState(ID_LIGHTML_KUECHE + ".rgb",iColor );
    }
});

on({id: "vis.0.control.data", change: 'ne'}, function(){
    if(getState("vis.0.control.data").val == "main/3DDrucker")
    {
        setState(ID_Licht_3DDrucker,true);
        setStateDelayed(ID_Licht_3DDrucker,false,300000);
        setTimeout(function(){
            require("request")("http://192.168.2.196/control?var=framesize&val=8", function (error, response, result){}) ;

        },4000);
        

    }

});

