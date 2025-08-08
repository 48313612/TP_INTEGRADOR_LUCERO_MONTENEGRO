/**
 * Frontend JSON Builder Utility
 */

export const buildEventFormJson = (formData) => {
  return {
    name: formData.nombre,
    description: formData.descripcion,
    start_date: formData.fecha,
    duration_in_minutes: parseInt(formData.duracion, 10),
    price: parseFloat(formData.precio),
    enabled_for_enrollment: formData.enabled_for_enrollment,
    max_assistance: formData.max_assistance ? parseInt(formData.max_assistance, 10) : null,
    id_event_location: parseInt(formData.id_event_location, 10),
    tags: formData.tags ? formData.tags.map(tag => buildTagJson(tag)) : []
  };
};

export const buildTagJson = (tagData) => {
  return {
    id: tagData.id || null,
    name: tagData.name || tagData.nombre || ''
  };
};

export const buildLocationJson = (locationData) => {
  return {
    id: locationData.id,
    name: locationData.name,
    full_address: locationData.full_address,
    latitude: locationData.latitude,
    longitude: locationData.longitude,
    province: locationData.province ? {
      id: locationData.province.id,
      name: locationData.province.name
    } : null
  };
};

export const parseApiResponseJson = (response) => {
  if (response.data && typeof response.data === 'object') {
    return {
      success: true,
      data: response.data,
      message: response.data.message || null
    };
  }
  return {
    success: false,
    data: null,
    message: 'Invalid response format'
  };
};

export const buildFilterJson = (filters) => {
  const json = {};
  if (filters.name) json.name = filters.name;
  if (filters.startdate) json.startdate = filters.startdate;
  if (filters.tag) json.tag = filters.tag;
  return json;
};

export const buildPaginationJson = (page, limit) => {
  return {
    page: parseInt(page) || 1,
    limit: parseInt(limit) || 10
  };
};
