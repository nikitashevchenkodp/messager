import { AxiosResponse } from 'axios';
import { call, CallEffect, put, PutEffect, take, TakeEffect } from 'redux-saga/effects';
import { createUser, login } from 'services/apiService';
import { authenticationActions } from 'store/slices/authentication';
import { ILoginResponse } from 'types';

export function* signupSaga(): Generator<
  TakeEffect | CallEffect | PutEffect,
  void,
  {
    payload: { email: string; password: string; nickname: string; fullName: string };
  } & AxiosResponse<ILoginResponse>
> {
  try {
    const { payload } = yield take(authenticationActions.signupStart.type);
    const res = yield call(createUser, payload);
    localStorage.setItem('accessToken', res.data.accessToken);
    yield put(authenticationActions.loginUser(res.data));
  } catch (error) {
    console.log(error);
  }
}
