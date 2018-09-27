var XBee = require('./digimesh')

var xbee = new XBee(
      {
        device: '/dev/tty.usbserial-AC01P9X7',
        baud: 9600,
        always_fire_event: true,
      }, () => {
        console.log('Device is ready')
        // do stuff
      })

xbee.get_ni_string(function(err, data) {
    if (err) return console.err(err);
    console.log("my NI is '" + data.ni + "'");
});

// set node identifier string
xbee.set_ni_string('my_xbee_name', function(err, data) {
    if (err) return console.err(err);

    // print the human-friendly version
    console.log(xbee.AT_COMMAND_RESPONSE_STATUS_STRINGS[data.status]);

    // check based on the constants
    if (data.status === xbee.AT_COMMAND_RESPONSE_STATUS_OK)
        console.log('it worked');
    else {
        // do something
    }
});

xbee.on('open', data => {
  console.log('open event')
  console.log(data)
})
xbee.on('close', data => {
  console.log('close event')
  console.log(data)
})
xbee.on('error', data => {
  console.log('error event')
  console.log(data)
})
xbee.on('message_received', data => {
  console.log('message_received event')
  console.log(data)
})
xbee.on('modem_status', data => {
  console.log('modem_status event')
  console.log(data)
})
xbee.on('node_discovered', data => {
  console.log('node_discovered event')
  console.log(data)
})

// xbee.discover_nodes()

xbee.send_message({
    data: new Buffer(10),
    addr: '0013A200418501EF',
    broadcast: false,
  })

console.log('End');
