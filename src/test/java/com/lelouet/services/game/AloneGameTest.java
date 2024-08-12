package com.lelouet.services.game;

import com.google.inject.Singleton;
import com.lelouet.services.game.beans.Card;
import com.lelouet.services.game.beans.Player;
import com.lelouet.services.game.enums.Suit;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Scanner;

@Singleton
public class AloneGameTest {
    private static final Logger logger = LoggerFactory.getLogger(AloneGameTest.class);
    private static GameService gameService;

    public static void main(String[] args) {
        GameService gameService = new GameService();
        gameService.startGame();

        // Vérifier que les 7 sont bien dans les colonnes
        logger.info("Initial game state:");
        logger.info(gameService.getGameState().toString());

        Scanner scanner = new Scanner(System.in);

        while (!gameService.verifyGameOver()) {
            Player currentPlayer = gameService.getGameState()
                    .getPlayers()
                    .get(gameService.getGameState().getCurrentPlayerIndex());
            logger.info("--------------------------------");
            logger.debug(gameService.getGameState().toString());

            if (currentPlayer.getId() == 0) {
                logger.info(gameService.getGameState().toString());
                // Tour du joueur humain
                logger.info(currentPlayer.getName() + " hand: " + currentPlayer.getHand());
                logger.info("Enter the card you want to play (e.g., SPADES 8), or 'pass' to pass your turn :");

                String input = scanner.nextLine();
                if (input.equalsIgnoreCase("pass")) {
                    gameService.passTurn(0);
                } else {
                    String[] parts = input.split(" ");
                    Suit suit = Suit.valueOf(parts[0].toUpperCase()); //todo : vérifier l'input user
                    int rank = Integer.parseInt(parts[1]);
                    Card cardToPlay = findCardInHand(currentPlayer, suit, rank);
                    if (cardToPlay != null) {
                        gameService.playTurn(0, cardToPlay);
                    } else {
                        logger.warn("Invalid card. Try again.");
                    }
                }
            } else {
                // Tour des IA
                gameService.playAITurn(currentPlayer.getId());
            }
        }

        scanner.close();
    }

    private static Card findCardInHand(Player player, Suit suit, int rank) {
        for (Card card : player.getHand()) {
            if (card.getSuit() == suit && card.getRank() == rank) {
                logger.debug("La carte {}{} existe dans la main du joueur {}",
                        rank, suit.name(), player.getName());
                return card;
            }
        }
        logger.warn("La carte demandée {}{}, n'existe pas dans la main du joueur {}",
                rank, suit.name(), player.getName());
        return null;
    }
}