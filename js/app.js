console.log("coucou");

//petite fonction pour mettre la première lettre en maj 
//@copyright kevin
function ucfirst(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getTermDetails(evt){
    let clickedTerm = evt.currentTarget;
    let termId = clickedTerm.dataset.termId;
    axios.get('../dico-back/public/api/v1/term/'+termId).then(function(response){
        let term = response.data;
        console.log(term);
        let detailsContainer = document.getElementById("details");
        detailsContainer.innerHTML = `
            <h1>${ucfirst(term.term)}</h1>
            <p>${term.origin}</p>
            <p>${term.category.name}</p>
            <p>${term.nota_bene}</p>
        `;
    });
}

function getTermList(){
    //requête ajax à notre api pour récupérer tous les termes
    //la fonction anonyme sera appelée lorsqu'on aura reçu la réponse du serveur
    axios.get('../dico-back/public/api/v1/term').then(function(response){
        //les données sont sous la clé "data"
        let dicoTerms = response.data;

        let contentContainer = document.getElementById("content");

        dicoTerms.forEach(function(term){
            let termContainer = document.createElement('div');
            termContainer.innerHTML = ucfirst(term.term);
            termContainer.classList.add("term");
            termContainer.dataset.termId = term.id;

            termContainer.addEventListener('click', getTermDetails);
            contentContainer.appendChild(termContainer);
        });
    });
}

getTermList();