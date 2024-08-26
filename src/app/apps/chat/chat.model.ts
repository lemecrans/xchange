import { ChatGroup } from "src/app/shared/widget/chat-group/chat-group.model";

export interface ChatUser {
    id: number;
    email: string;
    password: string;
    username: string;
    avatar?: string;
    role: string;
    nombreDeNotes: number;
    noteMoyenne: number;
  }
  
  export interface Message {
    _id: string | null;
    sender: ChatUser;
    message: string;
    event_date: string;
  }
  
  export interface Discussion {
    _id: string;
    sender: ChatUser;
    desti: ChatUser;
    discussion: Message[];
  }

export interface ChatMessage {
    id: number;
    from: ChatUser;
    to: ChatUser;
    message: {
        type?: string;
        value?: any;
    }[];
    sendOn?: string;
}
/*
id?: number;
    name?: string;
    avatar?: string;
    lastMessage?: string;
    totalUnread?: number;
    lastMessageOn?: string;
    email?: string;
    phone?: string;
    location?: string;
    languages?: string;
    groups?: ChatGroup[];
    */