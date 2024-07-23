package com.lelouet.services.game;

import com.lelouet.services.game.beans.Card;
import com.lelouet.services.game.beans.Game;
import com.lelouet.services.game.beans.Player;
import com.lelouet.services.game.enums.Suit;
import com.google.inject.Singleton;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

@Singleton
public class GameService {

    private Game game;

    public void startGame() {
        game = new Game();
        initializeDeck();
        initializeColumns();
        dealCards();
        game.setCurrentPlayerIndex(0);
    }

    public Game getGameState() {
        return game;
    }

    public void playTurn(int playerId, Card card) {
        Player currentPlayer = game.getPlayers().get(game.getCurrentPlayerIndex());
        if (currentPlayer.getId() == playerId && currentPlayer.getHand().contains(card) && (verifyCardValid(card))) {
                addCardToColumn(card);
                currentPlayer.getHand().remove(card);
                nextPlayer();
        }
    }

    private boolean verifyCardValid(Card card) {
        List<Card> cardsInColumn = game.getColumnsOfSuitCard(card);
        for (Card cardColumn : cardsInColumn) {
            if(
                (cardColumn.getRank() == card.getRank() - 1)
                ||  (cardColumn.getRank() == card.getRank() + 1)
            ){
                return true;
            }
        }
        return false;
    }

    public void passTurn(int playerId) {
        Player currentPlayer = game.getPlayers().get(game.getCurrentPlayerIndex());
        if (currentPlayer.getId() == playerId) {
            currentPlayer.setPassCount(currentPlayer.getPassCount() + 1);
            if (currentPlayer.getPassCount() >= 3) {
                eliminatePlayer(game.getCurrentPlayerIndex());
            } else {
                nextPlayer();
            }
        }
    }

    public void playAITurn(int playerId) {
        Player currentPlayer = game.getPlayers().get(playerId);
        for (Card card : currentPlayer.getHand()) {
            if (canPlayCard(card)) {
                playTurn(playerId, card);
                return;
            }
        }
        passTurn(playerId);
    }

    private boolean canPlayCard(Card card) {
        List<Card> column;
        switch (card.getSuit()) {
            case SPADES:
                column = game.getColumnSpades();
                break;
            case HEARTS:
                column = game.getColumnHearts();
                break;
            case DIAMONDS:
                column = game.getColumnDiamonds();
                break;
            case CLUBS:
                column = game.getColumnClubs();
                break;
            default:
                return false;
        }

        if (column.isEmpty()) {
            return card.getRank() == 7;
        }

        int minRank = column.get(0).getRank();
        int maxRank = column.get(column.size() - 1).getRank();
        return card.getRank() == minRank - 1 || card.getRank() == maxRank + 1;
    }

    private void initializeDeck() {
        List<Card> deck = new ArrayList<>();
        for (Suit suit : Suit.values()) {
            for (int rank = 1; rank <= 13; rank++) {
                deck.add(new Card(suit, rank));
            }
        }
        Collections.shuffle(deck);
        game.setDeck(deck);
    }

    private void dealCards() {
        List<Card> deck = game.getDeck();
        List<Player> players = game.getPlayers();
        int playerCount = players.size();
        for (int i = 0; i < deck.size(); i++) {
            players.get(i % playerCount).getHand().add(deck.get(i));
        }
        removeSevensFromHands();
        orderCards();
    }

    private void orderCards() {
        for (Player player : game.getPlayers()) {
            player.orderCards();
        }
    }

    private void removeSevensFromHands() {
        for (Player player : game.getPlayers()) {
            Iterator<Card> iterator = player.getHand().iterator();
            while (iterator.hasNext()) {
                Card card = iterator.next();
                if (card.getRank() == 7) {
                    addCardToColumn(card);
                    iterator.remove();
                }
            }
        }
    }

    private void addCardToColumn(Card card) {
        switch (card.getSuit()) {
            case SPADES:
                game.getColumnSpades().add(card);
                break;
            case HEARTS:
                game.getColumnHearts().add(card);
                break;
            case DIAMONDS:
                game.getColumnDiamonds().add(card);
                break;
            case CLUBS:
                game.getColumnClubs().add(card);
                break;
        }
    }

    private void initializeColumns() {
        game.setColumnSpades(new ArrayList<>());
        game.setColumnHearts(new ArrayList<>());
        game.setColumnDiamonds(new ArrayList<>());
        game.setColumnClubs(new ArrayList<>());
    }

    private void nextPlayer() {
        int nextPlayerIndex = (game.getCurrentPlayerIndex() + 1) % game.getPlayers().size();
        game.setCurrentPlayerIndex(nextPlayerIndex);
    }

    private void eliminatePlayer(int playerIndex) {
        Player player = game.getPlayers().get(playerIndex);
        for (Card card : player.getHand()) {
            addCardToColumn(card);
        }
        game.getPlayers().remove(playerIndex);
        if (game.getPlayers().isEmpty()) {
            game = null;
        } else {
            game.setCurrentPlayerIndex(playerIndex % game.getPlayers().size());
        }
    }
}