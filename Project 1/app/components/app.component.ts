import {Component} from '@angular/core';
import {AppLoginFormComponent} from './login/login.form.component';

@Component({
    selector:'my-app',
    directives:[AppLoginFormComponent],
    template: '<login-form></login-form>'
})

/**
 * AppComponent
 */
export class AppComponent {}