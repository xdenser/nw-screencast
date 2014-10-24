/**
 * Created with JetBrains WebStorm.
 * User: khanzhiyev
 * Date: 23.10.14
 * Time: 18:54
 * To change this template use File | Settings | File Templates.
 */

var
    Transport = require('../transport'),
    util = require('util');

util.inherits(HTTPtransport,Transport);
Transport.register('http',HTTPtransport);

function HTTPtransport(options){
   Transport.call(this);
   this.queue = [];
}

HTTPtransport.prototype.sendSDPObject = function(sdp){
    this.queue.push({ type: 'sdp', data: sdp});
}

HTTPtransport.prototype.sendCandidateObj = function(candidate){
   this.queue.push({ type: 'candidate', data: candidate});
}

HTTPtransport.prototype.processGet = function(req,res){
    var q = this.queue;
    this.queue = [];
    res.end(q);
}

HTTPtransport.prototype.processPost = function(req,res,next){
    if(req.body.type=='sdp') {
        this.receiveSDPObject(req.body.data);
        res.end();
    }
    if(req.body.type =='candidate') {
        this.receiveCandidateObject(req.body.data);
        res.end();
    }
}

module.exports = HTTPtransport;



