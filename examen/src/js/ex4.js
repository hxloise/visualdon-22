import puppeteer from 'puppeteer';

//------------------------------- Exercice 4 ----------------------------------------------------

(async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto('https://heig-vd.ch/formations/bachelor/filieres')
    await page.screenshot({ path: 'heig-vd_filieres.png' });

    // Crée un tableau vide pour les filières
    const pathwayList = []

    // Récupère les lignes du tableau des filières
    const pathways = await page.$$('#liste-formations tbody tr')

    for (let el of pathways) {

        // Défini la filière et le nb d'orientations, si on est sur la bonne ligne
        const program = await el.evaluate(el => {
            const pathwayEl = el.querySelector('.prog')
            if (!pathwayEl) return

            const pathway = pathwayEl.textContent
            const rowspan = pathwayEl.getAttribute('rowspan') // attr qui défini le nombre de ligne pour une filière
            const courseNb = rowspan ? rowspan : '1'

            return {pathway, courseNb}
        })

        // N'ajoute la filière que si elle existe
        if (program) pathwayList.push(program)
    }

    console.table(pathwayList)
    
    await browser.close()
})()