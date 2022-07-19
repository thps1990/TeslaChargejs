
on({id: "fritzbox.0.calls.ringLastMissedNumber"}, function(){
    
 sendTo('telegram', 'Ein neuer verpasster Anruf von der Telefonnummer ' + getState("fritzbox.0.calls.ringLastMissedNumber").val);
 
    
});