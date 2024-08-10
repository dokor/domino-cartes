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
    private CARD_STATUT statut;
    //private CardLabel label;

    @Override
    public String toString() {
        return rank + " of " + suit;
    }

}