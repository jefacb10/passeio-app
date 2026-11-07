import {AuthConfig} from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'https://accounts.google.com', // Quem fez autenticação (Google)
  redirectUri: window.location.origin, //Para onde o Google vai redirecionar após autenticação
  clientId: '1051026144103-r6g94vi9732jkbp13hkh5lra1qjv923e.apps.googleusercontent.com', // Replace with your Google client ID
  scope: 'openid profile email', // Escopos de acesso
  strictDiscoveryDocumentValidation: false,
}