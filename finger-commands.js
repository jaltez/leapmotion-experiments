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
        var current_sign = '';
        var prev_sign    = '';
        var sign_count   = 0;
        var sign_limit   = 5;
        var executed     = false;

        my.leapmotion.on('hand', _.throttle(function (hand) {
            current_sign = _.map(hand.fingers, function(x){ return x.extended ? 1 : 0; }).join('')
            if(current_sign == prev_sign){
                process.stdout.write(".");
                sign_count++;
                if(sign_count == sign_limit && !executed) {
                    execute_sign(current_sign);
                    executed = true;
                    _.delay(function() { executed = false}, 2000 );
                }
            } else {
                process.stdout.write("\n- fingers: " + current_sign + " > ");
                sign_count = 0;
                executed   = false;
            }
            prev_sign = current_sign;
        }, 250));

        execute_sign = function(sign) {
            var sign_name = "";
            switch (sign) {
                case "00000":
                    sign_name = "FIST";
                    break;
                case "10000":
                    sign_name = "THUMB";
                    break;
                case "01000":
                    sign_name = "ONE";
                    break;
                case "01100":
                    sign_name = "TWO";
                    break;
                case "01110":
                    sign_name = "THREE";
                    break;
                case "01111":
                    sign_name = "FOUR";
                    break;
                case "11111":
                    sign_name = "HAND";
                    break;
                case "01001":
                    sign_name = "METAL";
                    break;
                case "10001":
                    sign_name = "SURF";
                    break;
                case "00100":
                    sign_name = "GFY";
                    break;
                // .....

                default:
                    sign_name = "UNDEFINED";
                    break;
            }
            process.stdout.write(" " + sign_name + " ");
        }

        // my.leapmotion.on('gesture', _.throttle(function (gesture) {
        //     console.log("# gesture: " + gesture.type);
        // }, 500));
    }
}).start();
