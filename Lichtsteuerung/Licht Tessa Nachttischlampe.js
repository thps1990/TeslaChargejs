const ID_LIGHT_TESSA_NACHTISCHLAMPE_BTN_ONOFF   = ID_LIGHT_TESSA_NACHTISCHLAMPE+ ".Button2_Action";
const ID_LIGHT_TESSA_NACHTISCHLAMPE_BTN_COLOR   = ID_LIGHT_TESSA_NACHTISCHLAMPE+ ".Button1_Action";
const ID_LIGHT_TESSA_NACHTISCHLAMPE_HSB         = ID_LIGHT_TESSA_NACHTISCHLAMPE+ ".HSBColor";
const ID_LIGHT_TESSA_NACHTISCHLAMPE_DIMMER      = ID_LIGHT_TESSA_NACHTISCHLAMPE+ ".Dimmer";

var HSBColors = ['1,0','1,64', '60,100', '125,73', '167,100', '229,100','271,100', '359,100' ]
var counter = 0;
var maxlenght = HSBColors.length-1;
var entprell = 0;
var Farbwechsel_aktiv=false;
var Sleepmode=0;

on({id:ID_LIGHT_TESSA_NACHTISCHLAMPE_POWER ,val: false}, function(obj){
    Farbwechsel_aktiv = false;
});

on({id:ID_LIGHT_TESSA_NACHTISCHLAMPE_POWER ,val: true}, function(obj){
    if(getState(ID_LIGHT_TESSA_NACHTISCHLAMPE_DIMMER).val < 50) setState(ID_LIGHT_TESSA_NACHTISCHLAMPE_DIMMER, 100);
});

//Dimmen
on({id:ID_LIGHT_TESSA_NACHTISCHLAMPE_BTN_ONOFF ,val: 'SINGLE'}, function(obj){
    if(!Sleepmode && getState("0_userdata.0.Virtuelle_Schalter.bTessaNachtischlampeSteuerung").val)
    {
        if(getState(ID_LIGHT_TESSA_NACHTISCHLAMPE_POWER).val && getState(ID_LIGHT_TESSA_NACHTISCHLAMPE_DIMMER).val <70)
        { 
            Farbwechsel_aktiv = false;
            setState(ID_LIGHT_TESSA_NACHTISCHLAMPE_POWER, false);
        }else if(getState(ID_LIGHT_TESSA_NACHTISCHLAMPE_POWER).val && getState(ID_LIGHT_TESSA_NACHTISCHLAMPE_DIMMER).val <= 100 && getState(ID_LIGHT_TESSA_NACHTISCHLAMPE_DIMMER).val > 70 )
        {
            setState(ID_LIGHT_TESSA_NACHTISCHLAMPE_DIMMER, 70);
        }else if(getState(ID_LIGHT_TESSA_NACHTISCHLAMPE_POWER).val && getState(ID_LIGHT_TESSA_NACHTISCHLAMPE_DIMMER).val <= 70 && getState(ID_LIGHT_TESSA_NACHTISCHLAMPE_DIMMER).val > 50)
        {
            setState(ID_LIGHT_TESSA_NACHTISCHLAMPE_DIMMER, 50);
        }else if (!getState(ID_LIGHT_TESSA_NACHTISCHLAMPE_POWER).val)
        {
            setState(ID_LIGHT_TESSA_NACHTISCHLAMPE_DIMMER, 100);
        }
    }else if(!getState("0_userdata.0.Virtuelle_Schalter.bTessaNachtischlampeSteuerung").val)
    {
        sendTo('telegram', "@Torsten Tessas Lampe wurde bedient, Steuerung ist aus.");
    }else
    {
        setState(ID_LIGHT_TESSA_NACHTISCHLAMPE_POWER, false);  
    }
});

on({id:ID_LIGHT_TESSA_NACHTISCHLAMPE_BTN_ONOFF ,val: 'DOUBLE'}, function(obj){
    Farbwechsel_aktiv = false;
    setState(ID_LIGHT_TESSA_NACHTISCHLAMPE_POWER, false);
});

//Farbe
on({id:ID_LIGHT_TESSA_NACHTISCHLAMPE_BTN_COLOR ,val: 'SINGLE'}, function(obj){
    if(!entprell && !Sleepmode && getState("0_userdata.0.Virtuelle_Schalter.bTessaNachtischlampeSteuerung").val)
    {
        Farbwechsel_aktiv = false;
        entprell=1;
        setTimeout(function(){entprell = 0},200);
        if (counter <maxlenght)
        {
            counter=counter+1;
        }else
        {
            counter=0;
        }
        console.log("Counter=" + counter+ " HSB:"+HSBColors[counter]);
        setState(ID_LIGHT_TESSA_NACHTISCHLAMPE_HSB, HSBColors[counter]+","+getState(ID_LIGHT_TESSA_NACHTISCHLAMPE_DIMMER).val);
    }else if(!getState("0_userdata.0.Virtuelle_Schalter.bTessaNachtischlampeSteuerung").val && !entprell)
    {
        sendTo('telegram', "@Torsten Tessas Lampe wurde bedient, Steuerung ist aus.");
    }else if(entprell==0 && !Sleepmode)
    {
        setState(ID_LIGHT_TESSA_NACHTISCHLAMPE_POWER, false);
    }
});



