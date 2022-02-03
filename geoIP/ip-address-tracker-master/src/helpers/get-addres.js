export async function getAddress(ip = '8.8.8.8') {
    const responce = await fetch (`
        https://geo.ipify.org/api/v2/country,city?apiKey=at_Umvcq7wErxarKGCNsAHGqgWKHrSTo&ipAddress=${ip}
    `)

    return await responce.json();
}