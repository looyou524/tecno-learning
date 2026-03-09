'use client';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  GraduationCap,
  Plus,
  Target,
  Users,
  X,
} from 'lucide-react';

const steps = [
  { id: 1, name: '基本信息', description: '填写培训计划的基本信息' },
  { id: 2, name: '培训内容', description: '配置培训课程内容' },
  { id: 3, name: '参与人员', description: '选择参与培训的学员' },
  { id: 4, name: '确认发布', description: '确认并发布培训计划' },
];

const trainingTypes = [
  { id: 'skill', name: '技能培训', description: '提升专业技能的培训课程' },
  { id: 'management', name: '管理培训', description: '管理能力提升课程' },
  { id: 'certification', name: '认证考评', description: '资格认证和考核评估' },
  { id: 'onboarding', name: '入职培训', description: '新员工入职培训课程' },
];

const targetGroups = [
  { id: 'sales', name: '销售团队', count: 45 },
  { id: 'management', name: '管理团队', count: 20 },
  { id: 'tech', name: '技术团队', count: 35 },
  { id: 'support', name: '客服团队', count: 28 },
];

export default function CreateTraining() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    startDate: '',
    endDate: '',
    duration: '',
    targetGroup: [] as string[],
    courses: [] as { name: string; duration: string }[],
  });

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/');
    }
  };

  const handleSubmit = () => {
    toast.success('培训计划创建成功！', {
      description: '您可以在培训计划列表中查看和管理。',
    });
    navigate('/');
  };

  const addCourse = () => {
    setFormData({
      ...formData,
      courses: [...formData.courses, { name: '', duration: '' }],
    });
  };

  const removeCourse = (index: number) => {
    setFormData({
      ...formData,
      courses: formData.courses.filter((_, i) => i !== index),
    });
  };

  const updateCourse = (index: number, field: string, value: string) => {
    const updatedCourses = [...formData.courses];
    updatedCourses[index] = { ...updatedCourses[index], [field]: value };
    setFormData({ ...formData, courses: updatedCourses });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={handleBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">创建培训计划</h1>
          <p className="text-muted-foreground">按照步骤创建新的培训计划</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep > step.id
                    ? 'bg-green-500 text-white'
                    : currentStep === step.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {currentStep > step.id ? <Check className="h-5 w-5" /> : step.id}
              </div>
              <div className="mt-2 text-center hidden sm:block">
                <p className={`text-sm font-medium ${currentStep === step.id ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {step.name}
                </p>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-full h-1 mx-4 ${currentStep > step.id ? 'bg-green-500' : 'bg-muted'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep - 1].name}</CardTitle>
          <CardDescription>{steps[currentStep - 1].description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">培训计划名称 <span className="text-red-500">*</span></Label>
                <Input
                  id="name"
                  placeholder="请输入培训计划名称"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>培训类型 <span className="text-red-500">*</span></Label>
                <RadioGroup
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value })}
                  className="grid grid-cols-2 gap-4"
                >
                  {trainingTypes.map((type) => (
                    <div key={type.id}>
                      <RadioGroupItem value={type.id} id={type.id} className="peer sr-only" />
                      <Label
                        htmlFor={type.id}
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                      >
                        <BookOpen className="mb-3 h-6 w-6" />
                        <div className="text-center">
                          <div className="font-semibold">{type.name}</div>
                          <div className="text-xs text-muted-foreground">{type.description}</div>
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">培训描述</Label>
                <Textarea
                  id="description"
                  placeholder="请输入培训计划的详细描述"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">开始日期 <span className="text-red-500">*</span></Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">结束日期 <span className="text-red-500">*</span></Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">预计培训时长</Label>
                <Select
                  value={formData.duration}
                  onValueChange={(value) => setFormData({ ...formData, duration: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择培训时长" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1小时</SelectItem>
                    <SelectItem value="2">2小时</SelectItem>
                    <SelectItem value="4">半天（4小时）</SelectItem>
                    <SelectItem value="8">一天（8小时）</SelectItem>
                    <SelectItem value="16">两天（16小时）</SelectItem>
                    <SelectItem value="40">一周（40小时）</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 2: Training Content */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Label>培训课程内容</Label>
                <Button type="button" variant="outline" size="sm" onClick={addCourse}>
                  <Plus className="h-4 w-4 mr-1" />
                  添加课程
                </Button>
              </div>

              {formData.courses.length === 0 && (
                <div className="text-center py-8 border-2 border-dashed rounded-lg">
                  <GraduationCap className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground">暂无课程内容</p>
                  <Button type="button" variant="outline" className="mt-3" onClick={addCourse}>
                    <Plus className="h-4 w-4 mr-1" />
                    添加第一节课程
                  </Button>
                </div>
              )}

              {formData.courses.map((course, index) => (
                <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                  <div className="flex-1 space-y-3">
                    <div className="space-y-2">
                      <Label>课程名称</Label>
                      <Input
                        placeholder="请输入课程名称"
                        value={course.name}
                        onChange={(e) => updateCourse(index, 'name', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>课程时长（分钟）</Label>
                      <Input
                        type="number"
                        placeholder="请输入课程时长"
                        value={course.duration}
                        onChange={(e) => updateCourse(index, 'duration', e.target.value)}
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeCourse(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Step 3: Participants */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>选择目标群体</Label>
                <div className="space-y-3">
                  {targetGroups.map((group) => (
                    <div key={group.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                      <Checkbox
                        id={group.id}
                        checked={formData.targetGroup.includes(group.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFormData({
                              ...formData,
                              targetGroup: [...formData.targetGroup, group.id],
                            });
                          } else {
                            setFormData({
                              ...formData,
                              targetGroup: formData.targetGroup.filter((id) => id !== group.id),
                            });
                          }
                        }}
                      />
                      <Label htmlFor={group.id} className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{group.name}</div>
                            <div className="text-sm text-muted-foreground">{group.count}人</div>
                          </div>
                          <Users className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span className="font-medium">预计参与人数</span>
                </div>
                <p className="text-2xl font-bold mt-2">
                  {formData.targetGroup.reduce((total, groupId) => {
                    const group = targetGroups.find((g) => g.id === groupId);
                    return total + (group?.count || 0);
                  }, 0)}人
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Confirm & Publish */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">培训信息</h3>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">计划名称：</span>
                    <span className="font-medium">{formData.name || '未填写'}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">培训类型：</span>
                    <span className="font-medium">
                      {trainingTypes.find((t) => t.id === formData.type)?.name || '未选择'}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">开始日期：</span>
                    <span className="font-medium">{formData.startDate || '未选择'}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">结束日期：</span>
                    <span className="font-medium">{formData.endDate || '未选择'}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-muted-foreground">培训描述：</span>
                    <span className="font-medium">{formData.description || '未填写'}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">课程内容</h3>
                </div>
                <div className="space-y-2">
                  {formData.courses.length === 0 ? (
                    <p className="text-sm text-muted-foreground">暂无课程内容</p>
                  ) : (
                    formData.courses.map((course, index) => (
                      <div key={index} className="flex items-center justify-between text-sm p-2 bg-muted rounded">
                        <span>{course.name || `课程 ${index + 1}`}</span>
                        <span className="text-muted-foreground">{course.duration}分钟</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">参与人员</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.targetGroup.length === 0 ? (
                    <p className="text-sm text-muted-foreground">未选择目标群体</p>
                  ) : (
                    formData.targetGroup.map((groupId) => {
                      const group = targetGroups.find((g) => g.id === groupId);
                      return (
                        <Badge key={groupId} variant="secondary">
                          {group?.name} ({group?.count}人)
                        </Badge>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleBack}>
            {currentStep === 1 ? '取消' : '上一步'}
          </Button>
          {currentStep < steps.length ? (
            <Button onClick={handleNext}>
              下一步
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit}>
              <Check className="mr-2 h-4 w-4" />
              确认发布
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
