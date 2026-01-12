import { VueRoot } from "./VueRoot.jsx";
import { reactiveModel } from "./vueReactiveModel.js"; 
import { makeRouter } from "./VueRoot.jsx";
import { createApp } from "vue";

const app= createApp(function render(){ return <VueRoot model={reactiveModel} />});
app.use(makeRouter(reactiveModel));
app.mount("#root");
