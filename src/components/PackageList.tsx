
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Eye, MapPin } from 'lucide-react';
import PackageDetails from './PackageDetails';

const PackageList = () => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const packages = [
    {
      id: 'PKG-001',
      customerName: 'John Smith',
      customerPhone: '+1 (555) 123-4567',
      from: 'New York, NY 10001',
      to: 'Boston, MA 02101',
      status: 'in-transit',
      weight: '45 lbs',
      dimensions: '24" x 18" x 12"',
      value: '$1,200',
      pickupDate: '2024-06-18',
      estimatedDelivery: '2024-06-20',
      driverName: 'Mike Johnson',
      driverPhone: '+1 (555) 987-6543',
      currentLocation: 'Hartford, CT'
    },
    {
      id: 'PKG-002',
      customerName: 'Sarah Johnson',
      customerPhone: '+1 (555) 234-5678',
      from: 'Los Angeles, CA 90210',
      to: 'San Francisco, CA 94102',
      status: 'delivered',
      weight: '32 lbs',
      dimensions: '20" x 16" x 10"',
      value: '$800',
      pickupDate: '2024-06-17',
      estimatedDelivery: '2024-06-19',
      driverName: 'Lisa Chen',
      driverPhone: '+1 (555) 876-5432',
      currentLocation: 'San Francisco, CA'
    },
    {
      id: 'PKG-003',
      customerName: 'Mike Davis',
      customerPhone: '+1 (555) 345-6789',
      from: 'Chicago, IL 60601',
      to: 'Detroit, MI 48201',
      status: 'pending',
      weight: '67 lbs',
      dimensions: '30" x 24" x 18"',
      value: '$2,100',
      pickupDate: '2024-06-20',
      estimatedDelivery: '2024-06-22',
      driverName: 'Not assigned',
      driverPhone: 'N/A',
      currentLocation: 'Chicago, IL'
    },
    {
      id: 'PKG-004',
      customerName: 'Emily Wilson',
      customerPhone: '+1 (555) 456-7890',
      from: 'Miami, FL 33101',
      to: 'Orlando, FL 32801',
      status: 'in-transit',
      weight: '28 lbs',
      dimensions: '18" x 14" x 8"',
      value: '$650',
      pickupDate: '2024-06-19',
      estimatedDelivery: '2024-06-21',
      driverName: 'Carlos Rodriguez',
      driverPhone: '+1 (555) 765-4321',
      currentLocation: 'Tampa, FL'
    }
  ];

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

  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || pkg.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Package Management</CardTitle>
          <CardDescription>Search and filter packages by status or customer</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by package ID or customer name..."
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
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-transit">In Transit</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Package List */}
      <div className="grid gap-4">
        {filteredPackages.map((pkg) => (
          <Card key={pkg.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{pkg.id}</h3>
                    <Badge className={getStatusColor(pkg.status)}>
                      {pkg.status.replace('-', ' ').toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-1">{pkg.customerName} • {pkg.customerPhone}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="h-4 w-4" />
                    <span>{pkg.from} → {pkg.to}</span>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    Current: {pkg.currentLocation} • ETA: {pkg.estimatedDelivery}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedPackage(pkg.id)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Package Details Modal */}
      {selectedPackage && (
        <PackageDetails
          packageId={selectedPackage}
          packageData={packages.find(p => p.id === selectedPackage)}
          onClose={() => setSelectedPackage(null)}
        />
      )}
    </div>
  );
};

export default PackageList;
