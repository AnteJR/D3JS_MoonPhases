/* MENU TEXTS */

// the moon calendar button
let myMoonCalendar = addText("∧ moon calendar.", largeur / 20, hauteur / 2, "calendarBtnChoose", "pointer", "start", "3em", 0);
myMoonCalendar
    .style("display", "none")
    .on("click", () => {
        myMoonCalendar
            .transition().duration(200).style("opacity", "0")
            .transition().style("display", "none");

        myMoonGraphs
            .transition().duration(200).style("opacity", "0")
            .transition().style("display", "none");

        backMenu
            .attr("y", (hauteur / 2) - (hauteur / 10) + 25)
            .transition().delay(500).duration(1000).style("display", "block").style("opacity", "1");

        myMoon
            .transition().duration(1000).attr("transform", "translate(" + largeur / 2 + "," + ((hauteur / 2) - (hauteur / 10)) + ") scale(-1,1)");
        titleApp
            .transition().duration(1000).attr("y", (hauteur / 2) - (hauteur / 10));
        subTitleApp
            .transition().duration(1000).attr("y", (hauteur / 2) - (hauteur / 10) + 25).style("opacity", "0");

        d3.selectAll(".txtCalendarYear")
            .transition().delay((d, i) => 100 * i).duration(1000).style("display", "block").style("opacity", "1");
    });

// the moon pick button (before : a button for the scrapped graphs project)
let myMoonGraphs = addText("pick a moon. ∨", largeur / 20 * 19, hauteur / 2, "pickBtnChoose", "pointer", "end", "3em", 0);
myMoonGraphs
    .style("display", "none")
    .on("click", () => {
        myMoonCalendar
            .transition().duration(200).style("opacity", "0")
            .transition().style("display", "none");

        myMoonGraphs
            .transition().duration(200).style("opacity", "0")
            .transition().style("display", "none");

        myMoon
            .transition().duration(1000).attr("transform", "translate(" + largeur / 2 + "," + (hauteur - hauteur / 20) + ") scale(-1,1)");
        titleApp
            .transition().duration(1000).attr("y", (hauteur - hauteur / 20));
        subTitleApp
            .transition().duration(1000).attr("y", (hauteur - hauteur / 20) + 25).style("opacity", "0");

        backMenu
            .attr("y", (hauteur - hauteur / 20) + 25)
            .transition().delay(500).duration(1000).style("display", "block").style("opacity", "1");

        pickChoice();
    });

// the button to go back to the main menu
let backMenu = addText("< main menu.", largeur / 2, hauteur / 2, "backBtn", "pointer", "start", "1em", 0);
backMenu
    .style("display", "none")
    .on("click", () => {
        d3.selectAll(".menuPick")
            .transition().delay((d, i) => 25 * i).duration(500).style("opacity", "0")
            .transition().remove();

        d3.selectAll(".txtCalendarYear")
            .transition().delay((d, i) => 25 * i).duration(500).style("opacity", "0")
            .transition().style("display", "none");

        deleteSelection()

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

// the text displaying the year and month selected
let yearSelected = addText("", largeur / 2, hauteur / 10 * 4.5, "selectedYear", "default", "middle", "5em", 0);
yearSelected
    .style("display", "none");

// the text to go back to the month selection
let backTxtMonths = addText("<< back.", 20, hauteur - 20, "backToMonthBtn", "pointer", "start", "4em", 0);
backTxtMonths
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

// the text to go back to the year selection
let backTxtYears = addText("< back.", 20, hauteur - 20, "backToYearsBtn", "pointer", "start", "4em", 0);
backTxtYears
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