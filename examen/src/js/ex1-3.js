import * as d3 from 'd3'
import { easeLinear } from 'd3'
import css from "../index.css";

// // Import des données
import data from '../../data/countries.geojson'

//------------------------------- Exercice 1 ----------------------------------------------------

const body = d3.select("body")
body.append("div").attr("class", "grid-container")
body.append("div").attr("class", "data-container")
body.append("div").attr("class", "visualisation-container")

//----------------------------------------------------------------------------------------------
const margin = { top: 10, right: 10, bottom: 10, left: 10 }

const svgGrid = d3.select(".grid-container")
    .append("svg")
    .attr("width", 500 + margin.right + margin.left)
    .attr("height", 500 + margin.top + margin.bottom)
    .attr("transform", "translate(0,50)")

//----------------------------------------------------------------------------------------------

let n = 0
let x = 0
let y = 1
for (let i = 0; i < 10; i++) {
    while (n < 10) {
        if (n == 0) {
            svgGrid.append("g")
                .append("rect")
                .attr("width", "50px")
                .attr("height", "50px")
                .attr("x", 10)
                .attr("y", y)
                .attr("fill", "transparent")
                .attr("stroke", "black")
                .attr("class", "rectangle")
            x = x + 10
        } else {
            svgGrid.append("g")
                .append("rect")
                .attr("width", "50px")
                .attr("height", "50px")
                .attr("x", x)
                .attr("y", y)
                .attr("fill", "transparent")
                .attr("stroke", "black")
                .attr("class", "rectangle")
        }
        n++
        x = x + 50
    }
    x = 0
    y = y + 50
    n = 0
}

//----------------------------------------------------------------------------------------------

//add circle in the middle of the svg
let middleX = (500 + margin.left + margin.right) / 2
let middleY = (500 + margin.top + margin.bottom) / 2
svgGrid.append("g")
    .append("circle")
    .attr("cx", middleX)
    .attr("cy", middleY)
    .attr("r", 25)
    .style("fill", "red")

//add path in the graph

//------------------------------- Exercice 2 ----------------------------------------------------

const biggerCountry = data.features.filter(function (c) {
    return c.properties.POP2005 > 1000000
})

const region = [
    {
        id: 150,
        name: "Europe",
        nbCountry: 0,
        population: 0,
        moyenne: 0
    },
    {
        id: 142,
        name: "Asie",
        nbCountry: 0,
        population: 0,
        moyenne: 0
    },
    {
        id: 9,
        name: "Océanie",
        nbCountry: 0,
        population: 0,
        moyenne: 0
    },
    {
        id: 19,
        name: "Amérique",
        nbCountry: 0,
        population: 0,
        moyenne: 0
    },
    {
        id: 2,
        name: "Afrique",
        nbCountry: 0,
        population: 0,
        moyenne: 0
    }
]

data.features.forEach(c => {
    region.forEach(continent => {
        if (c.properties.REGION == continent.id) {
            continent.population = continent.population + c.properties.POP2005
            continent.nbCountry = continent.nbCountry + 1
            continent.moyenne = (continent.population / continent.nbCountry).toFixed(0)
        }
    });
});

//sort region from the biggest to the smallest
region.sort(compare_pop)

region.forEach(continent => {
    d3.select(".data-container")
        .append("text")
        .text(continent.name + ": " + continent.moyenne)
});

//------------------------------- Exercice 3 ----------------------------------------------------

//Name map
d3.select(".visualisation-container").append("h3")
    .text("Let's give a look of la population par continent sur une map choroplète...")

const svgMap = d3.select(".visualisation-container")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500)

// Map and projection
const path = d3.geoPath();
const projection = d3.geoMercator()
    .scale(70)
    .center([0, 20])
    .translate([500 / 2, 500 / 2]);

// Data and color scale
let map = new Map()
const colorScale = d3.scaleThreshold()
    .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
    .range(d3.schemeBlues[8]);

//add tooltip
let Desc = d3.select("body").append("div")
    .attr("class", "tooltip-donut")
    .style("opacity", 0);

