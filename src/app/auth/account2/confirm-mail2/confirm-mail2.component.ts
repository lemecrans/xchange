import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-auth-confirm-mail2',
  templateUrl: './confirm-mail2.component.html',
  styleUrls: ['./confirm-mail2.component.scss']
})
export class ConfirmMail2Component implements OnInit {

  currentYear!: number;
  email:string = this.authenticationService.emailRegister;
  constructor (private authenticationService: AuthenticationService,) { }

  ngOnInit(): void {
    this.currentYear = Date.now();
  }

}
