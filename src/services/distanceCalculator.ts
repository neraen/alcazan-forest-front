const computeDistance = (abscisseTarget, ordonneeTarget, abscisseJoueur, ordonneeJoueur) => {
    const distanceOrdonnee = Math.abs(ordonneeTarget-ordonneeJoueur);
    const distanceAbscisse = Math.abs(abscisseTarget-abscisseJoueur);
    const distanceTotale = Math.sqrt(Math.pow(distanceAbscisse, 2) + Math.pow(distanceOrdonnee, 2));
    const distanceTotaleArrondie = Math.round(distanceTotale)
    return distanceTotaleArrondie;
}

export default {
    computeDistance
}