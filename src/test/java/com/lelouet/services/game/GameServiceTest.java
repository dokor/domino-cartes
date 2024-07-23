package com.lelouet.services.game;

import com.lelouet.services.game.beans.Card;
import com.lelouet.services.game.beans.Player;
import com.lelouet.services.game.enums.Suit;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class GameServiceTest {
    private static final Logger logger = LoggerFactory.getLogger(GameServiceTest.class);
    
    public static void main(String[] args) {
        GameService gameService = new GameService();

        // Initialiser le jeu
        gameService.startGame();
        logger.debug("Initial game state:");
        logger.info(gameService.getGameState().toString());

        // Afficher les mains des joueurs
        for (Player player : gameService.getGameState().getPlayers()) {
            logger.info(player.getName() + " hand: " + player.getHand());
        }

        // Jouer quelques tours avec des cartes réelles des mains des joueurs
        // Supposons que Player 0 a un 8 de SPADES et Player 2 a un 8 de HEARTS
        // Nous devons adapter ceci en fonction des cartes distribuées

        Card cardToPlay = findCardInHand(gameService.getGameState().getPlayers().get(0), Suit.SPADES, 8);
        if (cardToPlay != null) {
            gameService.playTurn(0, cardToPlay);
            logger.info("After Player 0 plays 8 of SPADES:");
            logger.info(gameService.getGameState().toString());
        }

        gameService.passTurn(1);
        logger.info("After Player 1 passes:");
        logger.info(gameService.getGameState().toString());

        cardToPlay = findCardInHand(gameService.getGameState().getPlayers().get(2), Suit.HEARTS, 8);
        if (cardToPlay != null) {
            gameService.playTurn(2, cardToPlay);
            logger.info("After Player 2 plays 8 of HEARTS:");
            logger.info(gameService.getGameState().toString());
        }

        gameService.passTurn(3);
        logger.info("After Player 3 passes:");
        logger.info(gameService.getGameState().toString());
    }

    private static Card findCardInHand(Player player, Suit suit, int rank) {
        for (Card card : player.getHand()) {
            if (card.getSuit() == suit && card.getRank() == rank) {
                return card;
            }
        }
        return null;
    }
}