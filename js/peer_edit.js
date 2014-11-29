var conn;
// Compatibility shim
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
var myID = "sim"; //INSERT USER/SESSION ID HERE PLEASE!

var peer = new Peer( /*myID,*/ {key: '5nyu3ci7jomq85mi', debug: 3, config: {'iceServers': [
  { url: 'stun:stun.l.google.com:19302' } // Pass in optional STUN and TURN server for maximum network compatibility
]}});

peer.on('open', function (id){
    $('#pid').text(id);
});

peer.on('connection', connect);
function connect(c){
    conn=c;
    $('#rid').val(conn.peer);
    $('#rid').prop('disabled', true);
    $('#progBar').width('100%');
    conn.on('data', function (data){
  editor.getSession().setValue(data); 

    });


}
$(document).ready(function(){
    $('#connect').click(function(){
        $('#progBar').width('100%');
        var c=peer.connect($('#rid').val());
        c.on('open', function(){
            connect(c);
        });
    });

    $('#editor').keyup(function (e){
     
 //  conn.send($('#editor').text());
   conn.send(editor.getSession().getValue());

    });

});

// Receiving a call
peer.on('call', function(call){
  // Answer the call automatically (instead of prompting user) for demo purposes
  call.answer(window.localStream);
  step3(call);
});
peer.on('error', function(err){
  alert(err.message);
  // Return to step 2 if error occurs
  step2();
});

// Click handlers setup
$(function(){
  $('#connect').click(function(){
    // Initiate a call!
    var call = peer.call($('#rid').val(), window.localStream);

    step3(call);
  });

  $('#end-call').click(function(){
    window.existingCall.close();
    step2();
  });

  // Retry if getUserMedia fails
  $('#step1-retry').click(function(){
    $('#step1-error').hide();
    step1();
  });

  // Get things started
  step1();
});

function step1 () {
  // Get audio/video stream
  navigator.getUserMedia({audio: true, video: true}, function(stream){
    // Set your video displays
    $('#my-video').prop('src', URL.createObjectURL(stream));

    window.localStream = stream;
    step2();
  }, function(){ $('#step1-error').show(); });
}

function step2 () {
  $('#step1, #step3').hide();
  $('#step2').show();
}

function step3 (call) {
  // Hang up on an existing call if present
  if (window.existingCall) {
    window.existingCall.close();
  }

  // Wait for stream on the call, then set peer video display
  call.on('stream', function(stream){
    $('#their-video').prop('src', URL.createObjectURL(stream));
  });

  // UI stuff
  window.existingCall = call;
  $('#rid').text(call.peer);
  call.on('close', step2);
  $('#step1, #step2').hide();
  $('#step3').show();
}
  
  
function favBrowser()
{
var path = "ace/theme/";

var mylist=document.getElementById("myList");
var fullpath=path.concat(mylist.options[mylist.selectedIndex].text);
//document.getElementById("favorite").value=mylist.options[mylist.selectedIndex].text;
editor.setTheme(fullpath);
}
  
  
function favBrowser2()
{
var path = "ace/mode/";

var mylist=document.getElementById("myList2");
var fullpath=path.concat(mylist.options[mylist.selectedIndex].text);
//document.getElementById("favorite").value=mylist.options[mylist.selectedIndex].text;
editor.getSession().setMode(fullpath);
}

function downloadCode()
{
  //create file, put in editor contents, save to path in HREF of 'DownloadCode' (save it as something like "myID.txt")
}
