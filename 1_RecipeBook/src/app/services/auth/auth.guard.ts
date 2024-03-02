import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, createUrlTreeFromSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import { inject } from "@angular/core";
import { map, take } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const store: Store<fromApp.AppState> = inject(Store);
  return store.select('auth').pipe(
    take(1),
    map(authState => authState.user),
    map(user => {
      const isAuth = !!user;
      if (isAuth) {
        return true;
      } else {
        return createUrlTreeFromSnapshot(route, ['/login']);
      }
    })
  );
}