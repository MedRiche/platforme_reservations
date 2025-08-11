import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationAdminListComponent } from './reservation-admin-list.component';

describe('ReservationAdminListComponent', () => {
  let component: ReservationAdminListComponent;
  let fixture: ComponentFixture<ReservationAdminListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservationAdminListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationAdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
