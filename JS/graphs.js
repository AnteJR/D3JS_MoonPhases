function historyData(moonArray) {
    let yearStart = 1997,
        monthStart = "jan",
        numberMonth = 0,
        arrayToUse = []
        arrayFull = [];

    moonArray.forEach((e) => {
        if(e.month == monthStart) {
            if (e.year == yearStart){
                arrayToUse.push([e.year, e.day, e.moonphase, Math.round(e.piTimes / pi * 1000) / 1000]);
            }
            else {
                yearStart = e.year
                arrayFull.push(arrayToUse);
                arrayToUse = [];
                arrayToUse.push([e.year, e.day, e.moonphase, Math.round(e.piTimes / pi * 1000) / 1000]);
            }
        }
    });

    for(let i = 0; i < arrayFull.length; i++){
        const monGraph = svgSpace.append("path")
        .datum(arrayFull[i])
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x((d, i) => {
                return largeur / (arrayToUse.length + 1) * (i + 1)
            })
            .y((d, i) => {
                if (d[3] <= 1){
                    let maHauter = hauteur / 3 + ((1 - d[3]) * (hauteur / 5));
                    return maHauter
                }
                else if (d[3] > 1) {
                    let maHauter2 = hauteur / 3 + ((1 - (2 - d[3])) * (hauteur / 5));
                    return maHauter2
                }
            })
        )
        .attr("class", "histoGraph")
        .style("opacity", 0.5)
        .on("mouseover", (e) => {
            console.log(e.target.__data__[0][0])
            e.attr("opacity", 1);
        })
    }
}