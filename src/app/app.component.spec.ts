import { RouterOutlet } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TaskNavbarComponent } from './components/task-navbar/task-navbar.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from "@angular/platform-browser"; 

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        AppComponent,
        TaskNavbarComponent
      ],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {    
    expect(component).toBeTruthy();
  });

  it(`should have task-nav and router-outlet`, () => {
    let navElement = fixture.debugElement.children[0].children[0];
    let routerElement = fixture.debugElement.children[0].children[1];
    
    expect(navElement.name).toBe('task-navbar');
    expect(routerElement.name).toBe('router-outlet');
  });

  // xit(`should have router-outlet`, () => {
  //   let debugElement = fixture.debugElement.query(By.directive(RouterOutlet));

  //   expect(debugElement).not.toBeNull();
  // });

});
