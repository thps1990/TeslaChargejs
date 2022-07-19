on({id:"octoprint.0.printjob.progress.completion",change: 'ne'}, function(obj){

    if(getState("octoprint.0.printjob.progress.completion").val == 50)
    {
        sendTo('telegram', "@Torsten Druck zu 50% abgschlossen");

    }else if(getState("octoprint.0.printjob.progress.completion").val == 100)
    {
        sendTo('telegram', "@Torsten Druck zu 100% abgschlossen");
    }

});