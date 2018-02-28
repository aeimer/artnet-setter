var options = {
    host: '192.168.0.150'
}
 
var artnet = require('artnet')(options);
 
// set channel 1 to 255 and disconnect afterwards.
console.log("set");
artnet.set(1, 1, [255, 255, 255], function (err, res) {
    console.log("bye");
    artnet.close();
});
