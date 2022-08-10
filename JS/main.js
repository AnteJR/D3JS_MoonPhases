const largeur = window.innerWidth - 20;
const hauteur = window.innerHeight - 20;

let dataTable;
let moon;

//SVG setup
let svgSpace = d3
    .select("body")
    .append("svg")
    .attr("width", largeur)
    .attr("height", hauteur);

//csv 
let monCSV = d3.csv("Data/Moonphases.csv", function (d) {
    return {
        id: +d.id,
        year: +d.year,
        month: d.month,
        day: +d.day,
        moonphase: d.phase,
        percentLight: d.percentage,
        darksDirection: d.darkFaces
    }
}).then((k) => {
    dataTable = k
});

setTimeout(() => {
    console.log(dataTable)
    
    svgSpace.append('circle')
        .attr("cx", largeur / 2)
        .attr("cy", hauteur / 2)
        .attr("r", (hauteur / 4) * Math.cos(100))
        .attr("fill", "white")
        .attr("opacity", 1)

}, 250);