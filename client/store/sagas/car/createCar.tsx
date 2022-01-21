import { put, takeLatest } from 'redux-saga/effects';
import { createCar } from '../../../apolloClient/mutations/car';
import { ICar } from '../../interfaces';
import { addCarsOfUser } from '../../slices/cars' 

function* addCarWatcher() {
  yield takeLatest('ADD_CAR', addCarWorker)
}

function* addCarWorker(payload: any) {
  const { payload: { 
    setModalAddCar,
    setAttantion,
    setinfoAttention,
    ...carInput}
  } = payload
  try {
    const car: ICar[] = yield createCar({
      carInput
  })
  yield put(addCarsOfUser(car))  
  yield setModalAddCar(false)
  } catch (err: any) {
    console.log('---err', err)
    setinfoAttention(err.message);
    setAttantion(true)
  }
}

export default addCarWatcher