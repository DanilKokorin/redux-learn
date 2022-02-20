import { applyMiddleware, createStore } from 'redux';
import './styles.css'
import logger from 'redux-logger'
import { rootReducer } from './redux/rootReducer';
import { increment, decrement, asuncIncrement, changeTheme } from './redux/actions';
import thunk from 'redux-thunk'

const counter = document.querySelector('#counter')
const addBtn = document.querySelector('#add')
const subBtn = document.querySelector('#sub')
const asyncBtn = document.querySelector('#async')
const themeBtn = document.querySelector('#theme')

// function logger (state) {
//     return function (next) {
//         return function (action) {
//             console.log('Action:', action);
//             console.log('state', state);
//             return next(action)
//         }
//     }
// }


const store = createStore(
    rootReducer,
    applyMiddleware(thunk, logger)
)


addBtn.addEventListener('click', () => {
    store.dispatch(increment())
})

subBtn.addEventListener('click', () => {
    store.dispatch(decrement())
})

asyncBtn.addEventListener('click', () => {
    store.dispatch(asuncIncrement())
})

themeBtn.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('light')
        ? 'dark'
        : 'light'
    store.dispatch(changeTheme(newTheme))
})

store.subscribe(() => {
    const state = store.getState()

    counter.textContent = state.counter
    document.body.className = state.theme.value;

    [addBtn, subBtn, themeBtn, asyncBtn].forEach(btn => {
        btn.disabled = state.theme.disabled
    })
})

store.dispatch({ type: 'INIT_APPLICATION' })