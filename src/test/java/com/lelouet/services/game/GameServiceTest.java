package com.lelouet.services.game;

import com.lelouet.services.game.beans.Card;
import com.lelouet.services.game.beans.Player;
import com.lelouet.services.game.enums.Suit;

public class GameServiceTest {
    public static void main(String[] args) {
        GameService gameService = new GameService();

        // Initialiser le jeu
        gameService.startGame();
        System.out.println("Initial game state:");
        System.out.println(gameService.getGameState());

        // Afficher les mains des joueurs
        for (Player player : gameService.getGameState().getPlayers()) {
            System.out.println(player.getName() + " hand: " + player.getHand());
        }

        // Jouer quelques tours avec des cartes réelles des mains des joueurs
        // Supposons que Player 0 a un 8 de SPADES et Player 2 a un 8 de HEARTS
        // Nous devons adapter ceci en fonction des cartes distribuées

        Card cardToPlay = findCardInHand(gameService.getGameState().getPlayers().get(0), Suit.SPADES, 8);
        if (cardToPlay != null) {
            gameService.playTurn(0, cardToPlay);
            System.out.println("After Player 0 plays 8 of SPADES:");
            System.out.println(gameService.getGameState());
        }

        gameService.passTurn(1);
        System.out.println("After Player 1 passes:");
        System.out.println(gameService.getGameState());

        cardToPlay = findCardInHand(gameService.getGameState().getPlayers().get(2), Suit.HEARTS, 8);
        if (cardToPlay != null) {
            gameService.playTurn(2, cardToPlay);
            System.out.println("After Player 2 plays 8 of HEARTS:");
            System.out.println(gameService.getGameState());
        }

        gameService.passTurn(3);
        System.out.println("After Player 3 passes:");
        System.out.println(gameService.getGameState());
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