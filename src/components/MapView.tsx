
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Truck, Navigation } from 'lucide-react';

const MapView = () => {
  // Mock data for packages on map
  const activePackages = [
    {
      id: 'PKG-001',
      customerName: 'John Smith',
      currentLocation: 'Hartford, CT',
      destination: 'Boston, MA',
      status: 'in-transit',
      driverName: 'Mike Johnson',
      lat: 41.7658,
      lng: -72.6734
    },
    {
      id: 'PKG-004',
      customerName: 'Emily Wilson',
      currentLocation: 'Tampa, FL',
      destination: 'Orlando, FL',
      status: 'in-transit',
      driverName: 'Carlos Rodriguez',
      lat: 27.9506,
      lng: -82.4572
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="h-5 w-5" />
            Live Package Tracking Map
          </CardTitle>
          <CardDescription>
            Real-time locations of all packages currently in transit
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Placeholder for map - In a real app, you'd integrate with Google Maps or Mapbox */}
          <div className="relative h-96 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">Interactive Map View</h3>
              <p className="text-gray-500 max-w-md">
                Map integration would show real-time package locations, routes, and delivery progress. 
                Connect with Google Maps or Mapbox for live tracking.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Packages Sidebar */}
      <Card>
        <CardHeader>
          <CardTitle>Packages in Transit</CardTitle>
          <CardDescription>Currently moving packages with live locations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {activePackages.map((pkg) => (
            <div key={pkg.id} className="flex items-center justify-between p-4 border rounded-lg bg-blue-50">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <Truck className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">{pkg.id} - {pkg.customerName}</p>
                  <p className="text-sm text-gray-600">Driver: {pkg.driverName}</p>
                  <p className="text-sm text-gray-500">
                    {pkg.currentLocation} → {pkg.destination}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <Badge className="bg-blue-100 text-blue-800">
                  MOVING
                </Badge>
                <p className="text-xs text-gray-500 mt-1">
                  Lat: {pkg.lat}, Lng: {pkg.lng}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default MapView;
