import { LifecycleToggle } from '~/types'

/* Insight series colors. */
const dataColorVars = [
    'brand-blue',
    'purple',
    'viridian',
    'magenta',
    'vermilion',
    'brown',
    'green',
    'blue',
    'pink',
    'navy',
    'turquoise',
    'brick',
    'yellow',
    'lilac',
]

export const tagColors = [
    'blue',
    'cyan',
    'orange',
    'gold',
    'green',
    'lime',
    'volcano',
    'magenta',
    'purple',
    'red',
    'geekblue',
]

export function getColorVar(variable: string): string {
    const colorValue = getComputedStyle(document.body).getPropertyValue('--' + variable)
    if (!colorValue) {
        throw new Error(`Couldn't find color variable --${variable}`)
    }
    return colorValue.trim()
}

/** Return a series color value. Hexadecimal format as Chart.js doesn't work with CSS vars.
 *
 * @param index The index of the series color.
 * @param numSeries Number of series in the insight being visualized.
 * @param comparePrevious If true, wrapped colors ()
 * @param asBackgroundHighlight If true, add opacity to color
 */
export function getSeriesColor(
    index: number | undefined = 0,
    comparePrevious: boolean = false,
    asBackgroundHighlight?: boolean
): string {
    const adjustedIndex = (comparePrevious ? Math.floor(index / 2) : index) % dataColorVars.length
    const isPreviousPeriodSeries = comparePrevious && index % 2 === 1
    const baseHex = getColorVar(`data-${dataColorVars[adjustedIndex]}`)
    return isPreviousPeriodSeries ? `${baseHex}80` : asBackgroundHighlight ? `${baseHex}30` : baseHex
}

/** Return hexadecimal color value for lifecycle status.
 *
 * Hexadecimal is necessary as Chart.js doesn't work with CSS vars.
 */
export function getBarColorFromStatus(status: LifecycleToggle, hover?: boolean): string {
    switch (status) {
        case 'new':
        case 'returning':
        case 'resurrecting':
        case 'dormant':
            return getColorVar(`lifecycle-${status}${hover ? '-hover' : ''}`)
        default:
            throw new Error(`Unknown lifecycle status: ${status}`)
    }
}

export function getGraphColors(isDarkModeOn: boolean): Record<string, string | null> {
    return {
        axisLabel: isDarkModeOn ? '#ddd' : '#333',
        axisLine: isDarkModeOn ? '#888' : '#ddd',
        axis: isDarkModeOn ? '#aaa' : '#999',
        crosshair: isDarkModeOn ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
        tooltipBackground: '#1dc9b7',
        tooltipTitle: '#fff',
        tooltipBody: '#fff',
    }
}
