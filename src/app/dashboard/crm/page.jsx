"use client";

import {
  crmCustomers,
  crmDeals,
  crmStats,
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

export default function CRMPage() {
  return (
    <div>
      <PageHeader
        title="CRM"
        description="Manage customers, leads, deals, and your sales pipeline"
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {crmStats.map((stat) => (
          <StatCard key={stat.label} {...stat} trend="up" />
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardBody>
            <SectionTitle>Customers</SectionTitle>
            <DataTable
              columns={[
                { key: "name", label: "Name" },
                { key: "email", label: "Email" },
                {
                  key: "status",
                  label: "Status",
                  render: (row) => (
                    <Badge
                      variant={
                        row.status === "Churn risk"
                          ? "danger"
                          : row.status === "Trial"
                            ? "warning"
                            : "success"
                      }
                    >
                      {row.status}
                    </Badge>
                  ),
                },
                { key: "value", label: "Value" },
              ]}
              rows={crmCustomers}
            />
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <SectionTitle>Deals</SectionTitle>
            <DataTable
              columns={[
                { key: "company", label: "Company" },
                { key: "stage", label: "Stage" },
                { key: "owner", label: "Owner" },
                { key: "amount", label: "Amount" },
              ]}
              rows={crmDeals}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
