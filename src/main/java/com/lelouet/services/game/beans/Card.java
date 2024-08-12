package com.lelouet.services.game.beans;

import com.lelouet.services.game.enums.CARD_STATUT;
import com.lelouet.services.game.enums.Suit;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class Card {
    private Suit suit;
    private int rank;
    private CARD_STATUT statut = CARD_STATUT.SHOW; // fixme : gérer l'init default dans un constructeur
    //private CardLabel label;

    @Override
    public String toString() {
        if(statut.isCanBeUsedForSuite()){
            return rank + " of " + suit;
        }
        return "#" + rank + " of " + suit; // todo : temporaire, a supprimer une fois le front dispo
    }

}