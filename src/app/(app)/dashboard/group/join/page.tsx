import { Suspense } from "react"

function Join(){
    return (
        <div>

        </div>
    )
}
export default function Page(){
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <Join/>
        </Suspense>
    )
}