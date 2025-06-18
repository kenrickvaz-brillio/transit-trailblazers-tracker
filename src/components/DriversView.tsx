
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Users } from 'lucide-react';
import { useState } from 'react';
import DriverCard from './DriverCard';

const DriversView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const drivers = [
    {
      id: 'DRV-001',
      name: 'Mike Johnson',
      phone: '+1 (555) 987-6543',
      email: 'mike.johnson@company.com',
      vehicleNumber: 'TRK-4567',
      currentLocation: 'Hartford, CT',
      status: 'on-route' as const,
      packagesAssigned: 3
    },
    {
      id: 'DRV-002',
      name: 'Lisa Chen',
      phone: '+1 (555) 876-5432',
      email: 'lisa.chen@company.com',
      vehicleNumber: 'TRK-2341',
      currentLocation: 'San Francisco, CA',
      status: 'available' as const,
      packagesAssigned: 0
    },
    {
      id: 'DRV-003',
      name: 'Carlos Rodriguez',
      phone: '+1 (555) 765-4321',
      email: 'carlos.rodriguez@company.com',
      vehicleNumber: 'TRK-8901',
      currentLocation: 'Tampa, FL',
      status: 'on-route' as const,
      packagesAssigned: 2
    },
    {
      id: 'DRV-004',
      name: 'Sarah Wilson',
      phone: '+1 (555) 654-3210',
      email: 'sarah.wilson@company.com',
      vehicleNumber: 'TRK-1234',
      currentLocation: 'Phoenix, AZ',
      status: 'offline' as const,
      packagesAssigned: 0
    }
  ];

  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || driver.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleContact = (type: 'call' | 'email', driver: any) => {
    if (type === 'call') {
      window.open(`tel:${driver.phone}`);
    } else {
      window.open(`mailto:${driver.email}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Driver Management
          </CardTitle>
          <CardDescription>View and contact all drivers in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, ID, or vehicle number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="on-route">On Route</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Drivers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDrivers.map((driver) => (
          <DriverCard 
            key={driver.id} 
            driver={driver} 
            onContact={handleContact}
          />
        ))}
      </div>

      {filteredDrivers.length === 0 && (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">No drivers found</h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DriversView;
