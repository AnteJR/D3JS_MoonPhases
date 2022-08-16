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

// importing CSV
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

/* 
        BIG DATA DRIVEN FUNCTION TO DISPLAY THE
        lUNAR CALENDAR OF THE CHOSEN YEAR AND MONTH
*/
function moonCalendarDisplay(txt) {
    let txtSplit = txt.split(" "),
        monthComplete = txtSplit[0],
        monthToTest = "",
        yearToTest = txtSplit[1],
        myMonth = [],
        mainMoons = [],
        lineHoroscope = 0,
        horoscopes = [[1, "Capricorn ♑︎", "Aquarius ♒︎"], [2, "Aquarius ♒︎", "Pisces ♓︎"], [3, "Pisces ♓︎", "Aries ♈︎"], [4, "Aries ♈︎", "Taurus ♉︎"], [5, "Taurus ♉︎", "Gemini ♊︎"], [6, "Gemini ♊︎", "Cancer ♋︎"],
        [7, "Cancer ♋︎", "Leo ♌︎"], [8, "Leo ♌︎", "Virgo ♍︎"], [9, "Virgo ♍︎", "Libra ♎︎"], [10, "Libra ♎︎", "Scorpio ♏︎"], [11, "Scorpio ♏︎", "Sagittarius ♐︎"], [12, "Sagittarius ♐︎", "Capricorn ♑︎"]],
        monthNumber = 0;

    monthComplete.split("").forEach((e, i) => {
        if (i < 3) myMonth.push(e)
    });

    monthToTest = myMonth.join("");

    dataTable.forEach((e) => {
        if (e.year == yearToTest && e.month == monthToTest) {
            mainMoons.push([e.day, e.moonphase, e.piTimes]);
            monthNumber = e.monthNbr;
        }
    });

    let monthPreceding = monthNumber - 1 >= 1 ? monthNumber - 1 : 0,
        monthFollowing = monthNumber + 1 <= 12 ? monthNumber + 1 : 0;

    console.log("month order : " + monthPreceding + ", " + monthNumber + ", " + monthFollowing)

    if (monthToTest == "feb" || monthToTest == "apr") lineHoroscope = 19;
    else if (monthToTest == "jan" || monthToTest == "mar" || monthToTest == "may") lineHoroscope = 20;
    else if (monthToTest == "jun") lineHoroscope = 21;
    else if (monthToTest == "jul" || monthToTest == "aug" || monthToTest == "sep" || monthToTest == "nov" || monthToTest == "dec") lineHoroscope = 22;
    else if (monthToTest == "oct") lineHoroscope = 23;

    const lunarCalendarDates = svgSpace.append("g")
        .attr("id", "calendarD")
        .selectAll("text")
        .data(mainMoons)
        .enter()
        .append("text")
        .text((d) => d[0])
        .attr("x", (d, i) => largeur / (mainMoons.length + 1) * (i + 1))
        .attr("y", hauteur / 10 * 3)
        .attr("class", "lunarCalendarDates")
        .style("cursor", "default")
        .style("opacity", "0")
        .transition().delay((d, i) => 500 + (50 * i)).duration(500).style("opacity", "1")

    const lunarCalendarMoons = svgSpace.append("g")
        .attr("id", "calendarM")
        .selectAll("path")
        .data(mainMoons)
        .enter()
        .append("path")
        .attr("class", "lunarCalendarMoons")
        .attr("fill", "white")
        .attr("transform", (d, i) => "translate(" + (largeur / (mainMoons.length + 1) * (i + 1) + 7) + "," + (hauteur / 10 * 3 + 25) + ") scale(-1,1)")
        .attr("d", (d) => {
            return moon((2 * pi + d[2]) % (2 * pi), 12.5);    // call of the moon function to determine the angle of the SVG elliptic arcs
        })
        .style("opacity", "0")
        .transition().delay((d, i) => 500 + (50 * i)).duration(500).style("opacity", "1");

    const lunarCalendarTexts = svgSpace.append("g")
        .attr("id", "calendarT")
        .selectAll("text")
        .data(mainMoons)
        .enter()
        .append("text")
        .text((d) => {
            let original = d[1],
                newTxt = original.split(""),
                finalTxt = "";

            newTxt.forEach((e) => finalTxt += e + "\u00A0");
            return finalTxt
        })
        .attr("class", "lunarCalendarTexts")
        .attr("fill", "white")
        .attr("x", (d, i) => (largeur / (mainMoons.length + 1) * (i + 1)) + 25)
        .attr("y", hauteur / 10 * 3 + 65)
        .attr("rotate", -90)
        .attr("style", "writing-mode: tb;")
        .style("cursor", "default")
        .style("letter-spacing", "0.5em")
        .style("opacity", "0")
        .style("font-size", "1em")
        .transition().delay((d, i) => 500 + (50 * i)).duration(500).style("opacity", "1");

    const lunarCalendarSeparation = svgSpace.append("line")
        .attr("class", "astroLine")
        .attr("x1", () => largeur / (mainMoons.length + 1) * (lineHoroscope + 0.625))
        .attr("y1", hauteur / 10 * 3)
        .attr("x2", () => largeur / (mainMoons.length + 1) * (lineHoroscope + 0.625))
        .attr("y2", hauteur / 10 * 9)
        .style("stroke", "white")
        .style("opacity", "0")
        .transition().delay(1500).duration(500).style("opacity", "1");

    const lunarCalendarAstro = svgSpace.append("text")
        .text(horoscopes[monthNumber - 1][1])
        .attr("class", "astroTxt")
        .attr("fill", "white")
        .attr("x", () => largeur / (mainMoons.length + 1) * (lineHoroscope + 0.5))
        .attr("y", hauteur / 10 * 9)
        .style("cursor", "default")
        .style("text-anchor", "end")
        .style("opacity", "0")
        .style("font-size", "1em")
        .transition().delay(1500).duration(500).style("opacity", "1");

    const lunarCalendarAstroRight = svgSpace.append("text")
        .text(horoscopes[monthNumber - 1][2])
        .attr("class", "astroTxt")
        .attr("fill", "white")
        .attr("x", () => largeur / (mainMoons.length + 1) * (lineHoroscope + 0.75))
        .attr("y", hauteur / 10 * 9)
        .style("cursor", "default")
        .style("text-anchor", "start")
        .style("opacity", "0")
        .style("font-size", "1em")
        .transition().delay(1500).duration(500).style("opacity", "1");

    const monthBefore = svgSpace.append("text")
        .text(() => {
            if (monthPreceding == 1) return "<  january"
            if (monthPreceding == 2) return "<  february"
            if (monthPreceding == 3) return "<  march"
            if (monthPreceding == 4) return "<  april"
            if (monthPreceding == 5) return "<  may"
            if (monthPreceding == 6) return "<  june"
            if (monthPreceding == 7) return "<  july"
            if (monthPreceding == 8) return "<  august"
            if (monthPreceding == 9) return "<  september"
            if (monthPreceding == 10) return "<  october"
            if (monthPreceding == 11) return "<  november"
            if (monthPreceding == 12) return "<  december"
        })
        .attr("class", "monthButton")
        .attr("id", "monthBack")
        .attr("fill", "white")
        .attr("x", 25)
        .attr("y", hauteur / 10 * 2.25)
        .style("cursor", "pointer")
        .style("text-anchor", "start")
        .style("opacity", "0")
        .style("font-size", "2em")
        .on("click", (e) => {            // the onClick where we:
            let txt = yearSelected.text(),  //  1. isolate the year and the month from the texts
                yearTxt = txt.split(" ").pop();
            
            let txtClicked = e.path[0].firstChild.data,
                monthIsolated = txtClicked.split(" ").pop();

            yearSelected                    //  2. change the yearSelected text
                .transition().duration(500).style("opacity", "0")
                .transition().delay(450).duration(1000).style("opacity", "1").text(monthIsolated + " " + yearTxt);
            //                                  3. remove the dates
            d3.selectAll(".lunarCalendarDates")
                .transition().delay((d, i) => 15 * i).duration(150).style("opacity", "0")
                .transition().remove();
            //                                  4. remove the mini-moons
            d3.selectAll(".lunarCalendarMoons")
                .transition().delay((d, i) => 15 * i).duration(150).style("opacity", "0")
                .transition().remove();
            //                                  5. remove the texts
            d3.selectAll(".lunarCalendarTexts")
                .transition().delay((d, i) => 15 * i).duration(150).style("opacity", "0")
                .transition().remove();
            //                                  6. remove the line
            d3.selectAll(".astroLine")
                .transition().delay((d, i) => 15 * i).duration(150).style("opacity", "0")
                .transition().remove();
            //                                  7. remove the horoscropes texts
            d3.selectAll(".astroTxt")
                .transition().delay((d, i) => 15 * i).duration(150).style("opacity", "0")
                .transition().remove();
            //                                  8. remove buttons to switch months
            d3.selectAll(".monthButton")
                .transition().delay((d, i) => 300 * i).duration(150).style("opacity", "0")
                .transition().remove();
            //                                  9. call this function back
            setTimeout(() => moonCalendarDisplay(monthIsolated + " " + yearTxt), 450)
        })
        .transition().delay(1000).duration(500).style("opacity", "1");

    const monthAfter = svgSpace.append("text")
        .text(() => {
            if (monthFollowing == 1) return "january  >"
            if (monthFollowing == 2) return "february  >"
            if (monthFollowing == 3) return "march  >"
            if (monthFollowing == 4) return "april  >"
            if (monthFollowing == 5) return "may  >"
            if (monthFollowing == 6) return "june  >"
            if (monthFollowing == 7) return "july  >"
            if (monthFollowing == 8) return "august  >"
            if (monthFollowing == 9) return "september  >"
            if (monthFollowing == 10) return "october  >"
            if (monthFollowing == 11) return "november  >"
            if (monthFollowing == 12) return "december  >"
        })
        .attr("class", "monthButton")
        .attr("id", "monthBack")
        .attr("fill", "white")
        .attr("x", largeur - 25)
        .attr("y", hauteur / 10 * 2.25)
        .style("cursor", "pointer")
        .style("text-anchor", "end")
        .style("opacity", "0")
        .style("font-size", "2em")
        .on("click", (e) => {            // the onClick where we:
            let txt = yearSelected.text(),  //  1. isolate the year and the month from the texts
                yearTxt = txt.split(" ").pop();
            
            let txtClicked = e.path[0].firstChild.data,
                monthIsolated = txtClicked.split(" ")[0];

            yearSelected                    //  2. change the yearSelected text
                .transition().duration(500).style("opacity", "0")
                .transition().delay(450).duration(1000).style("opacity", "1").text(monthIsolated + " " + yearTxt);
            //                                  3. remove the dates
            d3.selectAll(".lunarCalendarDates")
                .transition().delay((d, i) => 15 * i).duration(150).style("opacity", "0")
                .transition().remove();
            //                                  4. remove the mini-moons
            d3.selectAll(".lunarCalendarMoons")
                .transition().delay((d, i) => 15 * i).duration(150).style("opacity", "0")
                .transition().remove();
            //                                  5. remove the texts
            d3.selectAll(".lunarCalendarTexts")
                .transition().delay((d, i) => 15 * i).duration(150).style("opacity", "0")
                .transition().remove();
            //                                  6. remove the line
            d3.selectAll(".astroLine")
                .transition().delay((d, i) => 15 * i).duration(150).style("opacity", "0")
                .transition().remove();
            //                                  7. remove the horoscropes texts
            d3.selectAll(".astroTxt")
                .transition().delay((d, i) => 15 * i).duration(150).style("opacity", "0")
                .transition().remove();
            //                                  8. remove buttons to switch months
            d3.selectAll(".monthButton")
                .transition().delay((d, i) => 300 * i).duration(150).style("opacity", "0")
                .transition().remove();
            //                                  9. call this function back
            setTimeout(() => moonCalendarDisplay(monthIsolated + " " + yearTxt), 450)
        })
        .transition().delay(2000).duration(500).style("opacity", "1");

}

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
    .text("> by joël rimaz")
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

