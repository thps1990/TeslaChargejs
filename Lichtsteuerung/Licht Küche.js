
function LichtKueche()
{
    if(getState(ID_ANWESENHEIT).val && getState("javascript.0.VIS.bewegungsmelder_kueche").val && !isAstroDay() && !getState(ID_URLAUB).val )
    {
        setState(ID_LIGHTML_KUECHE + ".state", (getState(ID_PIR_KUECHE_1).val || getState(ID_PIR_KUECHE_2).val));
    }
        
}

on({id: ID_PIR_KUECHE_2 , change: 'ne'}, LichtKueche);
on({id: ID_PIR_KUECHE_1 , change: 'ne'}, LichtKueche);


on({id: ID_SWITCH_KUECHE, change:'any'}, function(obj){
    console.log("State="+getState(ID_SWITCH_KUECHE).val);
           setState(ID_LIGHTML_KUECHE + ".state",getState(ID_SWITCH_KUECHE).val);
});  
