import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {  ToastrModule, ToastrService } from 'ngx-toastr';
import { DataService } from '../data.service';
import { SpinnerService } from '../spinner.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    providers: [DataService, SpinnerService, { provide: ToastrService, useClass: ToastrService }],
    imports: [RouterTestingModule, HttpClientModule, BrowserDynamicTestingModule, ToastrModule.forRoot(), LoginComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