/* OTHER TEXTS */
let myMoonCalendar = svgSpace    // the moon calendar button
    .append("text")
    .text("∧ moon calendar.")
    .attr("fill", "white")
    .attr("x", largeur / 20)
    .attr("y", hauteur / 10 * 5)
    .style("cursor", "pointer")
    .style("text-anchor", "start")
    .style("font-size", "3em")
    .style("opacity", "0")
    .style("display", "none")
    .style("cursor", "pointer")
    .on("click", () => {
        myMoonCalendar
            .transition().duration(200).style("opacity", "0")
            .transition().style("display", "none");
        
        myMoonGraphs
            .transition().duration(200).style("opacity", "0")
            .transition().style("display", "none");

        backMenu
            .attr("y", (hauteur / 2) - (hauteur / 10) + 25)
            .transition().delay(500).duration(1000).style("display", "block").style("opacity", "1")

        myMoon
            .transition().duration(1000).attr("transform", "translate(" + largeur / 2 + "," + ((hauteur / 2) - (hauteur / 10)) + ") scale(-1,1)");
        titleApp
            .transition().duration(1000).attr("y", (hauteur / 2) - (hauteur / 10));
        subTitleApp
            .transition().duration(1000).attr("y", (hauteur / 2) - (hauteur / 10) + 25).style("opacity", "0");

        d3.selectAll(".txtCalendarYear")
            .transition().delay((d, i) => 100 * i).duration(1000).style("display", "block").style("opacity", "1");
    });

