import { reactive  } from "vue";
import {model} from "./model/game.js";

//Wraps the game model in a reactive object for Vue reactivity
export const reactiveModel= reactive(model);

//Expose the reactive model to the global window object for debugging purposes
window.myModel= reactiveModel;

