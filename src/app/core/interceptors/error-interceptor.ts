import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'Ha ocurrido un error inesperado.';

      if (error.status === 0) {
        message = 'No se ha podido conectar con el servidor.';
      } else if (error.status === 401) {
        message = 'Sesión caducada. Inicia sesión de nuevo.';
      } else if (error.status === 403) {
        message = 'No tienes permisos para realizar esta acción.';
      } else if (error.status >= 500) {
        message = 'Error del servidor. Inténtalo más tarde.';
      } else if (error.error?.message) {
        message = error.error.message;
      } else if (typeof error.error === 'string') {
        message = error.error;
      }

      return throwError(() => ({
        ...error,
        userMessage: message
      }));
    })
  );
};
