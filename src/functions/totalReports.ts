export default function totalReports(response: any, userEmail: string | undefined) {
    const negRates = response.data.sofas.map((sofa: { negrates: any[]; }) =>
        sofa.negrates.find((email: string | undefined) => email === userEmail))

    const negValue = negRates.filter((user: any) => typeof user !== 'undefined')

    const posRates = response.data.sofas.map((sofa: { posrates: any[]; }) =>
        sofa.posrates.find((email: string | undefined) => email === userEmail))

    const posValue = posRates.filter((user: any) => typeof user !== 'undefined')


    const total = negValue.length + posValue.length

    return total
}