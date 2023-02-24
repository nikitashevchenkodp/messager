import axios from 'axios';

export interface IMessage {
  from: string;
  to: string;
  messageText: string;
  chatId: string;
  _id: string;
  _v: 0;
  createdAt: string;
}

export const axiosInst = axios.create({
  baseURL: 'http://localhost:5002/'
});

export const sendMessage = async (body: Omit<IMessage, '_id' | '_v' | 'createdAt'>) => {
  return axiosInst.post('/api/messages/send', body);
};
