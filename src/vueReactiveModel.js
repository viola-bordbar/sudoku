import { reactive  } from "vue";
import {model} from "./model/game.js";

export const reactiveModel= reactive(model);

window.myModel= reactiveModel;

