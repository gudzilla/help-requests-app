import { store } from './index';
declare global {
  type RootState = ReturnType<typeof store.getState>;
  type RootDispatch = typeof store.dispatch;
}
