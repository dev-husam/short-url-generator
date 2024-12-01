export function calculateExpirationsInHours(date) {

    const expiration = new Date(date);

    const now = new Date();

    const differenceInMs = expiration - now;

    const differenceInMinutes = differenceInMs / (1000 * 60);

    return differenceInMinutes

}