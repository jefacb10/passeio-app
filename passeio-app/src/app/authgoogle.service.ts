import { Injectable, inject, signal } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
    
export class AuthgoogleService {
    private oauthService: OAuthService = inject(OAuthService);
    private router: Router = inject(Router); // Injeta o serviço de roteamento do Angular para navegação após logout
    profile = signal<any>(null); //serve para armazenar o perfil do usuário autenticado

    constructor() {
        this.initConfig();
    }

    initConfig() {
        this.oauthService.configure(authConfig);
        this.oauthService.setupAutomaticSilentRefresh(); // Configura o refresh automático do token
        this.oauthService.loadDiscoveryDocumentAndTryLogin() // Carrega o documento de descoberta e tenta fazer login automaticamente
        .then(() =>{
            if (this.oauthService.hasValidAccessToken()) {
                this.profile.set(this.oauthService.getIdentityClaims()); // Armazena o perfil do usuário autenticado
            }
        }); 
    }

    login() {
        this.oauthService.initImplicitFlow(); // Inicia o fluxo de login do Google
    }

    logout() {
        this.oauthService.revokeTokenAndLogout(); // Revoga o token e faz logout
        this.oauthService.logOut();
        this.profile.set(null); // Limpa o perfil do usuário
        this.router.navigate(['/']);
    }
    
    getLoggedProfile() {
        return this.profile();
    }
}
