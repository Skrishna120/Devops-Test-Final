import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PersistenceService } from 'angular-persistence';
import { ToastrModule } from 'ngx-toastr';
import { DataService } from '../data.service';
import { SpinnerService } from '../spinner.service';

import { StoreComponent } from './store.component';

describe('StoreComponent', () => {
  let component: StoreComponent;
  let fixture: ComponentFixture<StoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    providers: [DataService, SpinnerService, PersistenceService],
    imports: [RouterTestingModule, HttpClientModule, ToastrModule.forRoot(), StoreComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
