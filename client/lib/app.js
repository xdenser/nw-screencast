/**
 * Created with JetBrains WebStorm.
 * User: khanzhiyev
 * Date: 23.10.14
 * Time: 13:51
 * To change this template use File | Settings | File Templates.
 */

var shoe = require('shoe'),
    dnode = require('dnode'),
    stream ,
    screenCast = require('../../module'),
    rtcConnection;


exports.connect = function(){
    stream = shoe('/screen');
    var d = dnode();
    d.on('remote', function (remote) {
        var conn = screenCast.Transport.factory('dnode',{});
            rtcConnection = new screenCast.Connection({
                video: exports.video,
                dataChannel: conn
            });
        remote.newClient(conn.getLocal(),{
            width: exports.video.width,
            height: exports.video.height
        },function(remote){
            conn.remote = remote;
        });
    });
    d.pipe(stream).pipe(d);
}

exports.disconnect = function(){
    if(rtcConnection) rtcConnection.close();
    stream.end();
    rtcConnection = null;
    stream = null;
}


