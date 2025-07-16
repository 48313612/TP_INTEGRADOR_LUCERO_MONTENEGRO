import * as EventRepository from '../repositories/event-repository.js';
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
}
