"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  BarChart3,
  Bell,
  Calendar,
  ChevronDown,
  Clock,
  FileText,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  PieChart,
  Plus,
  Rocket,
  Settings,
  Star,
  Sparkles,
  Zap,
  TrendingUp,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useIsMobile } from "@/hooks/use-mobile"

export default function Dashboard() {
  const router = useRouter()
  const isMobile = useIsMobile()
  const [isClient, setIsClient] = useState(false)
  const [stars, setStars] = useState<{ top: string; left: string; delay: string }[]>([])

  useEffect(() => {
    setIsClient(true)
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    if (!isLoggedIn) {
      router.push("/")
    }

    // Generate stars
    const newStars = Array.from({ length: 50 }, () => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
    }))
    setStars(newStars)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    router.push("/")
  }

  if (!isClient) {
    return null // Prevent hydration errors
  }

  return (
    <div className="min-h-screen cosmic-bg flex flex-col relative">
      {/* Stars */}
      {stars.map((star, i) => (
        <div
          key={i}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            animationDelay: star.delay,
          }}
        />
      ))}

      {/* Planets */}
      <div className="planet" style={{ width: "200px", height: "200px", top: "5%", right: "-50px" }} />
      <div className="planet" style={{ width: "150px", height: "150px", bottom: "10%", left: "-30px" }} />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Header */}
      <header className="glass border-b border-slate-700/50 sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isMobile && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden text-slate-300 hover:text-white hover:bg-slate-800/50"
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 glass border-r border-slate-700/50">
                  <div className="flex flex-col h-full">
                    <div className="py-4 border-b border-slate-700/50">
                      <div className="flex items-center gap-2 px-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-cyan-400 flex items-center justify-center">
                          <Rocket className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-semibold text-slate-200">Spot Marketing</span>
                      </div>
                    </div>
                    <nav className="flex-1 py-4">
                      <MobileNavigation />
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            )}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-cyan-400 flex items-center justify-center glow">
                <Rocket className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold hidden sm:inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300 glow-text">
                SPOT MARKETING
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative text-slate-300 hover:text-white hover:bg-slate-800/50"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-purple-500 rounded-full glow"></span>
              <span className="sr-only">Notificações</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 text-slate-300 hover:text-white hover:bg-slate-800/50"
                >
                  <Avatar className="h-8 w-8 border border-purple-500/50 glow">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                    <AvatarFallback className="bg-gradient-to-br from-purple-600 to-cyan-400 text-white">
                      SM
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline-block text-slate-200">Spot Marketing</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="glass border border-slate-700/50">
                <DropdownMenuLabel className="text-slate-300">Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-700/50" />
                <DropdownMenuItem className="text-slate-300 focus:text-white focus:bg-slate-800/50">
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-slate-300 focus:text-white focus:bg-slate-800/50">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configurações</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-700/50" />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-slate-300 focus:text-white focus:bg-slate-800/50"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 relative z-10">
        {/* Sidebar - Hidden on mobile */}
        <aside className="w-64 glass border-r border-slate-700/50 hidden md:block">
          <nav className="p-4 space-y-6">
            <DesktopNavigation />
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          <div className="container mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300 glow-text">
                Olá, Spot Marketing!
              </h1>
              <p className="text-slate-400">
                Bem-vindo ao seu painel de controle. Aqui está o resumo das suas campanhas.
              </p>
            </div>

            {/* Dashboard Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid grid-cols-3 md:w-[400px] glass border border-slate-700/50 p-1">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-slate-800/50 data-[state=active]:text-white"
                >
                  Visão Geral
                </TabsTrigger>
                <TabsTrigger
                  value="campaigns"
                  className="data-[state=active]:bg-slate-800/50 data-[state=active]:text-white"
                >
                  Campanhas
                </TabsTrigger>
                <TabsTrigger
                  value="calendar"
                  className="data-[state=active]:bg-slate-800/50 data-[state=active]:text-white"
                >
                  Calendário
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatsCard
                    title="Impressões"
                    value="124.5K"
                    change="+12.3%"
                    trend="up"
                    icon={<Zap className="h-5 w-5 text-purple-400" />}
                  />
                  <StatsCard
                    title="Cliques"
                    value="42.8K"
                    change="+8.7%"
                    trend="up"
                    icon={<TrendingUp className="h-5 w-5 text-cyan-400" />}
                  />
                  <StatsCard
                    title="Conversões"
                    value="2,845"
                    change="+23.5%"
                    trend="up"
                    icon={<Star className="h-5 w-5 text-yellow-400" />}
                  />
                  <StatsCard
                    title="CTR"
                    value="3.42%"
                    change="-0.4%"
                    trend="down"
                    icon={<Sparkles className="h-5 w-5 text-blue-400" />}
                  />
                </div>

                {/* Campaign Performance */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-2 glass border-none glow-border">
                    <CardHeader>
                      <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300">
                        Desempenho das Campanhas
                      </CardTitle>
                      <CardDescription className="text-slate-400">
                        Visão geral das suas campanhas ativas
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <CampaignItem
                          name="Campanha de Verão 2023"
                          platform="Facebook & Instagram"
                          progress={78}
                          status="active"
                        />
                        <CampaignItem name="Lançamento Produto X" platform="Google Ads" progress={45} status="active" />
                        <CampaignItem name="Remarketing - Clientes" platform="Meta Ads" progress={92} status="active" />
                        <CampaignItem name="SEO - Palavras-chave" platform="Google" progress={34} status="active" />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Activities */}
                  <Card className="glass border-none glow-border">
                    <CardHeader>
                      <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300">
                        Atividades Recentes
                      </CardTitle>
                      <CardDescription className="text-slate-400">Últimas atualizações</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <ActivityItem
                          title="Relatório Semanal"
                          description="O relatório semanal foi gerado"
                          time="Há 2 horas"
                          icon={<FileText className="h-4 w-4 text-purple-400" />}
                        />
                        <ActivityItem
                          title="Nova Campanha"
                          description="Campanha 'Promoção Relâmpago' criada"
                          time="Há 5 horas"
                          icon={<Plus className="h-4 w-4 text-cyan-400" />}
                        />
                        <ActivityItem
                          title="Comentário"
                          description="João comentou na campanha 'Verão 2023'"
                          time="Há 1 dia"
                          icon={<MessageSquare className="h-4 w-4 text-yellow-400" />}
                        />
                        <ActivityItem
                          title="Atualização"
                          description="Orçamento da campanha 'Google Ads' atualizado"
                          time="Há 2 dias"
                          icon={<FileText className="h-4 w-4 text-blue-400" />}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Campaigns Tab */}
              <TabsContent value="campaigns" className="space-y-6">
                <Card className="glass border-none glow-border">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300">
                          Todas as Campanhas
                        </CardTitle>
                        <CardDescription className="text-slate-400">
                          Gerencie suas campanhas de marketing
                        </CardDescription>
                      </div>
                      <Button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 glow">
                        <Plus className="mr-2 h-4 w-4" />
                        Nova Campanha
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <CampaignItem
                        name="Campanha de Verão 2023"
                        platform="Facebook & Instagram"
                        progress={78}
                        status="active"
                      />
                      <CampaignItem name="Lançamento Produto X" platform="Google Ads" progress={45} status="active" />
                      <CampaignItem name="Remarketing - Clientes" platform="Meta Ads" progress={92} status="active" />
                      <CampaignItem name="SEO - Palavras-chave" platform="Google" progress={34} status="active" />
                      <CampaignItem
                        name="Email Marketing - Novidades"
                        platform="Mailchimp"
                        progress={100}
                        status="completed"
                      />
                      <CampaignItem
                        name="Black Friday 2022"
                        platform="Todos os canais"
                        progress={100}
                        status="completed"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Calendar Tab */}
              <TabsContent value="calendar" className="space-y-6">
                <Card className="glass border-none glow-border">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300">
                          Calendário de Marketing
                        </CardTitle>
                        <CardDescription className="text-slate-400">Planejamento e cronograma de ações</CardDescription>
                      </div>
                      <Button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 glow">
                        <Plus className="mr-2 h-4 w-4" />
                        Novo Evento
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <CalendarEvent
                        title="Reunião de Alinhamento"
                        date="Hoje, 14:00 - 15:00"
                        description="Discussão sobre estratégias para o próximo trimestre"
                      />
                      <CalendarEvent
                        title="Lançamento da Campanha de Inverno"
                        date="Amanhã, 10:00"
                        description="Início da nova campanha sazonal em todas as plataformas"
                      />
                      <CalendarEvent
                        title="Análise de Resultados"
                        date="25/04/2023, 09:00 - 10:30"
                        description="Revisão dos resultados do mês anterior"
                      />
                      <CalendarEvent
                        title="Workshop de Conteúdo"
                        date="28/04/2023, 13:00 - 17:00"
                        description="Treinamento sobre criação de conteúdo para redes sociais"
                      />
                      <CalendarEvent
                        title="Planejamento Mensal"
                        date="01/05/2023, 09:00 - 12:00"
                        description="Definição de metas e estratégias para o próximo mês"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

