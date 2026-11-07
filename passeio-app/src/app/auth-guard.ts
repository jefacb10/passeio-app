import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthgoogleService } from './authgoogle.service';
import { Profile } from './landingpage/profile.model';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(AuthgoogleService);
  const router = inject(Router);

  const loggedProfile: Profile = loginService.getLoggedProfile();
  if (loggedProfile) {
    return true; // Usuário autenticado, permite o acesso à rota
  }

  router.navigate(['/']); // Redireciona para a página de login
  return false;
};
