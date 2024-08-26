import { proxy, subscribe } from "valtio";
var stored: any = false;
if (typeof window !== "undefined") {
  stored = localStorage.getItem("store");
}


type store={
  loggedUser?:Object,
  isActive:Boolean
}


const collection:store = {
  loggedUser: {},
  isActive: false,
};

const initValue = stored ? JSON.parse(stored) : collection;

const state = proxy(initValue);

subscribe(state, () => {
  localStorage.setItem("store", JSON.stringify(state));
});
export { state };
