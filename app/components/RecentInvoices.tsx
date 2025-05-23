import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireUser } from "../utils/hooks";
import { formatCurrency } from "../utils/formatCurrency";
import prisma from "../utils/db";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";


async function getData(userId: string) {
    const data = await prisma.invoice.findMany({
        where: {
            userId: userId,
        },
        select: {
            id: true,
            clientName: true,
            clientEmail: true,
            total: true,
            currency: true,
        },
        orderBy: {
            createdAt: "desc",
        },
        take: 7,
    });

    return data;
}

export async function RecentInvoices() {
    const session = await requireUser();
    const data = await getData(session.user?.id as string);
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Invoices</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-8">
                {data.map((item) => (
                    <>
                        <div className="flex items-center gap-4" key={item.id}>
                            <Avatar className="hidden sm:flex size-9">
                                <AvatarFallback>{item.clientName.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col gap-1">
                                <p className="text-sm font-medium leadin-none">
                                    {item.clientName}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {item.clientEmail}
                                </p>
                            </div>
                        </div>
                        <div className="font-medium">
                            +
                            {formatCurrency({
                                amount: item.total,
                                currency: item.currency as any,
                            })}
                        </div>
                    </>
                ))}
            </CardContent>
        </Card>
    );
}