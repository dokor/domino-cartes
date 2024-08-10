package com.lelouet.services.game.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum CARD_STATUT {
    DEFAULT(true),

    DEAD(false)
    ;

    private final boolean canBeUsed;
}
