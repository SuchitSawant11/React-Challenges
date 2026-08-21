/** Stub: Complete Challenge 03 (Reading and Dispatching) per README. */
import { useAppSelector, useAppDispatch } from "../store/hooks"
import { increment, decrement } from "../store/slices/counterSlice"

export default function CounterView() {
  const count = useAppSelector((state) => state.counter)
  const dispatch = useAppDispatch()

  return <div data-testid="counter-view">
    <h3 data-testid="counter-value" >Counter: {count}</h3>

    <button
      data-testid="increment-btn"
      onClick={() => dispatch(increment())}
    >
      Increment
    </button>

    <button
      data-testid="decrement-btn"
      onClick={() => dispatch(decrement())}
    >
      Decrement
    </button>
  </div>
}