let myMoonGraphs = svgSpace    // the moon graphs button
    .append("text")
    .text("moon graphs. ∨")
    .attr("fill", "white")
    .attr("x", largeur / 20 * 19)
    .attr("y", hauteur / 10 * 5)
    .style("cursor", "pointer")
    .style("text-anchor", "end")
    .style("font-size", "3em")
    .style("opacity", "0")
    .style("display", "none")
    .style("cursor", "pointer")
    .on("click", () => {
        myMoonCalendar
            .transition().duration(200).style("opacity", "0")
            .transition().style("display", "none");
        
        myMoonGraphs
            .transition().duration(200).style("opacity", "0")
            .transition().style("display", "none");
    });

let backMenu = svgSpace    // the button to go back to the main menu
    .append("text")
    .text("< main menu.")
    .attr("fill", "white")
    .attr("fill", "white")
    .attr("x", largeur / 2)
    .attr("y", hauteur / 2)
    .style("cursor", "pointer")
    .style("font-size", "1em")
    .style("opacity", "0")
    .style("display", "none")
    .style("cursor", "pointer")
    .on("click", () => {
        d3.selectAll(".txtCalendarYear")
            .transition().delay((d, i) => 25 * i).duration(500).style("opacity", "0")
            .transition().style("display", "none");
        
        backMenu
            .transition().delay(500).duration(200).style("opacity", "0")
            .transition().style("display", "none");
        
        myMoonCalendar
            .transition().delay(700).duration(1000).style("display", "block").style("opacity", "1")

        myMoonGraphs
            .transition().delay(700).duration(1000).style("display", "block").style("opacity", "1")
            
        myMoon
            .transition().delay(500).duration(1000).attr("transform", "translate(" + largeur / 2 + "," + hauteur / 2 + ") scale(-1,1)");
        titleApp
            .transition().delay(500).duration(1000).attr("y", hauteur / 2);
        subTitleApp
            .transition().delay(500).duration(1000).attr("y", hauteur / 2 + 25).style("opacity", "1");
    });

