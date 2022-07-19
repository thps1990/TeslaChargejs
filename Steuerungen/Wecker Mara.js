const ID_LIGHT_MARA_WECKER_BTN_DISPLAY = ID_LIGHT_MARA_WECKER+ ".Button1_Action";
const ID_LIGHT_MARA_WECKER_BTN_POWER   = ID_LIGHT_MARA_WECKER+ ".Button2_Action";
const ID_LIGHT_MARA_WECKER_BTN_COLOR   = ID_LIGHT_MARA_WECKER+ ".Button3_Action";
const ID_LIGHT_MARA_WECKER_HSB         = ID_LIGHT_MARA_WECKER+ ".HSBColor";
const ID_LIGHT_MARA_WECKER_DIMMER      = ID_LIGHT_MARA_WECKER+ ".Dimmer";
const ID_LIGHT_MARA_WECKER_DISPLAYTEXT = ID_LIGHT_MARA_WECKER+".DisplayText";
const ID_LIGTH_MARA_WECKER_BEEZER      =  ID_LIGHT_MARA_WECKER+ ".POWER1";
const ID_LIGTH_MARA_WECKER_ALIVE      =  ID_LIGHT_MARA_WECKER+ ".alive";

var Farbwechsel_aktiv,Displaymode,counter,entprell,isringing,HSBColors,maxlenght, isNachtlicht;
init();
setDisplayTime();

function init()
{
    console.log("Init");
    Farbwechsel_aktiv =false;
    Displaymode = 1;
    counter = 0;
    entprell = 0;
    isringing = false;
    HSBColors = ['1,0','1,64', '60,100', '125,73', '167,100', '229,100','271,100', '359,100' ]
    isNachtlicht=false;
    maxlenght = HSBColors.length-1;
    setState(ID_LIGHT_MARA_WECKER_DISPLAY_POWER,true);
    setDisplayTime();
}

function beep()
{
    setState(ID_LIGTH_MARA_WECKER_BEEZER,true);
    setStateDelayed(ID_LIGTH_MARA_WECKER_BEEZER,false,75);
}

function ringoff()
{
    isringing=false;
    setStateDelayed(ID_LIGHT_MARA_WECKER_SPITZE_LINKS,true,1000);
    setStateDelayed(ID_LIGHT_MARA_WECKER_SPITZE_OBEN,true,1000);
    setStateDelayed(ID_LIGHT_MARA_WECKER_SPITZE_RECHTS,true,1000);
    setState(ID_LIGHT_MARA_WECKER_HSB,"59,100,100");
}

