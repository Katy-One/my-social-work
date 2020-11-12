import React, {Suspense} from "react";


export function withSuspense<WPC> (Component:React.ComponentType<WPC>)  {
    return (props: WPC) => {
        return <Suspense fallback={<div>Loading...</div>}>
            <Component {...props} />
        </Suspense>
    }
}