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