function createNotification(NotificationText) {
    sendTo("telegram", "send", { text: "@Torsten " + NotificationText });
}

on({id: /^system\.adapter\..+\.alive$/, change: 'ne', val: false}, function(dp) {

    var id = dp.id.split('.');
    id = 'system.adapter.' + id[2] + '.' + id[3];

    var instance = getObject(id);
    var ignoreList= ["kodi.0.alive","daswetter.0 alive"];
    
    if ( !ignoreList.includes(dp.common.name)) {
        if(instance.common.enabled) {
            createNotification(dp.common.name);
        }
}});