var SerialPort = require('serialport')
var request = require('request')
var port = new SerialPort('/dev/ttyAMA0', { baudRate: 9600 })

var pm25Array = []

port.on('data', function (data) {
   if (data.toString('hex').indexOf('424d001c') !== -1) {
        request.post({ url:'http://api.buximai.com/air/create', form: { code: pm25Array.join('') }}, function (err) {
            if (err) {
                return console.error('upload failed:', err);
            }
        });
        pm25Array = []
    }
    pm25Array.push(data.toString('hex'))
})