// Some useful const
const largeur = window.innerWidth - 20;
const hauteur = window.innerHeight - 20;
const rayonBase = (window.innerHeight - 20) / 4;
const pi = Math.PI;
const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

let dataTable;

// SVG canvas setup
let svgSpace = d3
    .select("body")
    .append("svg")
    .attr("width", largeur)
    .attr("height", hauteur);

// importing CSV and appending the useful years/months
let monCSV = d3.csv("Data/Moonphases.csv", function (d) {
    return {
        year: +d.year,
        month: d.month,
        monthNbr: +d.monthNbr,
        day: +d.day,
        moonphase: d.phase,
        piTimes: Math.PI * +d.piTimesX
    }
}).then((dataMoon) => {
    dataTable = dataMoon;

    let yearTable = [];
    let previousYear = "";
    dataMoon.forEach((e) => {
        if (previousYear != e.year) {
            previousYear = e.year;
            yearTable.push([e.year]);
        }
    });

    svgSpace.append("g")
        .attr("id", "yearTxt")
        .selectAll("text")
        .data(yearTable)
        .enter()
        .append("text")
        .text((d) => d)
        .attr("class", "txtCalendarYear")
        .attr("x", (d, i) => {                                      // if I want to put them at slightly random places, remove commented Math.ceil(...)
            if (i < 6) return (largeur / 15) + (largeur / 6) * (i) // + Math.ceil((Math.random() - 0.5) * 100)
            else if (i == 6 || i == 7) return (largeur / 15) + (largeur / 6) * (i - 6) // + Math.ceil((Math.random() - 0.5) * 100)
            else if (i == 8 || i == 9) return (largeur / 15) + (largeur / 6) * (i - 4) // + Math.ceil((Math.random() - 0.5) * 100)
            else if (i == 10 || i == 11) return (largeur / 15) + (largeur / 6) * (i - 10) // + Math.ceil((Math.random() - 0.5) * 100)
            else if (i == 12 || i == 13) return (largeur / 15) + (largeur / 6) * (i - 8) // + Math.ceil((Math.random() - 0.5) * 100)
            else if (i > 13 && i < 20) return (largeur / 15) + (largeur / 6) * (i - 14) // + Math.ceil((Math.random() - 0.5) * 100)
            else if (i >= 20) return (largeur / 15) + (largeur / 6) * (i - 20) // + Math.ceil((Math.random() - 0.5) * 100)
        })
        .attr("y", (d, i) => {
            if (i < 6) return hauteur / 10 // + Math.ceil((Math.random() - 0.5) * 100)
            else if (i == 6 || i == 7 || i == 8 || i == 9) return hauteur / 10 * 3 // + Math.ceil((Math.random() - 0.5) * 100)
            else if (i == 10 || i == 11 || i == 12 || i == 13) return hauteur / 10 * 5 // + Math.ceil((Math.random() - 0.5) * 100)
            else if (i > 13 && i < 20) return hauteur / 10 * 7 // + Math.ceil((Math.random() - 0.5) * 100)
            else if (i >= 20) return hauteur / 10 * 9 // + Math.ceil((Math.random() - 0.5) * 100)
        })
        .style("font-style", "italic")
        .style("font-size", "2em")
        .style("cursor", "pointer")
        .style("opacity", "0")
        .style("display", "none")
        .on("click", (e) => {
            d3.selectAll(".txtCalendarYear")
                .transition().delay((d, i) => 50 * i).duration(500).style("opacity", "0")
                .transition().style("display", "none");

            d3.selectAll(".txtCalendarMonth")
                .transition().delay((d, i) => 1000 + 100 * i).duration(1000).style("display", "block").style("opacity", "1");
            
            titleApp
                .transition().delay(500).duration(200).style("opacity", "0");

            yearSelected
                .transition().delay(1000).duration(1000).style("display", "block").style("opacity", "1").text(e.path[0].__data__[0]);

            backTxtYears
                .transition().duration(1000).style("display", "block").style("opacity", "1");
        
            backMenu
                .transition().delay(500).duration(200).style("opacity", "0")
                .transition().style("display", "none");
        });

    let monthTable = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

    svgSpace.append("g")
        .attr("id", "monthTxt")
        .selectAll("text")
        .data(monthTable)
        .enter()
        .append("text")
        .text((d) => d)
        .attr("class", "txtCalendarMonth")
        .attr("x", (d, i) => {
            if (i == 0 || i == 1) return (largeur / 15) + (largeur / 6) * (i);
            else if (i == 2 || i == 3) return (largeur / 15) + (largeur / 6) * (i + 2);
            else if (i == 4 || i == 5) return (largeur / 15) + (largeur / 6) * (i - 4);
            else if (i == 6 || i == 7) return (largeur / 15) + (largeur / 6) * (i - 2);
            else if (i > 7) return (largeur / 15) + (largeur / 6) * (i - 7);
        })
        .attr("y", (d, i) => {
            if (i == 0 || i == 1 || i == 2 || i == 3) return hauteur / 10 * 3;
            else if (i == 4 || i == 5 || i == 6 || i == 7) return hauteur / 10 * 5;
            else if (i > 7) return hauteur / 10 * 7;
        })
        .style("font-style", "italic")
        .style("font-size", "2em")
        .style("cursor", "pointer")
        .style("opacity", "0")
        .style("display", "none")
        .on("click", (e) => {
            myMoon
                .transition().duration(1000).attr("transform", "translate(" + largeur / 2 + "," + 0 + ") scale(-1,1)");

            d3.selectAll(".txtCalendarMonth")
                .transition().delay((d, i) => 50 * i).duration(500).style("opacity", "0")
                .transition().style("display", "none");

            let yearTxt = yearSelected.text(),
                txtToApply = e.path[0].__data__ + " " + yearTxt;

            yearSelected
                .transition().duration(500).style("opacity", "0")
                .transition().duration(100).attr("y", hauteur / 10)
                .transition().duration(1000).style("opacity", "1").text(txtToApply);

            backTxtMonths
                .transition().duration(1000).style("display", "block")
                .transition().duration(1000).style("opacity", "1");

            backTxtYears
                .transition().duration(500).style("opacity", "0")
                .transition().style("display", "none");

            moonCalendarDisplay(txtToApply);
        });
});