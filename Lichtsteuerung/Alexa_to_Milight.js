function Control_BRI(ID)
{
    console.log(ID);
    if(getState(ID+".state").val && getState(ID + ".brightness").val === 0)
    {
        setState(ID + ".state",false);
    }
    else if(!getState(ID + ".state").val && getState(ID + ".brightness").val > 0)
    {
        setState(ID + ".state",true);
    }
  
}

on({id: ID_LIGTHML_FLUR_OG + ".brightness" , change:'ne' } ,function(){
  Control_BRI(ID_LIGTHML_FLUR_OG);  
});

on({id: ID_LIGHTML_KUECHE + ".brightness" , change:'ne' } ,function(){
  Control_BRI(ID_LIGHTML_KUECHE);  
});

on({id: ID_LIGHTML_FLUR_EG + ".brightness" , change:'ne' } ,function(){
  Control_BRI(ID_LIGHTML_FLUR_EG);  
});

on({id: ID_LIGHTML_WZ + ".brightness" , change:'ne' } ,function(){
  Control_BRI(ID_LIGHTML_WZ);  
});


