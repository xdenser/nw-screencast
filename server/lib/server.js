/**
 * Created with JetBrains WebStorm.
 * User: khanzhiyev
 * Date: 23.10.14
 * Time: 10:30
 * To change this template use File | Settings | File Templates.
 */
var
    http = require('http'),
    shoe = require('shoe'),
    dnode = require('dnode'),
    path = require('path'),
    EventEmitter = require('events').EventEmitter,
    estatic = require('ecstatic')(__dirname+'/../../client'),
    server = http.createServer(estatic),
    events = new EventEmitter(),
    screenCast = require('../../module');


 server.listen(8080);
 var sock = shoe(function(stream){
     console.log('new client');
     var rc;
     var d = dnode({
          newClient: function(client,options,cb){
             console.log('new client call ',arguments);

             rc =  new screenCast.Connection({
                 dataChannel: screenCast.Transport.factory('dnode',{
                     remote:client,
                     width: options.width,
                     height: options.height
                 })
             });
             cb(rc.dataChannel.getLocal());
          }
     },{weak: false});
     d.pipe(stream).pipe(d);
     stream.on('close',function(){
         console.log('remote stream closed');
         rc.close();
     });
 });

sock.install(server,'/screen');


module.exports = events;
