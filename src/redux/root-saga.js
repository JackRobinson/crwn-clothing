import { all, call } from "redux-saga/effects";

import { fetchCollectionsStart } from "./shop/shop.saga";
import { userSagas } from "./user/user.sagas";
import { cartSagas } from "./cart/cart.sagas";
import { stopSagas } from "./shop/shop.saga";
export default function* rootSaga() {
  yield all([
    call(fetchCollectionsStart),
    call(userSagas),
    call(cartSagas),
    call(stopSagas),
  ]);
}
