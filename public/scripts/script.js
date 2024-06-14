const btnLanguage = document.querySelector('.btn-language');
let english = true;

btnLanguage.addEventListener("click", function() {
    if (english == true) {
        btnLanguage.innerHTML = "العربية";
        document.documentElement.lang = 'ar';
        document.body.style.direction = 'rtl';
        document.body.classList.add('arabic');
        english = false;
    }else {
        btnLanguage.innerHTML = "ENGLISH";
        document.documentElement.lang = 'en';
        document.body.style.direction = 'ltr';
        document.body.classList.remove('arabic');
        english = true;
    }
});