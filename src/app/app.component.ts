import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    title = 'athena';

    athenaLogoAzul="/assets/images/logo_azul_athena.png";

    constructor(public authService: AuthService,
        private router: Router) { }

    myProfile(): void {
        this.router.navigate(['profile']);
    }

    profiles(): void {
        this.router.navigate(['management/profiles']);
    }

    logout(): void {
        this.authService.logout();
        this.router.navigate(['']);
    }
    
    addInstitution(): void {
        this.router.navigate(['institutions/add'])
    }
}


