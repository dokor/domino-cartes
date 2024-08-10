package com.lelouet.services.game.beans;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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
            ", nbrCards=" + this.hand.size() +
            ", passCount=" + passCount +
            ", hand=" + hand +
            "}\n";
    }

    public void orderCards() {
        this.hand = this.hand
            .stream()
            .sorted((o1, o2) -> {
                if (o1.getSuit().getOrder() > o2.getSuit().getOrder()) {
                    return -1;
                } else if (o1.getSuit().getOrder() < o2.getSuit().getOrder()) {
                    return 1;
                } else {
                    if (o1.getRank() > o2.getRank()) {
                        return 1;
                    } else {
                        return -1;
                    }
                }
            })
            .collect(Collectors.toList());
    }

    public boolean isEmptyHand(){
        return this.hand.isEmpty();
    }
}