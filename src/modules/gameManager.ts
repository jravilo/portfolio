import { Game } from '../types';
import foxMayhem from '../assets/images/fox-mayhem.jpg';
import wildFalls2 from '../assets/images/wild-falls-2.webp';
import merlinsGrimoire from '../assets/images/merlins-grimoire.webp';
import clownMontyII from '../assets/images/3-clown-monty-ii.webp';
import lionSagaOdyssey from '../assets/images/lion-saga-odyssey.webp';
import lootAndLabyrinths from '../assets/images/loot-and-labyrinths.webp';
import bladesAndBlessings from '../assets/images/3-blades-and-blessings.jpg';
import tripleBeasts from '../assets/images/triple-beasts-of-fortune.jpg';
import yugioh from '../assets/images/yugioh.jpg';
import medievil from '../assets/images/medievil.png';
import gominigolf from '../assets/images/gominigolf.jpg';

/**
 * GameManager - Provides the hardcoded project list
 */
export class GameManager {
  private projects: Game[];

  constructor() {
    this.projects = [
      {
        name: 'Yu-Gi-Oh! Duel Generations',
        title: 'Secret6, Inc — Expert Technical Developer',
        url: 'https://yugioh.fandom.com/wiki/Yu-Gi-Oh!_Duel_Generation',
        image: yugioh,
      },
      {
        name: 'MediEvil PS4 Remake',
        title: 'Secret6, Inc — Expert Technical Developer',
        url: 'https://www.playstation.com/en-us/games/medievil/',
        image: medievil,
      },
      {
        name: 'GOMINIGOLF',
        title: 'Devvit Hackathon - Developer',
        url: 'https://www.reddit.com/r/gominigolf_dev/?playtest=gominigolf',
        image: gominigolf,
      },
      {
        name: 'Fox Mayhem',
        title: 'Play\'n GO — Frontend Developer',
        url: 'https://www.playngo.com/games/fox-mayhem',
        image: foxMayhem,
      },
      {
        name: 'Wild Falls 2',
        title: 'Play\'n GO — Frontend Developer',
        url: 'https://www.playngo.com/games/wild-falls-2',
        image: wildFalls2,
      },
      {
        name: 'Merlin\'s Grimoire',
        title: 'Play\'n GO — Frontend Developer',
        url: 'https://www.playngo.com/games/merlins-grimoire',
        image: merlinsGrimoire,
      },
      {
        name: '3 Clown Monty II',
        title: 'Play\'n GO — Frontend Developer',
        url: 'https://www.playngo.com/games/3-clown-monty-ii',
        image: clownMontyII,
      },
      {
        name: 'Lion Saga Odyssey',
        title: 'Play\'n GO — Frontend Developer',
        url: 'https://www.playngo.com/games/lion-saga-odyssey',
        image: lionSagaOdyssey,
      },
      {
        name: 'Loot & Labyrinths',
        title: 'Play\'n GO — Frontend Developer',
        url: 'https://www.playngo.com/games/loot-and-labyrinths',
        image: lootAndLabyrinths,
      },
      {
        name: '3 Blades & Blessings',
        title: 'Play\'n GO — Frontend Developer',
        url: 'https://www.playngo.com/games/3-blades-%26-blessings',
        image: bladesAndBlessings,
      },
      {
        name: 'Triple Beasts of Fortune',
        title: 'Play\'n GO — Frontend Developer',
        url: 'https://www.playngo.com/games/triple-beasts-of-fortune',
        image: tripleBeasts,
      },
    ];
  }

  getProjects(): Game[] {
    return this.projects;
  }
}

export default new GameManager();
