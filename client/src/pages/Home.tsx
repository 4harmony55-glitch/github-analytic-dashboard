import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Github, Star, GitFork, Users, AlertCircle } from 'lucide-react';

interface GitHubData {
  repository: {
    name: string;
    owner: string;
    description: string;
    url: string;
    stars: number;
    forks: number;
    language: string;
    createdAt: string;
    updatedAt: string;
  };
  contributors: Array<{ login: string; contributions: number }>;
  pullRequests: Array<{ title: string; author: string; createdAt: string; state: string }>;
  issues: Array<{ title: string; author: string; createdAt: string; state: string }>;
}

/**
 * GitHub Data Visualization Dashboard
 * Design Philosophy: Modern Analytics Dashboard
 * - Clean, data-first layout with generous whitespace
 * - Emphasis on numerical insights and trend visualization
 * - Subtle depth through layered cards and soft shadows
 * - Muted color palette with strategic accent colors
 */
export default function Home() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/github-data.json')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load GitHub data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          <p className="mt-4 text-slate-600 font-medium">Loading GitHub data...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Failed to load GitHub data</p>
        </div>
      </div>
    );
  }

  const repo = data.repository;
  const topContributors = data.contributors.slice(0, 10);
  const prsByState = {
    open: data.pullRequests.filter(pr => pr.state === 'OPEN').length,
    total: data.pullRequests.length,
  };
  const issuesByState = {
    open: data.issues.filter(issue => issue.state === 'OPEN').length,
    total: data.issues.length,
  };

  const chartColors = ['#10b981', '#06b6d4', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#d946ef'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-4">
            <Github className="h-8 w-8 text-slate-900" />
            <h1 className="text-3xl font-bold text-slate-900">GitHub Analytics</h1>
          </div>
          <p className="text-slate-600 max-w-2xl">
            Real-time insights from <a href={repo.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-600 hover:text-emerald-700 underline">{repo.owner}/{repo.name}</a>
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Repository Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {/* Stars Card */}
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                <Star className="h-4 w-4 text-emerald-600" />
                Stars
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{repo.stars.toLocaleString()}</div>
              <p className="text-xs text-slate-500 mt-1">Repository popularity</p>
            </CardContent>
          </Card>

          {/* Forks Card */}
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                <GitFork className="h-4 w-4 text-cyan-600" />
                Forks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{repo.forks.toLocaleString()}</div>
              <p className="text-xs text-slate-500 mt-1">Community adoption</p>
            </CardContent>
          </Card>

          {/* Contributors Card */}
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                <Users className="h-4 w-4 text-amber-600" />
                Contributors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{data.contributors.length}</div>
              <p className="text-xs text-slate-500 mt-1">Active contributors</p>
            </CardContent>
          </Card>

          {/* Open Issues Card */}
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-600" />
                Open Issues
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{issuesByState.open}</div>
              <p className="text-xs text-slate-500 mt-1">Needs attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Contributors Bar Chart */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle>Top Contributors</CardTitle>
              <CardDescription>By commit count</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topContributors}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="login" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }} />
                  <Bar dataKey="contributions" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* PR and Issues Status */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle>Activity Status</CardTitle>
              <CardDescription>Pull requests and issues overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">Pull Requests</span>
                    <span className="text-sm font-bold text-emerald-600">{prsByState.open}/{prsByState.total}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(prsByState.open / prsByState.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">Issues</span>
                    <span className="text-sm font-bold text-cyan-600">{issuesByState.open}/{issuesByState.total}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-cyan-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(issuesByState.open / issuesByState.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contribution Distribution Pie Chart */}
        <Card className="bg-white shadow-sm mb-8">
          <CardHeader>
            <CardTitle>Contribution Distribution</CardTitle>
            <CardDescription>Top 10 contributors share</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={topContributors}
                  dataKey="contributions"
                  nameKey="login"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={{ fontSize: 12 }}
                >
                  {topContributors.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} commits`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent PRs */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle>Recent Pull Requests</CardTitle>
              <CardDescription>Latest 5 PRs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {data.pullRequests.slice(0, 5).map((pr, idx) => (
                  <div key={idx} className="pb-3 border-b border-slate-100 last:border-0">
                    <p className="text-sm font-medium text-slate-900 line-clamp-2">{pr.title}</p>
                    <p className="text-xs text-slate-500 mt-1">by {pr.author}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Issues */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle>Recent Issues</CardTitle>
              <CardDescription>Latest 5 issues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {data.issues.slice(0, 5).map((issue, idx) => (
                  <div key={idx} className="pb-3 border-b border-slate-100 last:border-0">
                    <p className="text-sm font-medium text-slate-900 line-clamp-2">{issue.title}</p>
                    <p className="text-xs text-slate-500 mt-1">by {issue.author}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
