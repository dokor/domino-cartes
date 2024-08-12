package com.lelouet.services.game.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum CARD_STATUT {
    SHOW(true),

    HIDE(false)
    ;

    private final boolean canBeUsedForSuite;
}
