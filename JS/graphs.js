function pickChoice() {
    let monDay = 0,
        monMonth = "",
        monYear = 0;

    const introTxt = addText("_choose a date.", largeur / 2, hauteur / 10, "menuPick", "default", "middle", "4em");
    introTxt.transition().duration(1000).style("opacity", 1);

    const dayTxt = addText("> day.", largeur / 10, hauteur / 10 * 3, "menuPick", "pointer", "start", "3em");
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
                        .transition().duration(500).text("> day._" + monDay).style("opacity", 1);
                })
                .transition().delay((d, i) => 100 + 50 * i).duration(500).style("opacity", 1);
        })
        .transition().delay(250).duration(1000).style("opacity", 1);

    const monthTxt = addText("> month. <", largeur / 2, hauteur / 10 * 3, "menuPick", "pointer", "middle", "3em");
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
                        .transition().duration(500).text("> month._" + monMonth).style("opacity", 1);
                })
                .transition().delay((d, i) => 100 + 50 * i).duration(500).style("opacity", 1);
        })
        .transition().delay(250).duration(1000).style("opacity", 1);

    const yearTxt = addText("year. <", largeur / 10 * 9, hauteur / 10 * 3, "menuPick", "pointer", "end", "3em")
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
                        .transition().delay((d, i) => 25 * i).duration(500).style("opacity", 0)
                        .transition().remove();

                    d3.select("#yearSel")
                        .transition().delay(250).duration(500).style("opacity", 0)
                        .transition().duration(500).text("> year._" + monDay).style("opacity", 1);
                })
                .transition().delay((d, i) => 100 + 50 * i).duration(500).style("opacity", 1);
        })
        .transition().delay(250).duration(1000).style("opacity", 1);



    const validateTxt = addText("> confirm. <", largeur / 2, hauteur / 10 * 6.5, "menuPick", "pointer", "middle", "4em")
    validateTxt.transition().delay(500).duration(1000).style("opacity", 1);
}

function deleteSelection() {
    d3.selectAll(".daysSelectTxt")
        .transition().delay((d, i) => 25 * i).duration(250).style("opacity", 0)
        .transition().remove();

    d3.selectAll(".monthSelectTxt")
        .transition().delay((d, i) => 25 * i).duration(500).style("opacity", 0)
        .transition().remove();

    d3.selectAll(".yearsSelectTxt")
        .transition().delay((d, i) => 25 * i).duration(500).style("opacity", 0)
        .transition().remove();

    d3.select(".daysSelect")
        .transition().delay(750).remove();
}

function addText(txt, x, y, txtClass, cursorType, anchor, fontSize){
    return svgSpace
        .append("text")
        .text(txt)
        .attr("fill", "white")
        .attr("x", x)
        .attr("y", y)
        .attr("class", txtClass)
        .style("cursor", cursorType)
        .style("text-anchor", anchor)
        .style("font-size", fontSize)
        .style("opacity", "0")
}