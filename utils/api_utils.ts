const getHeaders = (accessToken) => {
    return accessToken ? {
        Authorization: `Bearer ${accessToken}`
    } : {}
}

export default getHeaders;