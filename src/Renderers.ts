import { baseMixin, fillMixin, geometryMixin, hydratableMixin } from './Mixins';

export const rectangleRenderer = (node, props, tag) => {
    const instance = node || figma.createRectangle();

    hydratableMixin(instance, tag);
    baseMixin(instance, props);
    geometryMixin(instance, props);
    fillMixin(instance, props);

    return instance;
};

export const frameRenderer = (node, props, tag) => {
    const instance = node || figma.createFrame();

    hydratableMixin(instance, tag);
    baseMixin(instance, props);
    geometryMixin(instance, props);
    fillMixin(instance, props);

    return instance;
};
