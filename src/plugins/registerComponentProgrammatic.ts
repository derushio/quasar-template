import Vue from 'vue';

export default function(
    MyVue: typeof Vue,
    property: string,
    component: { [key: string]: any },
): void {
    MyVue.prototype.__defineGetter__(property, function(this: Vue) {
        const actions = {} as { [key: string]: any };
        for (const key of Object.keys(component)) {
            actions[key] = component[key].bind(this);
        }
        return actions;
    });
}
