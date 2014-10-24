/**
 * Created with JetBrains WebStorm.
 * User: khanzhiyev
 * Date: 23.10.14
 * Time: 18:27
 * To change this template use File | Settings | File Templates.
 */
var
    Common = require('./common'),
    util = require('util');

util.inherits(ReceivingConnection,Common);
function ReceivingConnection(options){
   Common.call(this,options);
   this.video = options.video;
}
ReceivingConnection.prototype.addStream = function(stream){
   this.video.src = window.URL.createObjectURL(stream);
}

module.exports = ReceivingConnection;
