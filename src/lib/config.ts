const isProduction = process.env.NODE_ENV === 'production';
export const config = {
    GPTSERVICE_API_URL: process.env.GPTSERVICE_API_URL,
    API_URL: isProduction? process.env.NEXT_PUBLIC_API_URL : `http://127.0.0.1:${process.env.PORT}/api`,
}