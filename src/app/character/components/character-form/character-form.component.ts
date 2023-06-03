import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  fetchCharacter,
  selectCharacter,
} from 'src/app/character/state/character.actions';

import { createPlayer } from 'src/app/player/state/player.actions';
import { selectCharacters } from '../../state/character.selectors';

@Component({
  selector: 'app-character-form',
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.scss'],
})
export class CharacterFormComponent implements OnInit {
  selectedCharacterId!: string;
  characters = this.store.select(selectCharacters);
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.dispatch(fetchCharacter());
  }

  onCharacterSelection() {
    if (this.selectedCharacterId) {
      this.store.dispatch(
        selectCharacter({ selectedCharacterId: this.selectedCharacterId })
      );
    }
  }

  onSubmit() {
    this.store.dispatch(
      createPlayer({ selectedCharacterId: this.selectedCharacterId })
    );
  }
}
