import { all } from '@redux-saga/core/effects';
import tdl2Saga from './tdl2Saga';

function* rootSaga() {
	yield all([...tdl2Saga]);
}

export default rootSaga;