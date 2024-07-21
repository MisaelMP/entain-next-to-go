import axios from 'axios'
export interface Race {
  meeting_name: string
  race_number: number
  advertised_start: { seconds: number }
  category_id: string
  race_id: string
}

export async function fetchRaces(
  count: number
): Promise<{ next_to_go_ids: string[]; race_summaries: { [key: string]: Race } }> {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}&count=${count}`)
  return response.data.data
}
