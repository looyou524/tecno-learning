'use client';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';
import {
  ArrowLeft,
  BarChart3,
  Brain,
  CheckCircle2,
  ChevronRight,
  Download,
  FileText,
  Lightbulb,
  Radar,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar as RechartsRadar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const radarData = [
  { subject: '专业知识', A: 90, B: 75, fullMark: 100 },
  { subject: '沟通能力', A: 85, B: 80, fullMark: 100 },
  { subject: '团队协作', A: 80, B: 85, fullMark: 100 },
  { subject: '创新思维', A: 75, B: 70, fullMark: 100 },
  { subject: '领导力', A: 70, B: 65, fullMark: 100 },
  { subject: '执行力', A: 88, B: 82, fullMark: 100 },
];

const trendData = [
  { month: '1月', score: 72 },
  { month: '2月', score: 75 },
  { month: '3月', score: 78 },
  { month: '4月', score: 82 },
  { month: '5月', score: 85 },
  { month: '6月', score: 88 },
];

const evaluationReports = [
  {
    id: 1,
    employee: {
      name: '张三',
      department: '销售部',
      position: '销售专员',
      avatar: '张',
    },
    overallScore: 88,
    dimension: '晋升评估',
    date: '2024-03-01',
    status: 'completed',
    aiInsights: [
      '在客户开发和维护方面表现突出',
      '团队管理能力有待提升',
      '建议加强战略思维培训',
    ],
  },
  {
    id: 2,
    employee: {
      name: '李四',
      department: '技术部',
      position: '高级工程师',
      avatar: '李',
    },
    overallScore: 92,
    dimension: '晋升评估',
    date: '2024-02-28',
    status: 'completed',
    aiInsights: [
      '技术能力全面，架构设计能力强',
      '具备良好的团队协作精神',
      '建议提升项目管理能力',
    ],
  },
  {
    id: 3,
    employee: {
      name: '王五',
      department: '客服部',
      position: '客服专员',
      avatar: '王',
    },
    overallScore: 85,
    dimension: '晋升评估',
    date: '2024-02-25',
    status: 'completed',
    aiInsights: [
      '客户沟通能力优秀',
      '问题解决效率高',
      '具备团队领导潜力',
    ],
  },
];

const skillBreakdown = [
  { name: '专业知识', score: 90, weight: 30 },
  { name: '沟通能力', score: 85, weight: 20 },
  { name: '团队协作', score: 80, weight: 20 },
  { name: '创新思维', score: 75, weight: 15 },
  { name: '领导力', score: 70, weight: 15 },
];

export default function AIEvaluation() {
  const navigate = useNavigate();
  const [selectedReport, setSelectedReport] = useState<typeof evaluationReports[0] | null>(null);

  const handleGenerateReport = () => {
    toast.success('AI评估报告生成中...', {
      description: '预计需要1-2分钟完成分析',
    });
  };

  const handleExportReport = () => {
    toast.success('报告导出成功');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">AI评估详情</h1>
            <p className="text-muted-foreground">查看AI智能评估报告和分析</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleExportReport}>
            <Download className="mr-2 h-4 w-4" />
            导出报告
          </Button>
          <Button onClick={handleGenerateReport}>
            <Sparkles className="mr-2 h-4 w-4" />
            生成新报告
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100">
                <Brain className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">评估总数</p>
                <p className="text-2xl font-bold">156</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">平均得分</p>
                <p className="text-2xl font-bold">82.5</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-100">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-100">
                <TrendingUp className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">晋升推荐</p>
                <p className="text-2xl font-bold">23</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-100">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-100">
                <FileText className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">待生成</p>
                <p className="text-2xl font-bold">5</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="reports" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="reports">评估报告</TabsTrigger>
          <TabsTrigger value="analysis">能力分析</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="mt-6 space-y-4">
          {evaluationReports.map((report) => (
            <Card
              key={report.id}
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedReport(report)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {report.employee.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{report.employee.name}</h3>
                          <Badge className="bg-green-100 text-green-700">已完成</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {report.employee.department} · {report.employee.position}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-primary">{report.overallScore}</span>
                          <span className="text-sm text-muted-foreground">分</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{report.date}</p>
                      </div>
                    </div>

                    <div className="mt-3">
                      <p className="text-sm font-medium mb-2">AI洞察</p>
                      <ul className="space-y-1">
                        {report.aiInsights.map((insight, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Lightbulb className="h-4 w-4 text-yellow-500" />
                            {insight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="analysis" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Radar Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Radar className="h-5 w-5" />
                  能力雷达图
                </CardTitle>
                <CardDescription>多维度能力对比分析</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <RechartsRadar
                        name="当前水平"
                        dataKey="A"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.3}
                      />
                      <RechartsRadar
                        name="目标水平"
                        dataKey="B"
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.3}
                      />
                      <Legend />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Trend Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  能力成长趋势
                </CardTitle>
                <CardDescription>近6个月能力得分变化</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Bar dataKey="score" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Skill Breakdown */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  技能详细分析
                </CardTitle>
                <CardDescription>各项技能得分及权重分布</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skillBreakdown.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{skill.name}</span>
                          <Badge variant="outline">权重 {skill.weight}%</Badge>
                        </div>
                        <span className="font-semibold">{skill.score}分</span>
                      </div>
                      <Progress value={skill.score} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Selected Report Detail */}
      {selectedReport && (
        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarFallback className="bg-primary/10 text-primary text-lg">
                    {selectedReport.employee.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{selectedReport.employee.name}</CardTitle>
                  <CardDescription>
                    {selectedReport.employee.department} · {selectedReport.employee.position}
                  </CardDescription>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-primary">{selectedReport.overallScore}</p>
                <p className="text-sm text-muted-foreground">综合得分</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-2xl font-bold">90</p>
                <p className="text-sm text-muted-foreground">专业知识</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-2xl font-bold">85</p>
                <p className="text-sm text-muted-foreground">沟通能力</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-2xl font-bold">80</p>
                <p className="text-sm text-muted-foreground">团队协作</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">AI评估建议</h4>
              <div className="space-y-2">
                {selectedReport.aiInsights.map((insight, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                    <Sparkles className="h-5 w-5 text-blue-600 mt-0.5" />
                    <p className="text-sm text-blue-900">{insight}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setSelectedReport(null)}>
                关闭
              </Button>
              <Button className="flex-1" onClick={handleExportReport}>
                <Download className="mr-2 h-4 w-4" />
                导出详细报告
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
