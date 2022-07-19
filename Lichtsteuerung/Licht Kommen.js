
on({id: ID_ANWESENHEIT, val: true}, function(obj){
    if(!getState(ID_SCHLAFEN).val && !isAstroDay())
    {
        GRP_LIGHTML_EG.forEach(function(ID) {
         setState(ID + ".state", true);
        });

    }
});
