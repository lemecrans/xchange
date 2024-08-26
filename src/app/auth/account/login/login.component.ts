import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading: boolean = false;
  returnUrl: string = '/';

  loginForm!: FormGroup;
  formSubmitted: boolean = false;
  error: string = '';

  showPassword: boolean = false;

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['polyphia@yopmail.com', [Validators.required, Validators.email]],
      password: ['password', Validators.required]
    });

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/apps/objet/liste-objets';
  }

  /**
 * convenience getter for easy access to form fields
 */
  get formValues() { return this.loginForm.controls; }



  /**
   * On submit form
   */
 onSubmit(): void {
    this.formSubmitted = true;
    if (this.loginForm.valid) {
        this.loading = true;
        this.authenticationService.login(this.formValues.email?.value, this.formValues.password?.value)
            .pipe(first())
            .subscribe(
                (data: any) => {
                    console.log(data)
                    console.log(this.returnUrl)
                    this.loading = false;
                    this.router.navigate([this.returnUrl]);
                },
                (error: any) => {
                    this.error = error.message; 
                    this.loading = false;
                });
    }
}
navigateToSignUp(){
  this.router.navigate(['/auth/register2']);
}

}
