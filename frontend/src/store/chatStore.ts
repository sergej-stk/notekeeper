import { ChatMessage } from "@/shared/gen/ts/proto/chat_service";
import { defineStore } from "pinia";
import { io, Socket } from "socket.io-client";
import { useMainStore } from "./mainStore";

let socket: Socket | null = null;

type ChatRoom = {
  room_id: number;
  messages: ChatMessage[];
  messageCount: number;
};

type MainStore = {
  rooms: ChatRoom[];
  openChatRooms: ChatRoom[];
};

export const useChatStore = defineStore("chatStore", {
  state: (): MainStore => {
    return {
      rooms: [],
      openChatRooms: [],
    };
  },
  actions: {
    connect() {
      const mainStore = useMainStore();
      socket = io("/chat", {
        secure: process.env.NODE_ENV === "development" ? false : true,
        extraHeaders: {
          Authorization: "Bearer:" + mainStore.token,
        },
      });

      socket.on("message", (message: ChatMessage) => {
        const roomId = message.roomId;

        const roomInStore = this.rooms.find(
          (search) => search.room_id === roomId
        );

        if (roomInStore === undefined) {
          return;
        }

        const isOpen = this.openChatRooms.includes(roomInStore);

        if (isOpen === false) {
          roomInStore.messageCount++;
          return;
        }

        roomInStore.messages.push(message);
      });
    },
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  getters: {
    //getTheme: (state): "light" | "dark" => state.theme,
  },

  persist: {
    storage: localStorage,
  },
});
