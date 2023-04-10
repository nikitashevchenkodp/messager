import { AxiosResponse } from 'axios';
import { call, CallEffect, put, PutEffect, take, TakeEffect } from 'redux-saga/effects';
import { login } from 'services/apiService';
import { authenticationActions } from 'store/slices/authentication';
import { ILoginResponse } from 'types';

export function* loginSaga(): Generator<
  TakeEffect | CallEffect | PutEffect,
  void,
  { payload: { email: string; password: string } } & AxiosResponse<ILoginResponse>
> {
  while (true) {
    try {
      const { payload } = yield take(authenticationActions.loginStart.type);
      const res = yield call(login, payload);
      localStorage.setItem('accessToken', res.data.accessToken);
      yield put(authenticationActions.loginUser(res.data));
    } catch (error) {
      console.log(error);
    }
  }
}
