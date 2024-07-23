package com.lelouet.services.game.beans;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@AllArgsConstructor
@Getter
@Setter
public class Game {
    private List<Player> players;
    private List<Card> deck;
    private List<Card> column1;
    private List<Card> column2;
    private List<Card> column3;
    private List<Card> column4;
    private int currentPlayerIndex;

    public Game() {
        this.players = new ArrayList<>();
        this.deck = new ArrayList<>();
        this.column1 = new ArrayList<>();
        this.column2 = new ArrayList<>();
        this.column3 = new ArrayList<>();
        this.column4 = new ArrayList<>();
        for (int i = 0; i < 4; i++) {
            this.players.add(new Player(i, "Player " + (i + 1)));
        }
    }

    @Override
    public String toString() {
        return "Game{" +
            "players=" + players +
            ", \ncolumn1=" + column1 +
            ", \ncolumn2=" + column2 +
            ", \ncolumn3=" + column3 +
            ", \ncolumn4=" + column4 +
            ", \ncurrentPlayerIndex=" + currentPlayerIndex +
            '}';
    }
}