'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const projectsData = [
  { month: 'Jan', count: 4 },
  { month: 'Feb', count: 6 },
  { month: 'Mar', count: 8 },
  { month: 'Apr', count: 5 },
  { month: 'May', count: 10 },
  { month: 'Jun', count: 12 },
];

const blogsData = [
  { month: 'Jan', count: 8 },
  { month: 'Feb', count: 12 },
  { month: 'Mar', count: 15 },
  { month: 'Apr', count: 10 },
  { month: 'May', count: 18 },
  { month: 'Jun', count: 20 },
];

export function ProjectsChart() {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 hover:shadow-md transition-shadow duration-200">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
        Projects Overview
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={projectsData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#52525b" opacity={0.3} />
          <XAxis dataKey="month" stroke="#71717a" />
          <YAxis stroke="#71717a" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#27272a',
              border: '1px solid #3f3f46',
              borderRadius: '8px',
              color: '#fafafa',
            }}
          />
          <Bar dataKey="count" fill="#7c3aed" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function BlogsChart() {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 hover:shadow-md transition-shadow duration-200">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Blogs Activity</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={blogsData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#52525b" opacity={0.3} />
          <XAxis dataKey="month" stroke="#71717a" />
          <YAxis stroke="#71717a" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#27272a',
              border: '1px solid #3f3f46',
              borderRadius: '8px',
              color: '#fafafa',
            }}
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#ec4899"
            strokeWidth={2}
            dot={{ fill: '#ec4899', r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
