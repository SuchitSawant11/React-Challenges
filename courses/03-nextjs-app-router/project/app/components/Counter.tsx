'use client'

// clientComponent: This component runs on the client.
// useSelector: Reads Redux state from the store.
// useDispatch: Dispatches Redux actions.

import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '../store/store'
import { increment, decrement } from '../store/store'

export default function Counter() {
    const count = useSelector(
        (state: RootState) => state.counter.value
    )

    const dispatch = useDispatch<AppDispatch>()

    return (
        <div>
            <h2>Redux Counter</h2>

            <p data-testid="redux-counter-value">
                Count: {count}
            </p>

            <button
                data-testid="redux-counter-increment"
                type="button"
                onClick={() => dispatch(increment())}
            >
                Increment
            </button>

            <button
                data-testid="redux-counter-decrement"
                type="button"
                onClick={() => dispatch(decrement())}
            >
                Decrement
            </button>
        </div>
    )
}