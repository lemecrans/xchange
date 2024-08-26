import { Component, OnInit } from '@angular/core';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { ChatUser, Discussion } from './chat.model';
import { USERS } from './data';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];

  selectedDiscu!: Discussion;

  constructor () { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Apps', path: '/', }, { label: 'Chat', path: '/', active: true }];

  }
  
  onSelectedDiscu(discu: Discussion): void {
    this.selectedDiscu = discu;
  }

}
