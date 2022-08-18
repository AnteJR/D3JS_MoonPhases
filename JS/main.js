// Some useful const
const largeur = window.innerWidth - 20;
const hauteur = window.innerHeight - 20;
const rayonBase = (window.innerHeight - 20) / 4;
const pi = Math.PI;
const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
const monthsFull = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
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