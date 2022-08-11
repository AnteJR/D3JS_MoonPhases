const largeur = window.innerWidth - 20;
const hauteur = window.innerHeight - 20;
const rayon = (window.innerHeight - 20) / 4;
const pi = Math.PI;

let dataTable;

// importing CSV
let monCSV = d3.csv("Data/Moonphases.csv", function (d) {
    return {
        year: +d.year,
        month: d.month,
        day: +d.day,
        moonphase: d.phase,
        percentLight: Math.PI * +d.percentage,
        darksDirection: d.darkFaces
    }
}).then((k) => {
    dataTable = k
});

// wait unil CSV is imported into the dataTable var, and then act
setTimeout(() => {
    // idk if it'll be useful but i'll keep it for now
}, 250);

/* MAIN CODE WILL GO THERE */



/* TITLE */
// SVG canvas setup
let svgSpace = d3
    .select("body")
    .append("svg")
    .attr("width", largeur)
    .attr("height", hauteur);

let myMoon = svgSpace
    .append("path")
    .attr("fill", "white")
    .attr("transform", "translate(" + largeur / 2 + "," + hauteur / 2 + ") scale(-1,1)");

let titleApp = svgSpace
    .append("text")
    .text("Moon Phases")
    .attr("fill", "white")
    .attr("x", largeur / 2)
    .attr("y", hauteur / 2)
    .style("font-size", "3em")

let subTitleApp = svgSpace
    .append("text")
    .text("By Joël Rimaz")
    .attr("fill", "white")
    .attr("x", largeur / 2)
    .attr("y", hauteur / 2 + 25)

d3.timer(changeMoon);

// lune centrale animée
function changeMoon(e) {
    myMoon
        .attr("d", function () {
            return moon((2 * pi + (e / 10000 * pi)) % (2 * pi));
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
    
    return "M" + [0, rayon] + " A" + [rotation1, rayon, 0, 0, flip1, 0, -rayon] + " A" + [rotation2, rayon, 0, 0, flip2, 0, rayon];
}