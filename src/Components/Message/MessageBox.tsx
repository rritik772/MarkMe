import React from "react";

export enum IMessageType {
  Error = 0,
  Info = 1,
  Success = 2
};

export interface IMessage {
  messageType: IMessageType;
  messageString: string;
}

export class Message implements IMessage{
  messageType: IMessageType;
  messageString: string;

  constructor(message_type: IMessageType, message_string: string) {
    this.messageType = message_type;
    this.messageString = message_string;
  }
}

interface IMessageBox {
  message: Message
}

const MessageBox:React.FC<IMessageBox> =  ({ message }): JSX.Element  => {

  if ( message == undefined ) return <></>;

  let messageColor =
      (message.messageType == 0)? 'bg-red-300' :
      (message.messageType == 1)? 'bg-yellow-300' :
      'bg-green-300';

  return (
    <main className={`md:w-1/2 lg:w-5/12 xl:w-4/12 mx-auto my-5 p-5 ${messageColor} rounded-md text-center font-plex-sans md:text-lg`}>
    { message.messageString }
    </main>
  )
}

export default MessageBox;
