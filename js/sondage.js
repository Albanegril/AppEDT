function customInit() {
    document.getElementById("choixChangement").style.display = 'none';
    document.getElementById("validation").style.display = 'none';
}

function avis(avis) {
    lAvis = ["oui", "non", "sans"];
    lAvis.forEach(function(e){
        if (e != avis) {
            document.getElementById(e).style.display = 'none';
        }
    });


    if (avis == 'oui') {
        document.getElementById("choixChangement").style.display = 'block';
    } else {
        document.getElementById("validation").style.display = 'block';
    }
}

function validerChoix() {
    document.getElementById("validation").style.display = 'block';

}
