on({id: ID_PIR_FLUR_TUER ,val:true}, setLight);
on({id: ID_PIR_FLUR_BANK ,val:true}, setLight);
var timeout;

function setLight()
{
    if(getState(ID_ANWESENHEIT).val && !getState(ID_URLAUB).val && !isAstroDay())
    {
        setState(ID_LIGHTML_FLUR_EG + ".state", true);
        clearTimeout(timeout);
        timeout=setTimeout(function(){
            if(!(getState(ID_PIR_FLUR_TUER).val||getState(ID_PIR_FLUR_BANK).val))
            {
                setState(ID_LIGHTML_FLUR_EG + ".state", false);
            }else
            {
                timeout=setTimeout(function(){ setState(ID_LIGHTML_FLUR_EG + ".state", false); },120000);
            }
        },120000);  
    }
}