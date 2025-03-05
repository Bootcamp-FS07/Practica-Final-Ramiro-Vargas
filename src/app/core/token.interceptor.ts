import {HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req,next) => {
  console.log("entre en interceptor")
  const token = sessionStorage.getItem("token");
  const newReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  })
  return next(newReq)
};
