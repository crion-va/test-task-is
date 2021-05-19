import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { AuthService } from "../services/auth.service"


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (this.auth.isAuth()) {
            req = req.clone({
                setHeaders: {
                    Authorization: this.auth.getToken()
                }
            })
        }
        return next.handle(req)
    }
}