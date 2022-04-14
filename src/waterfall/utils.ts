/**
 * throttle
 * @param fn
 * @param wait
 * @returns Function
 */
export const throttle = <T = void>(fn: (...args) => T, wait: number): ((...args) => void) => {
    let timeroutId = null;
    return (...args) => {
        if (!timeroutId) {
            const start = Date.now();
            const tick = () => {
                const current = Date.now();
                if (current - start >= wait) {
                    fn.apply(this, args);
                    cancelAnimationFrame(timeroutId);
                    return;
                }
                timeroutId = requestAnimationFrame(tick);
            };
            timeroutId = requestAnimationFrame(tick);
        }
    };
};

/**
 * debounce
 * @param fn
 * @param wait
 * @returns void
 */
export const debounce = <T = void>(fn: (...args) => T, wait: number): ((...args) => void) => {
    let timeroutId;
    return (...args) => {
        if (timeroutId) {
            cancelAnimationFrame(timeroutId);
        }
        const start = Date.now();
        const tick = () => {
            const current = Date.now();
            if (current - start >= wait) {
                fn.apply(this, args);
                return;
            }
            timeroutId = requestAnimationFrame(tick);
        };
        timeroutId = requestAnimationFrame(tick);
    };
};

/**
 * getImageCalcSize
 * @param imageOriginWidth
 * @param imageOriginHeight
 * @param columnWidth
 * @returns [number, number]
 */
export const getImageCalcSize = (
    imageOriginWidth: number,
    imageOriginHeight: number,
    columnWidth: number,
): [number, number] => {
    const imageWidth =
        imageOriginWidth < columnWidth ? imageOriginWidth : (columnWidth / imageOriginWidth) * imageOriginWidth;
    const imageHeight = (imageWidth / imageOriginWidth) * imageOriginHeight;
    return [imageWidth, imageHeight];
};
