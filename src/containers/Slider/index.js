import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  // Utilisation du hook useData pour obtenir les données à afficher dans le slider
  const { data } = useData();

  // State pour gérer l'index de la carte actuellement affichée
  const [index, setIndex] = useState(0);

  // Tri des événements par date en ordre décroissant (du plus récent au plus ancien)
  // Correction : la condition est modifiée en soustrayant pour trier les dates en ordre décroissant
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtB.date) - new Date(evtA.date)
  ) || []; // Ajout de "|| []" pour éviter des erreurs si data.focus est undefined

  // Utilisation de useEffect pour gérer l'effet de changement de carte automatiquement
  useEffect(() => {

  // Fonction pour passer à la carte suivante toutes les 5 secondes
  // Correction : setTimeout est maintenant défini directement dans useEffect
  // Nettoyage du timeout ajouté pour éviter les fuites de mémoire
  const nextCard = setTimeout(
      () => setIndex(index < byDateDesc.length -1 ? index + 1 : 0), // Correction : utilisation de "byDateDesc.length - 1" pour éviter le dépassement de l'index
      5000
    );
    // Nettoie le timeout lorsque le composant est démonté ou que 'index' ou 'byDateDesc.length' change
    return () => clearTimeout(nextCard);
  }, [index, byDateDesc.length]);// Dépendances ajoutées pour que l'effet soit recalculé correctement
  return (
    <div className="SlideCardList">
      {/* Mapping des événements triés et affichage conditionnel basé sur l'index */}
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.title}
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
        {/* Image de la carte du slider */}
        <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              {/* Titre et description de l'événement */}
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              {/* Affichage du mois de l'événement */}
              <div>{getMonth(new Date(event.date))}</div>
            </div>
           </div>
        </div>
      ))}    
          {/* Pagination du slider (boutons radio) */}
          <div className="SlideCard__paginationContainer">
          <div className="SlideCard__pagination">
            {byDateDesc.map((event, radioIdx) => (
              <input
                key={event.title} // Utilisation du titre de l'événement comme clé
                type="radio"
                name="radio-button"
                checked={index === radioIdx} // Vérifie si l'index de la carte est égal à l'index du bouton radio
                onChange={() => setIndex(radioIdx)} // Met à jour l'index de la carte active
               />
            ))}
          </div>
        </div>
    </div>
  );
};

export default Slider;