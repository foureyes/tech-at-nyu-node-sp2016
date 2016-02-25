var request = require('request'),
    fs = require('fs');

var url = "http://data.nba.com/data/15m/json/cms/noseason/game/20160221/0021500824/boxscore.json";
request.get(url, function(error, response, body) {
    console.log(response);
    console.log(response.statusCode);
    var res = JSON.parse(body);
    var home_players = res.sports_content.game.home.players.player;
    console.log(home_players);
    fs.writeFile('home_players.txt', home_players.reduce(stringify, ''), function (err) {
        if (err) {
            console.log(err);
        }
        console.log('Donzo!');
    });
});

function stringify(accum, player) {
    return accum + player.first_name + ' ' + player.last_name + '\n';
}