// Navigation Components
function DesktopNavigation() {
  return (
    <div className="space-y-1">
      <NavigationItem icon={<Home />} label="Dashboard" isActive />
      <NavigationItem icon={<BarChart3 />} label="Campanhas" />
      <NavigationItem icon={<PieChart />} label="Relatórios" />
      <NavigationItem icon={<Calendar />} label="Calendário" />
      <NavigationItem icon={<MessageSquare />} label="Mensagens" />
      <NavigationItem icon={<FileText />} label="Demandas" />
      <NavigationItem icon={<Settings />} label="Configurações" />
    </div>
  )
}

function MobileNavigation() {
  return (
    <div className="space-y-1 px-2">
      <NavigationItem icon={<Home />} label="Dashboard" isActive />
      <NavigationItem icon={<BarChart3 />} label="Campanhas" />
      <NavigationItem icon={<PieChart />} label="Relatórios" />
      <NavigationItem icon={<Calendar />} label="Calendário" />
      <NavigationItem icon={<MessageSquare />} label="Mensagens" />
      <NavigationItem icon={<FileText />} label="Demandas" />
      <NavigationItem icon={<Settings />} label="Configurações" />
    </div>
  )
}

function NavigationItem({
  icon,
  label,
  isActive = false,
}: { icon: React.ReactNode; label: string; isActive?: boolean }) {
  return (
    <Button
      variant={isActive ? "secondary" : "ghost"}
      className={`w-full justify-start text-slate-300 hover:text-white ${
        isActive ? "bg-gradient-to-r from-purple-600/20 to-cyan-500/20 text-white" : "hover:bg-slate-800/50"
      }`}
    >
      {icon}
      <span className="ml-2">{label}</span>
    </Button>
  )
}

