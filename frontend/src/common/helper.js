export const percentage = (top, bottom) => {
    if (bottom === 0) { return 0 }
    return Number((top / bottom).toFixed(2));
}

export const flatObject = (input) => {
    function flat(res, key, val, pre = '') {
        const prefix = [key].filter(v => v).join('.');
        return typeof val === 'object'
            ? Object.keys(val).reduce((prev, curr) => flat(prev, curr, val[curr], prefix), res)
            : Object.assign(res, { [prefix]: val });
    }

    return Object.keys(input).reduce((prev, curr) => flat(prev, curr, input[curr]), {});
}

export const formatter = {
    dollar: (val) => "$ " + new Intl.NumberFormat().format(+val),
    gallon: (val) => val + " gal",
    truncate: (val = "", max = 1) => { return val.slice(0, max - 1) + (val.length > max ? '...' : '') }
}