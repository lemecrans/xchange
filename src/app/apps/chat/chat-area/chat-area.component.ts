import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/core/service/auth.service';
import { Discussion, Message } from '../chat.model';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.scss']
})

export class ChatAreaComponent implements OnInit {

  @Input() selectedDiscu!: Discussion;

  loading: boolean = false;
  messages: Message[] = [];
  toUser: any = {};
  newMessage: string = '';

  @ViewChild('chatForm', { static: true }) chatForm: any;

  constructor (private authserv : AuthenticationService, private chatService: ChatService) { }

  ngOnInit(): void {
    this.toUser = this.authserv.currentUser();
    console.log('edf')
    console.log(this.toUser)
    this.selectedDiscu={
      _id: "0",
      sender: { id:1000,
        email: "",
        password: "",
        username: "",
        avatar: "",
        role: "",
        nombreDeNotes: 0,
        noteMoyenne: 0,},
      desti: { id:1000,
        email: "",
        password: "",
        username: "",
        avatar: "",
        role: "",
        nombreDeNotes: 0,
        noteMoyenne: 0,},
      discussion: [], 
    };
  }

  /**
   * loads message for new chat user
   * @param changes chat user change
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.loading = true;
    setTimeout(() => {
      this.messages = this.selectedDiscu.discussion;
      console.log(this.messages)
      this.loading = false;

    }, 750);
  }

  sendChatMessage(): void {
    this.chatService.send(""+this.selectedDiscu.desti.id,this.newMessage).subscribe( {
      error: (err: any) => {
        console.error('Erreur lors de la récupération de l\'objet:', err);
      },
      complete: () => {
        console.log('Message sent');
        this.chatService.get(""+this.selectedDiscu.desti.id).subscribe({
          next: (response: any) => {
            this.selectedDiscu= response;
            this.messages = this.selectedDiscu.discussion;
            this.newMessage = '';
          },
          error: (err: any) => {
            console.error('Erreur lors de la récupération de l\'objet:', err);
          },
          complete: () => {
            console.log('oke')
          }
        });
      }
    });
    
  }
}
