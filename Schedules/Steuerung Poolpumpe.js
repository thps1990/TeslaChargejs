ID_SW_POOLPUMPE

schedule('0 8 * * *', function () {
//An
    setState(ID_SW_POOLPUMPE,true);
});

schedule('30 14 * * *', function () {
//Aus
    setState(ID_SW_POOLPUMPE,false);
});