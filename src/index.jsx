import { VueRoot, makeRouter } from "./VueRoot.jsx";
import { reactiveModel } from "./vueReactiveModel.js"; 
import { createApp } from "vue";

//Creates the Vue app, rendering the root component with the shared reactive model 
const app= createApp(function render(){ return <VueRoot model={reactiveModel} />});

//Sets up the router for navigation between views 
app.use(makeRouter(reactiveModel));

//Mounts the app to the #root element in index.htlml
app.mount("#root");