async function ring()
{
    var sleeptime=2000;
    var beepit=false;
    var blinkit = false;
    isringing=true;
    setState(ID_LIGHT_MARA_WECKER_SPITZE_LINKS,false);
    setState(ID_LIGHT_MARA_WECKER_SPITZE_RECHTS,false);
    setState(ID_LIGHT_MARA_WECKER_SPITZE_OBEN,false);
    setState(ID_LIGHT_MARA_WECKER_DISPLAY_POWER, true);
    Displaymode=1;
    setState(ID_LIGHT_MARA_WECKER_HSB,"59,100,20");


    setTimeout(function(){if(isringing){setState(ID_LIGHT_MARA_WECKER_HSB,"59,100,25");}},15000);
    setTimeout(function(){if(isringing){setState(ID_LIGHT_MARA_WECKER_HSB,"59,100,30");}},25000);
    setTimeout(function(){if(isringing){setState(ID_LIGHT_MARA_WECKER_HSB,"59,100,35");}},35000);
    setTimeout(function(){if(isringing){setState(ID_LIGHT_MARA_WECKER_HSB,"59,100,40");}},45000);
    setTimeout(function(){if(isringing){setState(ID_LIGHT_MARA_WECKER_HSB,"59,100,45");}},55000);
    setTimeout(function(){if(isringing){setState(ID_LIGHT_MARA_WECKER_HSB,"59,100,50");}},65000);
    setTimeout(function(){if(isringing){setState(ID_LIGHT_MARA_WECKER_HSB,"59,100,55");}},75000);
    setTimeout(function(){if(isringing){setState(ID_LIGHT_MARA_WECKER_HSB,"59,100,60");}},85000);
    setTimeout(function(){if(isringing){setState(ID_LIGHT_MARA_WECKER_HSB,"59,100,65");}},95000);
    setTimeout(function(){if(isringing){setState(ID_LIGHT_MARA_WECKER_HSB,"59,100,70");}},105000);
    setTimeout(function(){if(isringing){setState(ID_LIGHT_MARA_WECKER_HSB,"59,100,75");}},115000);
    setTimeout(function(){if(isringing){setState(ID_LIGHT_MARA_WECKER_HSB,"59,100,80");}},125000);
    setTimeout(function(){if(isringing){setState(ID_LIGHT_MARA_WECKER_HSB,"59,100,85");}},135000);
    setTimeout(function(){if(isringing){setState(ID_LIGHT_MARA_WECKER_HSB,"59,100,90");}},145000);
    setTimeout(function(){if(isringing){setState(ID_LIGHT_MARA_WECKER_HSB,"59,100,95");}},155000);
    setTimeout(function(){
        if(isringing){
            setState(ID_LIGHT_MARA_WECKER_HSB,"59,100,100");
            blinkit=true;
        }
    },165000);
    setTimeout(function(){if(isringing){beepit=true;}},185000);
    setTimeout(function(){if(isringing){sleeptime=1000;}},195000);
    setTimeout(function(){if(isringing){sleeptime=500;}},210000);
    setTimeout(function(){if(isringing){sleeptime=250;}},220000);
    setTimeout(function(){if(isringing){ringoff();}},245000);
    
    while(isringing)
    {
        if(beepit)
        {
            setState(ID_LIGHT_MARA_WECKER_STRIPE_POWER, !getState(ID_LIGHT_MARA_WECKER_STRIPE_POWER).val);
            beep();
        }
        if(blinkit)
        {
            if(getState(ID_LIGHT_MARA_WECKER_SPITZE_LINKS).val)
            {
                setState(ID_LIGHT_MARA_WECKER_SPITZE_LINKS,false);
                setState(ID_LIGHT_MARA_WECKER_SPITZE_OBEN,true);
            }else if(getState(ID_LIGHT_MARA_WECKER_SPITZE_OBEN).val)
            {
                setState(ID_LIGHT_MARA_WECKER_SPITZE_OBEN,false);
                setState(ID_LIGHT_MARA_WECKER_SPITZE_RECHTS,true);
            }
            else
            {
                setState(ID_LIGHT_MARA_WECKER_SPITZE_RECHTS,false);
                setState(ID_LIGHT_MARA_WECKER_SPITZE_LINKS,true);
            }
        }
        await Sleep(sleeptime); 
    }
}

function Nachtlicht()
{
    setState(ID_LIGHT_MARA_WECKER_SPITZE_LINKS,false);
    setState(ID_LIGHT_MARA_WECKER_SPITZE_RECHTS,false);
    setState(ID_LIGHT_MARA_WECKER_SPITZE_OBEN,false);
    setState(ID_LIGHT_MARA_WECKER_DISPLAY_POWER, false);
    setState(ID_LIGHT_MARA_WECKER_HSB, "1,0,50");
    isNachtlicht=true;
    var Nachtlicht_Zeit=getState("0_userdata.0.Virtuelle_Schalter.iZeitNachtlicht").val;

    var timespans = (Nachtlicht_Zeit *60000 ) / 10;

    console.log("Timespans" + timespans);

    setTimeout(function(){if(isNachtlicht){setState(ID_LIGHT_MARA_WECKER_HSB, "1,0,45");}},timespans);
    setTimeout(function(){if(isNachtlicht){setState(ID_LIGHT_MARA_WECKER_HSB, "1,0,40");}},timespans*2);
    setTimeout(function(){if(isNachtlicht){setState(ID_LIGHT_MARA_WECKER_HSB, "1,0,35");}},timespans*3);
    setTimeout(function(){if(isNachtlicht){setState(ID_LIGHT_MARA_WECKER_HSB, "1,0,30");}},timespans*4);
    setTimeout(function(){if(isNachtlicht){setState(ID_LIGHT_MARA_WECKER_HSB, "1,0,25");}},timespans*5);
    setTimeout(function(){if(isNachtlicht){setState(ID_LIGHT_MARA_WECKER_HSB, "1,0,20");}},timespans*6);
    setTimeout(function(){if(isNachtlicht){setState(ID_LIGHT_MARA_WECKER_HSB, "1,0,15");}},timespans*7);
    setTimeout(function(){if(isNachtlicht){setState(ID_LIGHT_MARA_WECKER_HSB, "1,0,10");}},timespans*8);
    setTimeout(function(){if(isNachtlicht){setState("0_userdata.0.Virtuelle_Schalter.bMaraWecker_Licht",false);isNachtlicht=false;}},timespans*9);



}

