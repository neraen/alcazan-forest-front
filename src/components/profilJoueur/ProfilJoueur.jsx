import React, {useState, useEffect} from 'react'
import UsersApi from "../../services/UsersApi";
import ProfilAPI from "../../services/ProfilAPI";
import UserActionApi from "../../services/UserActionApi";

const ProfilJoueur = ({match, history}) => {

    const [equipementEquipe, setEquipementEquipe] = useState([])
    const [joueur, setJoueur] = useState([])
    const [isFriend, setIsFriend] = useState(false);
    const [idFriend, setIdFriend] = useState(0);
    const { pseudo = undefined} = match.params;

    useEffect(() => {
        fetchEquipementEquipe();
    }, []);

    const fetchEquipementEquipe = async () => {
        if( pseudo !== undefined){
            const joueurData = await UsersApi.findUserByPseudo(pseudo);
            setJoueur(joueurData);

            const friendData = await UsersApi.joueurGetIdFriend(joueurData.idJoueur);
            setIdFriend(friendData.friendId);
            setIsFriend(!!friendData.friendId);

            const dataEquipementEquipe = await ProfilAPI.getEquipementEquipeJoueur(joueurData.idJoueur);
            setEquipementEquipe(dataEquipementEquipe);
        }
    }

    const addOrRemovePlayerOnFriendList = async () => {
        let data = [];
        if(isFriend){
            data = await UserActionApi.removeFriend(idFriend)
            setIsFriend(false);
        }else{
            data = await UserActionApi.addFriend(joueur.idJoueur)
            setIsFriend(true);
            setIdFriend(data.friendId);
        }
        //toast(data.message)
    }

    const sendMessage = () => {
        history.replace("/messagerie");
    }


    return <>
        <main className="main-profil-page ">

            <div className="profil-container">
                <h2>Bannière</h2>
                <div className="profil-banniere-joueur">

                </div>
            </div>
            <div className="profil profil-main">
                <div className="informations">
                    <h2>Informations</h2>
                    <span>Classe : {joueur.nomClasse}</span>
                    <span>Niveau : {joueur.niveau}</span>
                    <span>guilde : {(joueur.nomGuilde !== null) ? joueur.nomGuilde : " Aucune"} </span>
                    <span>Alignement : {(joueur.nomAlignement !== null) ? joueur.nomAlignement : " Aucun"} </span>
                </div>

                <div className="actions-profil-joueur">
                    <h2 className="text-center ">Actions</h2>
                    <div className="btns-actions-profil">
                        <button className="profil-btn-white" onClick={addOrRemovePlayerOnFriendList}>
                            {isFriend && (
                               <span>Retirer de ma liste d'amis</span>
                            ) || (
                                <><img className="profil-btn-white-image" src="../../img/gui/amis.png"/>Ajouter à ma liste d'amis</>
                            )}
                        </button>
                        <button className="profil-btn-white" onClick={sendMessage}><img className="profil-btn-white-image" src="../../img/gui/message.png"/>Envoyer un message</button>
                    </div>
                </div>

                <div className="equipement position-relative">
                    <h2 className="text-center ">Equipement</h2>
                     {equipementEquipe && equipementEquipe.map((equipement) =>
                         <div className={"item-case "+equipement.position}><img className="icone-equipement" src={"../img/equipement/"+equipement.position+"/"+equipement.imageEquipement} alt=""/>
                             <div className={"inventaire-item-hover " + equipement.rarityName}>
                                 <div className="inventaire-item-hover-header">
                                     {equipement.nomEquipement}
                                 </div>
                                 <div className="inventaire-item-hover-body">
                                     <div className="inventaire-item-title">- Caractéritiques -</div>
                                     {equipement.caracteristiques.map((caracteristique) =>
                                         <div key={'caracteristique'+caracteristique.id}>
                                             {caracteristique.nom[0].toUpperCase()+caracteristique.nom.slice(1)} : + {caracteristique.valeur}
                                         </div>
                                     )}
                                     <hr />
                                     <div className="inventaire-item-element">
                                         <div className="inventaire-item-element-strong">Description : </div>
                                         <div className="inventaire-item-element-italic"> {equipement.descriptionEquipement} </div>
                                     </div>
                                     <div className="inventaire-item-element">
                                         <div className="inventaire-item-element-strong">valeur : {equipement.prixReventeEquipement} <img src="../../img/gui/MainWindowCharacter/Icons/Money03.png" />  </div>

                                     </div>
                                 </div>
                                 <div className="inventaire-item-hover-footer">
                                     Niveau requis : {equipement.levelMinEquipement}
                                 </div>
                             </div>
                         </div>
                     )}
                     <img className="" src="../../img/gui/MainWindowCharacter/inventaire_masculin.png"/>
                </div>
            </div>
        </main>

    </>
}

export default ProfilJoueur