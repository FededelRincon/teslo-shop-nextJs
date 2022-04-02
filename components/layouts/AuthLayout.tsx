import { Box } from "@mui/system";
import Head from "next/head";
import { FC } from "react";



interface Props {
    title: string;
}

export const AuthLayout:FC<Props> = ({ children, title }) => {
    return (
        <>
            <Head>
                <title>{ title }</title>
            </Head>

            <main>
                <Box display='flex' justifyContent='center' alignItems='center' height="calc(100vh - 100px)" >
                    { children }
                </Box>
            </main>
        </>
    )
}