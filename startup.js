var options = {
    host: '127.0.0.1'
}
 
var artnet = require('artnet')(options);

var universum = 1;
var fadeTime = 3000;
var updateRate = 50;
var startTime = new Date().getTime();
var target = [
100,255,175,10,0,0,0,0,
100,255,175,10,0,0,0,0,
100,255,175,10,0,0,0,0,
255,230,0,255,100,0,0,0,
];

var fnc = function() {
    var tDiff = (new Date().getTime()) - startTime;
//    console.log(tDiff);
    if (tDiff > fadeTime) {
        artnet.set(universum, 1, target, function(err, res) {
            artnet.close();
            process.exit();
        });
    }
    var factor = tDiff / 3000;
    var targetTmp = target;
    targetTmp = targetTmp.map(x => {
        x = x * factor;
        x = x > 255 ? 255 : x;
        return Math.round(x);
    });
//    console.log(targetTmp);
    artnet.set(universum, 1, targetTmp, function(err, res) {
        artnet.send();
        setTimeout(fnc, updateRate);
    });
}

fnc();
