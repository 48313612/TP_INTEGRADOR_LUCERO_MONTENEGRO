import pool from '../configs/db-config.js'
import pkg from 'pg';
const {Client, Pool} = pkg;


export default class EventRepository {
  getAllEvents = async () => {
    try {
      const sql = `SELECT 
        e.id as event_id, e.name as event_name, e.description as event_description, e.start_date, e.duration_in_minutes, e.price, 
        e.enabled_for_enrollment, e.max_assistance,
        u.id as user_id, u.first_name, u.last_name, u.username,
        el.id as event_location_id, el.id_location, el.full_address,
        l.id as location_id, l.name as location_name, l.latitude, l.longitude, l.id_province,
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
      throw error;
    }
  }; 

  searchEvents = async (filters) => {
    try {
      let whereClauses = [];
      let values = [];
      let idx = 1;

      if (filters.name) {
        whereClauses.push(`LOWER(e.name) LIKE LOWER($${idx})`);
        values.push(`%${filters.name}%`);
        idx++;
      }
      if (filters.startdate) {
        whereClauses.push(`CAST(e.start_date AS DATE) = $${idx}`);
        values.push(filters.startdate);
        idx++;
      }
      if (filters.tag) {
        whereClauses.push(`EXISTS (
          SELECT 1 FROM event_tags et
          JOIN tags t ON et.id_tag = t.id
          WHERE et.id_event = e.id AND LOWER(t.name) = LOWER($${idx})
        )`);
        values.push(filters.tag);
        idx++;
      }

      const where = whereClauses.length > 0 ? 'WHERE ' + whereClauses.join(' AND ') : '';

      const sql = `SELECT 
        e.id as event_id, e.name as event_name, e.description as event_description, e.start_date, e.duration_in_minutes, e.price, 
        e.enabled_for_enrollment, e.max_assistance,
        u.id as user_id, u.first_name, u.last_name, u.username,
        el.id as event_location_id, el.id_location, el.full_address,
        l.id as location_id, l.name as location_name, l.latitude, l.longitude, l.id_province,
        p.id as province_id, p.name as province_name, p.full_name as province_full_name, p.latitude as province_latitude, p.longitude as province_longitude
      FROM events e
      JOIN users u ON e.id_creator_user = u.id
      JOIN event_locations el ON e.id_event_location = el.id
      JOIN locations l ON el.id_location = l.id
      JOIN provinces p ON l.id_province = p.id
      ${where}
      ORDER BY e.start_date ASC`;
      const result = await pool.query(sql, values);
      return result.rows;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  getEventById = async (id) => {
    try {
      const sql = `SELECT 
        e.*, 
        u.id as creator_user_id, u.first_name as creator_first_name, u.last_name as creator_last_name, u.username as creator_username, u.password as creator_password,
        el.id as event_location_id, el.id_location, el.name as event_location_name, el.full_address, el.max_capacity, el.latitude as event_location_latitude, el.longitude as event_location_longitude, el.id_creator_user as event_location_creator_user,
        l.id as location_id, l.name as location_name, l.id_province, l.latitude as location_latitude, l.longitude as location_longitude,
        p.id as province_id, p.name as province_name, p.full_name as province_full_name, p.latitude as province_latitude, p.longitude as province_longitude, p.display_order
      FROM events e
      JOIN users u ON e.id_creator_user = u.id
      JOIN event_locations el ON e.id_event_location = el.id
      JOIN locations l ON el.id_location = l.id
      JOIN provinces p ON l.id_province = p.id
      WHERE e.id = $1`;
      const result = await pool.query(sql, [id]);
      if (result.rows.length === 0) return null;
      // Traer tags aparte
      const tagsSql = `SELECT t.id, t.name FROM event_tags et JOIN tags t ON et.id_tag = t.id WHERE et.id_event = $1`;
      const tagsResult = await pool.query(tagsSql, [id]);
      return { ...result.rows[0], tags: tagsResult.rows };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

}
