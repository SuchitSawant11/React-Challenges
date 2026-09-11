import { configureStore, createSlice } from '@reduxjs/toolkit';
import { api } from './apiSlice';

// Provider: The Redux Provider will expose this store to Client Components.
// useSelector: Client Components use this hook to read Redux state.
// useDispatch: Client Components use this hook to dispatch Redux actions.
// createApi creates the API slice.
// fetchBaseQuery handles HTTP requests.
// useQuery is represented by the generated useGetPostsQuery hook.
// useMutation can be used for mutation endpoints.

interface CounterState {
    value: number;
}

const initialState: CounterState = {
    value: 0
};

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },

        decrement: (state) => {
            state.value -= 1;
        }
    }
});

export const { increment, decrement } = counterSlice.actions

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        [api.reducerPath]: api.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch