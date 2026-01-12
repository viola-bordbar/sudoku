import { reactive  } from "vue";
import {model} from "./model/app.js";

export const reactiveModel= reactive(model);

window.myModel= reactiveModel;

