import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  helper = new JwtHelperService();

  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      console.log(" Token login component token:  "+this.tokenStorage.getToken);
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    const { name, password } = this.form;

    this.authService.login(name, password).subscribe(
      data => {
        const jwtData = JSON.stringify(data);
        //const jwtData2 = jwtData.split(":")[1];

        //alert("This is from login component: "+jwtData);
        const decodedToken = this.helper.decodeToken(jwtData);
        
        //alert("This is from decode token: "+ decodedToken.email);
        this.tokenStorage.saveToken(jwtData);
        this.tokenStorage.saveUser(decodedToken);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        
        
        this.reloadPage();
      },
      err => {
        // console.log(this.tokenStorage.getUser().roles);
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

}
