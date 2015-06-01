/**
 * Created by selemon on 1/06/15.
 */
bar = function(){

    var h = 1000;
    var w = 1000;
    var height = 1000;
    var width = 1000;
    var padding = 80;
    var ds;
    var map = new Object();




    d3.csv("2012-Table1.csv", function(error, data) {

        initializeTeams();
        ds = data;

        ds.forEach(function (d) {

            d["Score1"] = +d['Score'].split(' – ')[0]
            d["Score2"] = +d['Score'].split(' – ')[1]
            d["Round"] = +d.Round;
            //if (d.Venue.length !== (0)) {
            d["ScoreDiff"] = +Math.abs(d.Score1 - d.Score2);
            var winner = findWinner(d["Home Team"], d["Score1"], d["Away Team"], d["Score2"]);
            d["Outcome"] = winner;
            if (winner == "draw" && d.Venue.length !== (0)) {

            }
            if (winner === d["Home Team"] && d.Venue.length !== (0)) {
                map[winner]["points"] += 2;
                map[winner]["numOfGamesToPoints"].push(map[winner]["points"]);
                map[d["Away Team"]]["numOfGamesToPoints"].push(map[d["Away Team"]]["points"]);
                d["Loss"] = d["Away Team"];
            }
            if (winner === d["Away Team"] && d.Venue.length !== (0)) {

                map[winner]["points"] += 2;
                map[winner]["numOfGamesToPoints"].push(map[winner]["points"]);
                map[d["Home Team"]]["numOfGamesToPoints"].push(map[d["Home Team"]]["points"]);
                d["Lost"] = d["Home Team"];
            }


            //console.log(d);
            //}
            //console.log(map);
        });

        calculateTotalPointsPerSeason(ds);
        calculateTotalWinLoss();
        drawGraph(ds);


    });


    function drawGraph(data){

        d3.select("svg")
            .remove();
        w = 800;
        h = 800;
        var path = d3.geo.path();
        var svg = d3.select("body").append("svg").attr({
            width: w,
            height: h
        });
        var teams = new Array();
        var points = new Array();

        for (var key in map) {
            teams.push(map[key]);
        }
        var bars = svg.selectAll("rect")
            .data(teams)
            .enter()
            .append("rect")
            .attr("width", 0)
            .attr("height", 30)
            .attr("fill", "white")
            .attr("stroke-width", 2)
            .attr("stroke", "white")
            .transition()
            .duration(1500)
            .attr("fill", function(d){return TeamcolorPicker(d.name)})
            .attr("width", function(d){return d.numOfWins*40;})
            .attr("stroke", "black")
            .attr("x", 300)
            .attr("y", function(d, i){return i*30+12})
            .attr("ry", 5);


        svg.selectAll("text")
            .data(teams)
            .enter()
            .append("text")
            .attr("fill", "white")
            .attr("stroke", "white")
            .transition()
            .duration(1500)
            .attr("fill", "black")
            .attr("stroke", "black")
            .attr("x", 80)
            .attr("y", function(d, i){return 30*i+30;})
            .text(function(d, i){return d.name+" - "+d.numOfWins;});

        var rect = svg.selectAll("rect");
        rect.on("mouseover", function(){
            rect.transition()
                .duration(0)
                .attr('opacity', 0.33);
            d3.select(this).transition()
                .duration(500)
                .attr('opacity', 1);
        }).on("mouseout", function(){
            rect.transition()
                .duration(0)
                .attr('opacity', 1);
        });


    }




    function getMap(k) {
        return map[k];
    }

    function calculateTotalPointsPerSeason(ds) {
        ds.forEach(function (d) {


            if (d.Venue.length !== (0)) {
                getMap(d["Home Team"]).Total += d.Score1;
                getMap(d["Away Team"]).Total += d.Score1;

            }

        });

    }

    //calculate the total number of wins for each team
    //also games played
    function calculateTotalWinLoss() {

        ds.forEach(function (d) {

            if (d.Venue.length !== (0)) {
                getMap(d["Home Team"]).gamesPlayed++;
                getMap(d["Away Team"]).gamesPlayed++;
                var homeTeamScore = d.Score1;
                var awayTeamScore = d.Score2;
                if (homeTeamScore > awayTeamScore) {
                    getMap(d["Home Team"]).numOfWins++;
                    getMap(d["Away Team"]).numOfLosses++;

                } else if (homeTeamScore < awayTeamScore) {

                    getMap(d["Away Team"]).numOfWins++;
                    getMap(d["Home Team"]).numOfLosses++;
                } else {

                }


            }

        });


    }


    //compare the the score between two teams and determine
    //the winner
    function findWinner(team1, score1, team2, score2) {
        if (score1 > score2) {
            return team1;
        }
        if (score1 === score2) {
            return "draw";
        } else {
            return team2;
        }
    }

    function getOutcome(data){
        if(data>0){
            return 1;
        }
        else{
            return 0;
        }
    }



    function initializeTeams() {
        map["New South Wales Swifts"] = {
            name: "New South Wales Swifts",
            Total: 0,
            numOfWins: 0,
            numOfLosses: 0,
            points: 0,
            numOfGamesToPoints: [],
            gamesPlayed: 0
        }
        map["Adelaide Thunderbirds"] = {
            name: "Adelaide Thunderbirds",
            Total: 0,
            numOfWins: 0,
            numOfLosses: 0,
            points: 0,
            numOfGamesToPoints: [],
            gamesPlayed: 0
        }
        map["Queensland Firebirds"] = {
            name: "Queensland Firebirds",
            Total: 0,
            numOfWins: 0,
            numOfLosses: 0,
            points: 0,
            numOfGamesToPoints: [],
            gamesPlayed: 0
        }
        map["Melbourne Vixens"] = {
            name: "Melbourne Vixens",
            Total: 0,
            numOfWins: 0,
            numOfLosses: 0,
            points: 0,
            numOfGamesToPoints: [],
            gamesPlayed: 0
        }
        map["Northern Mystics"] = {
            name: "Northern Mystics",
            Total: 0,
            numOfWins: 0,
            numOfLosses: 0,
            points: 0,
            numOfGamesToPoints: [],
            gamesPlayed: 0
        }
        map["Central Pulse"] = {
            name: "Central Pulse",
            Total: 0,
            numOfWins: 0,
            numOfLosses: 0,
            points: 0,
            numOfGamesToPoints: [],
            gamesPlayed: 0
        }
        map["Southern Steel"] = {
            name: "Southern Steel",
            Total: 0,
            numOfWins: 0,
            numOfLosses: 0,
            points: 0,
            numOfGamesToPoints: [],
            gamesPlayed: 0
        }
        map["Waikato Bay of Plenty Magic"] = {
            name: "Waikato Bay of Plenty Magic",
            Total: 0,
            numOfWins: 0,
            numOfLosses: 0,
            points: 0,
            numOfGamesToPoints: [],
            gamesPlayed: 0
        }
        map["West Coast Fever"] = {
            name: "West Coast Fever",
            Total: 0,
            numOfWins: 0,
            numOfLosses: 0,
            points: 0,
            numOfGamesToPoints: [],
            gamesPlayed: 0
        }
        map["Canterbury Tactix"] = {
            name: "Canterbury Tactix",
            Total: 0,
            numOfWins: 0,
            numOfLosses: 0,
            points: 0,
            numOfGamesToPoints: [],
            gamesPlayed: 0
        }


        //console.log(teams);
    }


    function TeamcolorPicker(team) {
        if (team === ("New South Wales Swifts")) {
            return "#2E2EFE";
        }
        if (team === ("Waikato Bay of Plenty Magic")) {
            return "#D0FA58";
        }
        if (team === ("Southern Steel")) {
            return "#088A85";
        }
        if (team === ("Central Pulse")) {
            return "#FFFF00";
        }
        if (team === ("Northern Mystics")) {
            return "#240B3B";
        }
        if (team === ("Melbourne Vixens")) {
            return "#04B404";
        }
        if (team === ("Queensland Firebirds")) {
            return "#FF8000";
        }
        if (team === ("Adelaide Thunderbirds")) {
            return "#DF01D7";
        }
        if (team === ("Canterbury Tactix")) {
            return "#FF0000";
        }
        if (team === ("West Coast Fever")) {
            return "#0B3B17";
        }
    }



}