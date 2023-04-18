import { call, put } from 'redux-saga/effects';
import { getAllUsers } from 'services/apiService';
import { usersActions } from 'store/slices/usersStatuses';

export function* loadUsers(): any {
  try {
    const res = yield call(getAllUsers);
    yield put(usersActions.setUsers(res.data));
  } catch (e) {
    console.log(e);
  }
}
