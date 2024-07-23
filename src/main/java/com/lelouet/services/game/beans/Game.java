package com.lelouet.services.game.beans;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Getter
@Setter
public class Game {
    private List<Player> players;
    private List<Card> deck;
    private List<Card> columnSpades;
    private List<Card> columnHearts;
    private List<Card> columnDiamonds;
    private List<Card> columnClubs;
    private int currentPlayerIndex;

    public Game() {
        this.players = new ArrayList<>();
        this.deck = new ArrayList<>();
        this.columnSpades = new ArrayList<>();
        this.columnHearts = new ArrayList<>();
        this.columnDiamonds = new ArrayList<>();
        this.columnClubs = new ArrayList<>();
        for (int i = 0; i < 4; i++) {
            this.players.add(new Player(i, "Player " + (i + 1)));
        }
    }

    public List<Card> getColumnsOfSuitCard(Card card) {
        switch (card.getSuit()) {
            case SPADES:
                return this.getColumnSpades();
            case HEARTS:
                return this.getColumnHearts();
            case DIAMONDS:
                return this.getColumnDiamonds();
            case CLUBS:
                return this.getColumnClubs();
            default:
                return List.of(); // todo ajouter erreur
        }
    }

    public void orderColumnsCards() {
        this.setColumnClubs(orderColumnCards(this.getColumnClubs()));
        this.setColumnDiamonds(orderColumnCards(this.getColumnDiamonds()));
        this.setColumnHearts(orderColumnCards(this.getColumnHearts()));
        this.setColumnSpades(orderColumnCards(this.getColumnSpades()));
    }

    private List<Card> orderColumnCards(List<Card> cards) {
        return cards
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

    public Player getPlayer(int playerId) {
        return this.players.stream().filter(player -> player.getId() == playerId).findFirst()
            .orElseThrow();
    }

    @Override
    public String toString() {
        return "Game{" +
            "players=" + players +
            ", \ncolumn1=" + columnSpades +
            ", \ncolumn2=" + columnHearts +
            ", \ncolumn3=" + columnDiamonds +
            ", \ncolumn4=" + columnClubs +
            ", \ncurrentPlayerIndex=" + currentPlayerIndex +
            '}';
    }


}