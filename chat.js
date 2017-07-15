var gui;
var win;
var peer;
var conn;
var myID;
var friendID;
var configfile;


$(document).ready (function () {
  gui = require("nw.gui");
  win = gui.Window.get();

  $.getJSON( "config.json", function( data ) {
    configfile = data;
  });

  peer = new Peer({
    key: '3q1i7lsqpvoenrk9',
    config: configfile
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
