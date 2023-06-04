import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectBoard,
  selectCurrentPlayerPosition,
} from '../../state/board.selectors';
import { fetchBoard, makeMove } from '../../state/board.actions';
import {
  selectPlayer,
  selectPlayerCharacterName,
} from 'src/app/player/state/player.selectors';
import { distinctUntilChanged, map } from 'rxjs';
import { startFight } from 'src/app/fight/state/fight.actions';
import { isValidMove } from '../../board.utils';
import { Player } from 'src/app/player/player.model';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  player$ = this.store.select(selectPlayer);
  board$ = this.store.select(selectBoard);
  currentPlayerPosition$ = this.store
    .select(selectCurrentPlayerPosition)
    .pipe(distinctUntilChanged());
  playerCharacterName$ = this.store
    .select(selectPlayerCharacterName)
    .pipe(distinctUntilChanged());

  currentPlayerPosition!: number | null;
  playerCharacterName: string | undefined;
  player!: Player | null;
  constructor(private store: Store) {
    this.currentPlayerPosition$
      .pipe(map((position) => (this.currentPlayerPosition = position)))
      .subscribe();

    this.playerCharacterName$
      .pipe(map((name) => (this.playerCharacterName = name)))
      .subscribe();

    this.player$.subscribe((player) => {
      this.player = player;
    });
  }

  ngOnInit(): void {
    this.store.dispatch(fetchBoard());
  }

  handleTileClick(tile: string, position: number) {
    if (this.currentPlayerPosition) {
      if (!isValidMove(this.currentPlayerPosition, position)) {
        return;
      }
    }
    if (['P', 'S', 'E'].includes(tile)) {
      this.store.dispatch(makeMove({ position }));
    } else if (tile === 'M' && this.player) {
      this.store.dispatch(
        startFight({ playerId: this.player.id, monsterId: 1 })
      );
    }
  }
}
