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