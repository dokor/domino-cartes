package com.lelouet.services.game.beans;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Setter
@Getter
public class Player {
    private int id;
    private String name;
    private List<Card> hand;
    private Integer passCount;

    public Player(int id, String name) {
        this.id = id;
        this.name = name;
        this.hand = new ArrayList<>();
        this.passCount = 0;
    }

    @Override
    public String toString() {
        return "Player{" +
            "id=" + id +
            ", name='" + name + '\'' +
            ", hand=" + hand +
            ", passCount=" + passCount +
            "}\n";
    }
}