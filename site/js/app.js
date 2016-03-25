$(function () {
    $(".gridster ul").gridster({
        widget_base_dimensions: [460, 115],
        widget_margins: [5, 5],
        min_cols: 4,
        max_cols: 4,
        min_rows: 9,
        max_rows: 9
    }).width("auto");
        
    var url = window.location.href;
    socket = io(url);
    
    socket.on('connected', function () {
        //console.log('connected');
    });
    
    socket.on('refreshPage', function () {
        console.log('received refresh page command');
        location.reload(true);
    });

    socket.on('*', function (msg) {
        //console.log('Received Message: ' + JSON.stringify(msg));
    })
});