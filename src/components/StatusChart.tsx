
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const StatusChart = () => {
  const data = [
    { name: 'In Transit', value: 89, color: '#3B82F6' },
    { name: 'Delivered', value: 52, color: '#10B981' },
    { name: 'Pending', value: 15, color: '#F59E0B' }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Package Status Distribution</CardTitle>
        <CardDescription>Current status breakdown of all packages</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4">
          {data.map((item, index) => (
            <div key={item.name} className="text-center">
              <div className="flex items-center justify-center space-x-1">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: COLORS[index] }}
                />
                <span className="text-xs font-medium">{item.value}</span>
              </div>
              <p className="text-xs text-gray-500">{item.name}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusChart;
