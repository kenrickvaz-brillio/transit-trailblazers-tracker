
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Package, Truck, Clock, CheckCircle } from 'lucide-react';
import RecentActivity from './RecentActivity';
import StatusChart from './StatusChart';

const Dashboard = () => {
  const recentPackages = [
    {
      id: 'PKG-001',
      customerName: 'John Smith',
      from: 'New York, NY',
      to: 'Boston, MA',
      status: 'in-transit',
      progress: 65,
      estimatedDelivery: '2024-06-20'
    },
    {
      id: 'PKG-002',
      customerName: 'Sarah Johnson',
      from: 'Los Angeles, CA',
      to: 'San Francisco, CA',
      status: 'delivered',
      progress: 100,
      estimatedDelivery: '2024-06-19'
    },
    {
      id: 'PKG-003',
      customerName: 'Mike Davis',
      from: 'Chicago, IL',
      to: 'Detroit, MI',
      status: 'pending',
      progress: 0,
      estimatedDelivery: '2024-06-22'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'in-transit':
        return <Truck className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-transit':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Recent Packages */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Package Updates</CardTitle>
            <CardDescription>Latest package status changes and deliveries</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentPackages.map((pkg) => (
              <div key={pkg.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {getStatusIcon(pkg.status)}
                  </div>
                  <div>
                    <p className="font-medium">{pkg.id} - {pkg.customerName}</p>
                    <p className="text-sm text-gray-600">{pkg.from} → {pkg.to}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <Badge className={getStatusColor(pkg.status)}>
                      {pkg.status.replace('-', ' ').toUpperCase()}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">ETA: {pkg.estimatedDelivery}</p>
                  </div>
                  <div className="w-24">
                    <Progress value={pkg.progress} className="h-2" />
                    <p className="text-xs text-center mt-1">{pkg.progress}%</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        <StatusChart />
        <RecentActivity />
      </div>
    </div>
  );
};

export default Dashboard;
