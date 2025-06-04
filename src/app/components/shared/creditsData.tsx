// src/app/components/shared/creditsData.tsx
export const initialCommands = [
  'Console_ONG v29.03.1996',
  'Type "help" for available commands',
  ''
];

export const commandResponses = {
  help: [
    '┌─────────────────────────────────┐',
    '│       AVAILABLE COMMANDS        │',
    '├─────────────────────────────────┤',
    '│ credits  -  Show project info   │',
    '│ contact  -  Contact details     │',
    '│ clear    -  Clear terminal      │',
    '│ exit     -  Close terminal      │',
    '└─────────────────────────────────┘',
    ''
  ],
  
  credits: [
    '┌──────────────────────────────────────────────────────┐',
    '│                    PROJECT CREDITS                   │',
    '├──────────────────────────────────────────────────────┤',
    '│                                                      │',
    '│   ██████╗ ███╗   ██╗ ██████╗  █████╗ ██╗  ██╗ ██╗    │',
    '│   ██╔═══██╗████╗  ██║██╔════╝ ██╔══██╗██║ ██╔╝██║    │',
    '│   ██║   ██║██╔██╗ ██║██║  ███╗███████║█████╔╝ ██║    │',
    '│   ██║   ██║██║╚██╗██║██║   ██║██╔══██║██╔═██╗ ██║    │',
    '│   ╚██████╔╝██║ ╚████║╚██████╔╝██║  ██║██║  ██╗███╗   │',
    '│    ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══╝   │',
    '│                                                      │',
    '│  DESIGN & DEVELOPMENT                                │',
    '│  • Brian Ongaki                                      │',
    '│                                                      │',
    '│  TECH STACK                                          │',
    '│  • Next.js         -   Modern React framework        │',
    '│  • TypeScript      -   Type-safe JavaScript          │',
    '│                                                      │',
    '│  INSPIRATIONS                                        │',
    '│  • Vova Ushenko    -   Portfolio                     │',
    '│  • Joan Ramos      -   Interactive Idea              │',
    '│                                                      │',
    '│  SPECIAL THANKS                                      │',
    '│  • GitHub Copilot  -   AI                            │',
    '│  • Stack Overflow  -   Developer community           │',
    '│  • Coffee ☕        -   Late night fuel               │',
    '│                                                      │',
    '└──────────────────────────────────────────────────────┘',
    ''
  ],
  
  contact: [
    '┌──────────────────────────────────────────────────┐',
    '│                    CONTACT INFO                  │',
    '├──────────────────────────────────────────────────┤',
    '│                                                  │',
    '│  ┌─────────────────────┐                         │',
    '│  │  Email             │ b8ongaki@icloud.com      │',
    '│  ├─────────────────────┤                         │',
    '│  │  Phone             │ +971 56 147 2975         │',
    '│  ├─────────────────────┤                         │',
    '│  │  WhatsApp          │ +971 56 147 2975         │',
    '│  └─────────────────────┘                         │',
    '│                                                  │',
    '│  Type "links" to open these directly             │',
    '│                                                  │',
    '└──────────────────────────────────────────────────┘',
    ''
  ],
  
  links: [
    '┌─────────────────────────────────────────────────┐',
    '│            OPENING EXTERNAL LINKS               │',
    '├─────────────────────────────────────────────────┤',
    '│                                                 │',
    '│  • Email:    mailto:b8ongaki@icloud.com         │',
    '│  • Phone:    tel:+971561472975                  │',
    '│  • WhatsApp: https://wa.me/4915215629524        │',
    '│                                                 │',
    '└─────────────────────────────────────────────────┘',
    ''
  ],
  
  clear: [],
  
  exit: [
    '┌──────────────────────────────────────────────────────┐',
    '│                CONSOLE SESSION ENDED                 │',
    '├──────────────────────────────────────────────────────┤',
    '│                                                      │',
    '│          Thank you for using the console!            │',
    '│              // Closing connection...                │',
    '│                                                      │',
    '└──────────────────────────────────────────────────────┘',
    ''
  ],
  
  default: [
    '┌──────────────────────────────────────────────────────┐',
    '│                    COMMAND ERROR                     │',
    '├──────────────────────────────────────────────────────┤',
    '│                                                      │',
    '│  Command not found: {cmd}                            │',
    '│  Type "help" for available commands                  │',
    '│                                                      │',
    '└──────────────────────────────────────────────────────┘',
    ''
  ]
};

export const quickActions = [
  {
    command: 'credits',
    icon: 'BookOpenText',
    color: 'blue',
    label: 'Credits'
  },
  {
    command: 'contact',
    icon: 'Mail',
    color: 'green',
    label: 'Contact'
  },
  {
    command: 'help',
    icon: 'CircleHelp',
    color: 'yellow',
    label: 'Help'
  },
  {
    command: 'clear',
    icon: 'Unplug',
    color: 'purple',
    label: 'Clear'
  }
];