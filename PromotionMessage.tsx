'use client';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Eye,
  Mail,
  TrendingUp,
  Trophy,
  X,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const promotionRequests = [
  {
    id: 1,
    employee: {
      name: '张三',
      department: '销售部',
      position: '销售专员',
      avatar: '张',
    },
    requestType: '晋升申请',
    targetPosition: '销售主管',
    requestDate: '2024-03-01',
    status: 'pending',
    aiScore: 92,
    aiRecommendation: '强烈推荐',
    skills: ['客户开发', '团队管理', '业绩达成'],
    achievements: ['连续3个月业绩第一', '培养2名新人'],
  },
  {
    id: 2,
    employee: {
      name: '李四',
      department: '技术部',
      position: '高级工程师',
      avatar: '李',
    },
    requestType: '晋升申请',
    targetPosition: '技术主管',
    requestDate: '2024-02-28',
    status: 'pending',
    aiScore: 88,
    aiRecommendation: '推荐',
    skills: ['技术架构', '团队领导', '项目管理'],
    achievements: ['主导3个核心项目', '技术分享10+次'],
  },
  {
    id: 3,
    employee: {
      name: '王五',
      department: '客服部',
      position: '客服专员',
      avatar: '王',
    },
    requestType: '晋升申请',
    targetPosition: '客服组长',
    requestDate: '2024-02-25',
    status: 'approved',
    aiScore: 85,
    aiRecommendation: '推荐',
    skills: ['客户沟通', '问题解决', '团队协作'],
    achievements: ['客户满意度98%', '零投诉记录'],
  },
];

const promotionNotifications = [
  {
    id: 1,
    title: '晋升评估完成',
    message: '您的晋升申请已通过AI评估，评估得分：90分',
    date: '2024-03-01',
    read: false,
    type: 'evaluation',
  },
  {
    id: 2,
    title: '晋升申请已批准',
    message: '恭喜！您的晋升申请已获得批准，新职位将于4月1日生效',
    date: '2024-02-28',
    read: true,
    type: 'approval',
  },
  {
    id: 3,
    title: '新的培训任务',
    message: '为准备晋升，您需要完成《管理技能基础》培训课程',
    date: '2024-02-26',
    read: true,
    type: 'task',
  },
];

export default function PromotionMessage() {
  const navigate = useNavigate();
  const [selectedRequest, setSelectedRequest] = useState<typeof promotionRequests[0] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleApprove = (_requestId: number) => {
    toast.success('晋升申请已批准');
    setDialogOpen(false);
  };

  const handleReject = (_requestId: number) => {
    toast.success('晋升申请已驳回');
    setDialogOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-orange-100 text-orange-700">待审核</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-700">已批准</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-700">已驳回</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getAiRecommendationBadge = (score: number) => {
    if (score >= 90) {
      return <Badge className="bg-green-100 text-green-700">强烈推荐</Badge>;
    } else if (score >= 80) {
      return <Badge className="bg-blue-100 text-blue-700">推荐</Badge>;
    } else if (score >= 70) {
      return <Badge className="bg-yellow-100 text-yellow-700">可考虑</Badge>;
    } else {
      return <Badge className="bg-red-100 text-red-700">不推荐</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">晋升管理</h1>
          <p className="text-muted-foreground">处理员工晋升申请和查看晋升消息</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100">
                <Mail className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">待审核申请</p>
                <p className="text-2xl font-bold">2</p>
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
                <p className="text-sm text-muted-foreground">本月已批准</p>
                <p className="text-2xl font-bold">5</p>
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
                <p className="text-sm text-muted-foreground">晋升成功率</p>
                <p className="text-2xl font-bold">78%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-100">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-100">
                <Trophy className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">平均AI评分</p>
                <p className="text-2xl font-bold">85.6</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="requests" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="requests">晋升申请</TabsTrigger>
          <TabsTrigger value="notifications">消息通知</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="mt-6 space-y-4">
          {promotionRequests.map((request) => (
            <Card key={request.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {request.employee.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{request.employee.name}</h3>
                          {getStatusBadge(request.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {request.employee.department} · {request.employee.position}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">申请日期</p>
                        <p className="text-sm">{request.requestDate}</p>
                      </div>
                    </div>

                    <div className="mt-3 p-3 bg-muted rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">目标职位</span>
                        <span className="text-sm font-semibold text-primary">
                          {request.targetPosition}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">AI评估</span>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-primary">{request.aiScore}分</span>
                          {getAiRecommendationBadge(request.aiScore)}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {request.skills.map((skill, index) => (
                        <Badge key={index} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    {request.status === 'pending' && (
                      <div className="mt-3 flex items-center gap-2">
                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={() => {
                            setSelectedRequest(request);
                            setDialogOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          查看详情
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="notifications" className="mt-6 space-y-4">
          {promotionNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={`hover:shadow-md transition-shadow ${
                !notification.read ? 'border-primary/50 bg-primary/5' : ''
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    notification.type === 'approval' ? 'bg-green-100' :
                    notification.type === 'evaluation' ? 'bg-blue-100' :
                    'bg-orange-100'
                  }`}>
                    {notification.type === 'approval' ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : notification.type === 'evaluation' ? (
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                    ) : (
                      <Mail className="h-5 w-5 text-orange-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{notification.title}</h3>
                          {!notification.read && (
                            <Badge className="bg-primary text-primary-foreground">新</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">{notification.date}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          {selectedRequest && (
            <>
              <DialogHeader>
                <DialogTitle>晋升申请详情</DialogTitle>
                <DialogDescription>
                  查看员工晋升申请的详细信息和AI评估报告
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-primary/10 text-primary text-xl">
                      {selectedRequest.employee.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{selectedRequest.employee.name}</h3>
                    <p className="text-muted-foreground">
                      {selectedRequest.employee.department} · {selectedRequest.employee.position}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">目标职位</p>
                    <p className="text-lg font-semibold">{selectedRequest.targetPosition}</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">AI评估得分</p>
                    <p className="text-lg font-semibold text-primary">{selectedRequest.aiScore}分</p>
                  </div>
                </div>

                <div>
                  <p className="font-medium mb-2">核心技能</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedRequest.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="font-medium mb-2">主要成就</p>
                  <ul className="space-y-1">
                    {selectedRequest.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-blue-900">AI评估建议</span>
                  </div>
                  <p className="text-sm text-blue-800">
                    该员工在{selectedRequest.skills.join('、')}等方面表现优秀，
                    综合评估得分{selectedRequest.aiScore}分，{selectedRequest.aiRecommendation}晋升。
                  </p>
                </div>
              </div>
              <DialogFooter className="gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleReject(selectedRequest.id)}
                >
                  <X className="h-4 w-4 mr-1" />
                  驳回申请
                </Button>
                <Button onClick={() => handleApprove(selectedRequest.id)}>
                  <Check className="h-4 w-4 mr-1" />
                  批准晋升
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
