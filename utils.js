// Log timing functions
module.exports = {
    printLogTime: function () {

        var curr_time = new Date();

        var hour = curr_time.getHours();
        hour = (hour < 10 ? "0" : "") + hour;

        var min = curr_time.getMinutes();
        min = (min < 10 ? "0" : "") + min;

        var sec = curr_time.getSeconds();
        sec = (sec < 10 ? "0" : "") + sec; // 0 padding

        var msec = curr_time.getMilliseconds();
        msec = (msec < 10 ? "00" : msec < 100 ? "0" : "") + msec;

        return "[ " + curr_time.getUTCFullYear() + "-" + (curr_time.getUTCMonth() + 1) + "-" + (curr_time.getUTCDate() + 1) + " " + hour + ":" + min + ":" + sec + "." + msec + " ]";
    },

    otherFunc: function () {
        console.log('No implement');
    }
};