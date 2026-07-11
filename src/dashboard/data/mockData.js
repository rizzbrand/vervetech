export const overviewStats = [
  {
    label: "Revenue",
    value: "$48,290",
    change: "+12.4%",
    trend: "up",
    icon: "DollarSign",
  },
  {
    label: "Customers",
    value: "1,284",
    change: "+8.1%",
    trend: "up",
    icon: "Users",
  },
  {
    label: "Orders",
    value: "326",
    change: "-3.2%",
    trend: "down",
    icon: "ShoppingBag",
  },
  {
    label: "Growth",
    value: "18.6%",
    change: "+2.4%",
    trend: "up",
    icon: "TrendingUp",
  },
  {
    label: "Cashflow",
    value: "$12,840",
    change: "+5.7%",
    trend: "up",
    icon: "Wallet",
  },
  {
    label: "AI Business Score",
    value: "82/100",
    change: "+4 pts",
    trend: "up",
    icon: "Sparkles",
  },
];

export const aiRecommendations = {
  headline: "Your sales dropped 12% this week",
  summary:
    "Engagement is strong in marketing, but deal velocity slowed in the pipeline stage.",
  actions: [
    "Launch customer retention campaign",
    "Follow up with inactive leads",
    "Optimize pricing on top-performing offers",
  ],
};

export const recentActivity = [
  {
    id: 1,
    title: "New customer added",
    detail: "Northwind Labs joined your CRM",
    time: "12 min ago",
    icon: "UserPlus",
  },
  {
    id: 2,
    title: "Invoice created",
    detail: "Invoice #INV-2041 for $2,400",
    time: "45 min ago",
    icon: "Receipt",
  },
  {
    id: 3,
    title: "Campaign launched",
    detail: "Spring retention email sequence",
    time: "2 hours ago",
    icon: "Megaphone",
  },
  {
    id: 4,
    title: "Payment received",
    detail: "$8,750 from Atlas Ventures",
    time: "5 hours ago",
    icon: "CreditCard",
  },
];

export const upcomingTasks = [
  {
    id: 1,
    title: "Follow up with 14 inactive leads",
    due: "Today",
    priority: "high",
  },
  {
    id: 2,
    title: "Review weekly analytics report",
    due: "Tomorrow",
    priority: "medium",
  },
  {
    id: 3,
    title: "Publish Q2 growth campaign",
    due: "Fri",
    priority: "medium",
  },
  {
    id: 4,
    title: "Approve finance cashflow forecast",
    due: "Next week",
    priority: "low",
  },
];

export const aiConversations = [
  { id: "1", title: "Increase sales this month" },
  { id: "2", title: "Retention campaign ideas" },
  { id: "3", title: "Cashflow forecast review" },
];

export const aiMessages = [
  {
    id: 1,
    role: "user",
    content: "How can I increase sales this month?",
  },
  {
    id: 2,
    role: "assistant",
    content:
      "Based on your current data, three opportunities stand out:\n\n1. Re-engage 42 leads inactive for 14+ days — estimated $18k pipeline recovery.\n2. Launch a retention offer to customers with declining order frequency.\n3. Shift ad spend toward your top-converting landing page (+22% ROAS last week).\n\nI can draft a 7-day action plan if you'd like.",
  },
];

export const businessContext = {
  revenue: "$48,290",
  customers: "1,284",
  products: "6 active offers",
  goals: "Grow MRR 15% this quarter",
};

export const crmStats = [
  { label: "Total Customers", value: "1,284", change: "+6.2%" },
  { label: "Active Deals", value: "86", change: "+4" },
  { label: "Revenue Pipeline", value: "$214k", change: "+11%" },
];

export const crmCustomers = [
  {
    name: "Atlas Ventures",
    email: "ops@atlasventures.io",
    status: "Active",
    value: "$24,500",
  },
  {
    name: "Northwind Labs",
    email: "hello@northwindlabs.com",
    status: "Active",
    value: "$12,800",
  },
  {
    name: "Brightline Co.",
    email: "team@brightline.co",
    status: "Trial",
    value: "$4,200",
  },
  {
    name: "Summit Retail",
    email: "sales@summitretail.com",
    status: "Churn risk",
    value: "$9,100",
  },
];

export const crmDeals = [
  {
    company: "Horizon Systems",
    stage: "Proposal",
    owner: "Divine",
    amount: "$32,000",
  },
  {
    company: "Lumen Health",
    stage: "Negotiation",
    owner: "Sarah",
    amount: "$18,500",
  },
  {
    company: "Urban Motors",
    stage: "Qualified",
    owner: "James",
    amount: "$41,200",
  },
  {
    company: "Nova Dining Group",
    stage: "Discovery",
    owner: "Divine",
    amount: "$9,800",
  },
];

export const marketingStats = [
  { label: "Campaign ROI", value: "3.8x", change: "+0.4x" },
  { label: "Email Open Rate", value: "41%", change: "+3%" },
  { label: "Social Reach", value: "128k", change: "+18%" },
];

export const marketingCampaigns = [
  {
    name: "Spring Retention",
    channel: "Email",
    status: "Live",
    performance: "42% open",
  },
  {
    name: "Product Launch",
    channel: "Social",
    status: "Scheduled",
    performance: "—",
  },
  {
    name: "Founder Story Ads",
    channel: "Paid",
    status: "Live",
    performance: "2.9x ROAS",
  },
];

export const financeStats = [
  { label: "Monthly Revenue", value: "$48,290", change: "+12%" },
  { label: "Expenses", value: "$21,450", change: "-4%" },
  { label: "Net Cashflow", value: "$12,840", change: "+6%" },
];

export const financeInvoices = [
  {
    id: "INV-2041",
    client: "Atlas Ventures",
    amount: "$8,750",
    status: "Paid",
  },
  {
    id: "INV-2042",
    client: "Northwind Labs",
    amount: "$2,400",
    status: "Sent",
  },
  {
    id: "INV-2043",
    client: "Urban Motors",
    amount: "$6,100",
    status: "Overdue",
  },
];

export const financeExpenses = [
  { category: "Payroll", amount: "$12,400", trend: "stable" },
  { category: "Software", amount: "$3,280", trend: "up" },
  { category: "Marketing", amount: "$4,120", trend: "up" },
  { category: "Operations", amount: "$1,650", trend: "down" },
];
