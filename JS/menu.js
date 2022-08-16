/* TITLE PAGE */
let myMoon = svgSpace           // variable for the giant moon
    .append("path")
    .attr("fill", "white")
    .attr("transform", "translate(" + largeur / 2 + "," + hauteur / 2 + ") scale(-1,1)");

let titleApp = svgSpace         // the title
    .append("text")
    .text("moon phases.")
    .attr("fill", "white")
    .attr("x", largeur / 2)
    .attr("y", hauteur / 2)
    .style("font-size", "3em")
    .style("cursor", "default");

let subTitleApp = svgSpace      // the subtitle
    .append("text")
    .text("by joël rimaz")
    .attr("fill", "white")
    .attr("x", largeur / 2)
    .attr("y", hauteur / 2 + 25)
    .style("cursor", "default");

let startUpButton = svgSpace    // the start button
    .append("text")
    .text("start.")
    .attr("fill", "white")
    .attr("x", largeur / 2)
    .attr("y", hauteur / 10 * 9)
    .style("text-anchor", "middle")
    .style("font-size", "4em")
    .style("opacity", "1")
    .style("cursor", "pointer")
    .on("click", () => {
        startUpButton
            .transition().duration(200).style("opacity", "0")
            .transition().remove();

        myMoonCalendar
            .transition().delay(200).duration(1000).style("display", "block").style("opacity", "1")

        myMoonGraphs
            .transition().delay(200).duration(1000).style("display", "block").style("opacity", "1")

        //d3.selectAll(".txtCalendarYear")
            //.transition().delay((d, i) => 100 * i).duration(1000).style("display", "block").style("opacity", "1");
    });

d3.timer(changeMoon);   // timer for the giant moon to move continually

function changeMoon(e) {    // central animated moon
    myMoon
        .attr("d", function () {
            return moon((2 * pi + (e / 10000 * pi)) % (2 * pi), rayonBase);    // call of the moon function to determine the angle of the SVG elliptic arcs
        });
}

function moon(m, rayon) {      // function to display the moon according to its phase by calculating 2 elliptic arcs
    let rotation1;      // the angle of the first arc (the outside of the moon)
    if (m < pi) rotation1 = rayon;
    else rotation1 = -rayon;

    let flip1;          // if the first arc is flipped
    if (m < pi) flip1 = 0;
    else flip1 = 1;
    // the angle of the second arc (the "croissant")
    let rotation2 = Math.round(((rayon * Math.cos(m)) + Number.EPSILON) * 100) / 100; // i tested with sin and tan, but neither did allow for m = 0 to be a full moon

    let flip2;          // if the second arc is flipped
    if (m < pi / 2 || (pi <= m && m < 3 * pi / 2)) flip2 = 0;
    else flip2 = 1;

    return "M" + [0, rayon] + " A" + [rotation1, rayon, 0, 0, flip1, 0, -rayon] + " A" + [rotation2, rayon, 0, 0, flip2, 0, rayon]; // return the SVG "d" attribute to be set
}