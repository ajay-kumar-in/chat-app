import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { WebSocketService } from './../../../web-socket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loggedinUser: any  = null;

  constructor(
    public router: Router,
    public authService: AuthService,
    public webSocketService: WebSocketService
  ) { }

  ngOnInit(): void {
    if(JSON.parse(localStorage.getItem('user')!)) {
      this.loggedinUser = true;
    }

    this.authService.$isUserLoggedIn.subscribe((loginStatus: boolean)=> {
      this.loggedinUser = loginStatus;
    })
  }

  onLogout() {
    localStorage.clear();
    this.loggedinUser = false;
    this.webSocketService.disconnect();
    this.router.navigate(['/login'])
  }

}
