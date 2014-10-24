/**
 * Created with JetBrains WebStorm.
 * User: khanzhiyev
 * Date: 23.10.14
 * Time: 17:54
 * To change this template use File | Settings | File Templates.
 */
var
    RTCPeerConnection =  window.mozRTCPeerConnection|| window.webkitRTCPeerConnection,
    RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription,
    RTCIceCandidate = window.RTCIceCandidate || window.mozRTCIceCandidate,
    defConfig = {
        'iceServers': []
    };


function ScreenConnection(options){
    this.config = defConfig;
    this.peerConnection = new RTCPeerConnection(this.config);
    this.dataChannel = options.dataChannel;

    this.peerConnection.onicecandidate = function (evt) {
        if(evt.candidate) {
            this.dataChannel.remote.candidate(evt.candidate);
        }
    }.bind(this);
    this.peerConnection.onaddstream = function (evt) {
        if(this.addStream) this.addStream(evt.stream);
    }.bind(this);

    this.peerConnection.onnegotiationneeded = function () {
        this.peerConnection.createOffer(this.localDescriptionCreated.bind(this), this.error.bind(this));
    }.bind(this);

    this.dataChannel.local = {
        sdp: function(sdp){
            this.peerConnection.setRemoteDescription(new RTCSessionDescription(sdp),function(){
                if(this.peerConnection.remoteDescription.type == 'offer'){
                    this.peerConnection.createAnswer(this.localDescriptionCreated.bind(this),this.error.bind(this));
                }
            }.bind(this),this.error.bind(this));
        }.bind(this),
        candidate: function(candidate){
            this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        }.bind(this),
        close: function(){
            this.close();
        }.bind(this)
    }
}

ScreenConnection.prototype.error = function(err){
    // error
}

ScreenConnection.prototype.localDescriptionCreated = function(desc){
    this.peerConnection.setLocalDescription(desc, function () {
        this.dataChannel.remote.sdp({
            type: this.peerConnection.localDescription.type,
            sdp: this.peerConnection.localDescription.sdp
        });
    }.bind(this));
}

ScreenConnection.prototype.close = function(){
   this.peerConnection.getLocalStreams().forEach(function(s){
       s.stop();
   });
   this.peerConnection.close();
}


module.exports = ScreenConnection;
