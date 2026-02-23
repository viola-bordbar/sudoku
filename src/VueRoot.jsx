import { StartPage } from "./presenters/startPagePresenter.jsx";
import { Game } from "./presenters/gamePresenter.jsx";
import { createRouter, createWebHashHistory, RouterView } from "vue-router";
//import { SuspenseView } from "../views/suspenseView.jsx";


export function VueRoot(){
    return(
        <div>
            <RouterView/>
        </div>
    );
}

//Router setup for navigation between views
export function makeRouter(model) {
    return createRouter({
        history: createWebHashHistory(),
        routes: [
            {
                path:"/",
                component:<StartPage model={model}/>,
            },

            {
                path:"/startPage",
                component:<StartPage model={model}/>,
            },
            
            {
                path:"/game",
                component: <Game model={model}/>,
            }

        ]
    });
}
