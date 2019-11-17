export const geometryMixin = (instance, props) => {
    const { width, height, x, y } = props;
    if (width) {
        instance.resize(width, instance.height);
    }
    if (height) {
        instance.resize(instance.width, height);
    }

    if (x) {
        instance.x = x;
    }
    if (y) {
        instance.y = y;
    }
};

export const fillMixin = (instance, props) => {
    const { backgroundColor } = props;

    if (backgroundColor) {
        instance.fills = [{ type: 'SOLID', color: backgroundColor }];
    }
};

export const baseMixin = (instance, props) => {
    const { name } = props;

    if (name) {
        instance.name = name;
    }
};
