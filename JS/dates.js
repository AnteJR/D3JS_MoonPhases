const yearGrid = svgSpace.append("g")
        .attr("id", "yearTxt")
        .selectAll("text")
        .data(years)
        .enter()
        .append("text")
        .text((d) => d)
        .attr("class", "txtCalendarYear")
        .attr("x", (d, i) => {
            if (i < 6) return (largeur / 15) + (largeur / 6) * (i);
            else if (i == 6 || i == 7) return (largeur / 15) + (largeur / 6) * (i - 6);
            else if (i == 8 || i == 9) return (largeur / 15) + (largeur / 6) * (i - 4);
            else if (i == 10 || i == 11) return (largeur / 15) + (largeur / 6) * (i - 10);
            else if (i == 12 || i == 13) return (largeur / 15) + (largeur / 6) * (i - 8);
            else if (i > 13 && i < 20) return (largeur / 15) + (largeur / 6) * (i - 14);
            else if (i >= 20) return (largeur / 15) + (largeur / 6) * (i - 20);
        })
        .attr("y", (d, i) => {
            if (i < 6) return hauteur / 10;
            else if (i == 6 || i == 7 || i == 8 || i == 9) return hauteur / 10 * 3;
            else if (i == 10 || i == 11 || i == 12 || i == 13) return hauteur / 10 * 5;
            else if (i > 13 && i < 20) return hauteur / 10 * 7;
            else if (i >= 20) return hauteur / 10 * 9;
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
                .style("display", "block")
                .transition().delay((d, i) => 1000 + 100 * i).duration(1000).style("opacity", "1");

            titleApp
                .transition().delay(500).duration(200).style("opacity", "0");

            yearSelected
                .style("display", "block")
                .transition().delay(1000).duration(1000).style("opacity", "1").text(d3.select(e.currentTarget).text());

            backTxtYears
                .style("display", "block")
                .transition().delay(2000).duration(1000).style("opacity", "1");

            backMenu
                .transition().delay(500).duration(200).style("opacity", "0")
                .transition().style("display", "none");
        });

const monthGrid = svgSpace.append("g")
    .attr("id", "monthTxt")
    .selectAll("text")
    .data(monthsFull)
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
            txtToApply = d3.select(e.currentTarget).text() + " " + yearTxt;

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