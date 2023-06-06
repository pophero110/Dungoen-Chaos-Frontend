import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FightSceneComponent } from './fight-scene.component';
import { StoreModule } from '@ngrx/store';
import { FightModule } from '../../fight.module';
import { fakeOpponent } from 'src/app/test/fakeState';
import { By } from '@angular/platform-browser';

describe('FightSceneComponent', () => {
  let component: FightSceneComponent;
  let fixture: ComponentFixture<FightSceneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), FightModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FightSceneComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render opponent section with opponent token and details', () => {
    component.opponent = fakeOpponent;
    fixture.detectChanges();

    const opponentTokenElement = fixture.debugElement.query(
      By.css('.fightScene__opponent__token app-golblin-token')
    );
    const opponentNameElement = fixture.debugElement.query(
      By.css('.fightScene__opponent ul li:nth-child(1) p')
    );
    const opponentHealthElement = fixture.debugElement.query(
      By.css('.fightScene__opponent ul li:nth-child(2) p')
    );

    expect(opponentTokenElement).toBeTruthy();
    expect(opponentHealthElement.nativeElement.textContent).toContain(
      fakeOpponent.health
    );
    expect(opponentNameElement.nativeElement.textContent).toContain(
      fakeOpponent.name
    );
  });

  it('should render player panel with player data', () => {
    const playerPanelElement = fixture.debugElement.query(
      By.css('.fightScene__player app-player-panel')
    );
    expect(playerPanelElement).toBeTruthy();
  });

  it('should render player actions when it is not opponent turn', () => {
    component.opponentTurn = false;
    fixture.detectChanges();

    const playerActionsElement = fixture.debugElement.query(
      By.css('.fightScene__playerActions')
    );
    expect(playerActionsElement).toBeTruthy();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
