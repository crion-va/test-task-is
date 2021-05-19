import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  state: string = 'down'
  title = 'ang-re';

  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    let token = localStorage.getItem('auth-token')
    if (token != null) {
      this.auth.setToken(localStorage.getItem('auth-token'))
    }
  }

  animateArrow(): void {
    if (this.state == 'down') this.state = 'up'
    else this.state = 'down'
  }

  logout(): void {
    this.auth.logout()
  }

}
