// ============================================
// Verander de taal van het HTML DOM
// ============================================
const btnLanguage = document.querySelector('.btn-language');
const toolTip = document.querySelector('.tool-tip');
let english = true;
// Eventlistner voor een click
btnLanguage.addEventListener("click", function() {
    // Check of de variable true is
    if (english == true) {
        // Verander de button text
        btnLanguage.innerHTML = "العربية";
        // Verander het HTML lang atribuut
        document.documentElement.lang = 'ar';
        // Verander de lees directie
        document.body.style.direction = 'rtl';
        // Voeg een class toe
        document.body.classList.add('arabic');
        // Verander de variable naar false
        english = false;
    }else {
        btnLanguage.innerHTML = "ENGLISH";
        document.documentElement.lang = 'en';
        document.body.style.direction = 'ltr';
        document.body.classList.remove('arabic');
        // Verander de variable naar false
        english = true;
    }
});
// ============================================
// Toggle tooltip voor de taal
// ============================================
// Eventlistener voor mouseover
btnLanguage.addEventListener("mouseover", toolTipToggle);
// Eventlistener voor mouseout
btnLanguage.addEventListener("mouseout", toolTipToggle);
// functie voor het togglen
function toolTipToggle() {
    toolTip.classList.toggle('hidden');
}
// ============================================
// Toggle tooltip voor kunstwerk titel
// ============================================
const imageToolTips = document.querySelectorAll('.image-tooltip');
const imageArts = document.querySelectorAll('.canvas-item');

imageArts.forEach((art, index) => {
    art.addEventListener("mouseover", function() {
        imageToolTips[index].classList.toggle('hidden');
    });

    art.addEventListener("mouseout", function() {
        imageToolTips[index].classList.toggle('hidden');
    });
});
// ============================================
// Submit button hidden
// ============================================
const btnSubmit = document.querySelector('.form-canvas button');
btnSubmit.classList.add('hidden');
// ============================================
// Canvas list scroll
// ============================================
const sectionCanvas = document.querySelector('.section-canvas');

sectionCanvas.addEventListener('scroll', function() {
    if (sectionCanvas.scrollTop + sectionCanvas.clientHeight >= sectionCanvas.scrollHeight) {
        console.log("bodem bereikt");
        formEnhancement();
    }
});
// =========================================================================
// Enhancement: Canvas
// =========================================================================
function formEnhancement() {
    const form = document.querySelector('.form-canvas');

    // Voeg een extra eigenschap aan de formulierdata toe
    const data = new FormData(form);
    data.append('enhanced', true);

    fetch(form.action, {
        // De POST method ophalen
        method: form.method,
        // De data van de form meegeven aan de body
        body: new URLSearchParams(data)
    }).then(function(response) {
        // Als de server een antwoord geeft, krijgen we een stream terug
        // We willen hiervan de text gebruiken, wat in dit geval HTML teruggeeft
        return response.text();

        }).then(function(responseHTML) {
            // Maak tijdelijk DOM element aan
            const tempDOM = document.createElement('div');
            // Plaats de responseHTML in de tijdelijke DOM
            tempDOM.innerHTML = responseHTML;
            // Selecteer het canvas gedeelte uit de tijdelijke DOM
            const responseDOM = tempDOM.querySelector('.canvas-list');

            // log
            console.log(responseDOM);
            console.log(document.querySelector('canvas-list'));
            // Selecteer het canvas gedeelte uit de DOM en vervang het
            document.querySelector('.canvas-list').innerHTML = responseDOM.innerHTML;
            //console.log(responseHTML);
        });
        event.preventDefault();
}
// =========================================================================
// Enhancement: Filter
// =========================================================================
    const forms = document.querySelectorAll('form');
    
    forms.forEach((form, index) => {
        console.log(index);
        form.addEventListener('submit', function(event) {
            // Voeg een extra eigenschap aan de formulierdata toe
            const data = new FormData(this);
            data.append('enhanced', true);
    
            fetch(this.action, {
                // De POST method ophalen
                method: this.method,
                // De data van de form meegeven aan de body
                body: new URLSearchParams(data)
            }).then(function(response) {
                // Als de server een antwoord geeft, krijgen we een stream terug
                // We willen hiervan de text gebruiken, wat in dit geval HTML teruggeeft
                return response.text();
    
            }).then(function(responseHTML) {
                // Maak tijdelijk DOM element aan
                const tempDOM = document.createElement('div');
                // Plaats de responseHTML in de tijdelijke DOM
                tempDOM.innerHTML = responseHTML;
                // Selecteer het canvas gedeelte uit de tijdelijke DOM
                const responseDOM = tempDOM.querySelector('.canvas-list');
    
                // log
                console.log(responseDOM);
                console.log(document.querySelector('canvas-list'));
                // Selecteer het canvas gedeelte uit de DOM en vervang het
                document.querySelector('.canvas-list').innerHTML = responseDOM.innerHTML;
                //console.log(responseHTML);
            });
            event.preventDefault();
        });
    });