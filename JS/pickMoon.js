function pickChoice() {
    let monDay = 0,
        monMonth = "";

    const introTxt = addText("choose a date.", largeur / 2, hauteur / 10, "menuPick", "default", "middle", "4em", 0);
    introTxt.transition().duration(1000).style("opacity", 1);

    const dayTxt = addText("day.", largeur / 10, hauteur / 10 * 3, "menuPick", "pointer", "start", "3em", 0);
    dayTxt
        .attr("id", "daySel")
        .on("click", (e) => {
            deleteSelection()

            svgSpace.append("g")
                .attr("class", "daysSelect")
                .selectAll("text")
                .data(days)
                .enter()
                .append("text")
                .text((d) => d)
                .attr("fill", "white")
                .attr("x", (d, i) => (largeur / (days.length + 1)) * (i + 1))
                .attr("y", hauteur / 10 * 4.5)
                .attr("class", "daysSelectTxt")
                .style("cursor", "pointer")
                .style("font-size", "2em")
                .style("text-anchor", "middle")
                .style("opacity", "0")
                .on("click", (event) => {
                    monDay = parseInt(d3.select(event.currentTarget).text());

                    deleteSelection()

                    d3.select("#daySel")
                        .transition().delay(250).duration(500).style("opacity", 0)
                        .transition().duration(500).text("day._" + monDay).style("opacity", 1);
                })
                .transition().delay((d, i) => 100 + 25 * i).duration(500).style("opacity", 1);
        })
        .transition().delay(250).duration(1000).style("opacity", 1);

    const monthTxt = addText("month.", largeur / 2, hauteur / 10 * 3, "menuPick", "pointer", "middle", "3em", 0);
    monthTxt
        .attr("id", "monthSel")
        .on("click", (e) => {
            deleteSelection()

            svgSpace.append("g")
                .attr("class", "daysSelect")
                .selectAll("text")
                .data(months)
                .enter()
                .append("text")
                .text((d) => d)
                .attr("fill", "white")
                .attr("x", (d, i) => (largeur / (months.length + 1)) * (i + 1))
                .attr("y", hauteur / 10 * 4.5)
                .attr("class", "monthSelectTxt")
                .style("cursor", "pointer")
                .style("font-size", "2em")
                .style("text-anchor", "middle")
                .style("opacity", "0")
                .on("click", (event) => {
                    monMonth = d3.select(event.currentTarget).text();

                    deleteSelection()

                    d3.select("#monthSel")
                        .transition().delay(250).duration(500).style("opacity", 0)
                        .transition().duration(500).text("month._" + monMonth).style("opacity", 1);
                })
                .transition().delay((d, i) => 100 + 25 * i).duration(500).style("opacity", 1);
        })
        .transition().delay(250).duration(1000).style("opacity", 1);

    const yearTxt = addText("year.", largeur / 10 * 9, hauteur / 10 * 3, "menuPick", "pointer", "end", "3em", 0)
    yearTxt
        .attr("id", "yearSel")
        .on("click", (e) => {
            deleteSelection()

            svgSpace.append("g")
                .attr("class", "daysSelect")
                .selectAll("text")
                .data(years)
                .enter()
                .append("text")
                .text((d) => d)
                .attr("fill", "white")
                .attr("x", (d, i) => {
                    if (i < 13) return largeur / 14 * (i + 1);
                    else if (i > 12) return largeur / 14 * ((i + 1) - 13);
                })
                .attr("y", (d, i) => {
                    if (i < 13) return hauteur / 10 * 4.5;
                    else if (i > 12) return hauteur / 10 * 4.5 + hauteur / 22;
                })
                .attr("class", "yearsSelectTxt")
                .style("cursor", "pointer")
                .style("font-size", "2em")
                .style("text-anchor", "middle")
                .style("opacity", "0")
                .on("click", (event) => {
                    monDay = parseInt(d3.select(event.currentTarget).text());

                    d3.selectAll(".yearsSelectTxt")
                        .transition().delay((d, i) => {
                            if (i < 13) return 30 * i;
                            else return 30 * (i - 13);
                        }).duration(500).style("opacity", 0)
                        .transition().remove();

                    d3.select("#yearSel")
                        .transition().delay(250).duration(500).style("opacity", 0)
                        .transition().duration(500).text("year._" + monDay).style("opacity", 1);
                })
                .transition().delay((d, i) => {
                    if (i < 13) return 30 * i;
                    else return 30 * (i - 13);
                }).duration(500).style("opacity", 1);
        })
        .transition().delay(250).duration(1000).style("opacity", 1);



    const validateTxt = addText("> confirm. <", largeur / 2, hauteur / 10 * 6.5, "menuPick", "pointer", "middle", "4em", 0)
    validateTxt
        .on("click", (e) => {
            let selectedDay = dayTxt.text().split("_").pop();
            let selectedMonth = monthTxt.text().split("_").pop();
            let selectedYear = yearTxt.text().split("_").pop();

            showSelectedMoon(selectedDay, selectedMonth, selectedYear);
        })
        .transition().delay(500).duration(1000).style("opacity", 1);
}

