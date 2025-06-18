
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Truck, User } from 'lucide-react';

interface DriverCardProps {
  driver: {
    id: string;
    name: string;
    phone: string;
    email: string;
    vehicleNumber: string;
    currentLocation: string;
    status: 'available' | 'on-route' | 'offline';
    packagesAssigned: number;
  };
  onContact?: (type: 'call' | 'email', driver: any) => void;
}

const DriverCard = ({ driver, onContact }: DriverCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'on-route':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'offline':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="h-5 w-5" />
            {driver.name}
          </CardTitle>
          <Badge className={getStatusColor(driver.status)}>
            {driver.status.replace('-', ' ').toUpperCase()}
          </Badge>
        </div>
        <CardDescription>Driver ID: {driver.id}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-blue-600" />
            <span>{driver.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-blue-600" />
            <span className="truncate">{driver.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Truck className="h-4 w-4 text-blue-600" />
            <span>{driver.vehicleNumber}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-blue-600" />
            <span className="truncate">{driver.currentLocation}</span>
          </div>
        </div>
        
        <div className="pt-2 border-t">
          <p className="text-sm text-gray-600 mb-3">
            Packages assigned: <span className="font-medium">{driver.packagesAssigned}</span>
          </p>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => onContact?.('call', driver)}
              className="flex-1"
            >
              <Phone className="h-3 w-3 mr-1" />
              Call
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => onContact?.('email', driver)}
              className="flex-1"
            >
              <Mail className="h-3 w-3 mr-1" />
              Email
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DriverCard;