on({id:ID_LIGHT_TESSA_NACHTISCHLAMPE_BTN_COLOR ,val: 'DOUBLE'}, function(obj){
    if(entprell==0 && !Sleepmode && getState("0_userdata.0.Virtuelle_Schalter.bTessaNachtischlampeSteuerung").val)
    {
        entprell=1;
        setTimeout(function(){entprell = 0},200);
        if(Farbwechsel_aktiv==true)
        {
            Farbwechsel_aktiv = false;
        }else if(!getState("0_userdata.0.Virtuelle_Schalter.bTessaNachtischlampeSteuerung").val && !entprell)
        {
            sendTo('telegram', "@Torsten Tessas Lampe wurde bedient, Steuerung ist aus.");
        }
        else
        {
            Farbwechsel_aktiv = true;
            Farbwechsel();
        }
    }
});

on({id:ID_LIGHT_TESSA_NACHTISCHLAMPE_BTN_COLOR ,val: 'TRIPLE'}, function(obj){
    if(entprell==0 && !Sleepmode)
    {
        entprell=1;
        setTimeout(function(){entprell = 0},200);
        Farbwechsel_aktiv = false;
        Sleepmode=1;
        setState(ID_LIGHT_TESSA_NACHTISCHLAMPE_HSB, "1,0,50");
        setTimeout(function(){if((getState(ID_LIGHT_TESSA_NACHTISCHLAMPE_POWER).val)&&Sleepmode) setState(ID_LIGHT_TESSA_NACHTISCHLAMPE_HSB,"1,0,45")},120000);
        setTimeout(function(){if((getState(ID_LIGHT_TESSA_NACHTISCHLAMPE_POWER).val)&&Sleepmode) setState(ID_LIGHT_TESSA_NACHTISCHLAMPE_HSB,"1,0,40")},240000);
        setTimeout(function(){if((getState(ID_LIGHT_TESSA_NACHTISCHLAMPE_POWER).val)&&Sleepmode) setState(ID_LIGHT_TESSA_NACHTISCHLAMPE_HSB,"1,0,35")},360000);
        setTimeout(function(){if((getState(ID_LIGHT_TESSA_NACHTISCHLAMPE_POWER).val)&&Sleepmode) setState(ID_LIGHT_TESSA_NACHTISCHLAMPE_HSB,"1,0,30")},480000);
        setTimeout(function(){if((getState(ID_LIGHT_TESSA_NACHTISCHLAMPE_POWER).val)&&Sleepmode) setState(ID_LIGHT_TESSA_NACHTISCHLAMPE_HSB,"1,0,25")},600000);
        setTimeout(function(){if((getState(ID_LIGHT_TESSA_NACHTISCHLAMPE_POWER).val)&&Sleepmode) setState(ID_LIGHT_TESSA_NACHTISCHLAMPE_HSB,"1,0,20")},720000);
        setTimeout(function(){if((getState(ID_LIGHT_TESSA_NACHTISCHLAMPE_POWER).val)&&Sleepmode) setState(ID_LIGHT_TESSA_NACHTISCHLAMPE_HSB,"1,0,15")},840000);

        setTimeout(function(){
            if(Sleepmode)
            {
                setState(ID_LIGHT_TESSA_NACHTISCHLAMPE_POWER, false);
                Sleepmode = 0
            }
            },960000);
    }else if(entprell==0 && Sleepmode)
    {
        entprell=1;
        setTimeout(function(){entprell = 0},200);
        Sleepmode = 0;
        setState(ID_LIGHT_TESSA_NACHTISCHLAMPE_HSB,"1,100,50");
        setTimeout(function(){setState(ID_LIGHT_TESSA_NACHTISCHLAMPE_HSB,"120,100,50")},500);
        setTimeout(function(){setState(ID_LIGHT_TESSA_NACHTISCHLAMPE_HSB,"63,100,50")},1000);
    }
});



function Sleep(milliseconds) {
 return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function Farbwechsel() {
    var colorcounter=0
    while(Farbwechsel_aktiv)
    {
        if (colorcounter == 360) colorcounter=1;
        colorcounter = colorcounter+1;
        setState(ID_LIGHT_TESSA_NACHTISCHLAMPE_HSB,colorcounter+",100,"+getState(ID_LIGHT_TESSA_NACHTISCHLAMPE_DIMMER).val);
        await Sleep(70); 
    }
}
