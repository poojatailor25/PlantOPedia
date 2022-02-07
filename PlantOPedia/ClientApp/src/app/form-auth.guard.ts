import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}


@Injectable({
  providedIn: 'root'
})

export class CanDeactivateGuard implements
    CanDeactivate<CanComponentDeactivate> {

    canDeactivate(component: CanComponentDeactivate) {
        return component.canDeactivate();
    }
}



// export class FormAuthGuard implements CanDeactivate<AddOrderComponent | AddProductComponent> {
//   canDeactivate(
//     component: AddOrderComponent,
//     currentRoute: ActivatedRouteSnapshot,
//     currentState: RouterStateSnapshot,
//     nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//       if(component.orderform.dirty){
//         return window.confirm("You have some unsaved changes, Are you sure you want to navigate?")
//       }

//     return true;
//   }


// }