function setDisplayTime(wake=false)
{
        if(!wake)
        {
            var d = new Date(); 

            var minuten = d.getMinutes().toString() ;
            var stunden = d.getHours().toString() ;

            if (d.getMinutes() < 10)
            {
                minuten = "0" + minuten; 
            }
            
            if (d.getHours() < 10)
            {
                stunden = "0" + stunden; 
            }
            setState(ID_LIGHT_MARA_WECKER_DISPLAYTEXT, "[zc1l2f0s3] "+ stunden +":" +minuten);
        }
        else
        {
            if(getState("0_userdata.0.Virtuelle_Schalter.bMaraWeckeraktiv").val)
            {
                var minutenW = getState("0_userdata.0.Virtuelle_Schalter.iMaraWeckerMinuten").val;
                var stundenW = getState("0_userdata.0.Virtuelle_Schalter.iMaraWeckerStunden").val;

                if (minutenW < 10)
                {
                    minutenW = "0" + minutenW; 
                }
            
                if (stundenW < 10)
                {
                    stundenW = "0" + stundenW; 
                }

                setState(ID_LIGHT_MARA_WECKER_DISPLAYTEXT, "[zc1l2f0s3] " +stundenW +":" + minutenW);
                setState(ID_LIGHT_MARA_WECKER_DISPLAYTEXT, "[c1l4f0s2]    Wecker");
            }
            else
            {
                setState(ID_LIGHT_MARA_WECKER_DISPLAYTEXT, "[zc1l3f0s2]Wecker aus");
            }

        }
}

function setDisplayTemp(ext=false)
{
    if(ext==false)
    {
        setState(ID_LIGHT_MARA_WECKER_DISPLAYTEXT, "[zc1l2f0s3] " + getState(ID_TEMP_MARA).val + " C");
        setState(ID_LIGHT_MARA_WECKER_DISPLAYTEXT, "[c1l4f0s2]    Innen");
    }else
    {
        setState(ID_LIGHT_MARA_WECKER_DISPLAYTEXT,"[zc1l2f0s3] " + getState(ID_TEMP_AUSSEN).val + " C" );
        setState(ID_LIGHT_MARA_WECKER_DISPLAYTEXT, "[c1l4f0s2]    Aussen");
    }
}

