"use client";

import {
  financeExpenses,
  financeInvoices,
  financeStats,
} from "@/dashboard/data/mockData";
import {
  Badge,
  Card,
  CardBody,
  DataTable,
  PageHeader,
  SectionTitle,
  StatCard,
} from "@/dashboard/components/ui";

function RevenueChart() {
  const points = [30, 42, 38, 55, 48, 62, 58, 72, 68, 80, 75, 88];
  const max = Math.max(...points);

  return (
    <div className="flex h-40 items-end gap-1.5">
      {points.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-t bg-gradient-to-t from-emerald-600 to-emerald-400"
          style={{ height: `${(v / max) * 100}%` }}
        />
      ))}
    </div>
  );
}

export default function FinancePage() {
  return (
    <div>
      <PageHeader
        title="Finance"
        description="Revenue, expenses, invoices, and cashflow forecasting"
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {financeStats.map((stat) => (
          <StatCard key={stat.label} {...stat} trend="up" />
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardBody>
            <SectionTitle>Revenue Chart</SectionTitle>
            <RevenueChart />
            <p className="mt-3 text-sm text-ink-muted">
              12-month revenue trend · +18% YoY
            </p>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <SectionTitle>Expenses</SectionTitle>
            <ul className="space-y-3">
              {financeExpenses.map((item) => (
                <li
                  key={item.category}
                  className="flex items-center justify-between rounded-xl border border-surface-border p-3 text-sm"
                >
                  <span>{item.category}</span>
                  <span className="font-medium">{item.amount}</span>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardBody>
            <SectionTitle>Invoices</SectionTitle>
            <DataTable
              columns={[
                { key: "id", label: "Invoice" },
                { key: "client", label: "Client" },
                { key: "amount", label: "Amount" },
                {
                  key: "status",
                  label: "Status",
                  render: (row) => (
                    <Badge
                      variant={
                        row.status === "Paid"
                          ? "success"
                          : row.status === "Overdue"
                            ? "danger"
                            : "warning"
                      }
                    >
                      {row.status}
                    </Badge>
                  ),
                },
              ]}
              rows={financeInvoices}
            />
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <SectionTitle>Cashflow Forecast</SectionTitle>
            <div className="space-y-4">
              <div className="rounded-xl bg-emerald-50 p-4">
                <p className="text-sm text-emerald-800">Projected next 30 days</p>
                <p className="mt-1 text-2xl font-semibold text-emerald-900">
                  +$18,400
                </p>
              </div>
              <div className="rounded-xl border border-surface-border p-4">
                <p className="text-sm text-ink-muted">Runway at current burn</p>
                <p className="mt-1 text-xl font-semibold">14.2 months</p>
              </div>
              <div className="rounded-xl border border-surface-border p-4">
                <p className="text-sm text-ink-muted">Outstanding receivables</p>
                <p className="mt-1 text-xl font-semibold">$8,500</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
