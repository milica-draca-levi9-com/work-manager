import { supabase } from "./supabase"

export interface Flight {
  id: string
  departure: string
  destination: string
}

export interface Airline {
  id: string
  name: string
}

export interface Client {
  id: string
  name: string
  industry: string
  country: string
}

export interface CorporateTravel {
  id: string
  user_id: string
  flight_id: string
  start_date: string
  days: number
  purpose: string
  estimated_cost: number
  client_id: string
  preferred_airline_id: string
  preferred_hotel_rating: number
  status: "Pending" | "Approved" | "Rejected"
  created_at: string
  flight?: Flight
  client?: Client
  preferred_airline?: Airline
}

export async function getAllTravelRequests(): Promise<CorporateTravel[]> {
  try {
    const { data, error } = await supabase
      .from("corporate_travel")
      .select(`
        *,
        flight:flights(*),
        client:clients(*),
        preferred_airline:airlines(*)
      `)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching travel requests:", error)
    return []
  }
}

export async function getTotalTravelSpending(): Promise<number> {
  try {
    const { data, error } = await supabase.from("corporate_travel").select("estimated_cost").eq("status", "Approved")

    if (error) throw error

    const total = data?.reduce((sum, travel) => sum + Number(travel.estimated_cost), 0) || 0
    return total
  } catch (error) {
    console.error("Error fetching travel spending:", error)
    return 0
  }
}

export async function getAllFlights(): Promise<Flight[]> {
  try {
    const { data, error } = await supabase.from("flights").select("*").order("departure")

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching flights:", error)
    return []
  }
}

export async function getAllAirlines(): Promise<Airline[]> {
  try {
    const { data, error } = await supabase.from("airlines").select("*").order("name")

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching airlines:", error)
    return []
  }
}

export async function getAllClients(): Promise<Client[]> {
  try {
    const { data, error } = await supabase.from("clients").select("*").order("name")

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching clients:", error)
    return []
  }
}
