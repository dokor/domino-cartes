package com.lelouet.services.game;

import com.lelouet.services.game.beans.Card;
import com.lelouet.services.game.beans.Game;
import com.lelouet.services.game.beans.Player;
import com.lelouet.services.game.enums.Suit;
import com.google.inject.Singleton;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

@Singleton
public class GameService {

    private static final Logger logger = LoggerFactory.getLogger(GameService.class);


    private Game game;

    public void startGame() {
        logger.info("Starting game");
        game = new Game();
        initializeDeck();
        initializeColumns();
        dealCards();
        game.setCurrentPlayerIndex(0); // TODO Changer pour que le premier soit aléatoire
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
        Player currentPlayer = game.getPlayer(playerId);
        if (currentPlayer.getId() == playerId) {
            currentPlayer.setPassCount(currentPlayer.getPassCount() + 1);
            if (currentPlayer.getPassCount() > 3) { // TODO Passer en conf le nombre de passage avant l'élimination
                eliminatePlayer(playerId);
            } else {
                nextPlayer();
            }
        }
    }

    public void playAITurn(int playerId) {
        Player currentPlayer = game.getPlayer(playerId);
        for (Card card : currentPlayer.getHand()) {
            if (canPlayCard(card)) {
                playTurn(playerId, card);
                return;
            }
        }
        passTurn(playerId);
    }

    private boolean canPlayCard(Card card) {
        // TODO : vérifier que les cartes sont posables en partant du 7 - ou +
        // FIXME : Quand quelqu'un meurt, ses cartes sont prises en compte meme si elle se suivent pas.
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
        logger.debug("Initalisation du deck");
        List<Card> deck = new ArrayList<>();
        for (Suit suit : Suit.values()) {
            for (int rank = 1; rank <= 13; rank++) {
                deck.add(new Card(suit, rank));
            }
        }
        logger.debug("{} cartes ajoutées au deck", deck.size());
        Collections.shuffle(deck);
        logger.debug("Melange des cartes");
        Collections.shuffle(deck); // todo : verifier si c'est utile
        logger.debug("2eme Melange des cartes");
        game.setDeck(deck);
    }

    private void dealCards() {
        logger.debug("Distribution des cartes");
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
        logger.debug("Pour chaque joueurs, retrait des 7");
        for (Player player : game.getPlayers()) {
            Iterator<Card> iterator = player.getHand().iterator();
            while (iterator.hasNext()) {
                Card card = iterator.next();
                if (card.getRank() == 7) {
                    addCardToColumn(card);
                    iterator.remove();
                    logger.debug("Carte {}{} retirée de la main du joueur {}",
                            card.getRank(), card.getSuit().name(), player.getName()
                    );
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
        game.orderColumnsCards();
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
        Player player = game.getPlayer(playerIndex);
        for (Card card : player.getHand()) {
            addCardToColumn(card);
        }
        game.getPlayers().remove(player);
        if (game.getPlayers().isEmpty()) {
            game = null;
        } else {
            game.setCurrentPlayerIndex(playerIndex % game.getPlayers().size());
        }
    }
}