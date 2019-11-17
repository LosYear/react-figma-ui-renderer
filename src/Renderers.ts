import { baseMixin, fillMixin, geometryMixin } from './Mixins';

export const rectangleRenderer = (node, props) => {
    const instance = node || figma.createRectangle();

    baseMixin(instance, props);
    geometryMixin(instance, props);
    fillMixin(instance, props);

    return instance;
};

export const frameRenderer = (node, props) => {
    const instance = node || figma.createFrame();

    baseMixin(instance, props);
    geometryMixin(instance, props);
    fillMixin(instance, props);

    return instance;
};
