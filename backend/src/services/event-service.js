import EventRepository from '../repositories/event-repository.js';
import Event from '../entities/event.js';
import User from '../entities/user.js';
import EventLocation from '../entities/event-location.js';
import Location from '../entities/location.js';
import Province from '../entities/province.js';

const repo = new EventRepository();

export default class EventService{
  getAllEvents = async () => {
    const rows = await repo.getAllEvents();
    return rows.map(row => {
      const province = new Province({
        id: row.province_id,
        name: row.province_name,
        full_name: row.province_full_name,
        latitude: row.province_latitude,
        longitude: row.province_longitude
      });
      const location = new Location({
        id: row.location_id,
        name: row.location_name,
        full_address: row.full_address,
        latitude: row.latitude,
        longitude: row.longitude,
        id_province: row.province_id,
        province
      });
      const eventLocation = new EventLocation({
        id: row.event_location_id,
        id_location: row.location_id,
        location
      });
      const user = new User({
        id: row.user_id,
        first_name: row.first_name,
        last_name: row.last_name,
        username: row.username
      });
      return new Event({
        id: row.event_id,
        name: row.event_name,
        description: row.event_description,
        start_date: row.start_date,
        duration_in_minutes: row.duration_in_minutes,
        price: row.price,
        enabled_for_enrollment: row.enabled_for_enrollment,
        max_assistance: row.max_assistance,
        creator_user: user,
        event_location: eventLocation
      });
    });
  }

  searchEvents = async (filters) => {
    const rows = await repo.searchEvents(filters);
    return rows.map(row => {
      const province = new Province({
        id: row.province_id,
        name: row.province_name,
        full_name: row.province_full_name,
        latitude: row.province_latitude,
        longitude: row.province_longitude
      });
      const location = new Location({
        id: row.location_id,
        name: row.location_name,
        full_address: row.full_address,
        latitude: row.latitude,
        longitude: row.longitude,
        id_province: row.province_id,
        province
      });
      const eventLocation = new EventLocation({
        id: row.event_location_id,
        id_location: row.location_id,
        location
      });
      const user = new User({
        id: row.user_id,
        first_name: row.first_name,
        last_name: row.last_name,
        username: row.username
      });
      return new Event({
        id: row.event_id,
        name: row.event_name,
        description: row.event_description,
        start_date: row.start_date,
        duration_in_minutes: row.duration_in_minutes,
        price: row.price,
        enabled_for_enrollment: row.enabled_for_enrollment,
        max_assistance: row.max_assistance,
        creator_user: user,
        event_location: eventLocation
      });
    });
  }

  getEventById = async (id) => {
    const row = await repo.getEventById(id);
    if (!row) return null;
    // Armar estructura anidada
    const province = new Province({
      id: row.province_id,
      name: row.province_name,
      full_name: row.province_full_name,
      latitude: row.province_latitude,
      longitude: row.province_longitude,
      display_order: row.display_order
    });
    const location = new Location({
      id: row.location_id,
      name: row.location_name,
      id_province: row.id_province,
      latitude: row.location_latitude,
      longitude: row.location_longitude,
      province
    });
    const eventLocation = {
      id: row.event_location_id,
      id_location: row.id_location,
      name: row.event_location_name,
      full_address: row.full_address,
      max_capacity: row.max_capacity,
      latitude: row.event_location_latitude,
      longitude: row.event_location_longitude,
      id_creator_user: row.event_location_creator_user,
      location,
      creator_user: {
        id: row.event_location_creator_user,
        // Si quieres traer más datos del usuario creador del lugar, deberías hacer otro join
      }
    };
    const creatorUser = {
      id: row.creator_user_id,
      first_name: row.creator_first_name,
      last_name: row.creator_last_name,
      username: row.creator_username,
      password: row.creator_password
    };
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      id_event_location: row.id_event_location,
      start_date: row.start_date,
      duration_in_minutes: row.duration_in_minutes,
      price: row.price,
      enabled_for_enrollment: row.enabled_for_enrollment,
      max_assistance: row.max_assistance,
      id_creator_user: row.id_creator_user,
      event_location: eventLocation,
      tags: row.tags,
      creator_user: creatorUser
    };
  }
}