//Draw map
d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(function (d) {
    svgMap.append('g')
        .selectAll('path')
        .data(d.features)
        .join("path")
        .attr("d", path.projection(projection))
        .attr("id", function (d) { return d.properties.name; })
        .attr("fill", function (d) {
            let number = 0;
            data.features.forEach(country => {
                if (this.id == country.properties.NAME)
                    number = country.properties.POP2005
            })
            return colorScale(number);
        })
        .on("mouseover", function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .style("opacity", 0.5);

            Desc.transition()
                .duration('50')
                .style("opacity", 1);

            let txt = "No data :)"
            data.features.forEach(country => {
                if (i.properties.name == country.properties.NAME) {
                    txt = i.properties.name + ": " + country.properties.POP2005
                }
            });
            Desc.html(txt)
                .style("left", (d.clientX + 10) + "px")
                .style("top", (d.clientY - 15) + "px");

        })
        .on("mouseleave", function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .style("opacity", 1);

            Desc.transition()
                .duration('50')
                .style("opacity", 0)
        })
})

//----------------------------------------------------------------------------------------------

//Histogram
const svgHisto = d3.select(".visualisation-container")
    .append("svg")
    .attr("width", 600)
    .attr("height", 520)
    .append("g")
    .attr("transform", "translate(60,0)")


let xBand = d3.scaleLinear()
    .domain([0, 4000000000])
    .range([0, 500])

//define axis x format
let x_axis = d3.axisBottom(xBand).ticks(6)
    .tickFormat(d3.format(".1s"))
//add X axis
svgHisto.append("g")
    .attr("transform", `translate(0, ${500})`)
    .call(x_axis)
//axis y param
let y_axis = d3.scaleBand()
    .domain(region.map(function (d) { return d.name }))
    .range([0, 500])
    .padding(.1);

//param transition
let t = d3.transition()
    .duration(1000)
    .ease(easeLinear)

//add axis y to svg
svgHisto.append("g")
    .call(d3.axisLeft(y_axis))

svgHisto.selectAll("bars")
    .data(region)
    .enter()
    .append("rect")
    .attr("x", xBand(0))
    .attr("y", d => y_axis(d.name))
    .attr("width",0)
    .attr("height", y_axis.bandwidth())
    .attr("fill", "blue")
    .on("mouseover", function (d, i) {
        d3.select(this).transition()
            .duration('50')
            .style("opacity", 0.5);

        Desc.transition()
            .duration('50')
            .style("opacity", 1);
        let txt = "Nombre d'habitants: " + i.population
        Desc.html(txt)
            .style("left", (d.clientX + 10) + "px")
            .style("top", (d.clientY - 15) + "px");
    })
    .on("mouseleave", function (d, i) {
        d3.select(this).transition()
            .duration('50')
            .style("opacity", 1);

        Desc.transition()
            .duration('50')
            .style("opacity", 0)
    })
    .transition(t)
    .attr("width", d => xBand(d.population))

//----------------------------------------------------------------------------------------------

//nav simulation
const btn1 = document.getElementsByClassName("btn1")[0]
const btn2 = document.getElementsByClassName("btn2")[0]
const btn3 = document.getElementsByClassName("btn3")[0]

const buttons = [btn1, btn2, btn3]

const gridContainer = document.getElementsByClassName("grid-container")
const dataContainer = document.getElementsByClassName("data-container")
const visualisationContainer = document.getElementsByClassName("visualisation-container")

const exercices = [gridContainer[0], dataContainer[0], visualisationContainer[0]]

//first layout
for (let i = 0; i < exercices.length; i++) {
    if (i == 0) {
        exercices[i].classList.remove("hidden")
        buttons[i].classList.add("select")
    } else {
        exercices[i].classList.add("hidden")
    }
}
//event listener 
btn1.addEventListener("click", (e) => {
    // e.path[0].classList.add("select")
    for (let i = 0; i < exercices.length; i++) {
        if (i == 0) {
            exercices[i].classList.remove("hidden")
            buttons[i].classList.add("select")
        } else {
            exercices[i].classList.add("hidden")
            buttons[i].classList.remove("select")
        }
    }
})
btn2.addEventListener("click", () => {
    for (let i = 0; i < exercices.length; i++) {
        if (i == 1) {
            exercices[i].classList.remove("hidden")
            buttons[i].classList.add("select")
        } else {
            exercices[i].classList.add("hidden")
            buttons[i].classList.remove("select")
        }
    }
})
btn3.addEventListener("click", () => {
    for (let i = 0; i < exercices.length; i++) {
        if (i == 2) {
            exercices[i].classList.remove("hidden")
            buttons[i].classList.add("select")
        } else {
            exercices[i].classList.add("hidden")
            buttons[i].classList.remove("select")
        }
    }
})

//----------------------------------------------------------------------------------------------

function compare_pop( a, b ){
    if ( a.population < b.population){
      return -1;
    }
    if ( a.population > b.population){
      return 1;
    }
    return 0;
  }