export default function totalReports(response: any, userEmail: string | undefined) {
    const negRates = response.data.sofas.map((sofa: { negrates: any[]; }) =>
        sofa.negrates.find((email: string | undefined) => email === userEmail))

    const negZero = typeof negRates[0] === 'undefined'

    const posRates = response.data.sofas.map((sofa: { posrates: any[]; }) =>
        sofa.posrates.find((email: string | undefined) => email === userEmail))

    const posZero = typeof posRates[0] === 'undefined'

    const total = (negZero ? 0 : negRates.length) + (posZero ? 0 : posRates.length)

    return total
}