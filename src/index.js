export default {
  async fetch(request) {
	const nearestRegion = findNearestRegion(request.cf.latitude, request.cf.longitude);
    return new Response(nearestRegion.name);
  },
};
const regions = [
	{
	  name: 'North Europe',
	  latitude: 53.3478,
	  longitude: -6.2597,
	},
	{
	  name: 'Southeast Asia',
	  latitude: 1.3521,
	  longitude: 103.8198,
	},
	{
	  name: 'East US',
	  latitude: 37.1232245,
	  longitude: -78.4927721,
	}
  ];
  function findNearestRegion(latitude, longitude) {
	let minDistance = Number.MAX_VALUE;
	let nearestRegion = null;
  
	for (let i = 0; i < regions.length; i++) {
	  const region = regions[i];
	  const distance = calculateDistance(latitude, longitude, region.latitude, region.longitude);
  
	  if (distance < minDistance) {
		minDistance = distance;
		nearestRegion = region;
	  }
	}
  
	return nearestRegion;
  }
  function calculateDistance(lat1, lon1, lat2, lon2) {
	const R = 6371; // Radius of the earth in km
	const dLat = deg2rad(lat2 - lat1);  // deg2rad below
	const dLon = deg2rad(lon2 - lon1);
	const a =
	  Math.sin(dLat / 2) * Math.sin(dLat / 2) +
	  Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
	  Math.sin(dLon / 2) * Math.sin(dLon / 2)
	  ;
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const d = R * c; // Distance in km
	return d;
  }
  
  function deg2rad(deg) {
	return deg * (Math.PI / 180)
  }