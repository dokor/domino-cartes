package com.lelouet.services.game;

import com.google.inject.Singleton;
import com.lelouet.services.game.beans.Card;
import com.lelouet.services.game.beans.Player;
import com.lelouet.services.game.enums.Suit;

import java.util.Scanner;

@Singleton
public class AloneGameTest {
    public static void main(String[] args) {
        GameService gameService = new GameService();
        gameService.startGame();

        // Vérifier que les 7 sont bien dans les colonnes
        System.out.println("Initial game state:");
        System.out.println(gameService.getGameState());

        Scanner scanner = new Scanner(System.in);

        while (true) {
            Player currentPlayer = gameService.getGameState().getPlayers().get(gameService.getGameState().getCurrentPlayerIndex());
            System.out.println("Current game state:");
            System.out.println(gameService.getGameState());

            if (currentPlayer.getId() == 0) {
                // Tour du joueur humain
                System.out.println(currentPlayer.getName() + " hand: " + currentPlayer.getHand());
                System.out.println("Enter the suit and rank of the card you want to play (e.g., SPADES 8), or 'pass' to pass:");

                String input = scanner.nextLine();
                if (input.equalsIgnoreCase("pass")) {
                    gameService.passTurn(0);
                } else {
                    String[] parts = input.split(" ");
                    Suit suit = Suit.valueOf(parts[0].toUpperCase());
                    int rank = Integer.parseInt(parts[1]);
                    Card cardToPlay = findCardInHand(currentPlayer, suit, rank);
                    if (cardToPlay != null) {
                        gameService.playTurn(0, cardToPlay);
                    } else {
                        System.out.println("Invalid card. Try again.");
                    }
                }
            } else {
                // Tour des IA
                gameService.playAITurn(currentPlayer.getId());
            }

            // Vérifier les conditions de fin de jeu
            if (gameService.getGameState().getPlayers().size() == 1) {
                System.out.println("Game over! " + gameService.getGameState().getPlayers().get(0).getName() + " wins!");
                break;
            } else if (gameService.getGameState() == null) {
                System.out.println("Game over! All players have been eliminated.");
                break;
            }
        }

        scanner.close();
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