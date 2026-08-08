const aggConfig = {
    sum: {
        init: 0,
        update: (accVal, currentVal) => accVal + (Number(currentVal) || 0)
    },
    count: {
        init: 0,
        update: (accVal, currentVal) => currentVal !== undefined && currentVal !== null ? accVal + 1 : accVal
    },
    max: {
        init: -Infinity,
        update: (accVal, currentVal) => {
            const val = Number(currentVal);
            return !isNaN(val) ? Math.max(accVal, val) : accVal;
        }
    },
    min: {
        init: Infinity,
        update: (accVal, currentVal) => {
            const val = Number(currentVal);
            return !isNaN(val) ? Math.min(accVal, val) : accVal;
        }
    }
};

const allowedAggFuncs = Object.keys(aggConfig);

export { aggConfig, allowedAggFuncs };
