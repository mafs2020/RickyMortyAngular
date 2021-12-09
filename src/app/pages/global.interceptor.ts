import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { InicioService } from '../services/inicio.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {

  constructor(private inicioService: InicioService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.inicioService.loader.next(true);
    console.log('object');
    return next.handle(request).pipe(finalize(() => {
      console.log('Sequence complete');
      this.inicioService.loader.next(false);
    }));
  }
}
