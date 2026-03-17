export default async function apiClient () {
const response = await fetch("/api/use");

if (response.ok) {
    let json = await response.json();
    console.log(json);
} else {
    console.log("res error", response.status);
}
}