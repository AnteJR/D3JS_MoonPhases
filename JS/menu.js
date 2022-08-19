/* TITLE PAGE */
let myMoon = svgSpace           // variable for the giant moon
    .append("path")
    .attr("fill", "white")
    .attr("transform", "translate(" + largeur / 2 + "," + hauteur / 2 + ") scale(-1,1)");

// the title
let titleApp = addText("moon phases.", largeur / 2, hauteur / 2, "titleText", "default", "start", "3em", 1);

// the subtitle
let subTitleApp = addText("by joël rimaz", largeur / 2, hauteur / 2 + 25, "subTitleText", "default", "start", "1em", 1);

// the start button
let startUpButton = addText("start.", largeur / 2, hauteur / 10 * 9, "startBtn", "pointer", "middle", "4em", 1)
    .on("click", () => {
        startUpButton
            .transition().duration(200).style("opacity", "0")
            .transition().remove();

        myMoonCalendar
            .transition().delay(200).duration(1000).style("display", "block").style("opacity", "1")

        myPickedMoon
            .transition().delay(200).duration(1000).style("display", "block").style("opacity", "1")
    });

// timer for the giant moon to move continually
d3.timer(changeMoon);

// function to display the central animated moon
function changeMoon(e) {
    myMoon
        .attr("d", function () {
            return moon((2 * pi + (e / 10000 * pi)) % (2 * pi), rayonBase);    // call of the moon function to determine the angle of the SVG elliptic arcs
        });
}

// function to display the moon according to its phase by calculating 2 elliptic arcs
function moon(m, rayon) {
    // the angle of the first arc (the outside of the moon)
    let rotation1;
    if (m < pi) rotation1 = rayon;
    else rotation1 = -rayon;

    // if the first arc is flipped
    let flip1;
    if (m < pi) flip1 = 0;
    else flip1 = 1;

    // the angle of the second arc (the "croissant")
    let rotation2 = Math.round(((rayon * Math.cos(m)) + Number.EPSILON) * 100) / 100; // i tested with sin and tan, but neither did allow for m = 0 to be a full moon

    // if the second arc is flipped
    let flip2;
    if (m < pi / 2 || (pi <= m && m < 3 * pi / 2)) flip2 = 0;
    else flip2 = 1;

    // return the "d" attribute of a SVG path with M, and 2 As (A = elliptic arc)
    return "M" + [0, rayon] + " A" + [rotation1, rayon, 0, 0, flip1, 0, -rayon] + " A" + [rotation2, rayon, 0, 0, flip2, 0, rayon]; // return the SVG "d" attribute to be set
}