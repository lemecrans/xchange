import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthenticationService } from 'src/app/core/service/auth.service';
import {  Discussion } from '../chat.model';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat-users',
  templateUrl: './chat-users.component.html',
  styleUrls: ['./chat-users.component.scss']
})
export class ChatUsersComponent implements OnInit {

  loggedInUser: any = {};
  discuList: Discussion[] = [];
  @Input() selectedDiscu!: Discussion;
  
  @Output() selectDiscu: EventEmitter<Discussion> = new EventEmitter();

  constructor (private authService: AuthenticationService, private chatService: ChatService) { }

  ngOnInit(): void {
    this.loggedInUser = this.authService.currentUser();
    this._fetchUsers();
  }

  /**
   *  Fetches users for chat
   */
  _fetchUsers(): void {
    this.chatService.getAll().subscribe( {
      next: (response: any) => {
        this.discuList= response;
        console.log(this.discuList)
      },
      error: (err: any) => {
        console.error('Erreur lors de la récupération de l\'objet:', err);
      },
      complete: () => {
        console.log('oke')
      }
    });
  }

  activateUser(discu: Discussion): void {
    this.selectedDiscu = discu;
    this.selectDiscu.emit(this.selectedDiscu);
  }

}