let yearSelected = svgSpace     // the text displaying the year and month selected
    .append("text")
    .text("")
    .attr("fill", "white")
    .attr("x", largeur / 2)
    .attr("y", hauteur / 10 * 4.5)
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
        backTxtMonths                   //  1. remove the back button
            .transition().duration(500).style("opacity", "0")
            .transition().style("display", "none");

        myMoon                          //  2. place the moon back slightly above the middle of the screen
            .transition().delay(1000).duration(1000).attr("transform", "translate(" + largeur / 2 + "," + ((hauteur / 2) - (hauteur / 10)) + ") scale(-1,1)");

        //                                  3. bring back the months, first by displaying them, then by increasing their opacity
        d3.selectAll(".txtCalendarMonth")
            .transition().delay((d, i) => 1000 + (100 * i)).duration(1000).style("display", "block").style("opacity", "1");

        let txt = yearSelected.text();  //  4. isolate the year from the text displaying previously "month year"
        let yearTxt = txt.split(" ").pop();

        yearSelected                    //  5. place the yearSelected text back in the middle of the screen, and display only the year selected
            .transition().duration(500).style("opacity", "0")
            .transition().duration(1000).attr("y", hauteur / 10 * 4.5)
            .transition().duration(1000).style("opacity", "1").text(yearTxt);

        backTxtYears                    //  6. make the "back to years" button re-appear
            .transition().duration(1000).style("display", "block")
            .transition().duration(1000).style("opacity", "1");

        //                                  7. remove the dates
        d3.selectAll(".lunarCalendarDates")
            .transition().delay((d, i) => 25 * i).duration(250).style("opacity", "0")
            .transition().remove();
        //                                  8. remove the mini-moons
        d3.selectAll(".lunarCalendarMoons")
            .transition().delay((d, i) => 25 * i).duration(250).style("opacity", "0")
            .transition().remove();
        //                                  9. remove the texts
        d3.selectAll(".lunarCalendarTexts")
            .transition().delay((d, i) => 25 * i).duration(250).style("opacity", "0")
            .transition().remove();
        //                                  10. remove the line
        d3.selectAll(".astroLine")
            .transition().delay((d, i) => 25 * i).duration(250).style("opacity", "0")
            .transition().remove();
        //                                  11. remove the horoscropes texts
        d3.selectAll(".astroTxt")
            .transition().delay((d, i) => 25 * i).duration(250).style("opacity", "0")
            .transition().remove();
        //                                  12. remove buttons to switch months
        d3.selectAll(".monthButton")
            .transition().delay((d, i) => 25 * i).duration(250).style("opacity", "0")
            .transition().remove();
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

        // 5. make the back to menu button re-appear
        backMenu
            .attr("y", (hauteur / 2) - (hauteur / 10) + 25)
            .transition().delay(1000).duration(1000).style("display", "block").style("opacity", "1")

        titleApp                        //  6. make the title re-appear
            .transition().delay(1000).duration(500).style("opacity", "1");
    });