function Sleep(milliseconds) {
 return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function Farbwechsel() {
    var colorcounter=0
    while(Farbwechsel_aktiv)
    {
        if (colorcounter >= 360) colorcounter=1;
    
        colorcounter = colorcounter+2;
        setState(ID_LIGHT_MARA_WECKER_HSB,colorcounter+",100,"+getState(ID_LIGHT_MARA_WECKER_DIMMER).val);
        await Sleep(200); 
    }
}

on({id:ID_LIGHT_MARA_WECKER_BTN_DISPLAY,val:'SINGLE'}, function(obj){
    if(isringing) ringoff(); 
    if(Farbwechsel_aktiv)Farbwechsel_aktiv=false;
    if(!getState(ID_LIGHT_MARA_WECKER_DISPLAY_POWER).val) setState(ID_LIGHT_MARA_WECKER_DISPLAY_POWER,true);

    if(Displaymode < 4)
    {
        Displaymode = Displaymode + 1
    }
    else
    {
        Displaymode = 0;
        setState(ID_LIGHT_MARA_WECKER_DISPLAY_POWER,false);
    }

    if(Displaymode==1)
    {
        setState(ID_LIGHT_MARA_WECKER_DISPLAY_POWER,true);
        setDisplayTime();
    }else if(Displaymode==2)
    {
        setDisplayTime(true);

    }
    else if(Displaymode==3)
    {
        setDisplayTemp();
    }
    else if (Displaymode==4)
    {
        setDisplayTemp(true);
    }
});

on({id:ID_LIGHT_MARA_WECKER_BTN_DISPLAY,val:'DOUBLE'}, function(obj){
    if(Farbwechsel_aktiv)Farbwechsel_aktiv=false;
    if(!entprell )
    {
 
        entprell=1;
        setTimeout(function(){entprell = 0},200);
        var Weckeraktiv=!getState("0_userdata.0.Virtuelle_Schalter.bMaraWeckeraktiv").val
        setState("0_userdata.0.Virtuelle_Schalter.bMaraWeckeraktiv", Weckeraktiv);
        setTimeout(function(){setDisplayTime(true);Displaymode=2},500);
        setTimeout(function(){setDisplayTime();Displaymode=1},30000);

        if(Weckeraktiv)
        {
            beep();
            setState(ID_LIGHT_MARA_WECKER_SPITZE_LINKS,false);
            setState(ID_LIGHT_MARA_WECKER_SPITZE_OBEN,false);
            setState(ID_LIGHT_MARA_WECKER_SPITZE_RECHTS,false);

            setTimeout(function(){setState(ID_LIGHT_MARA_WECKER_SPITZE_LINKS,true)},1500);
            setTimeout(function(){setState(ID_LIGHT_MARA_WECKER_SPITZE_OBEN,true)},1750);
            setTimeout(function(){setState(ID_LIGHT_MARA_WECKER_SPITZE_RECHTS,true)},2000);
            setTimeout(function(){setState(ID_LIGHT_MARA_WECKER_SPITZE_LINKS,false)},2500);
            setTimeout(function(){setState(ID_LIGHT_MARA_WECKER_SPITZE_OBEN,false)},2750);
            setTimeout(function(){setState(ID_LIGHT_MARA_WECKER_SPITZE_RECHTS,false)},3000);

            if(getState("0_userdata.0.Virtuelle_Schalter.bMaraWecker_Licht").val)
            {
                setTimeout(function(){setState(ID_LIGHT_MARA_WECKER_SPITZE_RECHTS,true)},3500);
                setTimeout(function(){setState(ID_LIGHT_MARA_WECKER_SPITZE_OBEN,true)},3750);
                setTimeout(function(){setState(ID_LIGHT_MARA_WECKER_SPITZE_LINKS,true)},4000);
            }
        }
        else
        {
            setState(ID_LIGHT_MARA_WECKER_SPITZE_LINKS,false);
            setState(ID_LIGHT_MARA_WECKER_SPITZE_OBEN,false);
            setState(ID_LIGHT_MARA_WECKER_SPITZE_RECHTS,false);
            setTimeout(function(){setState(ID_LIGHT_MARA_WECKER_SPITZE_LINKS,true)},500);
            setTimeout(function(){setState(ID_LIGHT_MARA_WECKER_SPITZE_OBEN,true)},500);
            setTimeout(function(){setState(ID_LIGHT_MARA_WECKER_SPITZE_RECHTS,true)},500);
            setTimeout(function(){setState(ID_LIGHT_MARA_WECKER_SPITZE_LINKS,false)},1000);
            setTimeout(function(){setState(ID_LIGHT_MARA_WECKER_SPITZE_OBEN,false)},1000);
            setTimeout(function(){setState(ID_LIGHT_MARA_WECKER_SPITZE_RECHTS,false)},1000);
                        if(getState("0_userdata.0.Virtuelle_Schalter.bMaraWecker_Licht").val)
            {
                setTimeout(function(){setState(ID_LIGHT_MARA_WECKER_SPITZE_LINKS,true)},1500);
                setTimeout(function(){setState(ID_LIGHT_MARA_WECKER_SPITZE_OBEN,true)},1500);
                setTimeout(function(){setState(ID_LIGHT_MARA_WECKER_SPITZE_RECHTS,true)},1500);
            }
            beep();
            setTimeout(function(){beep()},500);

        }
    }
});

on({id:ID_LIGHT_MARA_WECKER_BTN_POWER,val:'DOUBLE'}, function(obj){
    if(isNachtlicht)isNachtlicht=false;
    if(Farbwechsel_aktiv)Farbwechsel_aktiv=false;
    if(isringing) ringoff(); 
    if(getState(ID_LIGHT_MARA_WECKER_STRIPE_POWER).val)
    {
        if(getState(ID_LIGHT_MARA_WECKER_DIMMER).val < 50)
        {
            setState("0_userdata.0.Virtuelle_Schalter.bMaraWecker_Licht",false);
        }else if(getState(ID_LIGHT_MARA_WECKER_DIMMER).val < 70)
        {
            setState(ID_LIGHT_MARA_WECKER_DIMMER,30);
        }else if(getState(ID_LIGHT_MARA_WECKER_DIMMER).val < 100)
        {
            setState(ID_LIGHT_MARA_WECKER_DIMMER,50);
        }else
        {
            setState(ID_LIGHT_MARA_WECKER_DIMMER,70);
        }

    }else
    {
         setState("0_userdata.0.Virtuelle_Schalter.bMaraWecker_Licht",true);
         setState(ID_LIGHT_MARA_WECKER_DIMMER,100);

    }
});

on({id:ID_LIGHT_MARA_WECKER_BTN_POWER,val:'SINGLE'}, function(obj){

    if(isNachtlicht)isNachtlicht=false;
    if(Farbwechsel_aktiv)Farbwechsel_aktiv=false;
    if(isringing) ringoff(); 

    if(getState("0_userdata.0.Virtuelle_Schalter.bMaraWecker_Licht").val)
    {
        setState("0_userdata.0.Virtuelle_Schalter.bMaraWecker_Licht",false);
        Farbwechsel_aktiv = false;
    }else
    {
        if(!getState(ID_LIGHT_MARA_WECKER_DISPLAY_POWER).val) setState(ID_LIGHT_MARA_WECKER_DISPLAY_POWER,true);
         setState("0_userdata.0.Virtuelle_Schalter.bMaraWecker_Licht",true);
         setState(ID_LIGHT_MARA_WECKER_DIMMER,100);

    }
});


on({id:ID_LIGHT_MARA_WECKER_BTN_COLOR ,val: 'SINGLE'}, function(obj){
    if(isNachtlicht)isNachtlicht=false;
    
    if(isringing) ringoff(); 
    if(!entprell )
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
        setState(ID_LIGHT_MARA_WECKER_HSB, HSBColors[counter]+","+getState(ID_LIGHT_MARA_WECKER_DIMMER).val);
    }
});

