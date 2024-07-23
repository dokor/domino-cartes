package com.lelouet.services.game.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Suit {
    HEARTS(0), DIAMONDS(1), CLUBS(2), SPADES(3);

    private final int order;
}