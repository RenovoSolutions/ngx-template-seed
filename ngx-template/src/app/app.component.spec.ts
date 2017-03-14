import { TestBed, async } from '@angular/core/testing';
import { expect } from 'chai';

import { AppComponent } from './app.component';
import { NGXTemplateComponent } from './ngx-template.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NGXTemplateComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(!!app).be.true;
  }));

});
