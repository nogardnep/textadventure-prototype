import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CaracteristicModifiersComponent } from './caracteristic-modifiers.component';

describe('CaracteristicModifiersComponent', () => {
  let component: CaracteristicModifiersComponent;
  let fixture: ComponentFixture<CaracteristicModifiersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CaracteristicModifiersComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CaracteristicModifiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
