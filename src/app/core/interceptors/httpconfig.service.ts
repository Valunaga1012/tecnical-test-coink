import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, finalize, map} from 'rxjs/operators'
import { LoadingService } from '../services/utilities/loading.service';

@Injectable({
  providedIn: 'root'
})
export class HttpconfigService implements HttpInterceptor {
  private countRequest = 0
  constructor(private loading: LoadingService) { }

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.countRequest) {
      this.loading.show();
    }
    this.countRequest++;
      const cloneRep = req.clone({
        params: req.params.set(
          'apiKey', '030106'
        )
      })
      
      return next.handle(cloneRep).pipe(
        finalize(() => {
          this.countRequest--;
          if (!this.countRequest) {
            this.loading.hide()
          }
        })
      );
      
  }
 
}
