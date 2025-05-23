import { supabase } from "./supabase"

export interface Event {
  id: string
  name: string
  short_description: string
  description: string
  date_time: string
  image_url?: string
  venue: string
  type: "Education" | "Social"
  speakers?: string
  duration: number
  created_at: string
  isAttending?: boolean // Added to track attendance status
}

export interface EventAttendee {
  id: string
  event_id: string
  user_id: string
  created_at: string
}

// Placeholder user ID - in a real app, this would come from authentication
const CURRENT_USER_ID = "00000000-0000-0000-0000-000000000001"

export async function getAllEvents() {
  // Get all events
  const { data: events, error } = await supabase.from("events").select("*").order("date_time", { ascending: true })

  if (error) {
    console.error("Error fetching events:", error)
    return []
  }

  // Get user's attending events
  const { data: attendingEvents, error: attendingError } = await supabase
    .from("event_attendees")
    .select("event_id")
    .eq("user_id", CURRENT_USER_ID)

  if (attendingError) {
    console.error("Error fetching attending events:", attendingError)
    return events
  }

  // Create a set of attending event IDs for quick lookup
  const attendingEventIds = new Set(attendingEvents.map((item) => item.event_id))

  // Mark events as attending
  return events.map((event) => ({
    ...event,
    isAttending: attendingEventIds.has(event.id),
  })) as Event[]
}

export async function getEventsByType(type: "Education" | "Social") {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("type", type)
    .order("date_time", { ascending: true })

  if (error) {
    console.error("Error fetching events by type:", error)
    return []
  }

  return data as Event[]
}

export async function getUserAttendingEvents() {
  const { data, error } = await supabase
    .from("event_attendees")
    .select(`
      event_id
    `)
    .eq("user_id", CURRENT_USER_ID)

  if (error) {
    console.error("Error fetching user attending events:", error)
    return []
  }

  if (data.length === 0) {
    return []
  }

  // Get the full event details for each attending event
  const eventIds = data.map((item) => item.event_id)

  const { data: events, error: eventsError } = await supabase
    .from("events")
    .select("*")
    .in("id", eventIds)
    .order("date_time", { ascending: true })

  if (eventsError) {
    console.error("Error fetching attending event details:", eventsError)
    return []
  }

  return events.map((event) => ({
    ...event,
    isAttending: true,
  })) as Event[]
}

export async function isUserAttending(eventId: string) {
  const { data, error } = await supabase
    .from("event_attendees")
    .select("id")
    .eq("event_id", eventId)
    .eq("user_id", CURRENT_USER_ID)
    .single()

  if (error && error.code !== "PGRST116") {
    console.error("Error checking attendance:", error)
    return false
  }

  return !!data
}

// Get current user ID - in a real app, this would come from authentication
export function getCurrentUserId() {
  return CURRENT_USER_ID
}
