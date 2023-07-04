import faker from "faker";

import { currentUnixTimestamp } from "../helpers/currentUnixTimestamp";
import { IMessage, IMessageAuthor } from "../types/messaging";
import { createGuid } from "../helpers/guid";

export const mockMessageAuthorSystem: IMessageAuthor = {
  id: createGuid(),
  isSystem: true,
  isActiveUser: false,
  imageSource: null,
  name: null,
};

export const mockMessageAuthorActiveUserWithImage: IMessageAuthor = {
  id: createGuid(),
  isSystem: false,
  isActiveUser: true,
  imageSource: faker.image.people(100, 100),
  name: null,
};

export const mockMessageAuthorActiveUserNoImage: IMessageAuthor = {
  id: createGuid(),
  isSystem: false,
  isActiveUser: true,
  imageSource: null,
  name: "Bill Murray",
};

export const mockMessageAuthorRespondentWithImage: IMessageAuthor = {
  id: createGuid(),
  isSystem: false,
  isActiveUser: false,
  imageSource: faker.image.people(100, 100),
  name: "Bill Murray",
};

export const mockMessageAuthorRespondentNoImage: IMessageAuthor = {
  id: createGuid(),
  isSystem: false,
  isActiveUser: false,
  imageSource: null,
  name: "Bill Murray",
};

export const mockLongMessage = faker.lorem.words(50);
export const mockShortMessage = faker.lorem.words(5);
export const mockOneWordMessage = "Ok";

const now = currentUnixTimestamp();

export const mockShortMessageFromActiveUser: IMessage = {
  id: createGuid(),
  author: mockMessageAuthorActiveUserWithImage,
  messageText: mockShortMessage,
  createdAt: now - Math.floor(Math.random() * (100000 - 500 + 1) + 500),
};

export const mockOneWordMessageFromActiveUser: IMessage = {
  id: createGuid(),
  author: mockMessageAuthorActiveUserWithImage,
  messageText: mockOneWordMessage,
  createdAt: now - Math.floor(Math.random() * (100000 - 500 + 1) + 500),
};

export const mockLongMessageFromActiveUser: IMessage = {
  id: createGuid(),
  author: mockMessageAuthorActiveUserWithImage,
  messageText: mockLongMessage,
  createdAt: now - Math.floor(Math.random() * (100000 - 500 + 1) + 500),
};

export const mockOneWordMessageFromRespondent: IMessage = {
  id: createGuid(),
  author: mockMessageAuthorRespondentNoImage,
  messageText: mockOneWordMessage,
  createdAt: now - Math.floor(Math.random() * (100000 - 500 + 1) + 500),
};

export const mockShortMessageFromRespondent: IMessage = {
  id: createGuid(),
  author: mockMessageAuthorRespondentNoImage,
  messageText: mockShortMessage,
  createdAt: now - Math.floor(Math.random() * (100000 - 500 + 1) + 500),
};

export const mockLongMessageFromRespondent: IMessage = {
  id: createGuid(),
  author: mockMessageAuthorRespondentNoImage,
  messageText: mockLongMessage,
  createdAt: now - Math.floor(Math.random() * (100000 - 500 + 1) + 500),
};

export const mockMessageFromSystem: IMessage = {
  id: createGuid(),
  author: mockMessageAuthorSystem,
  messageText: mockShortMessage,
  createdAt: now - Math.floor(Math.random() * (100000 - 500 + 1) + 500),
};

export const mockMessages: IMessage[] = [
  mockOneWordMessageFromActiveUser,
  mockShortMessageFromActiveUser,
  mockLongMessageFromActiveUser,
  mockOneWordMessageFromRespondent,
  mockShortMessageFromRespondent,
  mockLongMessageFromRespondent,
  mockMessageFromSystem,
].sort((m1, m2) => m1.createdAt - m2.createdAt);
