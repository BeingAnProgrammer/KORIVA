import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Data, NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs';

/**
 * Exposes the deepest activated route's `data` as a signal, so layout-level
 * components (sidebar, top header) that sit beside `<router-outlet>` rather
 * than inside it — and therefore can't inject the leaf route's
 * `ActivatedRoute` directly — can still react to per-page title/back-link
 * config declared on each route.
 */
@Injectable({ providedIn: 'root' })
export class RouteDataService {
  private readonly router = inject(Router);

  readonly data = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => this.deepestRouteData()),
      startWith(this.deepestRouteData())
    ),
    { initialValue: {} as Data }
  );

  private deepestRouteData(): Data {
    let snapshot = this.router.routerState.snapshot.root;

    while (snapshot.firstChild) {
      snapshot = snapshot.firstChild;
    }

    return snapshot.data;
  }
}
