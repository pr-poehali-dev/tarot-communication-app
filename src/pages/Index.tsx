import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'other';
  timestamp: string;
}

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  isGroup: boolean;
}

const mockChats: Chat[] = [
  {
    id: 1,
    name: 'Любители космоса',
    avatar: '',
    lastMessage: 'Кто-нибудь смотрел запуск вчера?',
    timestamp: '14:32',
    unread: 3,
    isGroup: true,
  },
  {
    id: 2,
    name: 'Алексей Иванов',
    avatar: '',
    lastMessage: 'Отлично, увидимся завтра!',
    timestamp: '13:15',
    unread: 0,
    isGroup: false,
  },
  {
    id: 3,
    name: 'Книжный клуб',
    avatar: '',
    lastMessage: 'Следующая встреча в пятницу',
    timestamp: '11:20',
    unread: 1,
    isGroup: true,
  },
  {
    id: 4,
    name: 'Мария Петрова',
    avatar: '',
    lastMessage: 'Спасибо за помощь!',
    timestamp: 'Вчера',
    unread: 0,
    isGroup: false,
  },
  {
    id: 5,
    name: 'Фотография и путешествия',
    avatar: '',
    lastMessage: 'Потрясающие снимки из Норвегии',
    timestamp: 'Вчера',
    unread: 5,
    isGroup: true,
  },
];

const mockMessages: Message[] = [
  {
    id: 1,
    text: 'Привет! Как дела?',
    sender: 'other',
    timestamp: '14:20',
  },
  {
    id: 2,
    text: 'Отлично! А у тебя?',
    sender: 'me',
    timestamp: '14:22',
  },
  {
    id: 3,
    text: 'Тоже хорошо, спасибо! Смотрел запуск вчера?',
    sender: 'other',
    timestamp: '14:25',
  },
  {
    id: 4,
    text: 'Да, было невероятно! Особенно момент посадки первой ступени',
    sender: 'me',
    timestamp: '14:27',
  },
  {
    id: 5,
    text: 'Согласен! Каждый раз восхищаюсь точностью',
    sender: 'other',
    timestamp: '14:32',
  },
];

function Index() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(mockChats[0]);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        text: newMessage,
        sender: 'me',
        timestamp: new Date().toLocaleTimeString('ru-RU', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <aside
        className={`${
          sidebarOpen ? 'w-20' : 'w-0'
        } transition-all duration-300 bg-sidebar flex flex-col items-center py-6 space-y-6`}
      >
        <Button
          variant="ghost"
          size="icon"
          className="text-sidebar-foreground hover:bg-sidebar-accent rounded-xl"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Icon name="Menu" size={24} />
        </Button>

        <Separator className="w-12 bg-sidebar-border" />

        <Button
          variant="ghost"
          size="icon"
          className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-primary rounded-xl"
        >
          <Icon name="MessageCircle" size={24} />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-primary rounded-xl"
        >
          <Icon name="Search" size={24} />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-primary rounded-xl"
        >
          <Icon name="Users" size={24} />
        </Button>

        <div className="flex-1" />

        <Button
          variant="ghost"
          size="icon"
          className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-primary rounded-xl"
        >
          <Icon name="Settings" size={24} />
        </Button>

        <Avatar className="w-10 h-10 cursor-pointer ring-2 ring-sidebar-primary">
          <AvatarImage src="" />
          <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground font-semibold">
            Я
          </AvatarFallback>
        </Avatar>
      </aside>

      <div
        className={`${
          sidebarOpen ? 'w-80' : 'w-0'
        } transition-all duration-300 bg-card border-r border-border overflow-hidden`}
      >
        <div className="p-4 border-b border-border">
          <h1 className="text-2xl font-bold mb-3">Чаты</h1>
          <div className="relative">
            <Icon
              name="Search"
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Поиск чатов..."
              className="pl-10 bg-secondary/50 border-none"
            />
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-120px)]">
          {mockChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`p-4 cursor-pointer transition-colors hover:bg-secondary/50 ${
                selectedChat?.id === chat.id ? 'bg-secondary' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={chat.avatar} />
                    <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                      {chat.isGroup ? (
                        <Icon name="Users" size={20} />
                      ) : (
                        chat.name[0]
                      )}
                    </AvatarFallback>
                  </Avatar>
                  {chat.unread > 0 && (
                    <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {chat.unread}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold truncate">{chat.name}</h3>
                    <span className="text-xs text-muted-foreground">
                      {chat.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {chat.lastMessage}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            <div className="p-4 border-b border-border bg-card flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={selectedChat.avatar} />
                  <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                    {selectedChat.isGroup ? (
                      <Icon name="Users" size={20} />
                    ) : (
                      selectedChat.name[0]
                    )}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold">{selectedChat.name}</h2>
                  <p className="text-xs text-muted-foreground">
                    {selectedChat.isGroup ? '12 участников' : 'в сети'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-secondary rounded-xl"
                >
                  <Icon name="Phone" size={20} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-secondary rounded-xl"
                >
                  <Icon name="Video" size={20} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-secondary rounded-xl"
                >
                  <Icon name="MoreVertical" size={20} />
                </Button>
              </div>
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4 max-w-3xl mx-auto">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === 'me' ? 'justify-end' : 'justify-start'
                    } animate-fade-in`}
                  >
                    <div
                      className={`max-w-[70%] ${
                        message.sender === 'me'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-card border border-border'
                      } rounded-2xl px-4 py-3 shadow-sm`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <span
                        className={`text-xs mt-1 block ${
                          message.sender === 'me'
                            ? 'text-primary-foreground/70'
                            : 'text-muted-foreground'
                        }`}
                      >
                        {message.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-4 border-t border-border bg-card">
              <div className="max-w-3xl mx-auto flex items-end gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-secondary rounded-xl flex-shrink-0"
                >
                  <Icon name="Plus" size={20} />
                </Button>

                <div className="flex-1 relative">
                  <Input
                    placeholder="Написать сообщение..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="pr-24 py-6 rounded-2xl bg-secondary/50 border-none"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-secondary/50 rounded-xl h-8 w-8"
                    >
                      <Icon name="Smile" size={18} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-secondary/50 rounded-xl h-8 w-8"
                    >
                      <Icon name="Mic" size={18} />
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  className="rounded-xl h-12 w-12 flex-shrink-0 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Icon name="Send" size={20} />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center space-y-3">
              <Icon name="MessageCircle" size={64} className="mx-auto opacity-20" />
              <p className="text-lg">Выберите чат для начала общения</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Index;
