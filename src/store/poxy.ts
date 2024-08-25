import { proxy, subscribe } from "valtio";
var stored: any = false;
if (typeof window !== "undefined") {
  stored = localStorage.getItem("store");
}

const collection = {
  user: {},
};

const initValue = stored ? JSON.parse(stored) : collection;

const store = proxy(initValue);

subscribe(store, () => {
  if (typeof window !== "undefined")
    localStorage.setItem("store", JSON.stringify(store));
});

export { store };
