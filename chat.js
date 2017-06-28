var gui;
var win;
var peer;
var conn;
var myID;
var friendID;



$(document).ready (function () {
  gui = require("nw.gui");
  win = gui.Window.get();
  peer = new Peer({
    key: '3q1i7lsqpvoenrk9',
    config: {'iceServers': [
      {url:'stun:stun01.sipphone.com'},
      {url:'stun:stun.ekiga.net'},
      {url:'stun:stun.fwdnet.net'},
      {url:'stun:stun.ideasip.com'},
      {url:'stun:stun.iptel.org'},
      {url:'stun:stun.rixtelecom.se'},
      {url:'stun:stun.schlund.de'},
      {url:'stun:stun.l.google.com:19302'},
      {url:'stun:stun1.l.google.com:19302'},
      {url:'stun:stun2.l.google.com:19302'},
      {url:'stun:stun3.l.google.com:19302'},
      {url:'stun:stun4.l.google.com:19302'},
      {url:'stun:stunserver.org'},
      {url:'stun:stun.softjoys.com'},
      {url:'stun:stun.voiparound.com'},
      {url:'stun:stun.voipbuster.com'},
      {url:'stun:stun.voipstunt.com'},
      {url:'stun:stun.voxgratia.org'},
      {url:'stun:stun.xten.com'},
      {
      	url: 'turn:numb.viagenie.ca',
      	credential: 'muazkh',
      	username: 'webrtc@live.com'
      },
      {
      	url: 'turn:192.158.29.39:3478?transport=udp',
      	credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
      	username: '28224511:1379330808'
      },
      {
      	url: 'turn:192.158.29.39:3478?transport=tcp',
      	credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
      	username: '28224511:1379330808'
      }
    ]}
  });
  peer.on('open', function(id) {
    $("#myID").val(id);
    myID = id;
    $("#chat-window").append("<p><b>*Your ID is "+id+"*</b></p>");
  });

  peer.on('connection', function(connect) {
    conn = connect;
    conn.on('open', function () {
      $("#chat-window").append("<p><b>*Connection started*</b></p>");
      conn.on('data', function(data) {
        $("#chat-window").append("<p><b>"+data["sender"]+":</b>"+data["message"]+"</p>");
      });
    });
  });


});

$("#send-button").click (function () {
  var send_message = $("#input").val();
  $("#chat-window").append("<p><b>"+myID+":</b>"+send_message+"</p>");
  conn.send({
    sender : myID,
    message : send_message
  });
});


$("#connect").click (function () {
  friendID = $("#connect-id").val();
  conn = peer.connect(friendID);
  conn.on('open', function () {
    $("#chat-window").append("<p><b>*Connection started*</b></p>");
    conn.on('data', function(data) {
      $("#chat-window").append("<p><b>"+data["sender"]+":</b>"+data["message"]+"</p>");
    });
  });
});


$("#fullscreen").click (function () {
  win.toggleFullscreen();
  if (win.isFullscreen){
    $("#fs").text("fullscreen");
  } else {
    $("#fs").text("fullscreen_exit");
  }
});

$("#exit").click (function () {
  win.close();
});
