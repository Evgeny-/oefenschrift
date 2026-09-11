// Existing deployments keep working with their current .env. An explicit new value wins,
// including an empty base path when moving from a shared host to the site root.
export function setting(name: string) {
  return process.env[`OEFENSCHRIFT_${name}`] ?? process.env[`INBURGERING_${name}`];
}
