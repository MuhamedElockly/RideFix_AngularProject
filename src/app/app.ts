import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserStorageService } from './Services/UserStorageService/user-storage-service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected title = 'RideFix';
  userRole: string | null = null;

  constructor(private userStorage: UserStorageService) {}

  ngOnInit() {
    this.userRole = this.userStorage.getUserRole();
  }
}
