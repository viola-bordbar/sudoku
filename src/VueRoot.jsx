import { StartPage } from "./presenters/startPagePresenter.jsx";
import { Game } from "./presenters/gamePresenter.jsx";
import { createRouter, createWebHashHistory, RouterView } from "vue-router";
import { reactiveModel } from "./vueReactiveModel.js";
//import { SuspenseView } from "../views/suspenseView.jsx";


export function VueRoot(){
    return(
        <div>
            <RouterView/>
        </div>
    );
}

//Router setup for navigation between views
export function makeRouter(reactiveModel) {
    return createRouter({
        history: createWebHashHistory(),
        routes: [
            {
                path:"/",
                component:<StartPage model={reactiveModel}/>,
            },

            {
                path:"/startPage",
                component:<StartPage model={reactiveModel}/>,
            },
            
            {
                path:"/game",
                component: <Game model={reactiveModel}/>,
            }

        ]
    });
}
