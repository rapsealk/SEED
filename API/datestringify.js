var normalize = function(info) {
    if (info < 10) {
        return '0'+info;
    } else {
        return info;
    }
}

function datestringify(now, time) {
    var year = now.getYear()+1900;
    var month = normalize(now.getMonth()+1);
    var day = normalize(now.getDate());
    var value = year+'-'+month+'-'+day;
    if (!time) {
        return value;
    } else {
        var hour = normalize(now.getHours());
        var minutes = normalize(now.getMinutes());
        var seconds = normalize(now.getSeconds());
        return value+' '+hour+':'+minutes+':'+seconds;
    }
}

module.exports = datestringify;

// TODO replace with moment.js