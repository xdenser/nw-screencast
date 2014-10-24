/**
 * Created with JetBrains WebStorm.
 * User: khanzhiyev
 * Date: 23.10.14
 * Time: 18:21
 * To change this template use File | Settings | File Templates.
 */

var
    Common = require('./common'),
    util = require('util');

util.inherits(ServingConnection,Common);
function ServingConnection(options){
   Common.call(this,options);

   console.log('screen size',{
       w:window.screen.width,
       h:window.screen.height
   });
   window.navigator.webkitGetUserMedia({
        video: {
            mandatory: {
                chromeMediaSource: 'screen'
                ,maxWidth: options.width||window.screen.width
                ,maxHeight: options.height||window.screen.height
                ,minWidth: options.width||window.screen.width
                ,minHeight: options.height||window.screen.height
                ,minFrameRate: options.minFramerate||1
                ,maxFrameRate: options.maxFramerate||25
            }
        }
    }, function (stream) {
        this.stream = stream;
        this.peerConnection.addStream(stream);
   }.bind(this),this.error)
}

module.exports = ServingConnection;