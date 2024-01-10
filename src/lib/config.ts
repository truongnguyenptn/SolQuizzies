const isProduction = process.env.NODE_ENV === 'production';
export const config = {
    API_URL: isProduction? process.env.NEXT_PUBLIC_API_URL : `http://127.0.0.1:${process.env.PORT}/api`,
}