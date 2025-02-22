"use client"

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";

export function CreateInvoice() {
    const [selectedDate, setSelectDate] = useState(new Date())
    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardContent className="p-6">
                <div className="flex flex-col gap-1 w-fit mb-6">
                    <div className="flex items-center gap-4">
                        <Badge variant={"secondary"}>Draft</Badge>
                        <Input placeholder="Test 123" />
                    </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    <div>
                        <Label>
                            Invoice No.
                        </Label>
                        <div className="flex">
                            <span className="px-3 border-r-0 rounded-l-md bg-muted flex items-center">#</span>
                            <Input className="rounded-l-none" placeholder="5" />
                        </div>
                    </div>
                    <div>
                        <Label>Currency</Label>
                        <Select defaultValue="USD">
                            <SelectTrigger>
                                <SelectValue placeholder="select Currency" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="USD">
                                    united States Dollar -- USD
                                </SelectItem>
                                <SelectItem value="EUR">
                                    Eur --- EUR
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <Label>From</Label>
                        <div className="space-y-2">
                            <Input placeholder="your Name" />
                            <Input placeholder="your Email" />
                            <Input placeholder="your Address" />
                        </div>
                    </div>
                    <div>
                        <Label>To</Label>
                        <div className="space-y-2">
                            <Input placeholder=" Client Name" />
                            <Input placeholder=" Client Email" />
                            <Input placeholder=" Client Address" />
                        </div>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <div>
                            <Label>Date</Label>
                        </div>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant={"outline"}>
                                    <CalendarIcon />
                                    {selectedDate ? (new Intl.DateTimeFormat("en-US", {
                                        dateStyle: "long"
                                    }).format(selectedDate)) : <span>Pick a date</span>}

                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <Calendar selected={selectedDate}
                                    onSelect={(date) => setSelectDate(date || new Date())}
                                    mode="single"
                                    fromDate={new Date()}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div>
                        <Label>Invoice Due</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select due date"/>
                                
                               <SelectContent>
                               <SelectItem value="0">
                               Due on Receipt
                               </SelectItem>
                               </SelectContent>

                            </SelectTrigger>
                        </Select>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}