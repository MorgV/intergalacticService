import type { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

const AppProviders = ({ children }: Props) => {
    return (
        <>
            {/* Место для других провайдеров, если нужно */}
            {children}
        </>
    )
}

export default AppProviders
