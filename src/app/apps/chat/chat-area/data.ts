import { ChatMessage, ChatUser } from "../chat.model";
import { USERS } from "../data";

//sender
/*const defaultTo: ChatUser = {
    /*id: 9,
    email: 'support@coderthemes.com',
    avatar: 'assets/images/users/user-1.jpg',
    password: 'assets/images/users/user-1.jpg',
    username: 'Geneva Kennedy',
    role: 'Admin',
    nombreDeNotes: 0,
    noteMoyenne: 0
    
};*/

// list of chat messages
const MESSAGES: ChatMessage[] = [];
/*for (const user of USERS) {
    MESSAGES.push(
        {
            id: 1,
            message: [{
                type: 'text',
                value: 'Hello!'
            }],
            to: defaultTo,
            from: user,
            sendOn: '10:00'
        },
        {
            id: 2,
            message: [{
                type: 'text',
                value: 'Hi, How are you? What about our next meeting?'
            }],
            to: user,
            from: defaultTo,
            sendOn: '10:01'
        },
        {
            id: 3,
            message: [{
                type: 'text',
                value: 'Yeah everything is fine'
            }],
            to: defaultTo,
            from: user,
            sendOn: '10:01'
        },
        {
            id: 4,
            message: [{
                type: 'text',
                value: 'Awesome!'
            }],
            to: user,
            from: defaultTo,
            sendOn: '10:02'
        },
        {
            id: 5,
            message: [{
                type: 'text',
                value: 'Let\'s have it today if you are free'
            }],
            to: defaultTo,
            from: user,
            sendOn: '10:03'
        },
        {
            id: 6,
            message: [{
                type: 'text',
                value: 'Sure thing! let me know if 2pm works for you'
            }],
            to: user,
            from: defaultTo,
            sendOn: '10:03'
        },
        {
            id: 7,
            message: [{
                type: 'text',
                value: 'Sorry, I have another meeting scheduled at 2pm. Can we have it at 3pm instead?'
            }],
            to: defaultTo,
            from: user,
            sendOn: '10:04'
        },
        {
            id: 8,
            message: [{
                type: 'text',
                value: 'We can also discuss about the presentation talk format if you have some extra mins'
            }],
            to: defaultTo,
            from: user,
            sendOn: '10:04'
        },
        {
            id: 9,
            message: [{
                type: 'text',
                value: '3pm it is. Sure, let\'s discuss about presentation format, it would be great to finalize today. I am attaching the last year format and assets here..'
            },
            {
                type: 'file',
                value: {
                    file: 'Ubold-sketch.zip',
                    size: '2.3MB'
                }
            }
            ],
            to: user,
            from: defaultTo,
            sendOn: '10:05'
        }
    );
}*/

export default MESSAGES;