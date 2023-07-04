import React from "react";
import { unixTimestamp } from "./dateTypes";

/**
 * Used for messaging/chat feature
 */
export interface IMessage {
  id: string;
  author: IMessageAuthor;
  messageText: string;
  createdAt: unixTimestamp;
  attachment?: React.ReactElement | React.ReactElement[];
}

export interface IMessageAuthor {
  id: string;
  isSystem?: boolean;
  isActiveUser?: boolean;
  imageSource?: string;
  name?: string;
}

/**
 * Used to add custom elements to a message thread
 * i.e. a form request or a resource
 */
export interface IMessageAddItemOption {
  label: string;
  onClick: () => void;
  icon?: string;
}
