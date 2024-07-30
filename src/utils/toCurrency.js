import React from 'react';
const toCurrency = (number) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: "decimal",

    });

    return formatter.format(number);
}

export default toCurrency