function showSelectedMoon(d, m, y) {
    // find moon phase and elliptic arc's
    let selectedMoonPhase = [];
    let idMoon = 0;

    dataTable.forEach((e, i) => {
        if (e.day == d && e.month == m && e.year == y) {
            selectedMoonPhase.push(e.moonphase, e.piTimes);
            idMoon = i
        }
    });

    // if a moon phase's elloptic arc's pi multiple has been found
    if (!isNaN(selectedMoonPhase[1])) {
        // remove elements
        deleteSelection();
        d3.selectAll(".menuPick")
            .transition().duration(1000).style("opacity", "0")
            .transition().remove();

        titleApp
            .transition().delay(1000).duration(500).attr("y", hauteur + 50).style("opacity", "0")

        myMoon
            .transition().delay(1000).duration(1000).attr("transform", "translate(" + largeur / 2 + "," + ((hauteur - hauteur / 20) + hauteur / 2) + ") scale(-1,1)");

        backMenu
            .transition().delay(1000).duration(200).style("opacity", "0")
            .transition().style("display", "none");

        d3.selectAll(".moonPick").remove();

        setTimeout(() => {
            displayPickedMoon(d, m, y, selectedMoonPhase[0], selectedMoonPhase[1], idMoon);
        }, 1000);
    }
}

function displayPickedMoon(day2Display, month2Display, year2Display, phaseOfMoonTxt, phaseOfMoonPI, idTable) {
    let bigMoonPicked = svgSpace
        .append("path")
        .attr("fill", "white")
        .attr("transform", "translate(" + largeur / 2 + "," + 0 + ") scale(-1,1)")
        .attr("d", function () {
            return moon((2 * pi + phaseOfMoonPI) % (2 * pi), rayonBase);    // call of the moon function to determine the angle of the SVG elliptic arcs
        })
        .attr("class", "moonPick")
        .style("opacity", 0);


    let bigMoonPickedOutline = svgSpace
        .append("path")
        .attr("stroke", "white")
        .attr("fill", "rgba(1, 1, 1, 0)")
        .attr("transform", "translate(" + largeur / 2 + "," + 0 + ") scale(-1,1)")
        .attr("d", function () {
            return moon(0, rayonBase);    // call of the moon function to determine the angle of the SVG elliptic arcs
        })
        .attr("class", "moonPick")
        .style("opacity", 0);

    d3.selectAll(".moonPick")
        .transition().duration(1000).attr("transform", "translate(" + largeur / 2 + "," + hauteur / 2 + ") scale(-1,1)").style("opacity", 1);

    const txtPickedDate = addText(year2Display + ", " + month2Display + ". " + day2Display, largeur / 2, 0, "txtFullDate", "default", "middle", "5em", 0);
    txtPickedDate
        .transition().duration(1000).attr("y", hauteur / 10 * 1.5).style("opacity", 1);

    const txtMoonPhasePick = addText(phaseOfMoonTxt, largeur / 2, hauteur / 2, "txtFullPhase", "default", "middle", "5em", 0);
    txtMoonPhasePick
        .transition().duration(1000).attr("y", hauteur / 10 * 9).style("opacity", 1);

    const backButtonPick = addText("< back.", 20, hauteur / 4 * 3, "backButtonPhase", "pointer", "start", "4em", 0);
    backButtonPick
        .on("click", (e) => {
            deleteDisplayPickedMoon()

            titleApp
                .transition().duration(1000).attr("y", hauteur - hauteur / 20).style("opacity", "1")

            myMoon
                .transition().duration(1000).attr("transform", "translate(" + largeur / 2 + "," + (hauteur - hauteur / 20) + ") scale(-1,1)");

            backMenu
                .transition().style("display", "block")
                .transition().delay(500).duration(1000).style("opacity", "1");

            pickChoice();
        })
        .transition().duration(1000).attr("y", hauteur - 20).style("opacity", 1);

    if (idTable > 0) {
        const prevButton = addText("< previous day.", largeur / 20, hauteur / 4, "changeDayText", "pointer", "start", "2em", 0)
            .on("click", () => changeUp(true, idTable))
            .transition().duration(1000).attr("y", hauteur / 2).style("opacity", 1);
    }

    if (idTable < dataTable.length - 1) {
        const nextButton = addText("next day. >", largeur / 20 * 19, hauteur / 4, "changeDayText", "pointer", "end", "2em", 0)
            .on("click", () => changeUp(false, idTable))
            .transition().duration(1000).attr("y", hauteur / 2).style("opacity", 1);
    }
}

function changeUp(isMinus, i) {
    if (isMinus) i--;
    else i++;

    deleteDisplayPickedMoon();

    showSelectedMoon(dataTable[i].day, dataTable[i].month, dataTable[i].year);
}

function deleteDisplayPickedMoon() {
    d3.select(".backButtonPhase")
        .transition().duration(500).attr("y", hauteur / 4 * 3).style("opacity", 0)
        .transition().remove();

    d3.select(".txtFullDate")
        .transition().duration(500).attr("y", 0).style("opacity", 0)
        .transition().remove();

    d3.select(".txtFullPhase")
        .transition().duration(500).attr("y", hauteur / 2).style("opacity", 0)
        .transition().remove();

    d3.selectAll(".moonPick")
        .transition().duration(500).attr("transform", "translate(" + largeur / 2 + "," + hauteur / 4 + ") scale(-1,1)").style("opacity", 0).remove();

    d3.selectAll(".changeDayText")
        .transition().duration(500).attr("y", hauteur / 4).style("opacity", "0")
        .transition().remove();
}

function deleteSelection() {
    d3.selectAll(".daysSelectTxt")
        .transition().delay((d, i) => 15 * i).duration(250).style("opacity", 0)
        .transition().remove();

    d3.selectAll(".monthSelectTxt")
        .transition().delay((d, i) => 25 * i).duration(250).style("opacity", 0)
        .transition().remove();

    d3.selectAll(".yearsSelectTxt")
        .transition().delay((d, i) => {
            if (i < 13) return 25 * i;
            else return 25 * (i - 13);
        }).duration(250).style("opacity", 0)
        .transition().remove();

    d3.select(".daysSelect")
        .transition().delay(750).remove();
}