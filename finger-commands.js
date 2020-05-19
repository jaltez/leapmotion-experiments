var Cylon = require('cylon');
var _ = require('lodash');

Cylon.robot({
    connections: {
        leapmotion: { adaptor: 'leapmotion' }
    },

    devices: {
        leapmotion: { driver: 'leapmotion' }
    },

    work: function (my) {
        my.leapmotion.on('hand', _.throttle(function (hand) {
            console.log(
                "\n- fingers -"
                + "\n0: " + hand.fingers[0].extended
                + "\n1: " + hand.fingers[1].extended
                + "\n2: " + hand.fingers[2].extended
                + "\n3: " + hand.fingers[3].extended
                + "\n4: " + hand.fingers[4].extended
            );
        }, 500));

        my.leapmotion.on('gesture', _.throttle(function (gesture) {
            console.log("\n ! gesture: " + gesture.type);
        }, 500));
    }
}).start();
