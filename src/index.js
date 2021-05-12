import TheDualList from "@/components/TheDualList";

const components = {
    TheDualList
}

export { TheDualList };

export const Plugin = {
    install: (Vue) => {
        components.forEach( component => {
            Vue.component( component.name, component );
        } );
    }
}

export default { Plugin, TheDualList };