on({id:ID_LIGHT_MARA_WECKER_BTN_COLOR ,val: 'DOUBLE'}, function(obj){
    if(isNachtlicht)isNachtlicht=false;
    if(isringing) ringoff(); 
    if(entprell==0)
    {
        entprell=1;
        setTimeout(function(){entprell = 0},200);
        if(Farbwechsel_aktiv==true)
        {
            Farbwechsel_aktiv = false;
        }
        else
        {
            Farbwechsel_aktiv = true;
            Farbwechsel();
        }
    }
});


on({id:ID_LIGHT_MARA_WECKER_BTN_COLOR ,val: 'TRIPLE'}, function(obj){
    if(Farbwechsel_aktiv)Farbwechsel_aktiv=false;
    if(isringing) ringoff(); 
    Nachtlicht();
  
});

on({id: ID_BTN_MARA + ".long_click" , val:true}, function(obj){

    setState(ID_LIGHTSH_LICHT_LED_STRIPE,false);
    setState(ID_LIGHTSH_LICHT_SPOTS,false);

    Nachtlicht();

} );

on({id:ID_TEMP_MARA,change:'ne'}, function(obj){
    if(Displaymode==3)
    {
        setDisplayTemp();
    }
});

on({id:ID_LIGTH_MARA_WECKER_ALIVE,change:'ne'}, function(obj){
    init();
});

on({id:"0_userdata.0.Virtuelle_Schalter.bMaraWecker_Wecken_WE",val:false}, function(obj){
    if(isringing)ringoff();
});

on({id:ID_TEMP_AUSSEN,change:'ne'}, function(obj){
    if(Displaymode==4)
    {
        setDisplayTemp(true);
    }
});


on({id:"0_userdata.0.Virtuelle_Schalter.bMaraWecker_Licht",change:'any'}, function(obj){
    if(getState("0_userdata.0.Virtuelle_Schalter.bMaraWecker_Licht").val)
    {
        setState(ID_LIGHT_MARA_WECKER_STRIPE_POWER,true);
        setState(ID_LIGHT_MARA_WECKER_SPITZE_LINKS,true);
        setState(ID_LIGHT_MARA_WECKER_SPITZE_RECHTS,true);
        setState(ID_LIGHT_MARA_WECKER_SPITZE_OBEN,true);
    }else
    {
        setState(ID_LIGHT_MARA_WECKER_STRIPE_POWER,false);
        setState(ID_LIGHT_MARA_WECKER_SPITZE_LINKS,false);
        setState(ID_LIGHT_MARA_WECKER_SPITZE_RECHTS,false);
        setState(ID_LIGHT_MARA_WECKER_SPITZE_OBEN,false);
    }

});
schedule("* * * * *", function () {
    if(getState("0_userdata.0.Virtuelle_Schalter.bMaraWeckeraktiv").val)
    {
        var d = new Date(); 
        var minuten = d.getMinutes();
        var stunden = d.getHours();
        var WeckenWE = getState("0_userdata.0.Virtuelle_Schalter.bMaraWecker_Wecken_WE").val;
        if(WeckenWE || (!WeckenWE && d.getDay() < 6))
        {
            if(stunden == getState("0_userdata.0.Virtuelle_Schalter.iMaraWeckerStunden").val && minuten == getState("0_userdata.0.Virtuelle_Schalter.iMaraWeckerMinuten").val && !isringing)
            {
                ring();
            }
        }
    }

    if(Displaymode==1)
    {
        setDisplayTime();
    }
});