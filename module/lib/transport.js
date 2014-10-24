/**
 * Created with JetBrains WebStorm.
 * User: khanzhiyev
 * Date: 23.10.14
 * Time: 18:42
 * To change this template use File | Settings | File Templates.
 */

function MessagingTransport(){
    var self = this;
    this.remote = {
        sdp: function(sdpObj){
            self.sendSDPObject(sdpObj);
        },
        candidate:function(candidateObj){
            self.sendCandidateObj(candidateObj);
        }
    }
}

MessagingTransport.prototype.receiveSDPObject = function(sdpObj){
    if(this.local){
        this.local.sdp(sdpObj);
    }
}

MessagingTransport.prototype.receiveCandidateObject = function(candidateObj){
    if(this.local){
        this.local.candidate(candidateObj);
    }
}

MessagingTransport.prototype.sendSDPObject = function(){
    throw new Error('abstract !');
}

MessagingTransport.prototype.sendCandidateObj = function(){
    throw new Error('abstract !');
}

var registered = {};
MessagingTransport.register = function(transport,ctr){
    registered[transport] = ctr;
}
MessagingTransport.factory = function(transport,options){
    if(!registered[transport]) throw new Error('unknown transport '+transport);
    return new registered[transport](options);
}

module.exports = MessagingTransport;


