import MainNav from '../Nav/Router';


// const initialState = MainNav.router.getStateForAction(
//     MainNav.router.getActionForPathAndParams('LoginNav')
// );

export default (state, action) => {
    //TODO: track params in state when login screen is loaded after selection in drawer menu
    const newState = MainNav.router.getStateForAction(action, state);
    // debugger;

    return newState || state;
};
