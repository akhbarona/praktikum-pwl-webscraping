const intialState = {
    articles: [],
    url: 'goal.com/id',
}

const reducer = (state = intialState, action) => {
    switch(action.type){
        case 'url':
            return {...state,url:action.data};
        case 'article':
            return {...state,articles:action.data}
        default:
            return state;
    }
};
export default  reducer