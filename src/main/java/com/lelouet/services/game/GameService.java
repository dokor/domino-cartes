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
        dealCards();
        initializeColumns();
        game.setCurrentPlayerIndex(0);
    }

    public Game getGameState() {
        return game;
    }

    public void playTurn(int playerId, Card card) {
        Player currentPlayer = game.getPlayers().get(game.getCurrentPlayerIndex());
        if (currentPlayer.getId() == playerId && currentPlayer.getHand().contains(card)) {
            addCardToColumn(card);
            currentPlayer.getHand().remove(card);
            currentPlayer.setPassCount(0);
            nextPlayer();
        }
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
                column = game.getColumn1();
                break;
            case HEARTS:
                column = game.getColumn2();
                break;
            case DIAMONDS:
                column = game.getColumn3();
                break;
            case CLUBS:
                column = game.getColumn4();
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
                game.getColumn1().add(card);
                break;
            case HEARTS:
                game.getColumn2().add(card);
                break;
            case DIAMONDS:
                game.getColumn3().add(card);
                break;
            case CLUBS:
                game.getColumn4().add(card);
                break;
        }
    }

    private void initializeColumns() {
        game.setColumn1(new ArrayList<>());
        game.setColumn2(new ArrayList<>());
        game.setColumn3(new ArrayList<>());
        game.setColumn4(new ArrayList<>());
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