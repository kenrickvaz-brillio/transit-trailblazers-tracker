
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Package, Truck, CheckCircle } from 'lucide-react';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'delivery',
      message: 'PKG-002 delivered to Sarah Johnson',
      time: '2 hours ago',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'pickup',
      message: 'PKG-005 picked up from Miami warehouse',
      time: '4 hours ago',
      icon: Package,
      color: 'text-blue-600'
    },
    {
      id: 3,
      type: 'transit',
      message: 'PKG-001 location updated - Hartford, CT',
      time: '6 hours ago',
      icon: Truck,
      color: 'text-orange-600'
    },
    {
      id: 4,
      type: 'delay',
      message: 'PKG-003 pickup delayed to tomorrow',
      time: '8 hours ago',
      icon: Clock,
      color: 'text-red-600'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest updates across all packages</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className={`flex-shrink-0 ${activity.color}`}>
              <activity.icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">
                {activity.message}
              </p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
