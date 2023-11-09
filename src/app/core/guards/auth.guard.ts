import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authUser = inject(AuthService);
  const router = inject(Router);
  if(authUser.isAuthorized()){
    return true
  }
  
  router.navigate(['/'])
  
  return false;


};
export const authenticationGuard : CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router)
  if(authService.userAlreadyDone()) {
    console.log('Done');
    
    return router.navigate(['/main']);
  }
  return true

}
