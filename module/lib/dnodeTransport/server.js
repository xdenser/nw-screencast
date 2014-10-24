/**
 * Created with JetBrains WebStorm.
 * User: khanzhiyev
 * Date: 23.10.14
 * Time: 19:31
 * To change this template use File | Settings | File Templates.
 */
var
    Transport = require('../transport'),
    util = require('util');

util.inherits(DnodeTransport,Transport);
Transport.register('dnode',DnodeTransport);

function DnodeTransport(options){
    Transport.call(this);
    this.remote = options.remote;
}

DnodeTransport.prototype.sendSDPObject = function(sdp){
    this.remote.sdp(sdp);
}

DnodeTransport.prototype.sendCandidateObj = function(candidate){
    this.remote.candidate(candidate);
}

DnodeTransport.prototype.getLocal = function(){
    return {
        sdp: this.receiveSDPObject.bind(this),
        candidate: this.receiveCandidateObject.bind(this)
    };
}

module.exports = DnodeTransport;

