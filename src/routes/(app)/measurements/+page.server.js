import 'dotenv/config'

export const load = async() => {
  const fetchMeasurements = async () => {
    const url = `http://localhost:4000/v1/measurements`;
    const header_params = { 'Authorization': `Bearer ${process.env.ADMIN_TOKEN}` }
    const res = await fetch(url, { headers: header_params });
    const data = await res.json();

    return [data.measurements, data.metadata];
  }

  let [a, b] = await fetchMeasurements();

  return { measurements: a, measurements_metadata: b};
}