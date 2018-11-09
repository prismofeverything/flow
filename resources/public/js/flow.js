// establish the various constants used in the visualization
TAU = 2 * Math.PI;
INVERSE_TAU = 1.0 / TAU;
VISUALIZATION_WIDTH = 1000;

// generate a uuid
function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// find the closest rotation between two points on a circle (0..TAU)
function relativeRotation(before, after) {
  var above = after - before;
  var below = after < before ? (after + TAU) - before : after - (before + TAU);
  return Math.abs(above) < Math.abs(below) ? above : below;
}

// translate a given theta into degrees
function rotationTransform(theta) {
  return (TAU - theta) * INVERSE_TAU * 360;
}


// initialize the visualization
function bootFlow(flow) {
  var flow = {};
  // set up SVG
  var draw = Snap('#flow');

  // initialize websockets
  var socket = new WebSocket('ws://localhost:33332/ws');

  // initialize keyboard tracking
  var keyboard = initializeKeyboard();

  // generate color scales
  var colors = buildColorScales([1], 7, 5, 4);

  // set up flow state
  flow.draw = draw;
  flow.socket = socket;
  flow.send = function(message) {
    console.log(message);
    socket.send(JSON.stringify(message))
  }

  flow.colors = colors;
  flow.keyboard = keyboard;

  // add event listeners
  socket.addEventListener('open', function(event) {
    socket.send(JSON.stringify({'event': 'INITIALIZE'}));
  });

  socket.addEventListener('message', function(event) {
    var data = JSON.parse(event.data)
    console.log(data);

    if (data['flow-events']) {
      console.log('flow event!: ' + data)
    }
  });

  return flow;
}
