const YQL = require('yql');

exports.get = function(req, res) {
    "use strict";
    let location = req.query.location; // seoul

    let query = new YQL(`select item.condition.text from weather.forecast where woeid in (select woeid from geo.places(1) where text="${location}")`);
    //let query = new YQL('select * from weather.forecast where (location = 94089)');

    query.exec(function(err, data) {
        //var location = data.query.results.channel.location;
        //var condition = data.query.results.channel.item.condition;

        // if (!data["query"]["results"]) error;

        console.dir(data);

        //console.log('The current weather in ' + location.city + ', ' + location.region + ' is ' + condition.temp + ' degrees.');

        res.json(data);
    });

};
/*
exports.post = function(req, res) {
    "use strict";

};
*/