/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EtComponent } from './et.component';

describe('EtComponent', () => {
  let component: EtComponent;
  let fixture: ComponentFixture<EtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