// Dashboard Components
function StatsCard({
  title,
  value,
  change,
  trend,
  icon,
}: {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: React.ReactNode
}) {
  return (
    <Card className="glass border-none glow-border">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-slate-400">{title}</p>
            <h3 className="text-2xl font-bold mt-1 text-white">{value}</h3>
          </div>
          <div className="bg-slate-800/50 p-2 rounded-full">{icon}</div>
        </div>
        <div className="mt-4 flex items-center">
          <span className={`text-xs font-medium ${trend === "up" ? "text-green-400" : "text-red-400"}`}>{change}</span>
          <span className="text-xs text-slate-400 ml-1">vs. mês anterior</span>
        </div>
      </CardContent>
    </Card>
  )
}

function CampaignItem({
  name,
  platform,
  progress,
  status,
}: {
  name: string
  platform: string
  progress: number
  status: "active" | "paused" | "completed"
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-medium text-slate-200">{name}</h4>
          <p className="text-sm text-slate-400">{platform}</p>
        </div>
        <Badge
          variant={status === "active" ? "default" : status === "paused" ? "outline" : "secondary"}
          className={
            status === "active"
              ? "bg-gradient-to-r from-purple-600 to-cyan-500 border-none"
              : status === "paused"
                ? "border-purple-500 text-purple-400"
                : "bg-slate-700 text-slate-300"
          }
        >
          {status === "active" ? "Ativa" : status === "paused" ? "Pausada" : "Concluída"}
        </Badge>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Progresso</span>
          <span className="text-slate-300">{progress}%</span>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}

function ActivityItem({
  title,
  description,
  time,
  icon,
}: {
  title: string
  description: string
  time: string
  icon: React.ReactNode
}) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 bg-slate-800/50 p-1.5 rounded-full">{icon}</div>
      <div>
        <h4 className="text-sm font-medium text-slate-200">{title}</h4>
        <p className="text-xs text-slate-400">{description}</p>
        <div className="flex items-center mt-1 text-xs text-slate-500">
          <Clock className="h-3 w-3 mr-1" />
          {time}
        </div>
      </div>
    </div>
  )
}

function CalendarEvent({
  title,
  date,
  description,
}: {
  title: string
  date: string
  description: string
}) {
  return (
    <div className="glass border border-slate-700/50 rounded-lg p-4 hover:bg-slate-800/30 transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium text-slate-200">{title}</h4>
          <div className="flex items-center mt-1 text-sm text-slate-400">
            <Calendar className="h-4 w-4 mr-1 text-purple-400" />
            {date}
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800/50">
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
      <p className="mt-2 text-sm text-slate-500">{description}</p>
    </div>
  )
}
