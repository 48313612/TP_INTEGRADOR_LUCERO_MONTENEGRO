import pool from '../configs/db-configs.js'
import pkg from 'pg';
const {Client, Pool} = pkg;


export default class EventRepository {
  getAllEvents = async () => {
    try {
      const sql = `SELECT 
        e.id as event_id, e.name as event_name, e.description as event_description, e.start_date, e.duration_in_minutes, e.price, 
        e.enabled_for_enrollment, e.max_assistance,
        u.id as user_id, u.first_name, u.last_name, u.username,
        el.id as event_location_id, el.id_location,
        l.id as location_id, l.name as location_name, l.full_address, l.latitude, l.longitude, l.id_province,
        p.id as province_id, p.name as province_name, p.full_name as province_full_name, p.latitude as province_latitude, p.longitude as province_longitude
      FROM events e
      JOIN users u ON e.id_creator_user = u.id
      JOIN event_locations el ON e.id_event_location = el.id
      JOIN locations l ON el.id_location = l.id
      JOIN provinces p ON l.id_province = p.id
      ORDER BY e.start_date ASC
    `;
    const result = await pool.query(sql);
    return result.rows;
    } 
    catch (error) {
      console.log(error);
    }
  }; 

}
