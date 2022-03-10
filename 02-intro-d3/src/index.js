import * as d3 from 'd3';
//Création du canva SVG
let svg = d3.select("body")
    .append("svg")
    .attr("width", 1200)
    .attr("height", 400)
    .style('background-color', 'transparent')

//Constantes qui contiennent et créent des balises groupes avec un svg à l'intérieur
//Autant de groupe et de svg que d'objets nécessaires
const group1 = svg.append("g")
    .append("svg")

const group2 = svg.append("g")
    .append("svg")

const group3 = svg.append("g")
    .append("svg")

//le .append intègre à un élément des balises
//Création des textes liés au groupes
const text1 = group1.append("text")
    .attr("x", "60") //modification des attributs de notre constante txt
    .attr("y", "100")
    .text("Ceci n'est pas un cercle")
// .attr('text-anchor', 'middle')

const text2 = group2.append("text")
    .attr("x", "160")
    .attr("y", "200")
    .text("Ceci n'est toujours pas un cercle")

const text3 = group3.append("text")
    .attr("x", "190")
    .attr("y", "305")
    .text("Ceci n'est pas un cercle, mais un bouton ! Let's click")


//Création de cercle qu'on ajoute à notre groupe. Notre svg groupe1 contient désormais la constante cercle. Aura l'effet d'être réutilisable dans le programme
const circle1 = group1.append("circle")
    .attr("cx", "50")
    .attr("cy", "50")
    .attr("r", "40")
    .attr("transform", "translate (50,0)")

const circle2 = group2.append("circle")
    .attr("cx", "150")
    .attr("cy", "150")
    .attr("r", "40")
    .attr("fill", "#423CFA")

const circle3 = group3.append("circle")
    .attr("cx", "250")
    .attr("cy", "250")
    .attr("r", "40")


//Ajouter un événement suite à un click sur un cercle
circle3.on("click", () => {
    circle1.attr("cx", 350);
    circle2.attr("cx", 400);
    circle3.attr("cx", 400);
})



// Créer un histogramme de rectangles

const data = [20, 5, 25, 8, 15]

const divGraph = d3.select("body")
    .append("div")

const svgGraph = divGraph.append("svg")
    .attr("width", 300)
    .attr("height", 300)

const svgRect = svgGraph.append("svg")

svgRect.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * 40) // 40 = espacement entre chaque barre
    .attr("y", (d) => svgRect.attr("height") - d + 50)
    .attr("width", 30) // 30 = largeur de chaque barre
    .attr("height", d => d)


//---------------autre méthode------------------------------
// //Création d'un groupe pour notre histogramme de rectangles selon les hauteurs ci-dessous
// const data = [20, 5, 25, 8, 15]

// //récupérer et stocker la div dans ce fichier js
// const myDiv = d3.select(".my-div")
//     .append("svg")
//     .attr("width", 1200)
//     .attr("height", 100)
//     .style('background-color', 'transparent')

// const divRect = myDiv.append("svg")

// //Rectangle
// divRect.selectAll("rect")
//     .data(data)
//     .enter()
//     .append("rect")
//     .attr("x", (d, i) => i * 30)
//     .attr("y", (d) => divRect.attr("height") - d + 50)
//     .attr("width", 20)
//     .attr("height", d => d)
//     .attr('fill', 'lightblue')