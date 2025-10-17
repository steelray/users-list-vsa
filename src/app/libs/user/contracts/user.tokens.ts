import { InjectionToken } from '@angular/core';
import { IUserPort } from './user.port';

export const USER_PORT = new InjectionToken<IUserPort>('USER_PORT');