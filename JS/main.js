const largeur = window.innerWidth - 20;
const hauteur = window.innerHeight - 20;
const rayon = (window.innerHeight - 20) / 4;
const pi = Math.PI;

let dataTable;
let myMoon;

// SVG canvas setup
let svgSpace = d3
    .select("body")
    .append("svg")
    .attr("width", largeur)
    .attr("height", hauteur);

// importing CSV
let monCSV = d3.csv("Data/Moonphases.csv", function (d) {
    return {
        year: +d.year,
        month: d.month,
        day: +d.day,
        moonphase: d.phase,
        percentLight: Math.PI / +d.percentage,
        darksDirection: d.darkFaces
    }
}).then((k) => {
    dataTable = k
});

// wait unil CSV is imported into the dataTable var, and then act
setTimeout(() => {
    myMoon = svgSpace
        .append("path")
        .attr("fill", "white")
        .attr("transform", "translate(" + largeur / 2 + "," + hauteur / 2 + ") scale(-1,1)");

    d3.interval(changeMoon, 5000);
}, 250);

function changeMoon(e) {
    let time = (Math.round(e / 1000)) / 5;
    console.log(dataTable[time].year + " "+ dataTable[time].month + " "+ dataTable[time].day + " | time : "+ time + " | phase : "+ dataTable[time].moonphase)
    myMoon.attr("d", function () { 
            return moon(Math.round(((((2 * pi) + dataTable[time].percentLight) % (2 * pi)) + Number.EPSILON) * 100) / 100); 
        });
}

// function to display the moon according to its phase
function moon(m) {
    let rotation1;
    if (m < pi) rotation1 = rayon;
    else rotation1 = -rayon;

    let flip1;
    if (m < pi) flip1 = 0;
    else flip1 = 1;

    let rotation2 = Math.round(((rayon * Math.cos(m)) + Number.EPSILON) * 100) / 100; // i tested with sin and tan, but both did not allow for m=0 to be a full moon

    let flip2;
    if (m < pi / 2 || (pi <= m && m < 3 * pi / 2)) flip2 = 0;
    else flip2 = 1;

    console.log("M" + [0, rayon] + " A" + [rotation1, rayon, 0, 0, flip1, 0, -rayon] + " A" + [rotation2, rayon, 0, 0, flip2, 0, rayon])
    return "M" + [0, rayon] + " A" + [rotation1, rayon, 0, 0, flip1, 0, -rayon] + " A" + [rotation2, rayon, 0, 0, flip2, 0, rayon];
}