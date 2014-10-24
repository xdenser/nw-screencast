/**
 * Created with JetBrains WebStorm.
 * User: khanzhiyev
 * Date: 23.10.14
 * Time: 19:13
 * To change this template use File | Settings | File Templates.
 */
var
    $ = require('jquery');

var
    Transport = require('../transport'),
    util = require('util');

util.inherits(HTTPtransport,Transport);
Transport.register('http',HTTPtransport);

function HTTPtransport(options){
    Transport.call(this);
    this.url = options.url;
    this.pollinterval = options.pollinterval||500;
    this.poll();
}

HTTPtransport.prototype.poll = function(){
    $.get(this.url,function(data){
        if(data && data.length){
            var msg;
            while(msg = data.shift()){
                if(msg.type=='sdp') this.receiveSDPObject(msg.data);
                if(msg.type=='candidate') this.receiveCandidateObject(msg.data);
            }
        }
        setTimeout(this.poll.bind(this),this.pollinterval);
    });
}

HTTPtransport.prototype.sendJSON = function(obj){
    $.ajax({
        type: 'POST',
        utl: this.url,
        dataType:'json',
        data: JSON.stringify(obj)
    });
}

HTTPtransport.prototype.sendSDPObject = function(sdp){
    this.sendJSON({type:'sdp',data:sdp});
}

HTTPtransport.prototype.sendCandidateObj = function(candidate){
    this.sendJSON({type:'candidate',data:candidate});
}

