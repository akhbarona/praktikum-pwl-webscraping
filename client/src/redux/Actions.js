export const changeUrl = (url) => ({
    type: 'url',
    data: url
})

export const fetchNews = (article) => ({
    type: 'article',
    data: article
})