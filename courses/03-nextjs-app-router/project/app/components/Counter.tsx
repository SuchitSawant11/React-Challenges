'use client'

// useClient: This component is a Client Component.
// serverComponent: The parent page remains a Server Component.

import { useState } from 'react'

export default function Counter() {
    const [count, setCount] = useState(0)
    return (
        <div>
            <p>Count: {count}</p>

            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>
        </div>
    )
}
