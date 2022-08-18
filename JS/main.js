// Some useful const
const largeur = window.innerWidth - 20;
const hauteur = window.innerHeight - 20;
const rayonBase = (window.innerHeight - 20) / 4;
const pi = Math.PI;
const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
const years = [1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022];

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
        .attr("x", (d, i) => {
            if (i < 6) return (largeur / 15) + (largeur / 6) * (i);
            else if (i == 6 || i == 7) return (largeur / 15) + (largeur / 6) * (i - 6);
            else if (i == 8 || i == 9) return (largeur / 15) + (largeur / 6) * (i - 4);
            else if (i == 10 || i == 11) return (largeur / 15) + (largeur / 6) * (i - 10);
            else if (i == 12 || i == 13) return (largeur / 15) + (largeur / 6) * (i - 8);
            else if (i > 13 && i < 20) return (largeur / 15) + (largeur / 6) * (i - 14);
            else if (i >= 20) return (largeur / 15) + (largeur / 6) * (i - 20);
        })
        .attr("y", (d, i) => {
            if (i < 6) return hauteur / 10;
            else if (i == 6 || i == 7 || i == 8 || i == 9) return hauteur / 10 * 3;
            else if (i == 10 || i == 11 || i == 12 || i == 13) return hauteur / 10 * 5;
            else if (i > 13 && i < 20) return hauteur / 10 * 7;
            else if (i >= 20) return hauteur / 10 * 9;
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
                .style("display", "block")
                .transition().delay((d, i) => 1000 + 100 * i).duration(1000).style("opacity", "1");

            titleApp
                .transition().delay(500).duration(200).style("opacity", "0");

            yearSelected
                .style("display", "block")
                .transition().delay(1000).duration(1000).style("opacity", "1").text(d3.select(e.currentTarget).text());

            backTxtYears
                .style("display", "block")
                .transition().delay(2000).duration(1000).style("opacity", "1");

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
                txtToApply = d3.select(e.currentTarget).text() + " " + yearTxt;

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

function addText(txt, x, y, txtClass, cursorType, anchor, fontSize, opac){
    return svgSpace
        .append("text")
        .text(txt)
        .attr("fill", "white")
        .attr("x", x)
        .attr("y", y)
        .attr("class", txtClass)
        .style("cursor", cursorType)
        .style("text-anchor", anchor)
        .style("font-size", fontSize)
        .style("opacity", opac)
}