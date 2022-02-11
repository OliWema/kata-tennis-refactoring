import { TennisGame } from './TennisGame';

export class TennisGame1 implements TennisGame {
  //Pourquoi ne pas lier chaque score (1, 2, 3, 4) à la string
  //correspondante ("Love", "Fifteen", "Thirty", "Forty")
  private player1Score: number = 0;
  private player2Score: number = 0;
  private player1Name: string;
  private player2Name: string;

  constructor(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
  }

  wonPoint(playerName: string): void {
    if (playerName === this.player1Name)
      this.player1Score += 1;
    else
      this.player2Score += 1;
  }

  getScore(): string {
    let score: string = '';
    let tempScore: number = 0;
   if (this.isEqualScore()) {
      score = this.getEqualityScore();
    }
    else if (this.isAdvantageScore()) {
      score = this.getAdvantageOrWinScore();
    }
    else {
        score = this.getNormalCaseScore(this.player1Score, this.player2Score);        
    }
    return score;
  }

  private isAdvantageScore() {
    return this.player1Score >= 4 || this.player2Score >= 4;
  }

  private isEqualScore() {
    return this.player1Score === this.player2Score;
  }

  private getNormalCaseScore(scorePlayer1: number, scorePlayer2: number): string {
    
    return `${this.getTranslatedScore(scorePlayer1)}-${this.getTranslatedScore(scorePlayer2)}`;

  }

  private getAdvantageOrWinScore() {
    let score = '';
    const minusResult: number = this.player1Score - this.player2Score;

    switch (minusResult) {
      case 1:
        score = 'Advantage player1';
        break;
      case -1:
        score = 'Advantage player2';
        break;
      default:
        if (minusResult >= 2)
          score = 'Win for player1';
        else
          score = 'Win for player2';
        break;
    }

    return score;
  }

  private getEqualityScore() {
    let score = "";
    switch (this.player1Score) {
      case 0:
        score = 'Love-All';
        break;
      case 1:
        score = 'Fifteen-All';
        break;
      case 2:
        score = 'Thirty-All';
        break;
      default:
        score = 'Deuce';
        break;

    }
    return score;
  }
  private getTranslatedScore(score: number): string {
    let translateScore = ["Love", "Fifteen", "Thirty", "Forty"];
    let translatedScore = "";
    
    if(score > 3) {
      translatedScore = translateScore[3]
    } else {
      translatedScore = translateScore[score];
    }
    return translatedScore;
  }
}

