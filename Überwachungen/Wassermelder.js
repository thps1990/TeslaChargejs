
function Wassermelder(id,message)
{

    sendTo('telegram', message);
    if(getState(ID_ANWESENHEIT).val)
    {
        Alarm();
    } 
}


on({id:ID_LEAK_WASCHMASCHINE,val: true},function(){
    Wassermelder(ID_LEAK_WASCHMASCHINE,"Wasser unter der Waschmaschine");
});
on({id:ID_LEAK_KUECHE,val: true},function(){
    Wassermelder(ID_LEAK_KUECHE,"Wasser unter der Küchenzeile");
});
on({id:ID_LEAK_HEIZUNG,val: true},function(){
    Wassermelder(ID_LEAK_HEIZUNG,"Wasser unter der Heizung")
});
on({id:ID_LEAK_BADEWANNE,val: true},function(){
    Wassermelder(ID_LEAK_BADEWANNE,"Wasser unter der Badewanne")
}); 
