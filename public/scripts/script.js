const btnLanguage = document.querySelector('.btn-language');

btnLanguage.addEventListener("click", function() {
    if (btnLanguage.innerHTML == "ENGLISH") {
        btnLanguage.innerHTML = "العربية";
        document.documentElement.lang = 'ar';
        document.body.style.direction = 'rtl';
        document.body.classList.add('arabic');
    }else {
        btnLanguage.innerHTML = "ENGLISH";
        document.documentElement.lang = 'en';
        document.body.style.direction = 'ltr';
        document.body.classList.remove('arabic');
    }
});