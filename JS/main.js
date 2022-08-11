// Some useful const
const largeur = window.innerWidth - 20;
const hauteur = window.innerHeight - 20;
const rayon = (window.innerHeight - 20) / 4;
const pi = Math.PI;

let dataTable;

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
        percentLight: Math.PI * +d.percentage,
        darksDirection: d.darkFaces
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
            
            yearSelected
                .transition().delay(1000).duration(1000).style("display", "block").style("opacity", "1").text(e.path[0].__data__[0]);
            
            backTxtYears
                .transition().delay(2000).duration(1000).style("display", "block").style("opacity", "1");
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
            titleApp
                .transition().duration(500).style("opacity", "0");

            d3.selectAll(".txtCalendarMonth")
                .transition().delay((d, i) => 50 * i).duration(500).style("opacity", "0")
                .transition().style("display", "none");

            let yearTxt = yearSelected.text();
            yearSelected
                .transition().duration(500).style("opacity", "0")
                .transition().duration(100).attr("y", hauteur / 10)
                .transition().duration(1000).style("opacity", "1").text(e.path[0].__data__ + " " + yearTxt);

            backTxtMonths
                .transition().duration(1000).style("display", "block")
                .transition().duration(1000).style("opacity", "1");

            backTxtYears
                .transition().duration(500).style("opacity", "0")
                .transition().style("display", "none");
        });
});

/* TITLE PAGE */
let myMoon = svgSpace           // variable for the giant moon
    .append("path")
    .attr("fill", "white")
    .attr("transform", "translate(" + largeur / 2 + "," + hauteur / 2 + ") scale(-1,1)");

let titleApp = svgSpace         // the title
    .append("text")
    .text("Moon Phases")
    .attr("fill", "white")
    .attr("x", largeur / 2)
    .attr("y", hauteur / 2)
    .style("font-size", "3em")
    .style("cursor", "default");

let subTitleApp = svgSpace      // the subtitle
    .append("text")
    .text("By Joël Rimaz")
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

        myMoon
            .transition().duration(1000).attr("transform", "translate(" + largeur / 2 + "," + ((hauteur / 2) - (hauteur / 10)) + ") scale(-1,1)");
        titleApp
            .transition().duration(1000).attr("y", (hauteur / 2) - (hauteur / 10));
        subTitleApp
            .transition().duration(1000).attr("y", (hauteur / 2) - (hauteur / 10) + 25).style("opacity", "0");

        d3.selectAll(".txtCalendarYear")
            .transition().delay((d, i) => 100 * i).duration(1000).style("display", "block").style("opacity", "1");
    });

d3.timer(changeMoon);   // timer for the giant moon to move continually

function changeMoon(e) {    // central animated moon
    myMoon
        .attr("d", function () {
            return moon((2 * pi + (e / 10000 * pi)) % (2 * pi));    // call of the moon function to determine the angle of the SVG elliptic arcs
        });
}

function moon(m) {      // function to display the moon according to its phase by calculating 2 elliptic arcs
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

/* OTHER TEXTS */
let yearSelected = svgSpace     // the text displaying the year and month selected
    .append("text")
    .text("")
    .attr("fill", "white")
    .attr("x", largeur / 2)
    .attr("y", hauteur / 10 * 8)
    .style("cursor", "default")
    .style("text-anchor", "middle")
    .style("font-size", "5em")
    .style("opacity", "0")
    .style("display", "none");

let backTxtMonths = svgSpace    // the text to go back to the month selection
    .append("text")
    .text("back to months.")
    .attr("fill", "white")
    .attr("x", 15)
    .attr("y", hauteur - 15)
    .style("cursor", "pointer")
    .style("font-size", "4em")
    .style("opacity", "0")
    .style("display", "none")
    .on("click", () => {            // the onClick where we:
        backTxtMonths                   // 1. remove the back button
            .transition().duration(500).style("opacity", "0")
            .transition().style("display", "none");

        myMoon                          // 2. place the moon back slightly above the middle of the screen
            .transition().duration(1000).attr("transform", "translate(" + largeur / 2 + "," + ((hauteur / 2) - (hauteur / 10)) + ") scale(-1,1)");
        
        titleApp                        // 3. make the title re-appear
            .transition().delay(500).duration(500).style("opacity", "1");

                                        // 4. bring back the months, first by displaying them, then by increasing their opacity
        d3.selectAll(".txtCalendarMonth").transition().delay((d, i) => 100 * i).duration(1000).style("display", "block").style("opacity", "1");

        let txt = yearSelected.text();  // 5. isolate the year from the text displaying previously "month year"
        let yearTxt = txt.split(" ").pop();

        yearSelected                    // 6. place the yearSelected text back at the bottom of the screen, and display only the year selected
            .transition().duration(500).style("opacity", "0")
            .transition().duration(100).attr("y", hauteur / 10 * 8)
            .transition().duration(1000).style("opacity", "1").text(yearTxt);

        backTxtYears                    // 7. make the "back to years" button re-appear
            .transition().duration(1000).style("display", "block")
            .transition().duration(1000).style("opacity", "1");
    });

let backTxtYears = svgSpace     // the text to go back to the year selection
    .append("text")
    .text("back to years.")
    .attr("fill", "white")
    .attr("x", 15)
    .attr("y", hauteur - 15)
    .style("cursor", "pointer")
    .style("font-size", "4em")
    .style("opacity", "0")
    .style("display", "none")
    .on("click", () => {            // the onClick where we:
        backTxtYears                    // 1. remove the "back to years" button
            .transition().duration(500).style("opacity", "0")
            .transition().style("display", "none");

                                        // 2. remove the months
        d3.selectAll(".txtCalendarMonth").transition().delay((d, i) => 50 * i).duration(500).style("opacity", "0")
            .transition().style("display", "none");

        yearSelected                    // 3. remove the yearSelected text and reset its value
            .transition().duration(500).style("opacity", "0")
            .transition().duration(50).text("");

                                        // 4. make the years re-appear
        d3.selectAll(".txtCalendarYear").transition().delay((d, i) => 1000 + 100 * i).duration(1000).style("display", "block").style("opacity", "1")
    });