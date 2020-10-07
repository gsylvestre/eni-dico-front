//coucou, très important
console.log("coucou");

//petite fonction pour mettre la première lettre en maj 
//@copyright kevin
function ucfirst(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//récupère les détails d'un terme et les affiche
//fonction déclenchée au clic sur un term dans la liste
//on recoit en argument un "Event" qui contient notamment les infos sur la balise cliquée
function getTermDetails(evt){
    //récupère la balise cliquée
    let clickedTerm = evt.currentTarget;
    //récupère l'id du term que nous avions stockée sur la balise
    let termId = clickedTerm.dataset.termId;
    //déclenche la requête ajax !
    axios.get('../dico-back/public/api/v1/term/'+termId).then(function(response){
        //récupère le term dans la réponse axios
        let term = response.data;
        //pour la debug
        console.log(term);
        //cible la balise HTML qui est présente dans la page de base
        let detailsContainer = document.getElementById("details");
        //injecte tout le contenu de détails d'un coup, en utilisant une "template string"
        //la template string, entourée de backticks, permet de faire de l'interpolation de variable
        //et de sauter des ligne dans la chaîne sans souci
        detailsContainer.innerHTML = `
            <h1>${ucfirst(term.term)}</h1>
            <p>${term.origin}</p>
            <p>${term.category.name}</p>
            <p>${term.nota_bene}</p>
        `;
    });
}

//récupère et affiche la liste de tous les termes
function getTermList(){
    //requête ajax à notre api pour récupérer tous les termes
    //la fonction anonyme sera appelée lorsqu'on aura reçu la réponse du serveur
    axios.get('../dico-back/public/api/v1/term').then(function(response){
        //les données sont sous la clé "data"
        let dicoTerms = response.data;

        //cible la balise qui sert à contenir la liste de termes
        let contentContainer = document.getElementById("content");

        //on boucle sur notre tableau de termes
        dicoTerms.forEach(function(term){
            //crée en mémoire une balise <div>
            let termContainer = document.createElement('div');
            //change son contenu (on y écrit le terme)
            termContainer.innerHTML = ucfirst(term.term);
            //lui ajoute une class css pour la forme
            termContainer.classList.add("term");
            //stocke sur la balise l'id du term de la bdd, dans un attribut data-
            //permet de le récupérer facilement lors du clic (voir plus haut)
            termContainer.dataset.termId = term.id;

            //met sous écoute ce terme pour l'événement de clic
            termContainer.addEventListener('click', getTermDetails);
            //ajoute finalement cette div dans le conteneur de la liste
            contentContainer.appendChild(termContainer);
        });
    });
}

//déclenche la première requête ajax ! 
getTermList();