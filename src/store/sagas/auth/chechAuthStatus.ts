import { AxiosResponse } from 'axios';
import { call, CallEffect, put, PutEffect, take, TakeEffect } from 'redux-saga/effects';
import { refreshAccessToken } from 'services/apiService';
import { authenticationActions } from 'store/slices/authentication';
import { ILoginResponse } from 'types';

export function* checkAuthStatus(): Generator<
  TakeEffect | CallEffect | PutEffect,
  void,
  { payload: { email: string; password: string } } & AxiosResponse<ILoginResponse>
> {
  while (true) {
    try {
      yield take(authenticationActions.checkAuth.type);
      const res = yield call(refreshAccessToken);
      const {
        data: { user, accessToken }
      } = res;
      yield put(authenticationActions.setUser(user));
      yield put(authenticationActions.setIsAuth(true));
      yield put(authenticationActions.setAccessToken(accessToken));
    } catch (error) {
      yield put(authenticationActions.setIsAuth(false));
    }
  }
}
