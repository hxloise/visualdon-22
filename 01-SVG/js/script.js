const rectangles = document.querySelectorAll('.rectangle')

rectangles.forEach(rectangle => {
    rectangle.addEventListener('click', evt => {
        evt = evt.target;
        console.log(evt);
        rectangle.classList.toggle('Change')
    })
})

const donuts = document.querySelectorAll('.donut')

donuts.forEach(donut => {
    donut.addEventListener('mouseover', evt => {
        evt = evt.target;
        console.log(evt);
        /* donut.setAttribute("r","100") */
        donut.classList.toggle('changerayon')
    })
})

function dessiner() {
    var canevas = document.getElementById('canevas');
    if (canevas.getContext) {
      var ctx = canevas.getContext('2d');
  
      // Exemple de courbes cubiques
      ctx.beginPath();
      ctx.moveTo(75, 40);
      ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
      ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
      ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
      ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
      ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
      ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
      ctx.fill();
    }
  }
  