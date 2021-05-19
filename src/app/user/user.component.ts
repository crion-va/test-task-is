import { animate, state, style, transition, trigger } from '@angular/animations';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { User } from '../interfaces/interfaces';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [
    trigger('arrow', [
      state('down', style({transform: 'rotate(0deg)'})),
      state('up', style({transform: 'rotate(180deg)'})),
      transition('down <=> up', animate(300))
    ])
  ]
})
export class UserComponent implements OnInit {

  @Input() state: any

  isAuth: boolean = false
  user: User = {}

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    if (this.auth.isAuth()) {
      this.auth.getUser()
        .subscribe(user => {
          this.user = user
          this.isAuth = true
        })
    }
  }

  login() {
    this.auth.login({login: 'user', password: '123456'})
      .subscribe(res => {
        this.user = res
        this.isAuth = true
      })
  }

}
