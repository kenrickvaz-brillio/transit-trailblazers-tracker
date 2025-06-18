
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Package, User, Phone, MapPin, Calendar, Weight, DollarSign, Truck } from 'lucide-react';

interface PackageDetailsProps {
  packageId: string;
  packageData?: any;
  onClose: () => void;
}

const PackageDetails = ({ packageId, packageData, onClose }: PackageDetailsProps) => {
  if (!packageData) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'in-transit':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const timeline = [
    {
      date: packageData.pickupDate,
      time: '09:30 AM',
      event: 'Package picked up',
      location: packageData.from,
      status: 'completed'
    },
    {
      date: '2024-06-19',
      time: '02:15 PM',
      event: 'In transit',
      location: packageData.currentLocation,
      status: packageData.status === 'delivered' ? 'completed' : 'current'
    },
    {
      date: packageData.estimatedDelivery,
      time: 'Expected',
      event: 'Estimated delivery',
      location: packageData.to,
      status: packageData.status === 'delivered' ? 'completed' : 'pending'
    }
  ];

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Package Details - {packageId}
          </DialogTitle>
          <DialogDescription>
            Comprehensive information and tracking details
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status Banner */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium">Current Status</h3>
              <p className="text-sm text-gray-600">Last updated 2 hours ago</p>
            </div>
            <Badge className={getStatusColor(packageData.status)}>
              {packageData.status.replace('-', ' ').toUpperCase()}
            </Badge>
          </div>

          {/* Customer Information */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <User className="h-4 w-4" />
              Customer Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{packageData.customerName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {packageData.customerPhone}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Package Information */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Package className="h-4 w-4" />
              Package Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Weight</p>
                <p className="font-medium flex items-center gap-1">
                  <Weight className="h-3 w-3" />
                  {packageData.weight}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Dimensions</p>
                <p className="font-medium">{packageData.dimensions}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Declared Value</p>
                <p className="font-medium flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  {packageData.value}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Route Information */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Route Information
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">From</p>
                <p className="font-medium">{packageData.from}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">To</p>
                <p className="font-medium">{packageData.to}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Current Location</p>
                <p className="font-medium text-blue-600">{packageData.currentLocation}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Driver Information */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Truck className="h-4 w-4" />
              Driver Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Driver Name</p>
                <p className="font-medium">{packageData.driverName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Driver Phone</p>
                <p className="font-medium">{packageData.driverPhone}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Timeline */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Tracking Timeline
            </h3>
            <div className="space-y-4">
              {timeline.map((event, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-3 h-3 rounded-full mt-1.5 ${
                    event.status === 'completed' ? 'bg-green-500' :
                    event.status === 'current' ? 'bg-blue-500' : 'bg-gray-300'
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{event.event}</p>
                      <span className="text-sm text-gray-500">{event.date}</span>
                    </div>
                    <p className="text-sm text-gray-600">{event.location}</p>
                    <p className="text-xs text-gray-500">{event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button>
              Update Status
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PackageDetails;
